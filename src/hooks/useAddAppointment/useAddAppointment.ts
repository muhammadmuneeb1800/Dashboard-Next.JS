"use client";
import { showToast } from "@/components/toast/Toast";
import { createAppointments } from "@/store/slices/appointmentSlice";
import { useAppDispatch } from "@/store/store";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function useAddAppointment(close: () => void) {
  const [patientName, setPatientName] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [type, setType] = useState<string>("");
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const handleAddAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!patientName) {
      newErrors.patient = "Patient is required";
      showToast("error", "Patient is required");
      return;
    }
    if (!purpose) {
      newErrors.purpose = "Purpose is required";
      showToast("error", "Purpose is required");
      return;
    }
    if (!status) {
      newErrors.status = "Status is required";
      showToast("error", "Status is required");
      return;
    }
    if (!startDate) {
      newErrors.startDate = "Start date is required";
      showToast("error", "Start date is required");
      return;
    }
    if (!endDate) {
      newErrors.endDate = "End date is required";
      showToast("error", "End date is required");
      return;
    }
    if (!type) {
      newErrors.type = "Type is required";
      showToast("error", "Type is required");
      return;
    }
    if (startDate && endDate && startDate > endDate) {
      newErrors.startDate = "Start date cannot be after end date";
      showToast("error", "Start date cannot be after end date");
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log("Validation failed", newErrors);
      return;
    }

    const appointmentData = {
      doctorId: session?.user.id as string,
      doctorName: session?.user.name as string,
      patientName: patientName,
      purposeOfVisit: purpose,
      appointmentStatus: status.replace(" ", "_"),
      startDate: startDate,
      endDate: endDate,
      appointmentType: type.replaceAll(" ", "_"),
      isOnline: isOnline,
    };

    try {
      await dispatch(createAppointments(appointmentData));
      console.log("appointment from hook ====", appointmentData);
      close();
      showToast("success", "Appointment created successfully");
    } catch (error) {
      console.log("Error adding appointment", error);
      showToast("error", "Error adding appointment");
    }

    setPatientName("");
    setPurpose("");
    setStatus("");
    setStartDate(null);
    setEndDate(null);
    setType("");
    setIsOnline(false);
  };
  return {
    patientName,
    setPatientName,
    purpose,
    setPurpose,
    status,
    setStatus,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    type,
    setType,
    isOnline,
    setIsOnline,
    errors,
    handleAddAppointment,
  };
}
