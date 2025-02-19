"use client";

import type { Metadata } from "next";
import React from "react";
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AddPatient from "@/components/addPatient/AddPatients";

export const metaData: Metadata = {
  title: "Add Patients",
  description: "Add new patients to your doctor's system.",
};

export default function AddPatients() {
  const route = useRouter();
  return (
    <>
      <div className="px-5 py-3 w-full bg-success">
        <div className="flex items-center">
          <Link href="/dashboard/patients/">Patient registrer{"  "}</Link>
          <p> &gt; Add Patients</p>
        </div>
        <div className="shadow">
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
                  text="Save"
                  bg="bg-primary"
                  hBg="bg-white"
                  color="text-white"
                  hColor="text-primary"
                />
              </div>
            </div>
          </div>
        </div>
        <AddPatient />
      </div>
    </>
  );
}
