import HomePageFooter from "@/components/HomePageFooter";
import HomePageMain from "@/components/HomePageMain";
import Navbar from "@/components/Navbar";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

async function HomePage() {
  const session = await getSession();
  if (!session) redirect("/login");
  return (
    <div className="bg-[#222222] h-screen flex flex-col">
      <Navbar />
      <HomePageMain />
      <HomePageFooter />
    </div>
  );
}

export default HomePage;
