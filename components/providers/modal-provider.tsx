"use client";
import React, { useEffect, useState } from "react";
import SettingModal from "../modal/setting-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SettingModal />
    </>
  );
};

export default ModalProvider;
