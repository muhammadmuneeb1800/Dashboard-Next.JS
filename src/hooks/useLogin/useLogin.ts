"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { userAuth } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/store";
import { showToast } from "@/components/toast/Toast";

export default function useLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useAppDispatch();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    try {
      const login = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (login?.error) {
        console.log("Login failed", login.error);
        setErrors({ Invalid: "Invalid email or password" });
        setLoading(false);
        return;
      } else {
        setLoading(false);
        // dispatch(userAuth());
        router.push("/dashboard");
        setTimeout(() => {
          showToast("success", "Login successfully 👍 Now moving to Dashboard");
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
      console.log("Something went wrong. Please try again.", error);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    setErrors,
    loading,
    handleLogin,
  };
}
