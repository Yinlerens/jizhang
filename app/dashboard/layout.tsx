import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import IdentifyUser from "@/components/providers/IdentifyUser";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    redirect("/login");
  }
  return (
    <div className="anime-app-shell flex h-screen overflow-hidden">
      {/* 统一用户识别：同步 PostHog + Sentry */}
      <IdentifyUser userId={user.id} email={user.email ?? ''} />

      {/* PC Sidebar */}
      <div className="hidden md:flex">
        <Sidebar user={user} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="anime-main-scroll flex-1 overflow-y-auto pb-20 md:pb-0">{children}</main>

        {/* Mobile Bottom Nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
          <MobileNav />
        </div>
      </div>
    </div>
  );
}
