"use client";

import React, { useEffect } from "react";
import Button from "@/components/button/Button";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { getSession } from "next-auth/react";
import AddPatient from "@/components/addPatient/AddPatients";

export default function AddPatients() {

  useEffect(() => {
    async function Session() {
      const sessionData = await getSession();
      if (!sessionData) {
        redirect("/login");
      }
    }
    Session();
  }, []);
  const route = useRouter();
  return (
    <>
      <div className="px-5 py-3 w-full bg-success">
        <div className="flex items-center">
          <Link href="/dashboard/patients/">Patient registrer{"  "}</Link>
          <p> &gt; Add Patients</p>
        </div>
        <div className="flex justify-between items-center px-6 bg-white py-3 mt-5 rounded">
          <div>
            <p className="text-xl font-medium">Add New Patient</p>
          </div>
          <div className="flex justify-center gap-5">
            <div
              className="text-center"
              onClick={() => route.push("/dashboard/patients/addPatients/")}
            >
              <Button
                onClick={() => route.back()}
                text="Cencel"
                bg="bg-white"
                hBg="bg-primary"
                color="text-primary"
                hColor="text-white"
              />
            </div>
            <div className="text-center">
              <Button
                onClick={() => route.back()}
                text="Save"
                bg="bg-primary"
                hBg="bg-white"
                color="text-white"
                hColor="text-primary"
              />
            </div>
          </div>
        </div>
        <AddPatient />
      </div>
    </>
  );
}
