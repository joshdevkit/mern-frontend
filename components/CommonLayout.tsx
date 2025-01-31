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

import { Sun, Check, X, Moon, ArrowBigRight } from "lucide-react";
import { useTheme } from "next-themes";

import useUser from "@/lib/useUser";
import http from "@/lib/utils";
import { setAuthRole, setAuthUser } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { ReactNode } from "react";

type CommonLayoutProps = {
  children: ReactNode;
};

const CommonLayout = ({ children }: CommonLayoutProps) => {
  const { setTheme } = useTheme();

  const user = useUser();
  const navigate = useRouter();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await http.post("/users/logout");
    dispatch(setAuthUser(null));
    dispatch(setAuthRole(null));
    navigate.push("/");
    toast.success("Logged Out Successfully");
  };

  return (
    <>
      <header
        className="sticky top-0 w-full text-gray-800 dark:text-gray-200 
        bg-white/30 dark:bg-gray-950/30 
        backdrop-blur-md 
        border-b border-gray-200 z-10 
        "
      >
        <div className="h-14 container flex items-center">
          <MainNav />
          <MobileNav />
          <h1 className="flex items-center justify-end flex-1"></h1>
          <>
            {user ? (
              <div className="relative flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="relative inline-block">
                      <Avatar className="cursor-pointer ml-3 text-black">
                        <AvatarFallback className="font-bold uppercase">
                          <p className="dark:text-gray-100">
                            {user.fullname
                              .split(" ")
                              .map((word: any) => word[0])
                              .join("")
                              .toUpperCase()}
                          </p>
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 z-50">
                        {user.isVerified ? (
                          <Check size={12} className="text-green-500" />
                        ) : (
                          <X size={12} className="text-red-500" />
                        )}
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48" align="end">
                    {!user.isVerified && (
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
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => navigate.push("/user/change-password")}
                    >
                      Change Password
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => navigate.push("/user/change-password")}
                    >
                      My Appointments
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
            ) : (
              <Button
                onClick={() => navigate.push("/auth/signup")}
                className="px-4 py-2 text-white rounded-md hover:bg-neutral-700"
              >
                <ArrowBigRight className="w-6 h-6 rounded-lg border border-gray-100 dark:bg-neutral-900 dark:text-gray-50" />
                Get Started
              </Button>
            )}

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
      <div>{children}</div>
    </>
  );
};

export default CommonLayout;
