import { logoutAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

async function Home() {
  const session = await getSession();
  if (!session) redirect("/login");
  return (
    <div>
      Welcome, {session.email}
      <form action={logoutAction}>
        <Button
          variant="outline"
          className="border-red-500 text-red-500 hover:bg-red-50"
        >
          Sign Out
        </Button>
      </form>
    </div>
  );
}

export default Home;
