"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import useRegister from "@/hooks/useRegister/useRegister";

export default function RegisterForm() {
  const {
    name,
    setName,
    email,
    setEmail,
    companyName,
    setCompanyName,
    password,
    setPassword,
    errors,
    loading,
    router,
    session,
    handleRegister,
  } = useRegister();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [session, router]);
  return (
    <>
      <div className="px-12 mt-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium">
          Welcome to Medicare
        </h1>
        <p className="text-lg md:text-xl font-normal mt-3 text-secondray">
          Tell us about your company
        </p>
        <form className="mt-16" onSubmit={handleRegister}>
          <div>
            <label
              htmlFor="name"
              className="text-base md:text-lg font-medium text-secondray"
            >
              Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              border="border-b-2"
              type="text"
            />
            <p className="text-rose-700 mt-1">{errors?.name}</p>
          </div>
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
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              border="border-b-2"
            />
            <p className="text-rose-700 mt-1">{errors?.email}</p>
          </div>
          <div className="mt-5">
            <label
              htmlFor="companyName"
              className="text-base md:text-lg font-medium text-secondray"
            >
              Company Name
            </label>
            <Input
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              border="border-b-2"
              type="text"
            />
            <p className="text-rose-700 mt-1">{errors?.companyName}</p>
          </div>
          <div className="mt-5">
            <label
              htmlFor="password"
              className="text-base md:text-lg font-medium text-secondray"
            >
              Password
            </label>
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              border="border-b-2"
              type="password"
            />
            <p className="text-rose-700 mt-1">{errors?.password}</p>
          </div>
          <div className="mt-5">
            {loading ? (
              <Button
                type="submit"
                text="Loading..."
                bg="bg-primary"
                color="text-white"
                hBg="bg-white"
                hColor="text-primary"
                width="w-full"
              />
            ) : (
              <Button
                type="submit"
                text="Finish"
                bg="bg-primary"
                color="text-white"
                hBg="bg-white"
                hColor="text-primary"
                width="w-full"
              />
            )}
          </div>
        </form>
        <Link
          href="/login"
          className="mt-3 text-right text-secondray font-medium text-sm block"
        >
          Already have an account?{" "}
          <span className="text-primary underline text-base cursor-pointer hover:text-blue-800">
            Login
          </span>
        </Link>
      </div>
    </>
  );
}
