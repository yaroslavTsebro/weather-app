export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export class PaginationQueryDto {
  page: number = 1;
  limit: number = 10;
}
