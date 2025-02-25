"use client";
import { useEffect, useState } from "react";
import { showToast } from "@/components/toast/Toast";
import {
  updateUserPassword,
  userAuth,
  userEdit,
} from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function useEditProfile() {
  const { data: session, update } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(userAuth());
  }, [dispatch]);
  const userData = useAppSelector((store) => store.authSlice.user) || {};
  const [name, setName] = useState<string>(userData?.name as string);
  const [email, setEmail] = useState<string>(userData.email as string);
  const [company, setCompany] = useState<string>(
    userData.companyName as string
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

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
    try {
      await dispatch(userEdit(newData));
      showToast("success", "Profile updated successfully");
      await update({
        user: {
          ...session?.user,
          name: newData.name,
          email: newData.email,
          companyName: newData.companyName,
        },
      });
      await getSession();
      setLoading(false);
      router.push("/dashboard");
    } catch (error) {
      showToast("error", error as string);
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!oldPassword || !newPassword || !confirmPassword) {
      showToast("error", "Please fill all the fields");
      setLoading(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("error", "New Password and Confirm Password do not match");
      setLoading(false);
      return;
    }
    const updatedData = {
      id: session?.user?.id as string,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    try {
      await dispatch(updateUserPassword(updatedData));
      showToast("success", "Password updated successfully");
    } catch (error) {
      showToast("error", error as string);
      setLoading(false);
    }
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
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
    isPassword,
    setIsPassword,
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleChangePassword,
    handleSaveChanges,
  };
}
