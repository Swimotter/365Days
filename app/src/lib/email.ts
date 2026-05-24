import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  console.log("Resend:", resend);
  const { data, error } = await resend.emails.send({
    from: `${process.env.APP_NAME} <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    html,
  });

  if (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }

  console.log("Email sent successfully:", data);
}
