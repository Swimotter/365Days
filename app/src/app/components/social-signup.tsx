"use client";

import Image from "next/image";
import { authClient } from "@/lib/auth-client";

export default function SocialSignup() {
  async function handleSubmit(provider: string) {
    await authClient.signIn.social({
      provider: provider,
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
      newUserCallbackURL: "/dashboard",
    });
  }
  return (
    <div className="flex flex-row items-center gap-6">
      <button
        className="flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => handleSubmit("google")}
      >
        <Image
          className="h-6 w-auto"
          src="/google.svg"
          alt="Google"
          height={24}
          width={24}
        />
        <span>Google</span>
      </button>
      <button
        className="flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => handleSubmit("discord")}
      >
        <Image
          className="h-6 w-auto"
          src="/discord.svg"
          alt="Discord"
          height={24}
          width={24}
        />
        <span>Discord</span>
      </button>
    </div>
  );
}
