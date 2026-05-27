"use client";

import { authClient } from "@/lib/auth-client";
import SocialButton from "@/app/components/ui/social-button";

export default function SocialLogin() {
  async function handleSubmit(provider: string) {
    await authClient.signIn.social({
      provider: provider,
      callbackURL: "/auth/callback",
      errorCallbackURL: "/error",
    });
  }

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <SocialButton
        image="/google.svg"
        name="Google"
        onClick={() => handleSubmit("google")}
      />
      <SocialButton
        image="/discord.svg"
        name="Discord"
        onClick={() => handleSubmit("discord")}
      />
    </div>
  );
}
