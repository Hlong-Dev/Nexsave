"use client";

import React from "react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { localeNames, useRouter } from "@/i18n";

const Footer = () => {
  const t = useTranslations();
  const router = useRouter();

  const switchLocale = (val: string) => {
    router.replace("/", { locale: val });
  };

  return (
    <>
      <div className="flex items-center w-full p-6 bg-background z-50 dark:bg-[#1f1f1f]">
        <Logo />
        <div className="md:ml-auto w-full flex justify-between md:justify-end items-center gap-x-2 text-muted-foreground">
          <Button variant="ghost" size="sm">
            {t("footer.privacyPolicy")}
          </Button>
          <Button variant="ghost" size="sm">
            {t("footer.termsAndConditions")}
          </Button>
        </div>
      </div>
      <div className="flex gap-4 p-6 pb-14 text-muted-foreground flex-wrap">
        {Object.keys(localeNames).map((l: string) => (
          <Button
            key={l}
            onClick={() => {
              switchLocale(l);
            }}
            variant="ghost"
            size="sm"
            className="whitespace-nowrap"
          >
            {localeNames[l]}
          </Button>
        ))}
      </div>
    </>
  );
};

export default Footer;
