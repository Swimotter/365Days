import EmailLogin from "@/app/components/email-login";
import SocialLogin from "@/app/components/social-login";

type AuthMode = "login" | "signup";

type LoginPanelProps = {
  authMode: AuthMode;
};

export default function LoginPanel({ authMode }: LoginPanelProps) {
  return (
    <>
      <h1 className="mb-10 text-3xl font-medium text-center">
        {authMode === "login" ? "Sign in to 365Days" : "Welcome to 365Days"}
      </h1>

      <SocialLogin />
      <div className="my-6 relative flex items-center justify-center gap-4">
        <div className="absolute left-0 right-0 h-px bg-gray-600" />
        <span className="relative bg-zinc-50 px-4 text-gray-600">or</span>
      </div>

      <EmailLogin authMode={authMode} />
    </>
  );
}
