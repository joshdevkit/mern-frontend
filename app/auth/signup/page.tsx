"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import http, { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { useDispatch } from "react-redux";
import { Loader, MonitorUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { setAuthUser } from "@/store/authSlice";
import { SignupFormData } from "@/types.d";
import useUser from "@/lib/useUser";
import { toast } from "sonner";

export default function SignUp() {
  const user = useUser();
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [loadingState, setLoadingState] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState<SignupFormData>({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingState(true);

    try {
      const response = await http.post("/users/signup", formData);
      const user = response.data.data.user;
      dispatch(setAuthUser(user));
      navigate.push("/auth/verify");
      setFormErrors({});
    } catch (error: any) {
      const errorData = error.response?.data?.error?.errors;

      if (errorData) {
        Object.keys(errorData).forEach((key) => {
          const message = errorData[key]?.message;
          if (message) {
            toast.warning(`${message}`, {
              duration: 3000,
            });
          }
        });

        const newFormErrors: { [key: string]: string } = {};
        Object.keys(errorData).forEach((key) => {
          newFormErrors[key] = errorData[key]?.message || "";
        });
        setFormErrors(newFormErrors);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.error("Error:", error);
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    if (user && user.isVerified) {
      navigate.push("/");
    }
  }, [user, navigate]);

  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <form onSubmit={handleSignup} className="w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="flex gap-3">
                <MonitorUp /> Signup
              </CardTitle>
              <CardDescription>
                Signup for the first time? You will see the magic of NEXTjs
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label>Name</Label>
                <Input
                  type="text"
                  name="fullname"
                  placeholder="Complete Name"
                  value={formData.fullname}
                  onChange={handleChange}
                  disabled={loadingState}
                  className={formErrors.fullname ? "border-red-500" : ""}
                />
                {formErrors.fullname && (
                  <p className="text-red-500 text-sm">{formErrors.fullname}</p>
                )}
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loadingState}
                  className={formErrors.email ? "border-red-500" : ""}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm">{formErrors.email}</p>
                )}
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loadingState}
                  className={formErrors.password ? "border-red-500" : ""}
                />
                {formErrors.password && (
                  <p className="text-red-500 text-sm">{formErrors.password}</p>
                )}
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loadingState}
                  className={formErrors.confirmPassword ? "border-red-500" : ""}
                />
                {formErrors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {formErrors.confirmPassword}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={loadingState}>
                {loadingState ? (
                  <Loader className="animate-spin" size={20} />
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
            <CardFooter className="justify-center text-center">
              <h1>
                Already have an account?
                <Link href="/auth/signin">
                  <span className="text-blue-600 cursor-pointer"> Login</span>
                </Link>
              </h1>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
}
