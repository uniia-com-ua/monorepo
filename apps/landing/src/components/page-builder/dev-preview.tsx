import { PageBuilderComponentProps } from "@/types/general";
import type { Data, UID } from "@workspace/strapi-types";

type ComponentData<TUID extends string> = TUID extends UID.Component
  ? Data.Component<TUID>
  : {};

type ComponentUID = UID.Component | (string & {});

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

  new<TUID extends ComponentUID>(
    componentUID: TUID,
    Component: React.ComponentType<
      PageBuilderComponentProps & { component: ComponentData<TUID> }
    >,
  ): React.ComponentType<
    PageBuilderComponentProps & { component: ComponentData<TUID> }
  > & { fallback?: ComponentData<TUID> } {
    const PreviewComponent: React.ComponentType<
      PageBuilderComponentProps & { component: ComponentData<TUID> }
    > & {
      fallback?: ComponentData<TUID>;
    } = (
      props: PageBuilderComponentProps & { component: ComponentData<TUID> },
    ) => {
      return <Component {...props} />;
    };

    this.previewComponents[componentUID] = PreviewComponent;
    return PreviewComponent;
  }
}

// Singleton instance of PageBuilderClass
export const PageBuilder = new PageBuilderClass();
