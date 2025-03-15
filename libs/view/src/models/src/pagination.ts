export interface Pagination {
  sort?:string; // keys separated by comma
  direction?: 'asc' | 'desc';
  numberOfElements?: number;
  pageNumber?: number;
  pageSize?: number;
  totalElements?: number;
  totalPages?: number;
  fiscalYearId?: number;
}
