import { Metadata } from "next";

import AuthPanel from "@/app/components/panel/auth-panel";

export const metadata: Metadata = {
  title: "365Days",
  description: "Create your 365Days account",
};

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="w-full max-w-lg rounded-2xl p-10">
        <AuthPanel defaultMode="signup" />
      </main>
    </div>
  );
}
