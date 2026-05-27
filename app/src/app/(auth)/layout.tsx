import "@/app/globals.css";
import { ReactNode } from "react";

type AuthLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex w-full justify-center">{children}</main>
    </div>
  );
}
