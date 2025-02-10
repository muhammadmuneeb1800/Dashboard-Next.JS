import { CiLocationOn } from "react-icons/ci";
import { ImCross } from "react-icons/im";
import { LuUserRound } from "react-icons/lu";
import { SlClock } from "react-icons/sl";
import Input from "../input/Input";
import { MdOutlineNotifications } from "react-icons/md";
import Button from "../button/Button";

export default function AddSchedule() {
  return (
    <>
      <div className="bg-white w-full h-screen p-8">
        <div className="bg-primary flex justify-between items-center px-4 py-6">
          <p className="text-xl font-bold text-white">New Appointment</p>
          <ImCross className="text-white" />
        </div>
        <div className="flex justify-around items-center">
          <div className="flex flex-col justify-center items-center gap-5">
            <LuUserRound className="text-primary" />
            <p className="text-primary">PRACTITIONER</p>
            <p>John Doe</p>
            <p className="font-semibold">General Doctor</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            <SlClock className="text-primary" />
            <p className="text-primary">DATE AND TIME</p>
            <p>Tue, 26 October</p>
            <p className="font-semibold">9:00</p>
            <p className="text-primary">Change</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            <CiLocationOn className="text-primary" />
            <p className="text-primary">LOCATION</p>
            <p>General clinic</p>
            <p className="font-semibold">Room 1</p>
            <p className="text-primary">Change</p>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex pt-10 justify-between items-center">
            <label htmlFor="Patient">Patient</label>
            <div className="w-[70%] flex gap-5 justify-between items-center">
              <Input
                type="text"
                id="Patient"
                border="border"
                borderColor="border-gray-400"
              />
            </div>
          </div>
          <div className="flex pt-10 justify-between items-center">
            <label htmlFor="visit">Purpose of visit</label>
            <div className="w-[70%] flex gap-5 justify-between items-center">
              <textarea
                name="visit"
                id="visit"
                rows={4}
                className="border w-full border-gray-400 rounded outline-none px-3 py-2"
              ></textarea>
            </div>
          </div>
          <div className="flex pt-10 justify-between items-center">
            <label htmlFor="Status">Appointment Status</label>
            <div className="w-[70%] flex items-center gap-5">
              <label>
                <input
                  type="radio"
                  name="Confirm"
                  id=" Confirmation "
                  value={" Confirmation "}
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
                  className="hidden peer"
                />
                <span className="peer-checked:bg-primary peer-checked:text-white bg-gray-300 rounded px-7 py-3">
                  Confirmed
                </span>
              </label>
            </div>
          </div>
          <div className="flex pt-10 justify-between items-center">
            <label htmlFor="Duration">Duration</label>
            <div className="w-[70%] flex items-center gap-5">
              <label>
                <input
                  type="radio"
                  name="Duration"
                  id="10"
                  value={"10"}
                  className="hidden peer"
                />
                <span className="peer-checked:bg-primary peer-checked:text-white bg-gray-300 rounded px-7 py-3">
                  10&lsquo;
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  name="Duration"
                  id="30"
                  value={"30"}
                  className="hidden peer"
                />
                <span className="peer-checked:bg-primary peer-checked:text-white bg-gray-300 rounded px-7 py-3">
                  30&lsquo;
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  name="Duration"
                  id="45"
                  value={"45"}
                  className="hidden peer"
                />
                <span className="peer-checked:bg-primary peer-checked:text-white bg-gray-300 rounded px-7 py-3">
                  45&lsquo;
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  name="Duration"
                  id="60"
                  value={"60"}
                  className="hidden peer"
                />
                <span className="peer-checked:bg-primary peer-checked:text-white bg-gray-300 rounded px-7 py-3">
                  60&lsquo;
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  name="Duration"
                  id="90"
                  value={"90"}
                  className="hidden peer"
                />
                <span className="peer-checked:bg-primary peer-checked:text-white bg-gray-300 rounded px-7 py-3">
                  90&lsquo;
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  name="Duration"
                  id="120"
                  value={"120"}
                  className="hidden peer"
                />
                <span className="peer-checked:bg-primary peer-checked:text-white bg-gray-300 rounded px-7 py-3">
                  120&lsquo;
                </span>
              </label>
            </div>
          </div>
          <div className="flex pt-10 justify-between items-center">
            <label htmlFor="type">Appointment type</label>
            <div className="w-[70%] flex items-center gap-5">
              <label>
                <input
                  type="radio"
                  name="type"
                  id="First time"
                  value={"First time"}
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
                  value={"follow"}
                  className="hidden peer"
                />
                <span className="peer-checked:bg-primary peer-checked:text-white bg-gray-300 rounded px-7 py-3">
                  Follow up visit
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-3">
          <MdOutlineNotifications className="text-gray-400" />
          <p className="font-bold text-lg">Send notifications</p>
        </div>
        <p>
          Appointment confirmation and reminder messages will be automatically
          sent to clinic SMS notification settings.
        </p>
        <div className="mt-10 flex justify-end items-center gap-4">
          <Button
            text="Cancel"
            bg="bg-none"
            color="text-black"
            hBg="bg-none"
            hColor="text-black"
          />
          <Button
            text="Begin Appointment"
            bg="bg-primary"
            color="text-white"
            hBg="bg-white"
            hColor="text-primary"
          />
          <Button
            text="Save"
            bg="bg-white"
            color="text-primary"
            hBg="bg-primary"
            hColor="text-white"
          />
        </div>
      </div>
    </>
  );
}
