import React, { useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";
import { ImCross } from "react-icons/im";
import { LuUserRound } from "react-icons/lu";
import { SlClock } from "react-icons/sl";
import Input from "../../input/Input";
import { MdOutlineNotifications } from "react-icons/md";
import Button from "../../button/Button";
import useAddAppointment from "@/hooks/useAddAppointment/useAddAppointment";
import { FaCheck } from "react-icons/fa";
import { useAppSelector } from "@/store/store";
import { resetUpdateApp } from "@/store/slices/appointmentSlice";
import moment from "moment";

export default function ScheduleModal({ close }: { close: () => void }) {
  const app =
    useAppSelector((store) => store.appointmentSlice.updateApp) || null;
  console.log("apppppp", app);
  const {
    patientName,
    setPatientName,
    purpose,
    setPurpose,
    setStatus,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    dispatch,
    type,
    status,
    setType,
    isOnline,
    isLoading,
    date,
    user,
    time,
    setIsOnline,
    hanldeUpdate,
    handleAddAppointment,
  } = useAddAppointment(close);
  useEffect(() => {
    if (app !== null) {
      setPatientName(app.patientName as string);
      setPurpose(app.purposeOfVisit as string);
      setStatus(app.appointmentStatus as string);
      setStartDate(app.startDate ? moment(app.startDate).toDate() : null);
      setEndDate(app.endDate ? moment(app.endDate).toDate() : null);
      setIsOnline(isOnline === app.isOnline);
      setType(app.appointmentType as string);
    } else {
      setPatientName("");
      setPurpose("");
      setStatus("");
      setStartDate(null);
      setEndDate(null);
      setIsOnline(false);
      setType("");
    }
  }, [app]);
  return (
    <>
      <div className="fixed flex justify-center inset-0 z-50 items-center h-screen w-full bg-black backdrop-blur bg-opacity-40">
        <form
          onSubmit={(e) => {
            if (app !== null) {
              hanldeUpdate(e, app.id as string);
            } else {
              handleAddAppointment(e);
            }
          }}
          className="bg-white relative w-[90%] h-[70%] md:w-[65%] mx-auto md:h-[80%] md:mt-10 overflow-auto rounded-md shadow-md"
        >
          <div className="bg-primary sticky top-0 flex justify-between items-center px-2 md:px-4 py-6">
            <p className="text-xl font-bold text-white">
              {app !== null ? "Update Appointment" : "New Appointment"}
            </p>
            <button
              onClick={() => {
                dispatch(resetUpdateApp());
                close();
              }}
            >
              <ImCross className="text-white" />
            </button>
          </div>
          <div className="flex justify-around px-1">
            <div className="flex flex-col justify-center mt-4 items-center gap-2 md:gap-3">
              <LuUserRound className="text-primary text-xl md:text-2xl" />
              <p className="text-primary text-sm md:text-base">PRACTITIONER</p>
              <p className="text-sm md:text-base">{user?.name}</p>
              <p className="font-semibold text-sm md:text-base">
                General Doctor
              </p>
            </div>
            <div className="flex flex-col justify-center items-center gap-1 md:gap-3 mt-5">
              <SlClock className="text-primary text-xl md:text-2xl" />
              <p className="text-primary text-sm md:text-base">DATE AND TIME</p>
              <p className="text-sm md:text-base">{date}</p>
              <p className="font-semibold text-sm md:text-base">{time}</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-1 md:gap-3 mt-5">
              <CiLocationOn className="text-primary text-xl md:text-2xl" />
              <p className="text-primary text-sm md:text-base">LOCATION</p>
              <p className="text-sm md:text-base">General clinic</p>
              <p className="font-semibold text-sm md:text-base">Room 1</p>
            </div>
          </div>
          <div className="mt-6 px-4 md:px-8 pr-5 md:pr-10 lg:pr-16">
            <div className="flex pt-10 justify-between items-center">
              <label htmlFor="Patient">Patient</label>
              <div className="w-[70%] flex gap-5 justify-between items-center">
                <Input
                  id="Patient"
                  type="text"
                  border="border"
                  placeholder="Patient"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  borderColor="border-gray-400"
                />
              </div>
            </div>
            <div className="flex pt-10 justify-between items-center">
              <label htmlFor="visit">Purpose of visit</label>
              <div className="w-[80%] md:w-[70%] flex gap-5 justify-between items-center">
                <textarea
                  name="visit"
                  id="visit"
                  placeholder="Purpose of visit"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  rows={4}
                  className="border w-full border-gray-400 rounded-md outline-none px-3 py-2"
                ></textarea>
              </div>
            </div>
            <div className="flex pt-10 justify-between items-center">
              <label htmlFor="start">Start Date & Time</label>
              <div className="w-[70%] flex gap-5 justify-between items-center">
                <input
                  type="datetime-local"
                  id="start"
                  value={
                    startDate
                      ? moment(startDate).format("YYYY-MM-DDTHH:mm")
                      : ""
                  }
                  onChange={(e) =>
                    setStartDate(
                      e.target.value ? new Date(e.target.value) : null
                    )
                  }
                  className="rounded-md border border-gray-400 py-2 px-3 w-full"
                />
              </div>
            </div>
            <div className="flex pt-10 justify-between items-center">
              <label htmlFor="end">End Date & Time</label>
              <div className="w-[70%] flex gap-5 justify-between items-center">
                <input
                  type="datetime-local"
                  id="end"
                  value={
                    endDate ? moment(endDate).format("YYYY-MM-DDTHH:mm") : ""
                  }
                  onChange={(e) =>
                    setEndDate(e.target.value ? new Date(e.target.value) : null)
                  }
                  className="rounded-md border border-gray-400 py-2 px-3 w-full"
                />
              </div>
            </div>
            <div className="flex pt-10 justify-between items-center">
              <label htmlFor="Status">Appointment Status</label>
              <div className="w-full md:w-[70%] flex flex-col md:flex-wrap lg:flex-row lg:items-center items-start gap-7 md:gap-6">
                <label>
                  <input
                    type="radio"
                    name="Confirm"
                    id=" Confirmation "
                    value={"Confirmation_Required"}
                    checked={status == "Confirmation_Required"}
                    onChange={(e) => setStatus(e.target.value)}
                    className="hidden peer"
                  />
                  <span className="peer-checked:bg-primary peer-checked:text-white bg-gray-300 rounded px-7 py-3">
                    Confirmation required
                  </span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="Confirm"
                    id="Confirmed"
                    value={"Confirmed"}
                    checked={status === "Confirmed"}
                    onChange={(e) => setStatus(e.target.value)}
                    className="hidden peer"
                  />
                  <span className="peer-checked:bg-primary peer-checked:text-white bg-gray-300 rounded px-7 py-3">
                    Confirmed
                  </span>
                </label>
              </div>
            </div>
            <div className="flex pt-10 justify-between items-center">
              <label htmlFor="type">Appointment type</label>
              <div className="w-[90%] md:w-[70%] flex flex-wrap md:items-center gap-7 md:gap-6">
                <label>
                  <input
                    type="radio"
                    name="type"
                    id="First time"
                    value={"First_Time"}
                    checked={type === "First_Time"}
                    onChange={(e) => setType(e.target.value)}
                    className="hidden peer"
                  />
                  <span className="peer-checked:bg-primary peer-checked:text-white bg-gray-300 rounded px-7 py-3">
                    First time
                  </span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    id="follow"
                    value={"Follow_Up_Visit"}
                    checked={type === "Follow_Up_Visit"}
                    onChange={(e) => setType(e.target.value)}
                    className="hidden peer"
                  />
                  <span className="peer-checked:bg-primary peer-checked:text-white bg-gray-300 rounded px-7 py-3">
                    Follow up visit
                  </span>
                </label>
              </div>
            </div>
            <div className="flex pt-10 gap-32 items-center">
              <label htmlFor="">Online Consultation</label>
              <button
                type="button"
                onClick={() => setIsOnline(!isOnline)}
                className={`flex items-center gap-2 border-2 rounded-md p-2 transition-all duration-700 ${
                  isOnline ? "border-primary" : "border-red-500"
                }`}
              >
                {isOnline ? (
                  <>
                    <span className={`text-primary font-bold`}>Yes</span>
                    <span className="text-white bg-primary rounded-md p-2">
                      <FaCheck />
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-white bg-red-500 rounded-md p-2">
                      <ImCross />
                    </span>
                    <span className="text-red-500 font-bold">No</span>
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="mt-16 flex items-center gap-3 px-4 md:px-8">
            <MdOutlineNotifications className="text-gray-400 text-3xl" />
            <p className="font-bold text-lg">Send notifications</p>
          </div>
          <p className="px-6 md:px-9 mt-2">
            Appointment confirmation and reminder messages will be automatically
            sent to clinic SMS notification settings.
          </p>
          <div className="my-10 flex justify-end items-center gap-4 pr-6 md:pr-16">
            <Button
              onClick={() => {
                dispatch(resetUpdateApp());
                close();
              }}
              text="Cancel"
              bg="bg-none"
              color="text-black"
              hBg="bg-none"
              borderColor="border-primary"
              borderWidth="border-2"
              hColor="text-black"
            />
            {isLoading ? (
              app === null ? (
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
                  type="button"
                  text="Updating..."
                  bg="bg-gray-400"
                  color="text-white"
                  hBg="bg-gray-400"
                  hColor="text-white"
                  borderWidth="border-2"
                  borderColor="border-gray-400"
                />
              )
            ) : app === null ? (
              <Button
                type="submit"
                text="Save"
                bg="bg-primary"
                color="text-white"
                hBg="bg-white"
                hColor="text-primary"
                borderColor="border-primary"
                borderWidth="border-2"
                hBorderColor="border-primary"
              />
            ) : (
              <Button
                type="submit"
                text="Update"
                bg="bg-primary"
                color="text-white"
                hBg="bg-white"
                hColor="text-primary"
                borderColor="border-primary"
                borderWidth="border-2"
                hBorderColor="border-primary"
              />
            )}
          </div>
        </form>
      </div>
    </>
  );
}
