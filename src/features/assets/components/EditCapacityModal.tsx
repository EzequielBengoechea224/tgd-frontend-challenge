// components/EditCapacityModal.tsx (archivo separado)
import { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import type { Asset } from "../types/assetTypes";
import { useUpdateAsset } from "../hooks/useUpdateAsset";

interface EditCapacityModalProps {
  open: boolean;
  asset: Asset | null;
  onClose: () => void;
}

const EditCapacityModal = ({ open, asset, onClose }: EditCapacityModalProps) => {
  const [capacityValue, setCapacityValue] = useState<string>(asset ? String(asset.capacity) : "");
  const { executeUpdateAsset, isLoading } = useUpdateAsset();
  const handleSave = async () => {
    if (!asset) return;

    await executeUpdateAsset({
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
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Editar: {asset.equipment}
        </Typography>

        <TextField
          autoFocus
          fullWidth
          label="Nueva capacidad"
          type="number"
          value={capacityValue}
          onChange={(e) => setCapacityValue(e.target.value)}
          sx={{ my: 2 }}
        />
        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end", mt: 3 }}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleSave}>
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditCapacityModal;
