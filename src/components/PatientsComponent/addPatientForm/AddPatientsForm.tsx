"use client";
import React from 'react'
import Button from '@/components/button/Button';
import Input from "@/components/input/Input";
import { MdOutlineCalendarToday } from "react-icons/md";
import useAddPatient from "@/hooks/useAddPatient/useAddPatient";
import { useRouter } from 'next/navigation';

export default function AddPatientsForm() {
  const {
    foreName,
    setForeName,
    surName,
    setSurname,
    dob,
    setDob,
    setGender,
    diagnosis,
    setDiagnosis,
    setStatus,
    phoneNumber,
    setPhoneNumber,
    appointmentDate,
    setAppointmentDate,
    error,
    handleAddPatient,
  } = useAddPatient();
  const route = useRouter();
  return (
    <>
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
                type="submit"
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
      <form
        onSubmit={handleAddPatient}
        className="mt-5 bg-white p-8 rounded w-[75%] mx-auto"
      >
        <div className="flex justify-between items-center">
          <label htmlFor="Forename">Forename</label>
          <div className="w-[70%]">
            <Input
              type="text"
              id="Forename"
              value={foreName || ""}
              onChange={(e) => setForeName(e.target.value)}
              border="border"
              borderColor="border-gray-400"
            />
            <p className="text-red-500 text-sm">{error.foreName}</p>
          </div>
        </div>
        <div className="flex pt-10 justify-between items-center">
          <label htmlFor="Surname">Surname</label>
          <div className="w-[70%]">
            <Input
              type="text"
              value={surName || ""}
              onChange={(e) => setSurname(e.target.value)}
              id="Surname"
              border="border"
              borderColor="border-gray-400"
            />
            <p className="text-red-500 text-sm">{error.foreName}</p>
          </div>
        </div>
        <div className="flex pt-10 justify-between items-center">
          <label htmlFor="Date">Date of birth</label>
          <div className="w-[70%] flex gap-5 justify-between items-center">
            <label
              htmlFor="date"
              className="border border-gray-500 p-3 rounded cursor-pointer"
            >
              <MdOutlineCalendarToday id="Date" />
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={dob ? dob : undefined}
              onChange={(e) => setDob(e.target.value)}
              className="rounded-md border border-gray-400 py-2 px-3 w-full"
            />
          </div>
        </div>
        <div className="flex pt-10 justify-between items-center">
          <label htmlFor="Sex">Sex</label>
          <div className="w-[70%] flex items-center gap-5">
            <label>
              <input
                type="radio"
                name="gender"
                id="male"
                value={"Male"}
                onChange={() => setGender("Male")}
                className="hidden peer"
              />
              <span className="peer-checked:bg-primary peer-checked:text-white bg-gray-300 rounded px-7 py-3">
                Male
              </span>
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                id="feMale"
                value={"Female"}
                onChange={() => setGender("Female")}
                className="hidden peer"
              />
              <span className="peer-checked:bg-primary peer-checked:text-white bg-gray-300 rounded px-7 py-3">
                Female
              </span>
            </label>
          </div>
        </div>
        <div className="flex pt-10 justify-between items-center">
          <label htmlFor="Diagnosis">Diagnosis</label>
          <div className="w-[70%] flex gap-5 justify-between items-center">
            <Input
              type="text"
              id="Diagnosis"
              value={diagnosis || ""}
              onChange={(e) => setDiagnosis(e.target.value)}
              border="border"
              borderColor="border-gray-400"
            />
          </div>
        </div>
        <div className="flex pt-10 justify-between items-center">
          <label htmlFor="Sex">Status</label>
          <div className="w-[70%] flex items-center gap-5">
            <label>
              <input
                type="radio"
                name="status"
                id="status"
                value={"Recovered"}
                onChange={() => setStatus("Recovered")}
                className="hidden peer"
              />
              <span className="peer-checked:bg-primary peer-checked:text-white bg-gray-300 rounded px-7 py-3">
                Recovered
              </span>
            </label>
            <label>
              <input
                type="radio"
                name="status"
                id="status"
                value={"AwaitingSurgery"}
                onChange={() => setStatus("Awaiting Surgery")}
                className="hidden peer"
              />
              <span className="peer-checked:bg-primary peer-checked:text-white bg-gray-300 rounded px-7 py-3">
                Awaiting Surgery
              </span>
            </label>
            <label>
              <input
                type="radio"
                name="status"
                id="status"
                value={"onTreatment"}
                onChange={() => setStatus("On Treatment")}
                className="hidden peer"
              />
              <span className="peer-checked:bg-primary peer-checked:text-white bg-gray-300 rounded px-7 py-3">
                On Treatment
              </span>
            </label>
          </div>
        </div>
        <div className="flex pt-10 justify-between items-center">
          <label htmlFor="appointmentDate">Appointment Date</label>
          <div className="w-[70%] flex items-center">
            <input
              type="datetime-local"
              value={
                appointmentDate
                  ? appointmentDate.toISOString().slice(0, 16)
                  : ""
              }
              onChange={(e) =>
                setAppointmentDate(
                  e.target.value ? new Date(e.target.value) : null
                )
              }
              id="appointmentDate"
              className="rounded-md border border-gray-400 py-2 px-3 w-full"
            />
          </div>
        </div>
        <div className="flex pt-10 justify-between items-center">
          <label htmlFor="Phone Number">Phone Number</label>
          <div className="w-[70%] flex gap-5 justify-between items-center">
            <Input
              type="text"
              value={phoneNumber || ""}
              onChange={(e) => setPhoneNumber(e.target.value)}
              id="Phone Number"
              border="border"
              borderColor="border-gray-400"
            />
          </div>
        </div>
      </form>
    </>
  );
}
