import EmailLogin from "@/app/components/email-login";
import SocialLogin from "@/app/components/social-login";

export default function SignupPanel() {
  return (
    <>
      <h1 className="mb-10 text-3xl font-medium text-center">
        Welcome to 365Days
      </h1>

      <SocialLogin />
      <div className="my-6 flex w-full items-center gap-4">
        <div className="h-px flex-1 bg-gray-600" />
        <span className="text-gray-600">or</span>
        <div className="h-px flex-1 bg-gray-600" />
      </div>

      <EmailLogin authMode="signup" />
    </>
  );
}
