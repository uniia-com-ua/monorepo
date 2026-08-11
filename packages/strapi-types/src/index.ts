import type { Modules, UID } from "@strapi/strapi";

export type { Data, Modules, UID } from "@strapi/strapi";
export type ID = Modules.Documents.ID;

export type FindMany<TContentTypeUID extends UID.ContentType> =
  Modules.Documents.ServiceParams<TContentTypeUID>["findMany"];

export type FindFirst<TContentTypeUID extends UID.ContentType> =
  Modules.Documents.ServiceParams<TContentTypeUID>["findFirst"];

export type FindOne<TContentTypeUID extends UID.ContentType> =
  Modules.Documents.ServiceParams<TContentTypeUID>["findOne"];

export * from "../generated/components";
export * from "../generated/contentTypes";

export type Result<
  TSchemaUID extends UID.Schema,
  TParams extends Modules.Documents.Params.Pick<
    TSchemaUID,
    "fields" | "populate"
  > = never,
> = Modules.Documents.Result<TSchemaUID, TParams>;
export type FetchOptions<TSchemaUID extends UID.Schema> =
  Modules.Documents.Params.Pick<TSchemaUID, "fields" | "populate">;
