export interface ISuccessResponse<T> {
  status: number;
  data: T;
}

export interface IList<T> {
  results: Array<T>;
  limit: number;
  page: number;
  totalPages: number;
  totalResults: number;
}
