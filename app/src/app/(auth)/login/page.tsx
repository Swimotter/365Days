import { Metadata } from "next";

import AuthPanel from "@/app/components/panel/auth-panel";

export const metadata: Metadata = {
  title: "365Days",
  description: "Sign in to your 365Days account",
};

export default function Page() {
  return <AuthPanel defaultMode="login" />;
}
