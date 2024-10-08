import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "../components/Default/Header";
import SideNavbar from "../components/Default/SideNavbar";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} id="root">
        <SideNavbar />
        <Header />
        <main className="ml-[250px] mt-20">{children}</main>
      </body>
    </html>
  );
}
