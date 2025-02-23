import LoginForm from "@/components/authForms/loginForm/LoginForm";
import RightSideLogin from "@/components/rightSideLogin/RightSideLogin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login to Dashboard",
  description: "Login to your Personal Doctor Dashboard.",
};

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center w-full h-screen">
        <div className="h-screen md:w-[60%] w-full">
          <LoginForm />
        </div>
        <div className="w-[100%] md:pt-16 lg:pt-0 h-screen justify-center items-center hidden md:block  bg-primary text-center col-span-2">
          <RightSideLogin />
        </div>
      </div>
    </>
  );
}
