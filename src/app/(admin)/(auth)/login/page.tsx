"use client";
import Image from "next/image";
import img from "../../../../../public/assets/images/dashboard-preview.png";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import useLogin from "@/hooks/useLogin/useLogin";
import Link from "next/link";
import { getSession } from "next-auth/react";
import { useLayoutEffect } from "react";

export default function Login() {
  const { name, setName, email, setEmail, password, setPassword, error } =
    useLogin();

  useLayoutEffect(() => {
    async function sessionData() {
      const session = await getSession();
      if (session) {
        return <Link href="/admin/dashboard">Dashboard</Link>;
      }
    }
    sessionData();
  });

  return (
    <>
      <div className="flex">
        <div className="h-screen w-[60%]">
          <div className="px-12 mt-24">
            <h1 className="text-4xl font-medium">Welcome back Medicare</h1>
            <p className="text-xl font-normal mt-3 text-secondray">
              Tell us about your comapny
            </p>
            <form className="mt-10">
              <div>
                <label
                  htmlFor="name"
                  className="text-lg font-medium text-secondray"
                >
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  border="border-b-2"
                />
                <p className="text-[13px] text-red-600">{error}</p>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="email"
                  className="text-lg font-medium text-secondray"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  border="border-b-2"
                />
              </div>
              <div className="mt-6">
                <label
                  htmlFor="password"
                  className="text-lg font-medium text-secondray"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  border="border-b-2"
                />
                <p className="text-rose-700 mt-1">{error}</p>
                <Link
                  href="/forgetPassword/"
                  className="text-secondray block text-right mt-2"
                >
                  Forget Password?
                </Link>
              </div>
              <div className="mt-10">
                <Button
                  text="Login"
                  bg="bg-primary"
                  color="text-white"
                  hBg="bg-white"
                  hColor="text-primary"
                />
              </div>
            </form>
            <Link
              href="/register"
              className="mt-2 text-right text-secondray font-medium text-sm block"
            >
              Don&apos;t have an account?{" "}
              <span className="text-primary underline text-base cursor-pointer">
                {" "}
                Register
              </span>
            </Link>
          </div>
        </div>
        <div className="w-[100%] bg-primary text-center col-span-2">
          <h1 className="text-xl text-center text-white font-bold mt-14 mb-3">
            ALL IN ONE DASHBOARD
          </h1>
          <div className="flex justify-center">
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
