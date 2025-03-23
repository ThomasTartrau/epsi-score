import prisma from "@/lib/prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { magicLink } from "better-auth/plugins";
import { APP_NAME } from "@/lib/constants";
import { BetterAuthOptions } from "better-auth";
import { betterAuth } from "better-auth";
import { render } from "@react-email/render";
import MagicLinkEmail from "@/components/email/magic-link";
import { Resend } from "resend";
export const authConfig = {
  appName: APP_NAME,
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL || ""],
  logger: {
    disabled: process.env.NODE_ENV === "production",
    level: "debug",
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  session: {
    freshAge: 0,
    expiresIn: 60 * 60 * 24 * 3, // 3 days
    updateAge: 60 * 60 * 12, // 12 hours (every 12 hours the session expiration is updated)
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },
  plugins: [
    magicLink({
      /* eslint-disable @typescript-eslint/no-unused-vars */
      sendMagicLink: async ({ email, token, url }, request) => {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const emailHtml = await render(MagicLinkEmail({ url }));
        await resend.emails.send({
          from: process.env.SENDER_EMAIL || "",
          to: email,
          subject: "Connexion à votre compte",
          html: emailHtml,
        });
      },
    }),
  ],
} satisfies BetterAuthOptions;

export const auth = betterAuth(authConfig);
