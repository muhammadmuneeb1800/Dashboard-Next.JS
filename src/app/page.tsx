"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/button/Button";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="flex justify-center items-center">
          <Button
            onClick={() => router.push("/login")}
            text="Admin"
            bg="bg-primary"
            hBg="bg-white"
            color="text-white"
            hColor="text-primary"
            borderColor="border-primary"
            borderWidth="border-2"
          />
        </div>
      </div>
    </>
  );
}
