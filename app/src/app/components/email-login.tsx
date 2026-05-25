"use client";

import { useState } from "react";

import { authClient } from "@/lib/auth-client";
import FloatingInput from "@/app/components/ui/floating-input";

type EmailLoginProps = {
  mode: "login" | "signup";
};

export default function EmailLogin({ mode }: EmailLoginProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const formData = new FormData(event.currentTarget);

      const email = formData.get("email") as string;

      if (mode === "signup") {
        await authClient.signIn.magicLink(
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
              setError(ctx.error.message);
            },
          },
        );
      } else {
        const password = formData.get("password") as string;

        await authClient.signIn.email(
          {
            email,
            password,
            callbackURL: "/dashboard", // TODO
            rememberMe: true,
          },
          {
            onRequest: (ctx) => {
              console.log("Requesting email login with email:", ctx.body);
            },
            onSuccess: (ctx) => {
              console.log("Email login successful:", ctx.data);
            },
            onError: (ctx) => {
              setError(ctx.error.message);
            },
          },
        );
      }
    } catch (error) {
      console.error("Error during email authentication:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      id="email-signup"
      className="flex flex-col w-full gap-4"
      onSubmit={handleSubmit}
    >
      <FloatingInput
        id="email"
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        image="/email.svg"
        required
        className="bg-gray-200"
      />
      {mode === "login" && (
        <FloatingInput
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          image="/lock.svg"
          required
          className="bg-gray-200"
        />
      )}
      {error && (
        <p aria-live="polite" className="text-sm text-red-500 aria-">
          {error}
        </p>
      )}
      <button
        className="
          group

          cursor-pointer

          bg-blue-500
          text-white
          py-2 px-4

          rounded-md

          hover:rounded-none

          disabled:opacity-50
          disabled:cursor-not-allowed

          transition-all duration-200
        "
        type="submit"
        disabled={loading}
      >
        <div className="flex items-center justify-center gap-1">
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
          <span>{mode === "login" ? "Log in" : "Continue with email"}</span>
        </div>
      </button>
    </form>
  );
}
