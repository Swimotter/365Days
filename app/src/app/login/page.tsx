import { Metadata } from "next";

import LoginPage from "@/app/components/login-page";

export const metadata: Metadata = {
  title: "365Days",
  description: "Sign in to your 365Days account",
};

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="w-full max-w-lg rounded-2xl p-10">
        <LoginPage />
      </main>
    </div>
  );
}
