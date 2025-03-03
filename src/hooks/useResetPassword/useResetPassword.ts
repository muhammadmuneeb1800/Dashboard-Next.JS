import { showToast } from "@/components/toast/Toast";
import { resetPassword } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/store";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useResetPassword() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const token = new URLSearchParams(window.location.search).get("token");
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!password) {
      showToast("error", "Please enter new password");
      setIsLoading(false);
      return;
    }
    if (password.length < 8) {
      showToast("error", "Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }
    if (!confirmPassword) {
      showToast("error", "Please confirm new password");
      setIsLoading(false);
      return;
    }
    if (confirmPassword.length < 8) {
      showToast("error", "Passwords do not match");
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      showToast("error", "Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const hash = await bcrypt.hash(password, 10);
      const data = {
        token: token as string,
        password: hash as string,
      };
      const user = await dispatch(resetPassword(data));
      if (user) {
        showToast(
          "success",
          "Password reset successfully. You can now log in."
        );
        setIsLoading(false);
        router.push("/");
      } else {
        showToast("error", "Failed to reset password.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("error", "Failed to reset password.");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
    setPassword("");
    setConfirmPassword("");
  };

  return {
    password,
    confirmPassword,
    handleSubmit,
    setPassword,
    isLoading,
    setIsLoading,
    setConfirmPassword,
  };
}
