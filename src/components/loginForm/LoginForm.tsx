"use client";
import React from "react";
import Link from "next/link";
import Button from "../button/Button";
import Input from "../input/Input";
import useLogin from "@/hooks/useLogin";

export default function LoginForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    loading,
    handleLogin,
  } = useLogin();
  return (
    <>
      <form className="mt-28" onSubmit={handleLogin}>
        <div className="mt-6">
          <label
            htmlFor="email"
            className="text-base md:text-lg font-medium text-secondray"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            border="border-b-2"
          />
          <p className="text-rose-700 mt-1">{errors.email}</p>
        </div>
        <div className="mt-6">
          <label
            htmlFor="password"
            className="text-base md:text-lg font-medium text-secondray"
          >
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            border="border-b-2"
          />
          <p className="text-rose-700 mt-1">
            {errors.password || errors.Invalid}
          </p>
          <Link
            href="/forget"
            className="text-secondray float-right w-[150px] block text-right mt-2 hover:text-primary hover:underline"
          >
            Forget Password?
          </Link>
        </div>
        <div className="mt-20">
          <Button
            text={loading ? "Login..." : "Login"}
            type={loading ? "button" : "submit"}
            bg={loading ? "bg-gray-400" : "bg-primary"}
            color="text-white"
            hBg="bg-white"
            hColor="text-primary"
            borderColor={loading ? "border-gray-400" : "border-primary"}
            borderWidth="border-2"
            width="w-full"
          />
        </div>
      </form>
    </>
  );
}
