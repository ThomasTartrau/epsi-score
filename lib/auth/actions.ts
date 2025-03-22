import { BetterAuthOptions } from "better-auth";
import { Resend } from "resend";
import { EmailVerification } from "@/components/email/email-verification";
import { after } from "next/server";
import { render } from "@react-email/render";
import { ResetPassword } from "@/components/email/reset-password";

const resend = new Resend(process.env.RESEND_API_KEY);

export const authActions = {
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    async sendVerificationEmail({ user, url }) {
      after(async () => {
        const emailHtml = await render(
          EmailVerification({ name: user.name, url }),
        );
        await resend.emails.send({
          from: process.env.SENDER_EMAIL || "",
          to: user.email,
          subject: "Vérifiez votre adresse e-mail",
          html: emailHtml,
        });
      });
    },
  },
  emailAndPassword: {
    enabled: true,
    async sendResetPassword({ user, url }) {
      after(async () => {
        const emailHtml = await render(ResetPassword({ name: user.name, url }));
        await resend.emails.send({
          from: process.env.SENDER_EMAIL || "",
          to: user.email,
          subject: "Réinitialisez votre mot de passe",
          html: emailHtml,
        });
      });
    },
  },
} satisfies BetterAuthOptions;
