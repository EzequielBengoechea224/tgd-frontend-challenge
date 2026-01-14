import { useEffect, useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import type { Asset } from "../types/assetTypes";
import { useUpdateAsset } from "../hooks/useUpdateAsset";

interface EditCapacityModalProps {
  open: boolean;
  asset: Asset | null;
  onClose: () => void;
}

const EditCapacityModal = ({ open, asset, onClose }: EditCapacityModalProps) => {
  const [capacityValue, setCapacityValue] = useState("");
  const { mutateAsync, isLoading } = useUpdateAsset();

  // 🔑 sincroniza cuando cambia el asset
  useEffect(() => {
    if (asset) {
      setCapacityValue(String(asset.capacity));
    }
  }, [asset]);

  const handleSave = async () => {
    if (!asset) return;

    await mutateAsync({
      ...asset,
      capacity: Number(capacityValue),
    });

    onClose();
  };

  if (!asset) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 350,
          bgcolor: "white",
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6">Editar: {asset.equipment}</Typography>

        <TextField
          autoFocus
          fullWidth
          label="Nueva capacidad"
          type="number"
          value={capacityValue}
          onChange={(e) => setCapacityValue(e.target.value)}
          sx={{ my: 2 }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleSave} disabled={isLoading}>
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditCapacityModal;
