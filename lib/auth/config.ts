import prisma from "@/lib/prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI, twoFactor } from "better-auth/plugins";
import { APP_NAME } from "@/lib/constants";
import { BetterAuthOptions } from "better-auth";
import { betterAuth } from "better-auth";

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
  user: {
    changeEmail: {
      enabled: true,
    },
    deleteUser: {
      enabled: true,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  plugins: [
    openAPI(),
    twoFactor({
      issuer: APP_NAME,
    }),
  ],
  //   socialProviders: {
  //     github: {
  //       clientId: process.env.GITHUB_CLIENT_ID as string,
  //       clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  //     },
  //   },
} satisfies BetterAuthOptions;

export const auth = betterAuth(authConfig);
