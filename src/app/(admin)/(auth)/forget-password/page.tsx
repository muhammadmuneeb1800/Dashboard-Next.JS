import ForgetForm from "@/components/authForms/forgetForm/ForgetForm";
import RightSideLogin from "@/components/rightSideLogin/RightSideLogin";
import { authOptions } from "@/lib/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Forget Password for Dashboard",
  description: "Register for your Personal Doctor Dashboard.",
};

export default async function ForgetPassword() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <>
      <div className="flex justify-center items-center w-full h-screen">
        <div className="h-screen md:w-[60%] w-full">
          <ForgetForm />
        </div>
        <div className="w-[100%] md:pt-16 lg:pt-0 h-screen justify-center items-center hidden md:block bg-primary text-center col-span-2">
          <RightSideLogin />
        </div>
      </div>
    </>
  );
}
