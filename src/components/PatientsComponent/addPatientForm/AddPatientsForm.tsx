"use client";
import React, { useEffect } from "react";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import { MdOutlineCalendarToday } from "react-icons/md";
import useAddPatient from "@/hooks/useAddPatient/useAddPatient";
import { useAppSelector } from "@/store/store";

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
    gender,
    isLoading,
    dispatch,
    router,
    appointmentDate,
    setAppointmentDate,
    handleAddPatient,
  } = useAddPatient();
  const updatePatient =
    useAppSelector((store) => store.patientSlice.updatePatientData) || {};
  console.log("update user from apdate slice and component", updatePatient);
  useEffect(() => {
    if (updatePatient) {
      setForeName(updatePatient.foreName as string);
      setSurname(updatePatient.surName as string);
      setDob(updatePatient.dob as string);
      setGender(updatePatient.sex as string);
      setDiagnosis(updatePatient.diagnosis as string);
      setStatus(updatePatient.status as string);
      setPhoneNumber(updatePatient.phoneNumber as string);
      // setAppointmentDate(updatePatient.appointmentDate as Date);
    } else {
      setForeName("");
      setSurname("");
      setDob("");
      setGender("");
      setDiagnosis("");
      setStatus("");
      setPhoneNumber("");
      setStatus("");
      setAppointmentDate(null);
    }
  }, [updatePatient]);
  return (
    <>
      <form onSubmit={handleAddPatient}>
        <div className="flex shadow justify-between items-center px-3 md:px-6 bg-white py-3 mt-5 rounded">
          <p className="text-lg md:text-xl block md:hidden font-medium">
            Add Patient
          </p>
          <p className="text-lg md:text-xl hidden md:block font-medium">
            Add New Patient
          </p>
          <div className="flex justify-center items-center gap-2 md:gap-5">
            <div className="text-center" onClick={() => router.back()}>
              <Button
                text="Cencel"
                bg="bg-white"
                hBg="bg-primary"
                color="text-primary"
                borderWidth="border-2"
                borderColor="border-primary"
                hColor="text-white"
              />
            </div>
            <div className="text-center">
              {isLoading ? (
                <Button
                  type="button"
                  text="Save..."
                  bg="bg-gray-400"
                  color="text-white"
                  hBg="bg-gray-400"
                  hColor="text-white"
                  borderWidth="border-2"
                  borderColor="border-gray-400"
                />
              ) : (
                <Button
                  type="submit"
                  text="Save"
                  bg="bg-primary"
                  hBg="bg-white"
                  color="text-white"
                  borderWidth="border-2"
                  borderColor="border-primary"
                  hColor="text-primary"
                />
              )}
            </div>
          </div>
        </div>
        {/* Start form from here */}
        <div className="mt-5 bg-white p-4 md:p-8 rounded w-[100%] md:w-[85%] shadow lg:w-[75%] mx-auto">
          <div className="flex justify-between items-center gap-2">
            <label htmlFor="Forename" className="text-sm md:text-base">
              Forename
            </label>
            <div className="w-[70%]">
              <Input
                type="text"
                id="Forename"
                placeholder="Jhone"
                value={foreName || ""}
                onChange={(e) => setForeName(e.target.value)}
                border="border"
                borderColor="border-gray-400"
              />
            </div>
          </div>
          <div className="flex pt-10 justify-between items-center gap-2">
            <label htmlFor="Surname" className="text-sm md:text-base">
              Surname
            </label>
            <div className="w-[70%]">
              <Input
                type="text"
                value={surName || ""}
                placeholder="Jhone Surname"
                onChange={(e) => setSurname(e.target.value)}
                id="Surname"
                border="border"
                borderColor="border-gray-400"
              />
            </div>
          </div>
          <div className="flex pt-10 justify-between gap-2 items-center">
            <label htmlFor="Date" className="text-sm md:text-base">
              Date of birth
            </label>
            <div className="w-[70%] flex gap-5 justify-between items-center">
              <label
                htmlFor="date"
                className="border hidden md:block border-gray-500 p-3 rounded cursor-pointer"
              >
                <MdOutlineCalendarToday id="Date" />
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={dob ?? ""}
                onChange={(e) => setDob(e.target.value)}
                className="rounded-md border border-gray-400 py-2 outline-none px-3 w-full"
              />
            </div>
          </div>
          <div className="flex pt-10 justify-between items-center gap-2">
            <label htmlFor="Sex" className="text-sm md:text-base">
              Sex
            </label>
            <div className="w-[70%] flex flex-col md:flex-row md:items-center items-start gap-6 md:gap-5">
              <label>
                <input
                  type="radio"
                  name="gender"
                  id="male"
                  checked={gender === "Male"}
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
                  checked={gender === "Female"}
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
          <div className="flex pt-10 justify-between items-center gap-2">
            <label htmlFor="Diagnosis" className="text-sm md:text-base">
              Diagnosis
            </label>
            <div className="w-[70%] flex gap-5 justify-between items-center">
              <Input
                type="text"
                id="Diagnosis"
                placeholder="Diagnosis"
                value={diagnosis || ""}
                onChange={(e) => setDiagnosis(e.target.value)}
                border="border"
                borderColor="border-gray-400"
              />
            </div>
          </div>
          <div className="flex pt-10 justify-between items-center gap-2">
            <label htmlFor="status" className="text-sm md:text-base">
              Status
            </label>
            <div className="w-[70%] flex flex-col items-start lg:flex-row lg:flex-wrap lg:gap-8 lg:items-center gap-6 md:gap-5">
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
          <div className="flex pt-10 justify-between items-center gap-2">
            <label htmlFor="appointmentDate" className="text-sm md:text-base">
              Appointment Date
            </label>
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
            <label htmlFor="Phone Number" className="text-sm md:text-base">
              Phone Number
            </label>
            <div className="w-[70%] flex gap-5 justify-between items-center">
              <Input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber || ""}
                onChange={(e) => setPhoneNumber(e.target.value)}
                id="Phone Number"
                border="border"
                borderColor="border-gray-400"
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
