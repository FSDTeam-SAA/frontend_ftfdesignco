import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXTAUTH_PUBLIC_API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const data = await res.json();

        if (res.ok && data?.success && data?.data?.accessToken) {
          return {
            accessToken: data.data.accessToken,
            ...data.data.user, // spread user fields directly
          };
        }

        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
          isVerified: user.isVerified,
          isShopCreated: user.isShopCreated,
          employeeCount: user.employeeCount,
          shop: user.shop,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },

  pages: {
    signIn: "/login", // optional
  },
});

export { handler as GET, handler as POST };
