import { useQuery } from "@tanstack/react-query";
import { getAssets } from "../services/assetService";

export const useAssets = () =>
  useQuery({
    queryKey: ["assets"],
    queryFn: getAssets,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
