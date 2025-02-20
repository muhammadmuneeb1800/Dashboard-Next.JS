import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import AddPatientsForm from "@/components/PatientsComponent/addPatientForm/AddPatientsForm";

export const metadata: Metadata = {
  title: "Dashboard / Add Patient",
  description: "Add Patients in your Dashboard",
};

export default function AddPatients() {
  return (
    <>
      <div className="px-5 py-3 w-full bg-success">
        <div className="flex items-center">
          <Link href="/dashboard/patients/">Patient registrer{"  "}</Link>
          <p> &gt; Add Patients</p>
        </div>
        <AddPatientsForm />
      </div>
    </>
  );
}
