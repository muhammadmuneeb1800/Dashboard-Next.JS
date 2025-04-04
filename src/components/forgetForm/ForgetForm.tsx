"use client";
import React from "react";
import Button from "../button/Button";
import Input from "../input/Input";
import useforgetPassword from "@/hooks/useforgetPassword";

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
          <Button
            type={isLoading ? "button" : "submit"}
            text={isLoading ? "sending..." : "Send"}
            bg={isLoading ? "bg-gray-400" : "bg-primary"}
            color="text-white"
            hBg="bg-white"
            hColor="text-primary"
            borderColor={isLoading ? "border-gray-400" : "border-primary"}
            borderWidth="border-2"
            width="w-full"
          />
        </div>
      </form>
    </>
  );
}
