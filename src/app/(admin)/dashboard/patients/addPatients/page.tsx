"use client";

import React from "react";
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/input/Input";
import { MdOutlineCalendarToday } from "react-icons/md";


export default function AddPatients() {
  const route = useRouter();
  return (
    <>
      <div className="px-5 py-3 w-full bg-success">
        <div className="flex items-center">
          <Link href="/dashboard/patients/">Patient registrer{"  "}</Link>
          <p> &gt; Add Patients</p>
        </div>
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
                onClick={() => route.back()}
                text="Save"
                bg="bg-primary"
                hBg="bg-white"
                color="text-white"
                hColor="text-primary"
              />
            </div>
          </div>
        </div>
        <div className="mt-5 bg-white p-8 rounded w-[75%] mx-auto">
          <div className="flex justify-between items-center">
            <label htmlFor="Forename">Forename</label>
            <div className="w-[70%]">
              <Input
                type="text"
                id="Forename"
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
                id="Surname"
                border="border"
                borderColor="border-gray-400"
              />
            </div>
          </div>
          <div className="flex pt-10 justify-between items-center">
            <label htmlFor="Date">Date of birth</label>
            <div className="w-[70%] flex gap-5 justify-between items-center">
              <div className="border border-gray-500 p-2 rounded">
                <MdOutlineCalendarToday id="Date" />
              </div>
              <Input
                type="date"
                id="Date"
                border="border"
                borderColor="border-gray-400"
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
                id="Phone Number"
                border="border"
                borderColor="border-gray-400"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
