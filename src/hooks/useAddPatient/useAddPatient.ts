"use client";
import { addPatientData } from "@/store/slices/patientSlice";
import { useAppDispatch } from "@/store/store";
import { getSession } from "next-auth/react";
import { useState } from "react";

export default function useAddPatient() {
  const [foreName, setForeName] = useState<string | null>();
  const [surName, setSurname] = useState<string | null>();
  const [dob, setDob] = useState<string | Date | null>();
  const [gender, setGender] = useState<string | null>();
  const [diagnosis, setDiagnosis] = useState<string | null>();
  const [notes, setNotes] = useState<string | null>();
  const [phoneNumber, setPhoneNumber] = useState<string | null>();
  const [status, setStatus] = useState<string | null>();
  const [appointmentDate, setAppointmentDate] = useState<string | null>();

  const dispatch = useAppDispatch();
  const handleAddPatient = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userId = await getSession();

    const patientData = {
      id: (userId?.user?.id as string) || null,
      name: foreName,
      surName: surName,
      diagnosis: diagnosis,
      status: status,
      dateTime: appointmentDate,
      dob: dob,
      sex: gender,
      notes: notes,
      phoneNumber: phoneNumber,
    };

    dispatch(addPatientData(patientData));
  };
  return {
    foreName,
    setForeName,
    surName,
    setSurname,
    dob,
    setDob,
    gender,
    setGender,
    diagnosis,
    setDiagnosis,
    notes,
    setNotes,
    phoneNumber,
    setPhoneNumber,
    status,
    setStatus,
    appointmentDate,
    setAppointmentDate,
    handleAddPatient,
  };
}
