import NextAuth from "next-auth";
import AzureAdProvider from "next-auth/providers/azure-ad";
import { setCookie } from "nookies";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const nextAuthOptions = (req, res) => {
  return {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      AzureAdProvider({
        clientId: process.env.AZURE_AD_CLIENT_ID,
        clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
        tenantId: process.env.AZURE_AD_TENANT_ID,
        authorization: { params: { scope: "openid profile user.Read email" } },
      }),
    ],

    session: {
      strategy: "jwt",
      maxAge: 2 * 24 * 60 * 60,
    },
    jwt: {
      maxAge: 2 * 24 * 60 * 60,
    },

    callbacks: {
      async session({ session, token, user }) {
        const response = await fetch(`${API_URL}/login`, {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token.accessToken}`,
          },
        });
        const postData = await response.json();
        console.log("data", postData?.data);
        session.data = postData;
        const res_code = postData.meta?.code;
        const azureToken = token.accessToken;
        if (res_code === 200) {
          const nameData = postData.data?.nameData;
          const nikData = postData.data?.nikData;
          const rolesData = postData.data?.rolesData;
          const access_token = postData.data?.access_token;
          setCookie({ res }, "lst", access_token, {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            maxAge: 2 * 24 * 60 * 60,
          });
          setCookie({ res }, "azt", azureToken, {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            maxAge: 2 * 24 * 60 * 60,
          });
          session.authSuccess = true;
          session.name = nameData;
          session.nik = nikData;
          session.roles = rolesData;
          session.accessToken = access_token;
        } else {
          session.authSuccess = false;
        }
        session.user.id = token.id;
        session.azureToken = azureToken;
        return session;
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        if (user) {
          token.id = user.id;
        }
        if (account) {
          token.accessToken = account.access_token;
        }
        return token;
      },
    },

    pages: {
      signIn: "/login",
      signOut: "/login",
    },
  };
};

export default (req, res) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};
