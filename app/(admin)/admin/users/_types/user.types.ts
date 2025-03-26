export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  banned?: boolean;
  banReason?: string;
  role: string;
}

export interface PaginationData {
  total: number;
  limit: number;
  offset: number;
}
