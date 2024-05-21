import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maka's Happy Quotes",
  description: "A collection of happy quotes to brighten your day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
  <meta name="google-adsense-account" content="ca-pub-2703801215592351" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
