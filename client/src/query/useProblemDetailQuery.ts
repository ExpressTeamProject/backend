import { kyInstance } from "@/lib/kyInstance";
import { RestApiResponse } from "@/models/ApiCommon";
import { Problem } from "@/models/Problem";
import { useQuery } from "@tanstack/react-query";

export const useProblemDetailQuery = (id: string) => {
  return useQuery({
    queryKey: ["problem", id],
    queryFn: () => kyInstance.get(`posts/${id}`).json() as Promise<RestApiResponse<Problem>>,
  });
};