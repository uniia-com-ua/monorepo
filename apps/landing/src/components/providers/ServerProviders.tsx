import { NextIntlClientProvider } from "next-intl";
import { type FC } from "react";

interface ServerProvidersProps {
  readonly children?: React.ReactNode;
}

const ServerProviders: FC<ServerProvidersProps> = ({ children }) => {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
};

export default ServerProviders;
