"use client";
import MainNav from "@/components/MainNav";
import MobileNav from "@/components/MobileNav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Sun, Check, X, Moon } from "lucide-react";
import { useTheme } from "next-themes";

import useUser from "@/lib/useUser";
import http from "@/lib/utils";
import { setAuthUser } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { toast } from "sonner";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export default function GuestLayout({ children }: { children: ReactNode }) {
  const { setTheme } = useTheme();

  const user = useUser();
  const navigate = useRouter();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await http.post("/users/logout");
    dispatch(setAuthUser(null));
    navigate.push("/auth/login");
    toast.success("Logged Out Successfully");
  };

  useEffect(() => {
    if (!user) {
      navigate.push("/auth/login");
    }
  }, [user, navigate]);

  return (
    <>
      <header
        className="sticky top-0 w-full text-gray-800 dark:text-gray-200 
        bg-white/30 dark:bg-gray-950/30 
        backdrop-blur-md 
        border-b border-gray-100 z-10"
      >
        <div className="h-14 container flex items-center">
          <MainNav />
          <MobileNav />
          <h1 className="flex items-center justify-end flex-1"></h1>
          <>
            <div className="relative flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="relative inline-block">
                    <Avatar className="cursor-pointer ml-3 text-black">
                      <AvatarFallback className="font-bold uppercase">
                        <p className="dark:text-gray-100">
                          {user?.fullname
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .toUpperCase()}
                        </p>
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 z-50">
                      {user?.isVerified ? (
                        <Check size={12} className="text-green-500" />
                      ) : (
                        <X size={12} className="text-red-500" />
                      )}
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48" align="end">
                  {!user?.isVerified && (
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => navigate.push("/auth/verify")}
                    >
                      Verify Account
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => navigate.push("/user/profile")}
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => navigate.push("/user/change-password")}
                  >
                    Change Password
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="relative flex items-center ml-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        </div>
      </header>
      {children}
    </>
  );
}
