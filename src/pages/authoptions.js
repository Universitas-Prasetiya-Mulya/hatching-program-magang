import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  const { session } = pageProps;

  return (
    <SessionProvider
      options={{ site: process.env.NEXTAUTH_URL }}
      session={session}
    >
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
