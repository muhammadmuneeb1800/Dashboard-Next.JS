"use client";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import useResetPassword from "@/hooks/useResetPassword";
import React from "react";

export default function ResetForm() {
  const {
    password,
    confirmPassword,
    handleSubmit,
    setPassword,
    isLoading,
    setConfirmPassword,
  } = useResetPassword();
  return (
    <form onSubmit={handleSubmit} className="mt-24">
      <div className="mt-5">
        <label
          htmlFor="password"
          className="text-base md:text-lg font-medium text-secondray"
        >
          New Password
        </label>
        <Input
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your new password"
          type="password"
          border="border-b-2"
        />
      </div>
      <div className="mt-5">
        <label
          htmlFor="confirmPassword"
          className="text-base md:text-lg font-medium text-secondray"
        >
          Confirm New Password
        </label>
        <Input
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Enter your confirm new password"
          type="password"
          border="border-b-2"
        />
      </div>
      <div className="mt-5">
        {isLoading ? (
          <Button
            text="Sending..."
            bg="bg-gray-400"
            color="text-white"
            hBg="bg-gray-400"
            hColor="text-white"
            borderWidth="border-2"
            borderColor="border-gray-400"
            width="w-full"
          />
        ) : (
          <Button
            type="submit"
            text="Submit"
            bg="bg-primary"
            color="text-white"
            hBg="bg-white"
            borderColor="border-primary"
            borderWidth="border-2"
            hColor="text-primary"
            width="w-full"
          />
        )}
      </div>
    </form>
  );
}
