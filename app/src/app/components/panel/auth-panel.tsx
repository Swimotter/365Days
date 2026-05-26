"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import LoginPage from "@/app/components/panel/login-panel";
import ResetPassword from "@/app/components/panel/reset-password-panel";
import Signup from "@/app/components/panel/signup-panel";

type AuthMode = "login" | "signup" | "reset";

type AuthPanelProps = {
  defaultMode: AuthMode;
};

export default function AuthPanel({ defaultMode }: AuthPanelProps) {
  const [authMode, setAuthMode] = useState<AuthMode>(defaultMode);

  const router = useRouter();

  return (
    <div className="flex flex-col text-black items-center">
      {authMode === "login" && (
        <>
          <LoginPage />
          <button
            className="py-5 mx-4 font-medium cursor-pointer text-blue-500"
            onClick={() => {
              setAuthMode("reset");
              router.push("/password/forgot");
            }}
          >
            Reset password
          </button>
          <p className="mx-4 text-gray-600">
            No account?{" "}
            <button
              className="font-medium cursor-pointer text-blue-500"
              onClick={() => {
                setAuthMode("signup");
                router.push("/signup");
              }}
            >
              Create one
            </button>
          </p>
        </>
      )}
      {authMode === "signup" && (
        <>
          <Signup />
          <p className="py-5 mx-4 text-gray-600">
            Already have an account?{" "}
            <button
              className="font-medium cursor-pointer text-blue-500"
              onClick={() => {
                setAuthMode("login");
                router.push("/login");
              }}
            >
              Sign in
            </button>
          </p>
        </>
      )}
      {authMode === "reset" && (
        <>
          <ResetPassword />
          <button
            className="py-5 mx-4 font-medium cursor-pointer text-blue-500"
            onClick={() => {
              setAuthMode("login");
              router.push("/login");
            }}
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
}
