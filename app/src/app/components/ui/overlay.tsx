"use client";

import { ReactNode } from "react";

type OverlayProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Overlay({ open, onClose, children }: OverlayProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-1000 bg-black/50 flex items-start justify-center pt-40"
      onClick={onClose}
    >
      <div
        className="bg-zinc-50 rounded-2xl w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
