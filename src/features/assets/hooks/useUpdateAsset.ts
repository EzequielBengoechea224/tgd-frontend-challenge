// hooks/useUpdateAsset.ts
import { useState } from "react";
import { updateAsset } from "../services/assetService";
import type { Asset } from "../types/assetTypes";

export const useUpdateAsset = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [updatedData, setUpdatedData] = useState<Asset | null>(null);

  const executeUpdateAsset = async (data: Asset) => {
    setIsLoading(true);
    setError(null);
    setUpdatedData(null);

    try {
      const r = await updateAsset(data);
      setUpdatedData(r);
      return r; // Retorna el resultado para usar en el componente
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error);
      throw error; // Re-lanza el error para manejo adicional
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setUpdatedData(null);
  };

  return {
    executeUpdateAsset,
    isLoading,
    error,
    updatedData,
    reset,
    isSuccess: !!updatedData && !error,
  };
};