"use client";
import React, { ReactNode } from "react";

interface ConfirmModalProps {
  children: ReactNode;
  onConfirm: () => void;
}

const ConfirmModal = ({ children, onConfirm }: ConfirmModalProps) => {
  return <div></div>;
};

export default ConfirmModal;
