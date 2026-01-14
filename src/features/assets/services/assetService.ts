import { axiosInstance } from "@/shared/libs/axios";
import type { Asset } from "../types/assetTypes";

export const getAssets = async (): Promise<Asset[]> => {
  const response = await axiosInstance.get("/equipment");
  return response.data;
};

export const updateAsset = async (asset: Asset): Promise<Asset> => {
  const response = await axiosInstance.put("/equipment", asset);
  return response.data;
};
