import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const {
  Link,
  redirect: _redirect,
  usePathname,
  useRouter,
} = createNavigation(routing);

// https://next-intl-docs.vercel.app/docs/routing/navigation#redirect
export const redirect: typeof _redirect = _redirect;
