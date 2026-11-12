
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { db } from "@/prisma/db";
import { verifyPassword } from "@/lib/password";
import { createDatabaseSession } from "@/lib/auth-session";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,

  pages: {
    signIn: "/login",
  },

  // Credentials requires JWT sessions in Auth.js.
  // Our own database session remains authoritative for application access.
  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60,
  },

  providers: [
    Credentials({
      name: "Email and Password",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        const email =
          typeof credentials?.email === "string"
            ? credentials.email.trim().toLowerCase()
            : "";

        const password =
          typeof credentials?.password === "string"
            ? credentials.password
            : "";

        if (!email || !password) return null;

        const user = await db.orm.public.User
          .where({ email })
          .first();

        if (!user || !user.isActive || !user.passwordHash) {
          return null;
        }

        const validPassword = await verifyPassword(
          password,
          user.passwordHash
        );

        if (!validPassword) return null;

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        };
      },
    }),

    Google,
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        let userId = user.id;

        if (account?.provider === "google") {
          const googleProfile = profile as
            | {
                email?: string;
                email_verified?: boolean;
                name?: string;
                picture?: string;
              }
            | undefined;

          const email = googleProfile?.email
            ?.trim()
            .toLowerCase();

          // Only accept verified Google email addresses.
          if (!email || googleProfile?.email_verified !== true) {
            return false;
          }

          let existingUser = await db.orm.public.User
            .where({ email })
            .first();

          if (!existingUser) {
            const fullName =
              googleProfile.name?.trim() || "Google User";

            const nameParts = fullName.split(/\s+/);
            const firstName = nameParts.shift() || "Google";
            const lastName = nameParts.join(" ") || "User";

            existingUser = await db.orm.public.User.create({
              firstName,
              lastName,
              email,
              passwordHash: null,
              role: "CUSTOMER",
              emailVerifiedAt: new Date(),
              profileImage: googleProfile.picture || null,
              isActive: true,
            });
          }

          if (!existingUser.isActive) {
            return false;
          }

          // Link Google sign-in to the existing account by verified email.
          userId = existingUser.id;
        }

        if (!userId) return false;

        // Check the database user is still active.
        const databaseUser = await db.orm.public.User
          .where({ id: userId })
          .first();

        if (!databaseUser || !databaseUser.isActive) {
          return false;
        }

        // Create our own authoritative database session.
        await createDatabaseSession(databaseUser.id);

        return true;
      } catch (error) {
        console.error("Authentication sign-in error:", error);
        return false;
      }
    },
  },
});
