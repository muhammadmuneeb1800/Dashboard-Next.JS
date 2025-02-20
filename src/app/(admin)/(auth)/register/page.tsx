import React from "react";
import RightSideLogin from "@/components/rightSideLogin/RightSideLogin";
import RegisterForm from "@/components/authForms/registerForm/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register for Dashboard",
  description: "Register for your Personal Doctor Dashboard.",
};

export default function Register() {
  return (
    <>
      <div className="flex">
        <div className="h-screen w-[60%]">
          <RegisterForm />
        </div>
        <div className="w-[100%] md:pt-16 lg:pt-0 h-screen justify-center items-center hidden md:block bg-primary text-center col-span-2">
          <RightSideLogin />
        </div>
      </div>
    </>
  );
}
