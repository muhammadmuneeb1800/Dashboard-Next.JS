"use client";
import Image from "next/image";
import img from "../../../../../public/assets/images/dashboard-preview.png";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import useLogin from "@/hooks/useLogin/useLogin";
import Link from "next/link";
import { Toast } from "@/components/toast/Toast";

export default function Login() {
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
      <Toast />
      <div className="flex justify-center items-center w-full h-screen">
        <div className="h-screen md:w-[60%] w-full">
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  border="border-b-2"
                />
                <p className="text-rose-700 mt-1">
                  {errors.password || errors.Invalid}
                </p>
                <Link
                  href="/forgetPassword/"
                  className="text-secondray float-right w-[150px] block text-right mt-2"
                >
                  Forget Password?
                </Link>
              </div>
              <div className="mt-20">
                {loading ? (
                  <Button
                    text="Loading..."
                    type="submit"
                    bg="bg-primary"
                    color="text-white"
                    hBg="bg-white"
                    hColor="text-primary"
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
        </div>
        <div className="w-[100%] md:pt-16 lg:pt-0 h-screen justify-center items-center hidden md:block  bg-primary text-center col-span-2">
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
