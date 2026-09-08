import { PageBuilderComponentProps } from "@/types/general";
import type { Data, UID } from "@workspace/strapi-types";

class PageBuilderClass {
  previewComponents: Record<
    string,
    React.ComponentType<any> & { fallback?: any }
  >;

  constructor() {
    this.previewComponents = {};
  }

  // Works as follows:
  // export const StrapiRichText = PageBuilder.new(({page, component, etc}) => (JSX, default react component))
  // basically it bootstraps the component with the default props and fallback for dev preview
  // It also registers the component in the previewComponents map for dev preview route
  // fallback type should be inferred from the component type, so that it can be used in the dev preview route

  new<TUID extends UID.Component>(
    componentUID: TUID,
    Component: React.ComponentType<
      PageBuilderComponentProps & { component: Data.Component<TUID> }
    >,
  ): React.ComponentType<
    PageBuilderComponentProps & { component: Data.Component<TUID> }
  > & { fallback?: Data.Component<TUID> } {
    const PreviewComponent: React.ComponentType<
      PageBuilderComponentProps & { component: Data.Component<TUID> }
    > & {
      fallback?: Data.Component<TUID>;
    } = (
      props: PageBuilderComponentProps & { component: Data.Component<TUID> },
    ) => {
      return <Component {...props} />;
    };

    this.previewComponents[componentUID] = PreviewComponent;
    return PreviewComponent;
  }
}

// Singleton instance of PageBuilderClass
export const PageBuilder = new PageBuilderClass();
