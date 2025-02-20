import type { Metadata } from "next";
import { Fira_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const firaMono = Fira_Mono({
  variable: "--font-fira-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});

export const metadata: Metadata = {
  title: "Si Her Site Publisher",
  description: "Si Her Site Publisher"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${firaMono.variable} ${dmSans.variable} font-fira-mono antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
