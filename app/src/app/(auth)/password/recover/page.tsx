import { Metadata } from "next";

import AuthPanel from "@/app/components/panel/auth-panel";

export const metadata: Metadata = {
  title: "365Days",
  description: "Reset your 365Days password",
};

export default function Page() {
  return <AuthPanel defaultMode="recover" />;
}
