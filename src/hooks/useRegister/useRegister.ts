"use client";
import { useState } from "react";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import { showToast } from "@/components/toast/Toast";
import { useAppDispatch } from "@/store/store";
import { createUser } from "@/store/slices/authSlice";

export default function useRegister() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const dispatch = useAppDispatch();

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
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userData = { name, email, password: hashedPassword, companyName };

      await dispatch(createUser(userData)).unwrap();

      showToast("success", "Successfully registered");
      router.push("/");

      setName("");
      setEmail("");
      setCompanyName("");
      setPassword("");
      setErrors({});
    } catch (error) {
      showToast("error", error as string);
    } finally {
      setLoading(false);
    }
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
    handleRegister,
  };
}
