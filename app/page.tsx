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
import useUser from "@/lib/useUser";
import http from "@/lib/utils";
import { API_URL } from "@/server";
import { setAuthUser } from "@/store/authSlice";
import { Check, X, Edit, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { ReactNode } from "react";

export default function GuestLayout({ children }: { children: ReactNode }) {
  const user = useUser();
  const navigate = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    await http.post(`${API_URL}/users/logout`);
    dispatch(setAuthUser(null));
    navigate.push("/auth/signin");
    toast.success("Logged Out Successfully");
  };

  useEffect(() => {
    if (!user) {
      navigate.push("/auth/signin");
    }
  }, [user, navigate]);

  return (
    <>
      <header className="w-full border-b text-gray-800 shadow-lg">
        <div className="h-14 container flex items-center">
          <MainNav />
          <MobileNav />
          <h1 className="flex items-center justify-end flex-1">MERN</h1>
          <>
            <div className="relative flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer ml-3 text-black">
                    <AvatarFallback className="font-bold uppercase">
                      {user?.fullname
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                    <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 z-50">
                      {user?.isVerified ? (
                        <Check size={12} className="text-green-500" />
                      ) : (
                        <X size={12} className="text-red-500" />
                      )}
                    </div>
                  </Avatar>
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
          </>
        </div>
      </header>
      {children}
    </>
  );
}
