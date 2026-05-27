"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";

import Overlay from "@/app/components/ui/overlay";
import AuthPanel from "@/app/components/panel/auth-panel";

type HomeProps = {
  children?: ReactNode;
};

export default function Home({ children }: HomeProps) {
  const [loginOpen, setLoginOpen] = useState<boolean>(false);

  return (
    <>
      <header className="sticky top-0 z-10 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800">
        <nav className="flex items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-bold text-xl">
              365Days
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="relative group cursor-pointer"
              onClick={() => setLoginOpen(true)}
            >
              Log in
              <span
                className="
                  absolute left-0 -bottom-1
                  h-px w-full

                  bg-white

                  translate-y-1 opacity-0
                  group-hover:-translate-y-1 group-hover:opacity-100

                  transition-all duration-200
                "
              />
            </button>
          </div>
        </nav>
      </header>

      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
        <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
          {children}
        </main>
      </div>

      <Overlay open={loginOpen} onClose={() => setLoginOpen(false)}>
        <AuthPanel defaultMode="login" />
      </Overlay>
    </>
  );
}
