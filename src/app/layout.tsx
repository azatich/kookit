import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import connectDb from "@/lib/db";
import { getLocale, getMessages } from "next-intl/server";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Kookit",
  description: "Cooking app",
};

const inter = Inter({subsets: ['latin'], weight: ['400', '700']})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connectDb();
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
