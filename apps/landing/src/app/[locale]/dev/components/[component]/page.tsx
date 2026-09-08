import "@/components/page-builder";
import { PageBuilder } from "@/components/page-builder/dev-preview";
import { Link } from "@/lib/i18n/navigation";
import { buttonVariants } from "@workspace/ui/components/base/button";
import { notFound } from "next/navigation";
import BackButton from "./_components/BackButton";

export default async function DevComponentPage({
  params,
}: PageProps<"/[locale]/dev/components/[component]">) {
  const { locale, component: componentUID } = await params;
  const Component = PageBuilder.previewComponents[componentUID];

  if (!Component) {
    notFound();
  }

  return (
    <main className="container mx-auto flex flex-col gap-12 px-4 py-12">
      <div className="flex w-full flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">{componentUID}</h1>
        <BackButton />
      </div>
      {Component.fallback ? (
        <Component component={Component.fallback} pageParams={{ locale }} />
      ) : (
        <p className="text-sm text-gray-500">
          No fallback provided for this component.
        </p>
      )}
    </main>
  );
}
