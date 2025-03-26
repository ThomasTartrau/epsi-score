export interface Team {
  id: string;
  name: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PaginationData {
  total: number;
  limit: number;
  offset: number;
}
