import { BookOpen, Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import NotificationButton from "@/features/notification/components/NotificationButton";
import FollowRequestButton from "@/features/follow/components/FollowRequestButton";
import SearchUsers from "@/features/user/components/SearchUsers";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background border-b border-border h-16 w-screen sticky top-0 z-40">
      <div className="px-4 lg:px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-primary" />

          <p className="hidden sm:block font-bold text-primary text-xl">BookMates</p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div >
            <SearchUsers />
          </div>

          {/* Add Post */}
          <Button
            onClick={() => navigate("/add-post")}
            className="px-2 sm:px-3 h-9"
          >
            <span className="hidden sm:inline">+ Post</span>
            <span className="sm:hidden text-lg">+</span>
          </Button>

          <NotificationButton />
          <FollowRequestButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
