import { Outlet } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import Navbar from "./Navbar";

const MainLayout = () => {
  const isMobile = useIsMobile();

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex">
        <Sidebar />
        <main className="flex-1 min-w-0">
          {isMobile && (
            <header className="h-14 px-2">
              <SidebarTrigger />
            </header>
          )}
          <section className="p-5 md:p-6">
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
