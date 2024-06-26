import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { signInEmailPassword } from "@/auth"

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    GitHub,
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "usuario@email.com" },
        password: { label: "Password", type: "password", placeholder: "********" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = await signInEmailPassword(credentials!.email, credentials!.password)

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log({ user })
      return true
    },
    async jwt({ token, user, account, profile }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email ?? "no-email" },
      })

      if (dbUser?.isActive === false) {
        throw new Error("Usuario no activo")
      }

      token.roles = dbUser?.roles ?? ["no-roles"]
      token.id = dbUser?.id ?? "no-uuid"
      return token
    },

    async session({ session, token, user }) {
      console.log({ token })
      if (session && session.user) {
        session.user.roles = token.roles
        session.user.id = token.id
      }
      return session
    },
  },
})

export const { GET, POST } = handlers
