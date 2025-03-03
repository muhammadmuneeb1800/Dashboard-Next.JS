"use client";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import useResetPassword from "@/hooks/useResetPassword/useResetPassword";
import Link from "next/link";
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
    <>
      <div className="md:px-5 lg:px-12 px-5 mt-24">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium">
          Enter your new password
        </h1>
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
        <Link
          href="/"
          className="mt-4 text-secondray font-medium text-sm block"
        >
          Back to {"    "}
          <span className="text-primary underline text-base cursor-pointer hover:text-blue-800">
            Login
          </span>
        </Link>
      </div>
    </>
  );
}
