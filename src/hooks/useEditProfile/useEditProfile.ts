"use client";
import { useState } from "react";
import { showToast } from "@/components/toast/Toast";
import { userEdit } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function useEditProfile() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { data: session, update } = useSession();
  const router = useRouter();

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!name) {
      showToast("error", "Please enter your name");
      setLoading(false);
      return;
    }
    if (!email) {
      showToast("error", "Please enter your email");
      setLoading(false);
      return;
    }
    if (!company) {
      showToast("error", "Please enter your company name");
      setLoading(false);
      return;
    }

    const newData = {
      id: session?.user?.id,
      name: name,
      email: email,
      companyName: company,
    };

    console.log("data from user edit prifile and sdiufisdfsdfh", newData);

    try {
      await dispatch(userEdit(newData));

      await update({
        user: {
          ...session?.user,
          name: newData.name,
          email: newData.email,
          companyName: newData.companyName,
        },
      });

      showToast("success", "Profile updated successfully");
      setLoading(false);
      router.push("/dashboard");
    } catch (error) {
      showToast("error", error as string);
      setLoading(false);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    company,
    setCompany,
    loading,
    setLoading,
    handleSaveChanges,
  };
}
