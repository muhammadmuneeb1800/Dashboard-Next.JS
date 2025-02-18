"use client";
import Image from "next/image";
import img from "../../../../../public/assets/images/dashboard-preview.png";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import useRegister from "@/hooks/useRegister/useRegister";
import Link from "next/link";
import React from "react";

export default function Register() {
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
    <>
      <div className="flex">
        <div className="h-screen w-[60%]">
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
        </div>
        <div className="w-[100%] md:pt-16 lg:pt-0 h-screen justify-center items-center hidden md:block bg-primary text-center col-span-2">
          <h1 className="text-xl md:text-2xl text-center text-white font-bold mt-14 mb-3">
            ALL IN ONE DASHBOARD
          </h1>
          <div className="flex justify-center items-center md:px-4">
            <Image src={img} alt="All in one dashboard image" />
          </div>
          <p className="text-white text-center text-xl mt-5">
            Keep track of all patient information in this section.
          </p>
          <div className="text-center w-44 mx-auto mt-4">
            <Button
              text="Learn More"
              bg="bg-white"
              color="text-primary"
              hBg="bg-primary"
              hColor="text-white"
            />
          </div>
        </div>
      </div>
    </>
  );
}
