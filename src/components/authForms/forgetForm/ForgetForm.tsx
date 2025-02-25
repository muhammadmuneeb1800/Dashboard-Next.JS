"use client";
import React from "react";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import useforgetPassword from "@/hooks/useforgetPassword/useforgetPassword";
import Link from "next/link";

export default function ForgetForm() {
  const { email, setEmail, isLoading, handleSubmit } = useforgetPassword();
  return (
    <>
      <div className="md:px-5 lg:px-12 px-5 mt-24">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium">
          Reset your password
        </h1>
        <p className="text-lg md:text-xl font-normal mt-3 text-secondray">
          Enter your email address below and we&rsquo;ll send you a link to
          reset your password.
        </p>
        <form onSubmit={handleSubmit} className="mt-24">
          <div className="mt-5">
            <label
              htmlFor="email"
              className="text-base md:text-lg font-medium text-secondray"
            >
              Email Address
            </label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              type="email"
              border="border-b-2"
            />
          </div>
          <div className="mt-5">
            {isLoading ? (
              <Button
                text="sending..."
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
                text="Reset Password"
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
