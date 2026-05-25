"use client";

import { useState } from "react";

import EmailLogin from "@/app/components/email-login";
import SocialLogin from "@/app/components/social-login";

type AuthMode = "login" | "signup" | "reset";

export default function LoginPage() {
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  const isLogin = authMode === "login";
  const isSignup = authMode === "signup";
  const isReset = authMode === "reset";

  return (
    <div className="flex flex-col text-black items-center">
      <h1 className="mb-10 text-3xl font-medium text-center">
        {isLogin && "Sign in to 365Days"}
        {isSignup && "Welcome to 365Days"}
        {isReset && "Enter your email to reset password"}
      </h1>

      {!isReset && (
        <>
          <SocialLogin />
          <div className="my-6 flex w-full items-center gap-4">
            <div className="h-px flex-1 bg-gray-600" />
            <span className="text-gray-600">or</span>
            <div className="h-px flex-1 bg-gray-600" />
          </div>
        </>
      )}

      <EmailLogin authMode={authMode} />

      {isLogin && (
        <>
          <button
            className="py-5 mx-4 font-medium cursor-pointer text-blue-500"
            onClick={() => setAuthMode("reset")}
          >
            Reset password
          </button>
          <p className="mx-4 text-gray-600">
            No account?{" "}
            <button
              className="font-medium cursor-pointer text-blue-500"
              onClick={() => setAuthMode("signup")}
            >
              Create one
            </button>
          </p>
        </>
      )}
      {isSignup && (
        <>
          <p className="py-5 mx-4 text-gray-600">
            Already have an account?{" "}
            <button
              className="font-medium cursor-pointer text-blue-500"
              onClick={() => setAuthMode("login")}
            >
              Sign in
            </button>
          </p>
        </>
      )}
      {isReset && (
        <button
          className="py-5 mx-4 font-medium cursor-pointer text-blue-500"
          onClick={() => setAuthMode("login")}
        >
          Cancel
        </button>
      )}
    </div>
  );
}
