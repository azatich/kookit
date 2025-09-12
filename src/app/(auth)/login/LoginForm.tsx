"use client";

import { loginAction } from "@/actions/auth";
import SelectLanguage from "@/components/SelectLanguage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const t = useTranslations("LoginPage");

  const errorMessages = {
    "Invalid-credentials": t("ErrorInvalidCredentials"),
  };

  const errorMessage = error
    ? errorMessages[error as keyof typeof errorMessages]
    : null;

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      await loginAction(formData);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="flex justify-between text-3xl font-bold text-gray-800">
            <div>{t("WelcomeBack")}</div>
            <SelectLanguage />
          </CardTitle>
          <p className="text-gray-500 mt-2">{t("SignInToAccount")}</p>
        </CardHeader>
        <CardContent>
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {errorMessage}
            </div>
          )}  

          <form action={handleSubmit} className="space-y-6">
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
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-gray-700">
                  {t("Password")}
                </Label>
                <Link
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  {t("ForgotPassword")}
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="py-5 px-4 text-base rounded-xl text-black"
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full py-6 text-base font-medium bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {t("SigningIn")}
                </div>
              ) : (
                t("SignIn")
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">{t("DoNotHaveAccount")}</span>
            <Link
              href="/signup"
              className="font-semibold text-blue-600 hover:underline"
            >
              {t("SignUp")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
