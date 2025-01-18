"use client";
import { useState } from "react";
import { toast } from "sonner";
import http from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GuestLayout from "@/app/page";
import { Button } from "@/components/ui/button";
import { UpdatePassword } from "@/types.d";

export default function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<UpdatePassword>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await http.post("/users/change-password", formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.errors &&
        error.response.data.error.errors.password
      ) {
        toast.error(error.response.data.error.errors.password.message);
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <GuestLayout>
      <div className="container mx-auto p-8">
        <div className="flex justify-center">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <h2 className="text-2xl font-semibold">Change Password</h2>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <div className="mb-4">
                  <Label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-neutral-950 dark:text-gray-50"
                  >
                    Current Password
                  </Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="mt-1 w-full"
                  />
                </div>

                <div className="mb-4">
                  <Label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-neutral-950 dark:text-gray-50"
                  >
                    New Password
                  </Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="mt-1 w-full"
                  />
                </div>

                <div className="mb-0">
                  <Label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-neutral-950 dark:text-gray-50"
                  >
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="mt-1 w-full"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" type="submit" disabled={loading}>
                  {loading ? "Changing..." : "Update Password"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </GuestLayout>
  );
}
