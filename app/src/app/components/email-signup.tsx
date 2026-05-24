"use client";

import { authClient } from "@/lib/auth-client";
import FloatingInput from "./ui/floating-input";

export default function EmailSignup() {
  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;

    const { data, error } = await authClient.signIn.magicLink(
      {
        email,
        newUserCallbackURL: "/onboarding", // TODO
        callbackURL: "/dashboard", // TODO
        errorCallbackURL: "/signup?error=true", // TODO
      },
      {
        onRequest: (ctx) => {
          console.log("Requesting magic link with email:", ctx.body);
        },
        onSuccess: (ctx) => {
          console.log("Magic link sent successfully:", ctx.data);
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      },
    );

    console.log("Sign up response:", { data, error });
  }
  return (
    <form
      id="email-signup"
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <FloatingInput
        id="email"
        name="email"
        label="Email"
        type="email"
        image="/email.svg"
        required
        className="bg-gray-200"
      />
      <button
        className="
        group

        cursor-pointer

        bg-blue-500
        text-white
        py-2 px-4

        rounded-md

        hover:rounded-none

        transition-all duration-200"
        type="submit"
      >
        <span className="flex items-center justify-center gap-1">
          <span
            className="
            w-0
            overflow-hidden
            opacity-0

            group-hover:w-4
            group-hover:opacity-100

            transition-all duration-200"
          >
            →
          </span>
          <span>Continue with email</span>
        </span>
      </button>
    </form>
  );
}
