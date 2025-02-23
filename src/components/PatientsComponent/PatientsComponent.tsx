"use client";
import React, { useEffect, useState } from "react";
import Button from "../button/Button";
import { BsThreeDots } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "@/store/store";
import moment from "moment";
import {
  deletePatientData,
  fetchPatientsData,
  updatePatient,
} from "@/store/slices/patientSlice";
import TopBar from "../topBar/TopBar";
import { showToast } from "../toast/Toast";
import { useRouter } from "next/navigation";

export default function PatientsComponent() {
  const [active, setActive] = useState<boolean>(false);
  const [activePatient, setActivePatient] = useState<string | null>();
  const handleClick = (id: string) => {
    setActivePatient(activePatient === id ? null : id);
    setActive(!active);
  };

  const dispatch = useAppDispatch();
  const router = useRouter()

  useEffect(() => {
    dispatch(fetchPatientsData());
  }, [dispatch]);

  const allPatients =
    useAppSelector((store) => store.patientSlice.patients) || [];
  console.log("all patients", allPatients);
  return (
    <>
      <TopBar
        title="Total Patients"
        sabTitle={allPatients.length.toLocaleString()}
        link={"/dashboard/patients/add-patients"}
        icon1="FaPlus"
        icon3="TbFilter"
        icon2="IoPrintOutline"
        icon4="MdOutlineContactSupport"
      />
      <div className="bg-white py-3 mt-5 w-full h-auto rounded shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow">
            <thead className="border-b">
              <tr className="text-info text-base leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Diagnosis</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Last Appointment</th>
                <th className="py-3 px-6 text-center">Next Appointment</th>
                <th className="py-3 px-6 text-center">Options</th>
              </tr>
            </thead>
            <tbody className="text-black text-base font-light">
              {allPatients?.length > 0 ? (
                allPatients?.map((patient, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {patient?.foreName}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {patient?.diagnosis}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <span
                        className={`py-[5px] px-[15px] rounded-full w-full text-xs ${
                          patient?.status === "Recovered"
                            ? "bg-green-300 bg-opacity-65 text-green-700"
                            : patient?.status === "Awaiting_Surgery"
                            ? "bg-blue-300 bg-opacity-65 text-blue-700"
                            : "bg-red-300 bg-opacity-65 text-red-700"
                        }`}
                      >
                        {patient?.status === "On_Treatment"
                          ? "On Treatment"
                          : patient?.status === "Awaiting_Surgery"
                          ? "Awaiting Surgery"
                          : "Recovered"}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {patient?.phoneNumber}
                    </td>
                    <td className="py-3 px-6 text-center">
                      {patient?.appointmentDate
                        ? moment(patient?.appointmentDate).format("MM-DD-YYYY")
                        : ""}
                    </td>
                    <td className="py-3 px-6 text-lg text-center relative">
                      <Button
                        icon={BsThreeDots}
                        bg="bg-none"
                        color="text-gray-400"
                        hBg="bg-none"
                        hColor="text-black"
                        onClick={() => handleClick(patient?.id || "")}
                      />
                      {activePatient === patient?.id && active && (
                        <div className="absolute top-10 border shadow-md right-16 bg-white rounded-md w-28 px-2 py-3 z-40 flex flex-col justify-center items-center gap-3">
                          <button
                            onClick={async()=>{
                              await dispatch(updatePatient(patient.id));
                              router.push("/dashboard/patients/add-patients")
                            }}
                          className="text-base text-primary hover:bg-primary duration-500 hover:text-white font-bold px-3 py-2 rounded-md">
                            Update
                          </button>
                          <button
                            onClick={async () => {
                              await dispatch(
                                deletePatientData(patient.id as string)
                              );
                              showToast(
                                "success",
                                "Patient deleted successfully"
                              );
                            }}
                            className="text-base text-red-500 hover:bg-red-500 duration-500 hover:text-white font-bold px-3 py-2 rounded-md"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center text-info py-4">
                    No patients available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

{
  /* <tbody className="text-black text-base font-light">
              {
                allPatients.length > 0 ?
              (allPatients?.map((patient, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {patient?.foreName}
                  </td>
                  <td className="py-3 px-6 text-left">{patient?.diagnosis}</td>
                  <td className="py-3 px-6 text-center">
                    <span
                      className={`py-1 px-3 rounded-full text-xs ${
                        statusStyles[patient?.status as StatusType]
                      }`}
                    >
                      {patient?.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center">
                    {patient?.phoneNumber}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {patient?.appointmentDate
                      ? moment(patient?.appointmentDate).format("MM-DD-YYYY")
                      : ""}
                  </td>
                  <td className="py-3 px-6 text-lg text-center relative">
                    <Button
                      icon={BsThreeDots}
                      bg="bg-none"
                      color="text-gray-400"
                      hBg="bg-none"
                      hColor="text-black"
                      onClick={() =>
                        handleClick(patient?.id ? patient?.id : "")
                      }
                    />
                    {activePatient == patient?.id && active ? (
                      <div className="bg-gray-400 p-2 rounded absolute top-10 right-28 w-full">
                        <Button
                          text="Edit"
                          bg="bg-none"
                          color="text-gray-800"
                          hBg="bg-none"
                          hColor="text-black"
                        />
                        <hr />
                        <Button
                          text="Delete"
                          bg="bg-none"
                          color="text-red-500"
                          hBg="bg-none"
                          hColor="text-red-800"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    </td>
                    </tr>)
                    :
                    (
                      <div><p>Not data</p></div>
                    )
                  }
                  ))}
            </tbody> */
}
