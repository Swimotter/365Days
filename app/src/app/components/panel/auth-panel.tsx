"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import LoginPanel from "@/app/components/panel/login-panel";
import SignupPanel from "@/app/components/panel/signup-panel";
import ResetPassword from "@/app/components/reset-password";

type AuthMode = "login" | "signup" | "reset" | "recover";

type AuthPanelProps = {
  defaultMode: AuthMode;
};

export default function AuthPanel({ defaultMode }: AuthPanelProps) {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const router = useRouter();

  return (
    <div className="flex flex-col text-black items-center">
      {defaultMode === "login" && (
        <>
          <LoginPanel />
          <button
            className="py-5 mx-4 font-medium cursor-pointer text-blue-500"
            onClick={() => router.push("/password/forgot")}
          >
            Reset password
          </button>
          <p className="mx-4 text-gray-600">
            No account?{" "}
            <button
              className="font-medium cursor-pointer text-blue-500"
              onClick={() => router.push("/signup")}
            >
              Create one
            </button>
          </p>
        </>
      )}
      {defaultMode === "signup" && (
        <>
          <SignupPanel />
          <p className="py-5 mx-4 text-gray-600">
            Already have an account?{" "}
            <button
              className="font-medium cursor-pointer text-blue-500"
              onClick={() => router.push("/login")}
            >
              Sign in
            </button>
          </p>
        </>
      )}
      {(defaultMode === "reset" || defaultMode === "recover") && (
        <>
          <h1 className="mb-10 text-3xl font-medium text-center">
            {token
              ? "Choose a new password"
              : "Enter your email to reset password"}
          </h1>
          <ResetPassword token={token} />
          <button
            className="py-5 mx-4 font-medium cursor-pointer text-blue-500"
            onClick={() => router.push("/login")}
          >
            {token ? "Back to Log in" : "Cancel"}
          </button>
        </>
      )}
    </div>
  );
}
