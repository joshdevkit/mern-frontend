"use client";
import GuestLayout from "@/app/page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useUser from "@/lib/useUser";
import http from "@/lib/utils";
import { setAuthUser } from "@/store/authSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label, Separator } from "@radix-ui/react-dropdown-menu";
import { Check, Edit, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import Link from "next/link";
import { UpdateUser } from "@/types.d";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useUser();
  const [userDetails, setUserDetails] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useRouter();

  const [formData, setFormData] = useState<UpdateUser>({
    contactNo: "",
    address: "",
    gender: "",
    avatar: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await http.get("/users/current-user");
        const userData = response.data.data.user;
        setUserDetails(userData);
        setFormData({
          contactNo: userData.contactNo || "",
          address: userData.address || "",
          gender: userData.gender || "",
          avatar: userData.avatar || "",
        });
        dispatch(setAuthUser(userData));
      } catch (error) {
        console.error("Error fetching current user:", error);
        navigate.push("/auth/signin");
      }
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (!user) {
      navigate.push("/auth/signin");
      return;
    }
  }, [user, navigate]);

  const handleCancelChanges = () => {
    setFormData({
      contactNo: userDetails?.contactNo || "",
      address: userDetails?.address || "",
      gender: userDetails?.gender || "",
      avatar: userDetails?.avatar || "",
    });
    setIsEditing(false);
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await http.post("/users/update-profile", formData);
      toast.success(response.data.message, {
        duration: 3000,
      });
    } catch (error: any) {
      toast.warning(error, {
        duration: 3000,
      });
    }

    setIsEditing(false);
  };

  return (
    <GuestLayout>
      <div className="container mx-auto p-8">
        <div className="flex justify-center">
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
              <div className="space-y-4">
                <div>
                  <Label className="text-sm">Email</Label>
                  <Input
                    type="email"
                    value={userDetails?.email || ""}
                    disabled={!!userDetails?.isVerified}
                    className="mt-2"
                  />
                  {userDetails?.isVerified && (
                    <p className="text-xs ">
                      You are not allowed to update your email once verified.
                      <span className="text-blue-600">
                        <Link href="/terms-and-conditions"> Know more.</Link>
                      </span>
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-sm">Phone Number</Label>
                  <Input
                    type="tel"
                    name="contactNo"
                    value={formData.contactNo || userDetails?.contactNo || ""}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    disabled={!isEditing}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-sm">Address</Label>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address || userDetails?.address || ""}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    disabled={!isEditing}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-sm">Gender</Label>
                  <Select
                    disabled={!isEditing}
                    name="gender"
                    value={formData.gender || userDetails?.gender || ""}
                    onValueChange={(value) =>
                      setFormData({ ...formData, gender: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="my-4" />

                <div className="flex space-x-4">
                  <Button
                    onClick={() => {
                      if (isEditing) {
                        handleCancelChanges();
                      }
                      setIsEditing(!isEditing);
                    }}
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
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </GuestLayout>
  );
};

export default Profile;
