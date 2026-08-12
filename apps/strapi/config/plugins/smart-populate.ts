import type { PopulateOverrideEntries } from "@notum-cz/strapi-plugin-smart-populate/types";
import type { Modules, UID } from "@strapi/strapi";

type ComponentPopulateMap = {
  [TComponentUID in UID.Component]: Required<
    Modules.Documents.Params.Pick<TComponentUID, "populate:object">
  >["populate"];
};

const populateOverrides =
  [] satisfies PopulateOverrideEntries<ComponentPopulateMap>;

export function smartPopulateConfig() {
  return {
    enabled: true,
    config: {
      populateOverrides,
    },
  };
}
