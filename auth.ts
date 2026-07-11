import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
    }
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const adminUser = process.env.ADMIN_USERNAME || "admin"
        const adminPassword = process.env.ADMIN_PASSWORD || "password"

        if (
          credentials?.username === adminUser &&
          credentials?.password === adminPassword
        ) {
          return { id: "1", name: "Admin" }
        }

        return null
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnAdmin = nextUrl.pathname.startsWith("/admin")
      if (isOnAdmin) {
        if (isLoggedIn) return true
        return false // Redirect to login
      }
      return true
    },
    jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token }: { session: any, token: any }) {
      session.user = token.user;
      return session;
    },
  },
})
