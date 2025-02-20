"use client";
import React, { useState } from "react";
import Button from "../button/Button";
import { PATIENTS } from "@/constant/constant";
import { BsThreeDots } from "react-icons/bs";

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
  return (
    <>
      <div className="bg-white py-3 mt-5 rounded">
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
              {PATIENTS.map((patient, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {patient.name}
                  </td>
                  <td className="py-3 px-6 text-left">{patient.diagnosis}</td>
                  <td className="py-3 px-6 text-center">
                    <span
                      className={`py-1 px-3 rounded-full text-xs ${
                        statusStyles[patient.status as StatusType]
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center">
                    {patient.lastAppointment}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {patient.nextAppointment}
                  </td>
                  <td className="py-3 px-6 text-lg text-center relative">
                    <Button
                      icon={BsThreeDots}
                      bg="bg-none"
                      color="text-gray-400"
                      hBg="bg-none"
                      hColor="text-black"
                      onClick={() => handleClick(patient.id)}
                    />
                    {activePatient == patient.id && active ? (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
