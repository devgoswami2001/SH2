
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
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        // You can add logic here to check if the user is in your database,
        // or create a new user entry.
        return true; 
      }
      return false; 
    },
    async redirect({ url, baseUrl }) {
      // Allows redirecting to the job feed page after sign in.
      return `${baseUrl}/job-feed`;
    },
    async session({ session, token, user }) {
      // You can add user id or role to the session token here.
      return session
    }
  },
  pages: {
    signIn: '/login',
    // You can add other custom pages here if needed, e.g., error: '/auth/error'
  }
})

export { handler as GET, handler as POST }
