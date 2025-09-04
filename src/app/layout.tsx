import type { Metadata } from "next";
import "./globals.css";
import connectDb from "@/lib/db";

export const metadata: Metadata = {
  title: "Kookit",
  description: "Cooking app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  await connectDb();

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
