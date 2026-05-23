"use client";

import { authClient } from "@/lib/auth-client";
import FloatingInput from "./ui/floating-input";

export default function EmailSignup() {
  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;
    const nickname = formData.get("nickname") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const { data, error } = await authClient.signUp.email(
      {
        name: nickname,
        email,
        password,
        callbackURL: "/dashboard",
      },
      {
        onRequest: (ctx) => {
          console.log("Requesting magic link with email:", ctx.body);
        },
        onSuccess: (ctx) => {},
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
        label="Email *"
        type="email"
        image="/email.svg"
        required
        className="bg-gray-200"
      />
      <FloatingInput
        id="nickname"
        name="nickname"
        label="Nickname *"
        image="/at.svg"
        required
        className="bg-gray-200"
      />
      <FloatingInput
        id="password"
        name="password"
        label="Password *"
        type="password"
        image="/lock.svg"
        required
        className="bg-gray-200"
      />
      <FloatingInput
        id="confirm-password"
        name="confirm-password"
        label="Confirm Password *"
        type="password"
        image="/lock.svg"
        required
        className="bg-gray-200"
      />
      <button
        className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md"
        type="submit"
      >
        Sign Up
      </button>
    </form>
  );
}
