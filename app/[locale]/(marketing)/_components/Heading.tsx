"use client";

import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useTranslations } from "next-intl";

export default function Heading() {
  const t = useTranslations();

  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl  md:text-6xl font-bold">
        {t("mainBanner.sec1")}
        <span className="underline">Notion</span>{" "}
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        {t("mainBanner.sec2")}
        <br />
        {t("mainBanner.sec3")}
      </h3>
      {isLoading && (
        <div className="flex items-center justify-center w-full">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            <>
              {t("button.enterNotion")}
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            {t("button.getNotionFree")}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
}
