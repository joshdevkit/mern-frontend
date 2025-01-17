"use client";
import GuestLayout from "@/app/page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useUser from "@/lib/useUser";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Label, Separator } from "@radix-ui/react-dropdown-menu";
import { Check, Edit, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Profile = () => {
  const user = useUser(); // get current user data
  const [userDetails, setUserDetails] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useRouter();

  useEffect(() => {
    if (!user) {
      navigate.push("/auth/signin");
    }
  }, [user, navigate]);

  const handleSaveChanges = () => {
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  return (
    <GuestLayout>
      <div className="container mx-auto p-8">
        <div className="flex justify-center">
          {/* Profile Card */}
          <Card className="w-full max-w-2xl bg-white shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="flex flex-col space-y-2">
                  <CardTitle className="text-lg font-semibold">
                    {user?.fullname}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      Joined:{" "}
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                    {user?.isVerified ? (
                      <Check size={16} className="text-green-500" />
                    ) : (
                      <span className="text-red-500">Not Verified</span>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Profile Information */}
              <div className="space-y-4">
                <div>
                  <Label className="text-sm">Email</Label>
                  <Input
                    type="email"
                    value={userDetails?.email || ""}
                    readOnly={!isEditing}
                    disabled={!isEditing}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-sm">Phone Number</Label>
                  <Input
                    type="text"
                    // value={userDetails?.phone || ""}
                    // readOnly={!isEditing}
                    // disabled={!isEditing}
                    className="mt-2"
                  />
                </div>

                {/* Separator */}
                <Separator className="my-4" />

                {/* Actions */}
                <div className="flex space-x-4">
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    <Edit className="mr-2" />
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                  {isEditing && (
                    <Button
                      onClick={handleSaveChanges}
                      className="w-full sm:w-auto"
                    >
                      Save Changes
                    </Button>
                  )}
                </div>

                <Separator className="my-4" />

                {/* Change Password Action */}
                <div className="flex justify-end">
                  <Button
                    onClick={() => navigate.push("/user/change-password")}
                    variant="ghost"
                    className="text-blue-500"
                  >
                    <Lock className="mr-2" />
                    Change Password
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </GuestLayout>
  );
};

export default Profile;
