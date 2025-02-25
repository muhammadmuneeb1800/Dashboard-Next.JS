import React from "react";
import RightSideLogin from "@/components/rightSideLogin/RightSideLogin";
import RegisterForm from "@/components/authForms/registerForm/RegisterForm";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Register for Dashboard",
  description: "Register for your Personal Doctor Dashboard.",
};

export default async function Register() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <>
      <div className="flex justify-center items-center w-full h-screen">
        <div className="h-screen md:w-[60%] w-full">
          <RegisterForm />
        </div>
        <div className="w-[100%] md:pt-16 lg:pt-0 h-screen justify-center items-center hidden md:block bg-primary text-center col-span-2">
          <RightSideLogin />
        </div>
      </div>
    </>
  );
}
