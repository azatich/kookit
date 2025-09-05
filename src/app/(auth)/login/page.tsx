import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

interface LoginPageProps {
  searchParams?: { error?: string };
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await getSession();
  if (session) redirect("/home");

  return <LoginForm searchParams={searchParams} />;
}
