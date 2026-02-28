import { BookOpen, Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import NotificationButton from "@/features/notification/components/NotificationButton";
import FollowRequestButton from "@/features/follow/components/FollowRequestButton";
import SearchUsers from "@/features/user/components/SearchUsers";

const Navbar = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  return (
    <div className="bg-background border-b border-border h-16 w-screen p-4 lg:px-6 sticky top-0 z-40">
      <div className="px-4 flex items-center justify-between">
        <div className="flex gap-2">
          <BookOpen
            className={`${isMobile ? "h-6 w-6" : "h-8 w-8"} text-primary`}
          />
          <p
            className={`font-bold ${
              isMobile ? "text-lg" : "text-xl"
            } text-primary`}
          >
            BookMates
          </p>
        </div>
        <div className="navbar-content-right flex items-center gap-3">
          <SearchUsers/>
          <Button
            onClick={() => navigate("/add-post")}
            variant="default"
            className="px-3 py-2 h-auto"
          >
            <span className="text-primary-foreground font-medium">+ Post</span>
          </Button>

          <NotificationButton />
          <FollowRequestButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
