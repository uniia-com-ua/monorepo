import { Data } from "@workspace/strapi-types";
import { Locale } from "next-intl";

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

export type PageBuilderComponentProps = {
  readonly pageParams?: {
    locale: Locale;
    rest?: string[];
  };
  readonly page?: Data.ContentType<"api::page.page"> | null;
  readonly searchParams?: Record<string, string | string[] | undefined>;
};
