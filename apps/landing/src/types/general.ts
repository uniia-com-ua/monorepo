export interface AppError {
  message: string | number;
  status: number;
  name?: string;
  details?: Record<string, unknown>;
}

export interface CustomFetchOptions {
  doNotAddLocaleQueryParams?: boolean;
  userJWT?: string;
  omitUserAuthorization?: boolean;
  useProxy?: boolean;
}
