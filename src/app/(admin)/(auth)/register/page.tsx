"use client";
import Image from "next/image";
import img from "../../../../../public/assets/images/dashboard-preview.png";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import useRegister from "@/hooks/useRegister/useRegister";
import Link from "next/link";

export default function Register() {
  const {
    name,
    setName,
    email,
    setEmail,
    companyName,
    setCompanyName,
    industry,
    setIndustry,
    password,
    setPassword,
    handleRegister,
  } = useRegister();

  return (
    <>
      <div className="flex">
        <div className="w-[100%] bg-primary text-center col-span-2">
          <h1 className="text-xl text-center text-white font-bold mt-14 mb-3">
            ALL IN ONE DASHBOARD
          </h1>
          <div className="flex justify-center">
            <Image src={img} alt="All in one dashboard image" />
          </div>
          <p className="text-white text-center text-xl mt-4">
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
        <div className="h-screen w-[60%]">
          <div className="px-12 mt-10">
            <h1 className="text-4xl font-medium">Welcome to Medicare</h1>
            <p className="text-xl font-normal mt-3 text-secondray">
              Tell us about your comapny
            </p>
            <form className="mt-5">
              <div>
                <label
                  htmlFor="name"
                  className="text-lg font-medium text-secondray"
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
              </div>
              <div className="mt-5">
                <label
                  htmlFor="email"
                  className="text-lg font-medium text-secondray"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  border="border-b-2"
                />
              </div>
              <div className="mt-5">
                <label
                  htmlFor="companyName"
                  className="text-lg font-medium text-secondray"
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
              </div>
              <div className="mt-5">
                <label
                  htmlFor="industry"
                  className="text-lg font-medium text-secondray"
                >
                  Industry
                </label>
                <Input
                  id="industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  border="border-b-2"
                  type="text"
                />
              </div>
              {/* <div className="mt-5">
                <label
                  htmlFor="employeesNumber"
                  className="text-lg font-medium text-secondray"
                >
                  How many employees do you have?
                </label>
                <Input
                  id="employeesNumber"
                  value={employeesNumber}
                  onChange={(e) => setEmployeesNumber(e.target.value)}
                  border="border-b-2"
                  type="text"
                />
              </div> */}
              <div className="mt-5">
                <label
                  htmlFor="password"
                  className="text-lg font-medium text-secondray"
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
              </div>
              <div className="mt-5">
                <Button
                  text="Finish"
                  onClick={() => handleRegister()}
                  bg="bg-primary"
                  color="text-white"
                  hBg="bg-white"
                  hColor="text-primary"
                />
              </div>
            </form>
            <Link
              href="/login"
              className="mt-2 text-right text-secondray font-medium text-sm block"
            >
              Already have an account?{" "}
              <span className="text-primary underline text-base cursor-pointer hover:text-blue-800">
                Login
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
