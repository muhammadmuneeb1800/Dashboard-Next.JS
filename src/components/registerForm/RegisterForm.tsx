"use client";
import React from "react";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import useRegister from "@/hooks/useRegister";

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
    handleRegister,
  } = useRegister();
  return (
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
          placeholder="Enter your name"
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
          placeholder="Enter your email address"
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
          placeholder="Enter your company name"
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
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          border="border-b-2"
          type="password"
        />
        <p className="text-rose-700 mt-1">{errors?.password}</p>
      </div>
      <div className="mt-5">
        <Button
          type={loading ? "button" : "submit"}
          text={loading ? "Finish..." : "Finish"}
          bg={loading ? "bg-gray-400" : "bg-primary"}
          color="text-white"
          hBg={loading ? "bg-gray-400" : "bg-white"}
          hColor={loading ? "text-white" : "text-primary"}
          borderWidth="border-2"
          borderColor={loading ? "border-gray-400" : "border-primary"}
          width="w-full"
        />
      </div>
    </form>
  );
}
