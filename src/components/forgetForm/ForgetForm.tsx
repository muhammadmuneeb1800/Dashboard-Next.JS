"use client";
import React from "react";
import Button from "../button/Button";
import Input from "../input/Input";
import useforgetPassword from "@/hooks/useforgetPassword/useforgetPassword";

export default function ForgetForm() {
  const { email, setEmail, isLoading, handleSubmit } = useforgetPassword();
  return (
    <>
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
              text="Send"
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
    </>
  );
}
