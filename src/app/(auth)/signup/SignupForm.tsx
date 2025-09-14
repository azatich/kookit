"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signUpAction } from "@/actions/auth";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import SelectLanguage from "@/components/SelectLanguage";
import { useState, useTransition } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [isPending, startTransition] = useTransition();
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

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      await signUpAction(formData);
    });
  };

  return (
    <div className="min-h-screen bg-[#222222] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border-0 bg-white backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="flex justify-between text-3xl font-bold text-gray-800">
            <div>{t("CreateAccount")}</div>
            <SelectLanguage />
          </CardTitle>
          <p className="text-gray-500 mt-2">{t("SignUpToGetStarted")}</p>
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
                className="py-5 px-4 text-base rounded-xl text-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                {t("Password")}
              </Label>
              <div className="flex items-center">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  minLength={6}
                  className="py-5 px-4 text-base rounded-xl text-black focus:ring-0 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className=""
                >
                  {showPassword ? <EyeOffIcon className="w-5 h-5 text-gray-500" /> : <EyeIcon className="w-5 h-5 text-gray-500" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {t("PasswordRequirement")}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700">
                {t("ConfirmPassword")}
              </Label>
              <div className="flex items-center">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  minLength={6}
                  className="py-5 px-4 text-base rounded-xl text-black"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className=""
                >
                  {showConfirmPassword ? <EyeOffIcon className="w-5 h-5 text-gray-500" /> : <EyeIcon className="w-5 h-5 text-gray-500" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-6 text-base font-medium bg-gradient-to-r from-[#FF7A00] to-orange-600 hover:bg-orange-900 text-white rounded-xl shadow-lg transition-all"
            >
              {isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {t("CreatingAccount")}
                </div>
              ) : (
                t("CreateAccountButton")
              )}
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
