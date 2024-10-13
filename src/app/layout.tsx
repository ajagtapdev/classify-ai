import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";


export const metadata = {
  title: "Classify",
  description: "Classify.ai",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body >{children}</body>
    </html>
    </ClerkProvider>
  );
}
