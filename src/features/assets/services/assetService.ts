import { axiosInstance } from "@/shared/libs/axios";
import type { Asset } from "../types/assetTypes";

export const getAssets = async (): Promise<Asset[]> => {
  // TODO: Implement GET request to fetch assets
  try {
    const r = await axiosInstance.get(`/equipment`);
    return r.data;
  } catch (error) {
    console.log("Se ha detectado un error: ", error);
    throw new Error(`Error en la peticion al back --- ${error}`);
  }

  // Example endpoint: /api/assets
  // Use axiosInstance.get()
};

export const updateAsset = async (data: Asset): Promise<Asset> => {
  // TODO: Implement PUT request to update an asset
  try {
    const r = await axiosInstance.put("/equipment",  data );

    console.log(`ID actualizado exitosamente: ${data.id}`);
    return r.data;
  } catch (error) {
    console.log("Se Detecto un error: ", error);
    throw new Error(`Error updating asset ${data.id} --- ${error}`);
  }
  // Example endpoint: /api/assets/:id
  // Use axiosInstance.put()
};
