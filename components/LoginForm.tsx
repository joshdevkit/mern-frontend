"use client";

import { Calendar, EyeClosed, EyeOff, Loader } from "lucide-react";
import http, { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import useUser from "@/lib/useUser";
import { SignInFormData } from "@/types.d";
import { useDispatch } from "react-redux";
import { setAuthRole, setAuthUser } from "@/store/authSlice";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Link from "next/link";
import useRole from "@/lib/useRole";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [loadingState, setLoadingState] = useState(false);
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const user = useUser();
  const role = useRole() || "";
  const navigate = useRouter();
  const dispatch = useDispatch();

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingState(true);

    try {
      const response = await http.post("/users/login", formData);
      const user = response.data.data.user;
      dispatch(setAuthUser(user));
      dispatch(setAuthRole(user.role));
    } catch (error: any) {
      if (error.response.data.errors) {
        for (const [fields, message] of Object.entries(
          error.response.data.errors
        )) {
          toast.warning(`${fields.toLocaleUpperCase()} | ${message}`, {
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
    if (user && role) {
      if (role.toString() === "User") {
        navigate.push("/");
      } else if (role.toString() === "Admin") {
        navigate.push("/admin/dashboard");
      }
    }
  }, [user, navigate, role]);

  return (
    <>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <form onSubmit={loginHandler}>
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
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="underline underline-offset-4"
                >
                  Sign up
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  disabled={loadingState}
                  placeholder="mail@example.com"
                  // autoComplete="off"
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
                    // autoComplete="off"
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
              <Button type="submit" className="w-full" disabled={loadingState}>
                {loadingState ? (
                  <Loader className="animate-spin w-5 h-5 text-white dark:text-black" />
                ) : (
                  "Login"
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
              Continue with Google
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
