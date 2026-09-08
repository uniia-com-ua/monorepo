import "@/components/page-builder";
import { PageBuilder } from "@/components/page-builder/dev-preview";
import { Link } from "@/lib/i18n/navigation";

export default async function DevComponentsPage({
  params,
}: PageProps<"/[locale]/dev/components">) {
  return (
    <main className="container mx-auto flex flex-col gap-12 py-12">
      <h1 className="text-2xl font-semibold">Component previews</h1>
      <ul className="flex flex-col gap-3">
        {Object.keys(PageBuilder.previewComponents).map((componentUID) => (
          <li key={componentUID}>
            <Link
              className="text-blue-600 underline"
              href={`/dev/components/${componentUID}`}
            >
              {componentUID}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
