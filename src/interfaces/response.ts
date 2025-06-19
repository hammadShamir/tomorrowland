export interface IResponse {
  meta: IMetaData;
  data?: unknown;
}

export interface IMetaData {
  status: number;
  message: string;
  limit?: number;
  offset?: number;
  totalCount?: number;
  stack?: string;
  unreadCount?: number;
}

export interface IPagination {
  offset?: number;
  limit?: number;
  totalCount?: number;
}
