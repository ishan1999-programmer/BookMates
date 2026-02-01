import { Outlet } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const MainLayout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar participates in layout on desktop */}
      <Sidebar />

      {/* Content */}
      <main className="flex-1 min-w-0">
        {isMobile && (
          <header className="h-14 flex items-center px-2">
            <SidebarTrigger />
          </header>
        )}

        <section className="p-4 md:p-6">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default MainLayout;
