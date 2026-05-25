"use client";

import { Metadata } from "next";
import { useState } from "react";

import EmailLogin from "@/app/components/email-login";
import SocialLogin from "@/app/components/social-login";

// export const metadata: Metadata = {
//   title: "365Days",
//   description:
//     "365Days is a shared journal for friends, family, and loved ones to document their lives in interactive ways.",
// };

type AuthMode = "login" | "signup";

export default function Login() {
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  const isLogin = authMode === "login";

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="w-full max-w-lg rounded-2xl p-10">
        <div className="flex flex-col text-black items-center">
          <h1 className="mb-10 text-3xl font-medium text-center">
            {isLogin ? "Sign in to 365Days" : "Welcome to 365Days"}
          </h1>
          <SocialLogin />
          <div className="my-6 flex w-full items-center gap-4">
            <div className="h-px flex-1 bg-gray-600" />
            <span className="text-gray-600">or</span>
            <div className="h-px flex-1 bg-gray-600" />
          </div>
          <EmailLogin mode={authMode} />

          {isLogin ? (
            <>
              <a
                className="py-5 mx-4 font-medium text-blue-500"
                href="/reset-password"
              >
                Reset password
              </a>
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
          ) : (
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
        </div>
      </main>
    </div>
  );
}
