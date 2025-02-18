"use client";

import React from "react";
import Input from "../input/Input";
import { MdOutlineCalendarToday } from "react-icons/md";
import useAddPatient from "@/hooks/useAddPatient/useAddPatient";

export default function AddPatient() {
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
    notes,
    setNotes,
    phoneNumber,
    setPhoneNumber,
    handleAddPatient,
  } = useAddPatient();
  return (
    <>
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
          </div>
        </div>
        <div className="flex pt-10 justify-between items-center">
          <label htmlFor="Date">Date of birth</label>
          <div className="w-[70%] flex gap-5 justify-between items-center">
            <div className="border border-gray-500 p-3 rounded">
              <MdOutlineCalendarToday id="Date" />
            </div>
            <input
              type="date"
              value={dob || Date}
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
          <label htmlFor="Notes">Notes</label>
          <div className="w-[70%] flex gap-5 justify-between items-center">
            <textarea
              name="notes"
              id="notes"
              value={notes || ""}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="border w-full border-gray-400 rounded outline-none px-3 py-2"
            ></textarea>
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
