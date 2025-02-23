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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const router = useRouter();

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!foreName?.trim()) {
      showToast("error", "Forename is required");
      setIsLoading(false);
      return;
    }
    if (!surName?.trim()) {
      showToast("error", "Surname is required");
      setIsLoading(false);
      return;
    }
    if (!diagnosis?.trim()) {
      showToast("error", "Diagnosis is required");
      setIsLoading(false);
      return;
    }
    if (!status?.trim()) {
      showToast("error", "Status is required");
      setIsLoading(false);
      return;
    }
    if (!dob) {
      showToast("error", "Date of birth is required");
      setIsLoading(false);
      return;
    }

    const validGenders = ["Male", "Female"];
    if (!validGenders.includes(gender as string)) {
      showToast("error", "Sex is Require (Male) & (Female)");
      setIsLoading(false);
      return;
    }

    if (!phoneNumber?.trim()) {
      showToast("error", "Phone number is required");
      setIsLoading(false);
      return;
    } else if (!/^\d{10,15}$/.test(phoneNumber)) {
      showToast("error", "Phone number must be 10-15 digits");
      setIsLoading(false);
      return;
    }

    if (!appointmentDate) {
      showToast("error", "Appointment date is required");
      setIsLoading(false);
      return;
    } else {
      const appointment = new Date(appointmentDate);
      if (appointment < new Date()) {
        showToast("error", "Appointment date must be in the future");
        setIsLoading(false);
        return;
      }
    }

    const doctorId = session?.user?.id;
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
  };
  return {
    foreName,
    setForeName,
    surName,
    setSurname,
    dob,
    setDob,
    setGender,
    gender,
    diagnosis,
    setDiagnosis,
    setStatus,
    phoneNumber,
    setPhoneNumber,
    appointmentDate,
    isLoading,
    dispatch,
    router,
    setAppointmentDate,
    handleAddPatient,
  };
}
