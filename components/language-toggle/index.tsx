"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "next-intl";
import { localeNames, useRouter } from "@/i18n";
import { Globe } from "lucide-react";
import { useParams } from "next/navigation";

export function LanguageToggle() {
  const locale = useLocale();
  const params = useParams();
  const router = useRouter();

  const switchLocale = (val: string) => {
    if (!!params.documentId) {
      router.push(
        {
          pathname: "/documents/[documentId]",
          params: {
            documentId: params.documentId as string,
          },
        },
        {
          locale: val,
        }
      );
    } else {
      router.push("/documents", {
        locale: val,
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="animate-pulse h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <p className="text-sm px-2 py-1">{localeNames[locale]}</p>
        <DropdownMenuSeparator />
        {Object.keys(localeNames).map((l: string) => (
          <DropdownMenuItem
            key={l}
            className="cursor-pointer"
            onClick={() => {
              switchLocale(l);
            }}
          >
            {localeNames[l]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
