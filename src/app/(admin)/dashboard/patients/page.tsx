import PatientsComponent from "@/components/PatientsComponent/PatientsComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Patients",
  description: "Your Dashboard Patients",
};

export default function Patients() {
  return (
    <>
      <div className="px-3 md:px-5 py-3 w-full bg-success min-h-screen">
        <h1>Patient registrer</h1>
        <PatientsComponent />
      </div>
    </>
  );
}
