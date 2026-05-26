"use client";

import { useState } from "react";

import { authClient } from "@/lib/auth-client";
import FloatingInput from "@/app/components/ui/floating-input";

type ResetPasswordProps = {
  token: string | null;
};

export default function ResetPassword({ token }: ResetPasswordProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const formData = new FormData(event.currentTarget);

      if (token) {
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirm-password") as string;

        if (password !== confirmPassword) {
          alert("Passwords do not match");
          return;
        }

        await authClient.resetPassword(
          {
            newPassword: password,
            token,
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
      } else {
        const email = formData.get("password") as string;

        await authClient.requestPasswordReset(
          {
            email,
            redirectTo: "/password/recover",
          },
          {
            onRequest: (ctx) => {
              console.log("Requesting password reset with email:", ctx.body);
            },
            onSuccess: (ctx) => {
              console.log("Password reset sent successfully:", ctx.data);
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
  console.log(token);

  return (
    <form
      id="forgot-password"
      className="flex flex-col w-full gap-4"
      onSubmit={handleSubmit}
    >
      {token ? (
        <>
          <FloatingInput
            id="password"
            name="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            image="/lock.svg"
            required
            className="bg-gray-200"
          />
          <FloatingInput
            id="confirm-password"
            name="confirm-password"
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            image="/lock.svg"
            required
            className="bg-gray-200"
          />
        </>
      ) : (
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

              transition-all duration-200
            "
          >
            →
          </span>
          <span>{token ? "Submit" : "Reset password"}</span>
        </div>
      </button>
    </form>
  );
}
