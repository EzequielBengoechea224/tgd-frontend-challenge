import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAsset } from "../services/assetService";
import type { Asset } from "../types/assetTypes";

export const useUpdateAsset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (asset: Asset) => updateAsset(asset),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assets"],
      });
    },
  });
};
