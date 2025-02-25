"use client";
import React from "react";
import Link from "next/link";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import useLogin from "@/hooks/useLogin/useLogin";

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
      <div className="md:px-5 lg:px-12 px-5 mt-24">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium">
          Welcome back Medicare
        </h1>
        <p className="text-lg md:text-xl font-normal mt-3 text-secondray">
          Tell us about your comapny
        </p>
        <form className="mt-20" onSubmit={handleLogin}>
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
              href="/forget-password"
              className="text-secondray float-right w-[150px] block text-right mt-2 hover:text-primary hover:underline"
            >
              Forget Password?
            </Link>
          </div>
          <div className="mt-20">
            {loading ? (
              <Button
                text="Login..."
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
                text="Login"
                type="submit"
                bg="bg-primary"
                color="text-white"
                hBg="bg-white"
                hColor="text-primary"
                borderColor="border-primary"
                borderWidth="border-2"
                width="w-full"
              />
            )}
          </div>
        </form>
        <Link
          href="/register"
          className="mt-3 text-right text-secondray font-medium text-sm block"
        >
          Don&apos;t have an account?{" "}
          <span className="text-primary underline text-base cursor-pointer">
            {" "}
            Register
          </span>
        </Link>
      </div>
    </>
  );
}
