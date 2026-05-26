import { Metadata } from "next";

import AuthPanel from "@/app/components/panel/auth-panel";

export const metadata: Metadata = {
  title: "365Days",
  description: "Reset your 365Days password",
};

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="w-full max-w-lg rounded-2xl p-10">
        <AuthPanel defaultMode="reset" />
      </main>
    </div>
  );
}
