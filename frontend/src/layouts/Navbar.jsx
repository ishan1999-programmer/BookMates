import React from "react";
import { BookOpen, Search, Bell, MessageCircle, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const isMobile = useIsMobile();
  return (
    <div className="bg-background border-b border-border h-16 w-screen p-4 lg:px-6 sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 flex items-center justify-between">
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
          <div className="search-bar relative">
            <Search className="absolute left-2 top-1/4 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={isMobile ? "Search..." : "Search users..."}
              className={`pl-9 pr-8 ${
                isMobile ? "w-32" : "w-48 lg:w-64"
              } h-9 bg-muted/50`}
            />
          </div>
          <Button variant="default" className="px-3 py-2 h-auto">
            <Link to="/post">
              <span className="text-primary-foreground font-medium">
                + Post
              </span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-accent"
          >
            <Bell
              className={`${isMobile ? "h-4 w-4" : "h-6 w-6"} text-primary`}
            />{" "}
            <Badge
              variant="destructive"
              className="absolute -top-2 left-4 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              5
            </Badge>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-accent"
          >
            <User
              className={`${isMobile ? "h-4 w-4" : "h-6 w-6"} text-primary`}
            />{" "}
            <Badge
              variant="destructive"
              className="absolute -top-2 left-4 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              5
            </Badge>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
