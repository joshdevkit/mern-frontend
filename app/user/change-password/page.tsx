"use client";
import { useState } from "react";
import { toast } from "sonner"; // Assuming you are using this for notifications
import http from "@/lib/utils"; // Assuming this is where your API calls are made
import { API_URL } from "@/server"; // Assuming the API URL is stored here
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card"; // Assuming these are the Card components from ShadCN
import { Input } from "@/components/ui/input"; // Assuming ShadCN's Input component
import { Label } from "@/components/ui/label"; // Assuming ShadCN's Label component
import GuestLayout from "@/app/page";
import { Button } from "@/components/ui/button";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    setLoading(true);

    try {
      // Replace with your actual API endpoint
      const response = await http.post(`${API_URL}/users/change-password`, {
        currentPassword,
        newPassword,
      });

      // Handle success
      toast.success("Password changed successfully!");
      // Reset the form or redirect as needed
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      // Handle error
      toast.error(
        error.response?.data?.message || "Failed to change password."
      );
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
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <Label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Current Password
                  </Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="mt-1 w-full"
                    required
                  />
                </div>

                <div className="mb-4">
                  <Label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 w-full"
                    required
                  />
                </div>

                <div className="mb-0">
                  <Label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 w-full"
                    required
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? "Changing..." : "Update Password"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </GuestLayout>
  );
}
