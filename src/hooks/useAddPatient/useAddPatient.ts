"use client";
import { showToast } from "@/components/toast/Toast";
import { addPatientData } from "@/store/slices/patientSlice";
import { useAppDispatch } from "@/store/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useAddPatient() {
  const [foreName, setForeName] = useState<string>();
  const [surName, setSurname] = useState<string>();
  const [dob, setDob] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [diagnosis, setDiagnosis] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [appointmentDate, setAppointmentDate] = useState<Date | null>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [error, setError] = useState<Record<string, string>>({});
  const dispatch = useAppDispatch();
  const currentuser = useSession();
  const router = useRouter();

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!foreName?.trim()) newErrors.foreName = "Forename is required";
    if (!surName?.trim()) newErrors.surName = "Surname is required";
    if (!diagnosis?.trim()) newErrors.diagnosis = "Diagnosis is required";
    if (!status?.trim()) newErrors.status = "Status is required";
    if (!status?.trim()) newErrors.Status = "Status are required";

    if (!dob) {
      newErrors.dob = "Date of birth is required";
    }

    const validGenders = ["Male", "Female"];
    if (!validGenders.includes(gender as string)) {
      newErrors.gender = "Invalid gender (Male, Female)";
    }

    if (!phoneNumber?.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10-15 digits";
    }

    if (!appointmentDate) {
      newErrors.appointmentDate = "Appointment date is required";
    } else {
      const appointment = new Date(appointmentDate);
      if (appointment < new Date()) {
        newErrors.appointmentDate = "Appointment date must be in the future";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      console.log("Validation failed", newErrors);
      return;
    }
    const doctorId = currentuser.data?.user?.id;

    const patientData = {
      doctorId: doctorId,
      foreName: foreName,
      surName: surName,
      dob: dob,
      sex: gender,
      diagnosis: diagnosis,
      status: status?.replace(" ", "_"),
      appointmentDate: appointmentDate,
      phoneNumber: phoneNumber,
    };

    try {
      await dispatch(addPatientData(patientData));
      showToast("success", "Patient added successfully");
      router.push("/dashboard/patients");
    } catch (error) {
      console.log("Error from the useAdd Patients", error);
    }

    setForeName("");
    setSurname("");
    setDob("");
    setGender("");
    setDiagnosis("");
    setStatus("");
    setPhoneNumber("");
    setStatus("");
    setAppointmentDate(null);
    setError({});
  };
  return {
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
  };
}
