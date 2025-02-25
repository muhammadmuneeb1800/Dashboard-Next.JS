"use client";
import { useState } from "react";
import { showToast } from "@/components/toast/Toast";
import { axiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";

export default function useForgetPassword() {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/api/auth/forgot-password", {
        email,
      });

      if (response.status === 200) {
        showToast("success", "Password reset link sent to your email!");
      } else {
        showToast("error", "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("error", "Failed to send password reset email.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    isLoading,
    router,
    handleSubmit,
  };
}
