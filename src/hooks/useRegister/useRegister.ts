"use client";
import { useState } from "react";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { axiosInstance } from "@/utils/axiosInstance";
import { showToast } from "@/components/toast/Toast";

export default function useRegister() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const session = useSession();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!companyName.trim()) {
      newErrors.companyName = "Company name is required";
    } else if (companyName.length < 3) {
      newErrors.companyName = "Company name must be at least 3 characters";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userData = {
        name: name,
        email: email,
        password: hashedPassword,
        companyName: companyName,
      };

      const response = await axiosInstance.post("/api/register", userData);
      console.log("data from fetch fetchData", response);

      if (response.status === 401) {
        showToast("error", "Email already exists");
        setLoading(false);
        return;
      }

      if (response.status === 201) {
        showToast("success", "Successfully registered");
        setLoading(false);
        router.push("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setErrors({ general: "Something went wrong. Please try again later!" });
      setLoading(false);
    }

    setName("");
    setEmail("");
    setCompanyName("");
    setPassword("");
    setErrors({});
  };

  return {
    name,
    setName,
    email,
    setEmail,
    companyName,
    setCompanyName,
    password,
    setPassword,
    errors,
    setErrors,
    loading,
    setLoading,
    router,
    session,
    handleRegister,
  };
}
