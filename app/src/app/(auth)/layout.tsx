import "@/app/globals.css";
import Link from "next/link";
import { ReactNode } from "react";

type AuthLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <header className="top-0 z-10 bg-zinc-50">
        <nav className="flex items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-bold text-3xl">
              365Days
            </Link>
          </div>
        </nav>
      </header>
      <div className="flex flex-1 items-center justify-center bg-zinc-50 font-sans">
        <main className="flex w-full justify-center">{children}</main>
      </div>
    </>
  );
}
