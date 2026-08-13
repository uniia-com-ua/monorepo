import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import * as rootParams from "next/root-params";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    const paramValue = await rootParams.locale();
    if (hasLocale(routing.locales, paramValue)) {
      locale = paramValue;
    } else {
      notFound();
    }
  }

  return {
    locale,
    messages: (
      await (locale === "en"
        ? import("../../../locales/en.json")
        : import(`../../../locales/${locale}.json`))
    ).default,
    timeZone: "Europe/Kiev", // fix this to Kyiv pls, time to change ISO stuff, petition anyone?
  };
});
