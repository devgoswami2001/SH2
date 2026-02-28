
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      // Capture the id_token from the Google account
      if (account) {
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }: any) {
      // Pass the id_token to the client-side session
      session.idToken = token.idToken;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Stay on the same domain
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  },
  pages: {
    signIn: '/login',
  }
})

export { handler as GET, handler as POST }
