import { isDevelopment } from "@/lib/helpers";
import { notFound } from "next/navigation";

export default function DevLayout({ children }: LayoutProps<"/[locale]/dev">) {
  if (!isDevelopment()) {
    notFound();
  }

  return (
    <div className="max-w-container container mx-auto flex flex-col items-center justify-center px-4">
      {children}
    </div>
  );
}
