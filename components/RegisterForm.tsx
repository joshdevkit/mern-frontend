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
import { Calendar, EyeClosed, EyeOff, Loader, MonitorUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { setAuthUser } from "@/store/authSlice";
import { SignupFormData } from "@/types.d";
import useUser from "@/lib/useUser";
import { toast } from "sonner";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const user = useUser();
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [loadingState, setLoadingState] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
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
    } catch (error: any) {
      if (error.response.data.error) {
        for (const [fields, errorDetails] of Object.entries(
          error.response.data.error.errors
        )) {
          const errorMessage =
            (errorDetails as { message?: string }).message ||
            "Something went wrong.";
          toast.warning(`${fields.toLocaleUpperCase()} | ${errorMessage}`, {
            duration: 3000,
          });
        }
      } else {
        toast.warning(error.response.data.message || "Something went wrong.");
      }
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
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <form onSubmit={handleSignup}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <a
                href="/"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md">
                  <Calendar className="size-6" />
                </div>
                <span className="sr-only">Dental Inc.</span>
              </a>
              <h1 className="text-xl font-bold">Welcome to Dental Inc.</h1>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4"
                >
                  Login
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Name</Label>
                <Input
                  id="fullname"
                  type="text"
                  name="fullname"
                  onChange={handleChange}
                  disabled={loadingState}
                  placeholder="John Doe"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  disabled={loadingState}
                  placeholder="mail@example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    disabled={loadingState}
                    placeholder="Password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
                  >
                    {showPassword ? <EyeOff /> : <EyeClosed />}
                  </button>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    onChange={handleChange}
                    disabled={loadingState}
                    placeholder="Confirm Password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPassword}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff /> : <EyeClosed />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loadingState}>
                {loadingState ? (
                  <Loader className="animate-spin w-5 h-5 text-white dark:text-black" />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>

            <div className="relative flex items-center text-sm text-muted-foreground">
              <div className="flex-grow border-t border-border"></div>
              <span className="px-1">Or</span>
              <div className="flex-grow border-t border-border"></div>
            </div>

            <Button variant="outline" className="w-full mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Signup with Google
            </Button>
          </div>
        </form>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </>
  );
}
