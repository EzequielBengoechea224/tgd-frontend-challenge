import { useState, useCallback } from "react";
import useAssetsData from "../hooks/useAssetsData";
import EditCapacityModal from "../components/EditCapacityModal";
import type { Asset } from "../types/assetTypes";
import {
  Box,
  Button,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Spinner } from "@/shared/components";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AssetsTable = () => {
  const { data, isLoading, error } = useAssetsData();

  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  console.log(data);

  // Optimizado con useCallback
  const handleOpenModal = useCallback((asset: Asset) => {
    setSelectedAsset(asset);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedAsset(null);
  }, []);


  if (isLoading) return <Spinner />;

  return (
    <>
      {/* Modal separado - sus cambios NO re-renderizan la tabla */}
      <EditCapacityModal
        open={!!selectedAsset}
        asset={selectedAsset}
        onClose={handleCloseModal}
      />

      {/* Tabla - solo se re-renderiza cuando cambian los datos, no cuando cambia el modal */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="assets table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Equipment</StyledTableCell>
              <StyledTableCell>Element</StyledTableCell>
              <StyledTableCell>Component</StyledTableCell>
              <StyledTableCell>Capacity</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell>{row.equipment}</StyledTableCell>
                <StyledTableCell>{row.element}</StyledTableCell>
                <StyledTableCell>{row.component}</StyledTableCell>
                <StyledTableCell>{row.capacity}</StyledTableCell>
                <StyledTableCell align="right">
                  <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleOpenModal(row)}
                    >
                      Update
                    </Button>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AssetsTable;
