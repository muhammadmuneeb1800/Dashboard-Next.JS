import PatientsComponent from "@/components/PatientsComponent/PatientsComponent";
import TopBar from "@/components/topBar/TopBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard / Patients",
  description: "Your Dashboard Patients",
};

export default function Patients() {
  return (
    <>
      <div className="px-5 py-3 w-full bg-success">
        <h1>Patient registrer</h1>
        <TopBar
          title="Total Patients"
          sabTitle="487"
          link={"/dashboard/patients/add-patients"}
          icon1="FaPlus"
          icon3="TbFilter"
          icon2="IoPrintOutline"
          icon4="MdOutlineContactSupport"
        />
        <PatientsComponent />
      </div>
    </>
  );
}
