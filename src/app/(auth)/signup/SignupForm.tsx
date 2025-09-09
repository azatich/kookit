"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signUpAction } from "@/actions/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

// interface SignUpPageProps {
//     searchParams?: Promise<{error?: string}>
// }

export default function SignupForm() {
  const [locale, setLocale] = useState<string>("");
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const router = useRouter();
  const t = useTranslations("SignupPage");

  const errorMessages = {
    "email-exists": t("ErrorEmailExists"),
    "invalid-email": t("ErrorInvalidEmail"),
    "weak-password": t("ErrorWeakPassword"),
    "password-mismatch": t("ErrorPasswordMismatch"),
    "missing-fields": t("ErrorMissingFields"),
  };

  const errorMessage = error
    ? errorMessages[error as keyof typeof errorMessages]
    : null;

  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("MYNEXTAPP_LOCALE="))
      ?.split("=")[1];
    if (cookieLocale) {
      setLocale(cookieLocale);
    } else {
      const browserLocale = navigator.language.slice(0, 2);
      setLocale(browserLocale);
      document.cookie = `MYNEXTAPP_LOCALE=${browserLocale};`;
      router.refresh();
    }
  }, [router]);

  const changeLocale = (newLocale: string) => {
    setLocale(newLocale);
    document.cookie = `MYNEXTAPP_LOCALE=${newLocale};`;
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#222222] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border-0 bg-white backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="flex justify-between text-3xl font-bold text-gray-800">
            <div>{t("CreateAccount")}</div>
            <div className="flex gap-2 text-lg">
              <button
                onClick={() => changeLocale("en")}
                className={`border border-black px-2 rounded-md ${
                  locale === "en" && "bg-black text-white"
                }`}
              >
                en
              </button>
              <button
                onClick={() => changeLocale("ru")}
                className={`border border-black px-2 rounded-md ${
                  locale === "ru" && "bg-black text-white"
                }`}
              >
                ru
              </button>
              <button
                onClick={() => changeLocale("kz")}
                className={`border border-black px-2 rounded-md ${
                  locale === "kz" && "bg-black text-white"
                }`}
              >
                kz
              </button>
            </div>
          </CardTitle>
          <p className="text-gray-500 mt-2">{t("SignUpToGetStarted")}</p>
        </CardHeader>
        <CardContent>
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {errorMessage}
            </div>
          )}

          <form action={signUpAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                {t("EmailAddress")}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="py-5 px-4 text-base rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                {t("Password")}
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                minLength={6}
                className="py-5 px-4 text-base rounded-xl"
              />
              <p className="text-xs text-gray-500 mt-1">
                {t("PasswordRequirement")}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700">
                {t("ConfirmPassword")}
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="••••••••"
                minLength={6}
                className="py-5 px-4 text-base rounded-xl"
              />
            </div>

            <Button
              type="submit"
              className="w-full py-6 text-base font-medium bg-gradient-to-r from-[#FF7A00] to-orange-600 hover:bg-orange-900 text-white rounded-xl shadow-lg transition-all"
            >
              {t("CreateAccountButton")}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">{t("AlreadyHaveAccount")} </span>
            <Link
              href="/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              {t("SignIn")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
