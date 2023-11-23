"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Label } from "../ui/label";
import { ThemeToggle } from "../theme-toggle";
import { useSetting } from "@/hooks/useSetting";
import { LanguageToggle } from "../language-toggle";
import { useTranslations } from "next-intl";

const SettingModal = () => {
  const t = useTranslations();
  const setting = useSetting();

  return (
    <Dialog open={setting.isOpen} onOpenChange={setting.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-semibold">{t("setting.title")}</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <Label>{t("setting.apperance")}</Label>
            <span className="text-xs text-muted-foreground mt-1">
              {t("setting.apperanceDescription")}
            </span>
          </div>
          <ThemeToggle />
        </div>
        <div className="flex items-center justify-between pt-4">
          <div className="flex flex-col gap-1">
            <Label>{t("setting.language")}</Label>
            <span className="text-xs text-muted-foreground mt-1">
              {t("setting.languageDescription")}
            </span>
          </div>
          <LanguageToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingModal;
