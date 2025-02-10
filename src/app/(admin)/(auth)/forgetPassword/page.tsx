import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import Image from "next/image";
import React from "react";

export default function ForgetPassword() {
  return (
    <>
      <div className="bg-primary flex justify-center items-center w-full h-screen">
        <div className="bg-white pb-10 px-5 rounded mx-auto w-[30%]">
        <Image src="/assets/images/logo.png" alt="Logo Image" width={220} className="mx-auto my-5" height={150}/>
        <p className="text-2xl font-semibold mb-5">Forget Password</p>
          <Input
            type="email"
            border="border-b-2"
            borderColor="border-gray-400"
            placeholder="enter your email"
          />
          <div className="w-32 float-right mt-5">
          <Button text="Send" bg="bg-primary" color="text-white" hBg="bg-white" hColor="text-primary" borderColor="border-primary" borderWidth="border-2"/>
          </div>
        </div>
      </div>
    </>
  );
}
