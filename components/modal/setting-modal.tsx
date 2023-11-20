"use client";
import React from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Label } from "../ui/label";
import { ThemeToggle } from "../theme-toggle";
import { useSetting } from "@/hooks/useSetting";

const SettingModal = () => {
  const setting = useSetting();

  return (
    <Dialog open={setting.isOpen} onOpenChange={setting.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-semibold">My setting</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <Label>Apperance</Label>
            <span className="text-xs text-muted-foreground mt-1">
              Customize how Notion look on your device
            </span>
          </div>
          <ThemeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingModal;
