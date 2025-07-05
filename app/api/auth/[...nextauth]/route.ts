
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface User {
    employeeId?: string;
    userId?: string;
    shop: string;
    needPasswordChange?: boolean;
    phone?: string;
    isPaid?: boolean;
  }
}

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET, // ✅ Secret ekhane use korchi

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        role: { label: "Role", type: "text" },
        email: { label: "Email", type: "email" },
        employeeId: { label: "Employee ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        let loginUrl = "";
        let loginPayload: Record<string, string> = {};

        if (credentials.role === "company") {
          loginUrl = `http://localhost:5001/api/v1/auth/login`;
          loginPayload = {
            email: credentials.email,
            password: credentials.password,
          };
        } else if (credentials.role === "employee") {
          loginUrl = `http://localhost:5001/api/v1/auth/employee-login`;
          loginPayload = {
            employeeId: credentials.employeeId,
            password: credentials.password,
          };
        } else {
          return null;
        }

        try {
          const res = await fetch(loginUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginPayload),
          });

          const data = await res.json();

          if (res.ok && data.success && data.data?.accessToken) {
            const accessToken = data.data.accessToken;

            if (credentials.role === "company") {
              const user = data.data.user;
              return {
                role: user.role,
                accessToken,
                ...user,
              };
            }

            if (credentials.role === "employee") {
              const employee = data.data.employee;
              return {
                role: "employee",
                accessToken,
                ...employee,
                needPasswordChange: data.data.needPasswordChange,
              };
            }
          }

          return null;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
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
        token.role = user.role;

        console.log(token);

        if (user.role === "company_admin" || user.role === "company") {
          token.user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            image: user.image ?? null,
            isVerified: user.isVerified,
            isShopCreated: user.isShopCreated,
            employeeCount: user.employeeCount,
              isPaid: user.isPaid, // ✅ add this line
            shop: user.shop,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          };
        }

        if (user.role === "employee") {
          token.user = {
            id: user._id,
            employeeId: user.employeeId,
            email: user.email,
            userId: user.userId,
            shop: user.shop,
            needPasswordChange: user.needPasswordChange,
            role: "employee",
          };
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      (session.user as { role: string }).role = token.role as string;
      return session;
    },
  },

  pages: {
    signIn: "/login", // custom login page
  },
});

export { handler as GET, handler as POST };
