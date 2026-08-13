import { FALLBACK_HOME_PAGE } from "@/lib/fallbacks";
import { fetchPage } from "@/lib/strapi-api/content/server";
import { ROOT_PAGE_PATH } from "@workspace/shared-data";
import { Result } from "@workspace/strapi-types";
import { notFound } from "next/navigation";
import { type FC, use } from "react";
import ErrorBoundry from "../elementary/ErrorBoundry";
import { PageContentComponents } from "../page-builder";

interface StrapiPageViewProps {
  params: {
    locale: string;
    rest?: string[];
  };
  searchParams?: Record<string, string | string[] | undefined>;
}

const StrapiPageView: FC<StrapiPageViewProps> = ({ params, searchParams }) => {
  const locale = params.locale;

  const fullPath = ROOT_PAGE_PATH + (params.rest ?? []).join("/");
  const response = use(fetchPage(fullPath, locale));
  const isRootPage = fullPath === ROOT_PAGE_PATH;

  const data = isRootPage
    ? (response?.data ?? (FALLBACK_HOME_PAGE as Result<"api::page.page">))
    : response?.data;

  if (data?.blocks == null) {
    notFound();
  }

  const { blocks, ...restPageData } = data;

  return (
    <div className="max-w-container container mx-auto flex flex-col items-center justify-center px-4">
      {blocks
        .filter((block) => block != null)
        .map((block) => {
          const name = block.__component;
          const id = block.id;
          const key = `${name}-${id}`;

          const Component = PageContentComponents[name];

          if (Component == null) {
            console.warn("Unknown page-builder component", { name, id });

            return (
              <div key={key} className="font-medium text-red-500">
                Component &quot;{key}&quot; is not implemented on the frontend.
              </div>
            );
          }

          return (
            <ErrorBoundry key={key}>
              <Component
                component={block}
                pageParams={params}
                pageData={restPageData}
                searchParams={searchParams}
              />
            </ErrorBoundry>
          );
        })}
    </div>
  );
};

export default StrapiPageView;
