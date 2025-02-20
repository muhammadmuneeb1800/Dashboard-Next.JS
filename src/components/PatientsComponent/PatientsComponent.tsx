"use client";
import React, { useEffect, useState } from "react";
import Button from "../button/Button";
import { BsThreeDots } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "@/store/store";
import moment from "moment";
import { fetchPatientsData } from "@/store/slices/patientSlice";

type StatusType = "Recovered" | "Awaiting surgery" | "On treatment";

const statusStyles: Record<StatusType, string> = {
  Recovered: "bg-green-200 text-green-800",
  "Awaiting surgery": "bg-blue-200 text-blue-800",
  "On treatment": "bg-red-200 text-red-800",
};

export default function PatientsComponent() {
  const [active, setActive] = useState<boolean>(false);
  const [activePatient, setActivePatient] = useState<string | null>();
  const handleClick = (id: string) => {
    setActivePatient(activePatient === id ? null : id);
    setActive(!active);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function call() {
      await dispatch(fetchPatientsData());
    }
    call();
  }, [dispatch]);

  const allPatients =
    useAppSelector((store) => store.patientSlice.patients) || [];
  console.log("all patients", allPatients);
  return (
    <>
      <div className="bg-white py-3 mt-5 rounded shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
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
              {allPatients.length > 0 ? (
                allPatients.map((patient, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {patient?.foreName}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {patient?.diagnosis}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <span
                        className={`py-1 px-3 rounded-full text-xs ${statusStyles}`}
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
                        onClick={() => handleClick(patient?.id || "")}
                      />
                      {activePatient === patient?.id && active && (
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
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No patients available
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
