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
import { Label } from "@/components/ui/label";
import http, { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useUser from "@/lib/useUser";
import { SignInFormData } from "@/types.d";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/store/authSlice";
import { toast } from "sonner";

const Signin = () => {
  const [loadingState, setLoadingState] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
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
  const navigate = useRouter();
  const dispatch = useDispatch();

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingState(true);
    setFormErrors({});

    try {
      const response = await http.post("/users/login", formData);
      const user = response.data.data.user;
      dispatch(setAuthUser(user));
      navigate.push("/");
    } catch (error: any) {
      console.log(error);

      if (error.response?.data?.errors) {
        setFormErrors(error.response.data.errors);
        for (const [field, message] of Object.entries(
          error.response.data.errors
        )) {
          toast.warning(`${message}`, {
            duration: 3000,
          });
        }
      } else {
        toast.warning(error.response?.data?.message || "Something went wrong.");
      }

      console.error("Error:", error);
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate.push("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <form onSubmit={loginHandler} className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid w-full items-center gap-1.5">
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loadingState}
                className={formErrors.email ? "border-red-500" : ""}
                placeholder="Email"
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
                value={formData.password}
                onChange={handleChange}
                disabled={loadingState}
                className={formErrors.password ? "border-red-500" : ""}
                placeholder="Password"
              />
              {formErrors.password && (
                <p className="text-red-500 text-sm">{formErrors.password}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loadingState}>
              {loadingState ? (
                <Loader className="animate-spin w-5 h-5 text-white" />
              ) : (
                "Login"
              )}
            </Button>
          </CardFooter>
          <CardFooter className="justify-end text-end m-0">
            <p className="text-red-500">
              <Link href="/auth/forgot-password">
                <span> Forgot Password?</span>
              </Link>
            </p>
          </CardFooter>
          <CardFooter className="flex justify-center items-center">
            <Separator className=" w-1/2" />
            <span className="mx-4 text-gray-600 dark:text-gray-50">or</span>
            <Separator className=" w-1/2" />
          </CardFooter>
          <CardFooter>
            <Link
              className="w-full py-2 px-4 rounded-md text-center bg-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100"
              href="/auth/signup"
            >
              Create your account here
            </Link>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default Signin;
