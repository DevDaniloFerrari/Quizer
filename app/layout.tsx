import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/data/context/AuthContext";
import { CookiesProvider } from "next-client-cookies/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quizer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CookiesProvider>
          <AuthProvider>{children}</AuthProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
