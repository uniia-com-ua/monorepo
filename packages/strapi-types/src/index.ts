import type {
  WithSmartPopulate,
  WithSmartPopulateResult,
  WithSmartPopulateResultParams,
} from "@notum-cz/strapi-plugin-smart-populate/types";
import type { Data, Modules, Schema, UID } from "@strapi/strapi";

export type { Data, Modules, Schema, UID } from "@strapi/strapi";
export type ID = Modules.Documents.ID;

export type FindMany<TContentTypeUID extends UID.ContentType> =
  WithSmartPopulate<
    Modules.Documents.ServiceParams<TContentTypeUID>["findMany"]
  >;

export type FindFirst<TContentTypeUID extends UID.ContentType> =
  WithSmartPopulate<
    Modules.Documents.ServiceParams<TContentTypeUID>["findFirst"]
  >;

export type FindOne<TContentTypeUID extends UID.ContentType> =
  WithSmartPopulate<
    Modules.Documents.ServiceParams<TContentTypeUID>["findOne"]
  >;

export * from "../generated/components";
export * from "../generated/contentTypes";

export type Result<
  TUID extends UID.ContentType,
  TParams extends { populate?: unknown } = never,
> = WithSmartPopulateResult<
  Modules.Documents.Result<
    TUID,
    WithSmartPopulateResultParams<
      TParams,
      Modules.Documents.Params.Pick<TUID, "fields" | "populate">
    >
  >,
  TParams,
  {
    contentType: Data.ContentType<TUID>;
    populatableKeys: Extract<
      Schema.PopulatableAttributeNames<TUID>,
      keyof Data.ContentType<TUID>
    >;
  }
>;

// Used for defining type safe fallback values for Strapi content types, e.g. for global config or page builder blocks.
// Omits strapi internal fields like `id`, `createdAt`, `updatedAt`, etc. **recursively** and only keeps the actual content type attributes.
type Primitive = string | number | boolean | bigint | symbol | null | undefined;

type FallbackInternalKey =
  | "id"
  | "documentId"
  | "createdAt"
  | "updatedAt"
  | "publishedAt"
  | "createdBy"
  | "updatedBy"
  | "locale"
  | "localizations";

type DeepFallbackResult<T> = T extends Primitive
  ? T
  : T extends Date
    ? T
    : T extends readonly (infer TItem)[]
      ? DeepFallbackResult<TItem>[]
      : T extends object
        ? {
            [TKey in keyof T as TKey extends FallbackInternalKey
              ? never
              : TKey]?: DeepFallbackResult<T[TKey]>;
          }
        : T;

export type FallbackResult<TUID extends UID.ContentType> = DeepFallbackResult<
  Result<TUID>
>;
