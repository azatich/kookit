import HomePageFooter from "@/components/HomePageFooter";
import HomePageMain from "@/components/HomePageMain";
import Navbar from "@/components/Navbar";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

async function HomePage() {
  const session = await getSession();
  if (!session) redirect("/login");
  return (
    <div className="bg-[#222222] min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <HomePageMain />
        <HomePageFooter />
      </main>
    </div>
  );
}

export default HomePage;
