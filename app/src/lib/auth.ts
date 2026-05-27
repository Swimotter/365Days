import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { sendEmail } from "@/lib/email";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL!,
  secret: process.env.BETTER_AUTH_SECRET!,

  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      users: schema.users,
      accounts: schema.accounts,
      sessions: schema.sessions,
      verifications: schema.verifications,
    },
    usePlural: true,
  }),

  // Used so users can set a password during onboarding
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    sendResetPassword: async ({ user, url, token }, request) => {
      sendEmail({
        to: user.email,
        subject: "Reset your 365Days password",
        html: `<a href="${url}">Click here to reset your password</a>`,
      });
    },
  },

  // Primary authentication method
  plugins: [
    magicLink({
      expiresIn: 60 * 60, // 1 hour
      sendMagicLink: async ({ email, url }) => {
        sendEmail({
          to: email,
          subject: "Your 365 Days signup link",
          html: `<a href="${url}">Click here to verify your email and continue</a>`,
        });
      },
    }),
  ],

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    // TODO: revisit when further into production
    // apple: {
    //   clientId: process.env.APPLE_CLIENT_ID!,
    //   clientSecret: process.env.APPLE_CLIENT_SECRET!,
    // },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },

  user: {
    additionalFields: {
      displayName: {
        type: "string",
        required: false,
        input: true,
      },
      onboardingComplete: {
        type: "boolean",
        defaultValue: false,
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
