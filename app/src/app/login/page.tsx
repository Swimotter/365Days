import { Metadata } from "next";
import EmailSignup from "../components/email-signup";
import SocialSignup from "../components/social-signup";

export const metadata: Metadata = {
  title: "365Days",
  description:
    "365Days is a shared journal for friends, family, and loved ones to document their lives in interactive ways.",
};

export default function Login() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-zinc-5 sm:items-start">
        <div className="flex flex-col w-full text-black">
          <SocialSignup />
          <div className="relative flex items-center py-5">
            <div className="grow border-t border-gray-600"></div>
            <span className="mx-4 shrink text-gray-600">or</span>
            <div className="grow border-t border-gray-600"></div>
          </div>
          <EmailSignup />
        </div>
      </main>
    </div>
  );
}
