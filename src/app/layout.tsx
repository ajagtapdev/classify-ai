import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
 


export const metadata = {
  title: "Classify",
  description: "Classify.ai",
  icons: {
  icon: "/favicon.ico",
  },
 
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY} appearance={{
      layout: {
        unsafe_disableDevelopmentModeWarnings: true,
      },
    }}>
    <html lang="en">
      <body>{children}</body>
    </html>
    </ClerkProvider>
  );
}
