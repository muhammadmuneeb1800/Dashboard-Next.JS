import LoginForm from "@/components/loginForm/LoginForm";
import RightSideLogin from "@/components/rightSideLogin/RightSideLogin";
import { authOptions } from "@/lib/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login to Dashboard",
  description: "Login to your Personal Doctor Dashboard.",
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <>
      <div className="flex justify-center items-center w-full h-screen">
        <div className="h-screen md:w-[60%] w-full md:px-5 lg:px-12 px-5">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium mt-20">
            Welcome back Medicare
          </h1>
          <p className="text-lg md:text-xl font-normal mt-3 text-secondray">
            Tell us about your comapny
          </p>
          <LoginForm />
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
        <div className="w-[100%] md:pt-16 lg:pt-0 h-screen justify-center items-center hidden md:block  bg-primary text-center col-span-2">
          <RightSideLogin />
        </div>
      </div>
    </>
  );
}
