"use client";

import { Link } from "@/lib/i18n/navigation";
import { buttonVariants } from "@workspace/ui/components/base/button";
import { type FC } from "react";

const BackButton: FC = () => {
  return (
    <Link
      href="/dev/components"
      className={buttonVariants({ variant: "secondary" })}
    >
      Back to components list
    </Link>
  );
};

export default BackButton;
