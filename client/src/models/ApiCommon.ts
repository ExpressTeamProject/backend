export interface RestApiResponse<T> {
  data: T;
  success: boolean;
}