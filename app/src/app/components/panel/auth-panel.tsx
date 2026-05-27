"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import LoginPanel from "@/app/components/panel/login-panel";
import ResetPassword from "@/app/components/reset-password";

type AuthMode = "login" | "signup" | "reset" | "recover";

type AuthPanelProps = {
  defaultMode: AuthMode;
};

export default function AuthPanel({ defaultMode }: AuthPanelProps) {
  const [authMode, setAuthMode] = useState<AuthMode>(defaultMode);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return (
    <div className="flex flex-col w-full max-w-lg p-10 text-black">
      {authMode === "login" && (
        <>
          <LoginPanel authMode={authMode} />
          <div className="flex flex-col pt-5 gap-5 text-center">
            <button
              className="font-medium cursor-pointer text-blue-500"
              onClick={() => setAuthMode("reset")}
            >
              Reset password
            </button>
            <div>
              <span className="text-gray-600">No account? </span>
              <button
                className="font-medium cursor-pointer text-blue-500"
                onClick={() => setAuthMode("signup")}
              >
                Create one
              </button>
            </div>
          </div>
        </>
      )}
      {authMode === "signup" && (
        <>
          <LoginPanel authMode={authMode} />
          <div className="flex flex-col pt-5 gap-5 text-center">
            <div>
              <span className="text-gray-600">Already have an account? </span>
              <button
                className="font-medium cursor-pointer text-blue-500"
                onClick={() => setAuthMode("login")}
              >
                Sign in
              </button>
            </div>
          </div>
        </>
      )}
      {(authMode === "reset" || authMode === "recover") && (
        <>
          <h1 className="mb-10 text-3xl font-medium text-center">
            {token
              ? "Choose a new password"
              : "Enter your email to reset password"}
          </h1>
          <ResetPassword token={token} />
          <div className="flex flex-col pt-5 gap-5 text-center">
            <button
              className="font-medium cursor-pointer text-blue-500"
              onClick={() => setAuthMode("login")}
            >
              {token ? "Back to Log in" : "Cancel"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
