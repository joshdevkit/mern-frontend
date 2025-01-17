"use client";
import { Button } from "@/components/ui/button";
import useUser from "@/lib/useUser";
import http from "@/lib/utils"; // Assuming this is your HTTP client (like Axios)
import { setAuthUser } from "@/store/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Verify = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useRouter();
  const user = useUser();

  useEffect(() => {
    if (user && user.isVerified) {
      navigate.push("/");
    }
  }, [user, navigate]);

  const handleOtpChange = (index: number, value: string) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(
          `otp-input-${index + 1}`
        ) as HTMLInputElement;
        nextInput?.focus();
      } else if (!value && index > 0) {
        const prevInput = document.getElementById(
          `otp-input-${index - 1}`
        ) as HTMLInputElement;
        prevInput?.focus();
      }
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      alert("Please enter all 6 digits of the OTP.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await http.post("/users/account-verification", {
        otp: enteredOtp,
      });

      if (response.status === 200) {
        const verifiedUser = response.data.data.user;
        dispatch(setAuthUser(verifiedUser));
        navigate.push("/");
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error: any) {
      alert(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      await http.post("/users/resend-otp");
      alert("OTP has been resent to your email.");
    } catch (error) {
      console.error("Error resending OTP:", error);
      alert("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="pt-20 flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Verify Your Account
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        We've sent a One-Time Password (OTP) to your registered email.
        <br />
        Please enter the 6-digit code below to activate your account.
        <br />
        <span className="font-semibold text-red-600">
          Didn't receive the code?
        </span>{" "}
        Click "Resend OTP."
      </p>

      <div className="flex space-x-3">
        {otp.map((value, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            value={value}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            maxLength={1}
            className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-2xl md:text-3xl font-bold text-center bg-gray-100"
            autoFocus={index === 0}
            inputMode="numeric"
          />
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 mt-6">
        <Button
          variant={"default"}
          className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white hover:bg-blue-700"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Verifying..." : "Verify Account"}
        </Button>
        <Button
          className="w-full md:w-auto px-6 py-2 bg-gray-500 text-white hover:bg-gray-600"
          onClick={handleResendOtp}
          disabled={isSubmitting}
        >
          Resend OTP
        </Button>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Having trouble verifying?{" "}
        <span
          className="text-blue-600 font-medium cursor-pointer"
          onClick={handleResendOtp}
        >
          Resend the code
        </span>{" "}
        or{" "}
        <Link href="/support" className="text-blue-600 font-medium">
          Contact Support
        </Link>
      </p>
    </div>
  );
};

export default Verify;
