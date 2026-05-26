import EmailLogin from "@/app/components/email-login";

export default function ResetPassword() {
  return (
    <div className="flex flex-col text-black items-center">
      <h1 className="mb-10 text-3xl font-medium text-center">
        Enter your email to reset password
      </h1>

      <EmailLogin authMode="reset" />
    </div>
  );
}
