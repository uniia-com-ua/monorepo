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
