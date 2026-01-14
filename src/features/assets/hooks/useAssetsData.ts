import { getAssets } from "../services/assetService";
import type { Asset } from "../types/assetTypes";
import { useState, useEffect, useCallback } from "react";

const useAssetsData = () => {
  const [data, setData] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // TODO: Implement the fetch logic using getAssets service
  // Set loading states, handle errors, and update data

  const assetsData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const assets = await getAssets();
      setData(assets);
    } catch (error) {
      setError(error instanceof Error ? error : new Error(`Error desconocido`));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() =>{
    assetsData();
  },[assetsData]);


  return {
    data,
    isLoading,
    error,
    assetsData,
  };
};

export default useAssetsData;
