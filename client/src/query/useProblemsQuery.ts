import { useQuery } from "@tanstack/react-query";
import { PaginationQueryParams } from "./_common/usePagination";
import { kyInstance } from "@/lib/kyInstance";
import { Problem } from "@/models/Problem";

interface PaginationQueryResponse<T> {
  data: T[];
  count: number;
  pagination: { currentPage: number; totalPages: number };
  success: boolean;
}

function getProblems(pagination: PaginationQueryParams = { page: 1 }): Promise<PaginationQueryResponse<Problem>> {
  const endpoint = new URLSearchParams();
  if (pagination.search) endpoint.set("search", pagination.search);
  if (pagination.tags) endpoint.set("tags", pagination.tags.join(","));
  if (pagination.categories && pagination.categories[0] !== "전체") endpoint.set("category", pagination.categories.join(","));
  if (pagination.status) endpoint.set("status", pagination.status);
  if (pagination.sort) endpoint.set("sort", pagination.sort);
  if (pagination.page) endpoint.set("page", pagination.page.toString());
  if (pagination.limit) endpoint.set("limit", pagination.limit.toString());

  console.log(endpoint.toString());
  return kyInstance.get("posts?" + endpoint.toString()).json();
}

export const useProblemsQuery = (pagination?: PaginationQueryParams) => {
  return useQuery({
    queryKey: ["problems", pagination?.search, { ...pagination }],
    queryFn: () => getProblems(pagination),
  });
};