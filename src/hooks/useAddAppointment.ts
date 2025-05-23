"use client";
import { showToast } from "@/components/toast/Toast";
import {
  createAppointments,
  fetchAppointments,
  resetUpdateApp,
  updateAppointments,
} from "@/store/slices/appointmentSlice";
import { addNotification } from "@/store/slices/notificationSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useAddAppointment(close: () => void) {
  const user = useAppSelector((store) => store.authSlice.user) || [];
  const [patientName, setPatientName] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [type, setType] = useState<string>("");
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const date = moment(new Date()).format("ddd, DD MMMM");
  const time = moment(new Date()).format("h:mm");
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const app =
    useAppSelector((store) => store.appointmentSlice.updateApp) || null;
  useEffect(() => {
    if (app !== null) {
      setPatientName(app.patientName as string);
      setPurpose(app.purposeOfVisit as string);
      setStatus(app.appointmentStatus as string);
      setStartDate(app.startDate ? moment(app.startDate).toDate() : null);
      setEndDate(app.endDate ? moment(app.endDate).toDate() : null);
      setIsOnline(isOnline === app.isOnline);
      setType(app.appointmentType as string);
    }
  }, []);

  const formValidation = async () => {
    const newErrors: Record<string, string> = {};
    if (!patientName) {
      newErrors.patient = "Patient is required";
      showToast("error", "Patient is required");
      setIsLoading(false);
      return false;
    }
    if (!purpose) {
      newErrors.purpose = "Purpose is required";
      showToast("error", "Purpose is required");
      setIsLoading(false);
      return false;
    }
    if (!status) {
      newErrors.status = "Status is required";
      showToast("error", "Status is required");
      setIsLoading(false);
      return false;
    }
    if (!startDate) {
      newErrors.startDate = "Start date is required";
      showToast("error", "Start date is required");
      setIsLoading(false);
      return false;
    }
    if (!endDate) {
      newErrors.endDate = "End date is required";
      showToast("error", "End date is required");
      setIsLoading(false);
      return false;
    }
    if (!type) {
      newErrors.type = "Type is required";
      showToast("error", "Type is required");
      setIsLoading(false);
      return false;
    }
    if (startDate && endDate && startDate > endDate) {
      newErrors.startDate = "Start date cannot be after end date";
      showToast("error", "Start date cannot be after end date");
      setIsLoading(false);
      return false;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return false;
    }
    return true;
  };

  const handleAddAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const isValid = await formValidation();
    if (!isValid) {
      setIsLoading(false);
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
    const notificationString = `Congratulations, Doctor
     ${session?.user.name}. Your patient's (${patientName}) appointment has been successfully added.`;
    const notification = {
      doctorId: session?.user.id as string,
      data: notificationString,
    };
    try {
      const res = await dispatch(createAppointments(appointmentData));
      if (res) {
        await dispatch(addNotification(notification));
        setIsLoading(false);
        close();
        showToast("success", "Appointment created successfully");
        await dispatch(fetchAppointments());
      } else {
        showToast("error", "Error adding appointment");
      }
    } catch (error) {
      console.log("Error adding appointment", error);
      showToast("error", "Error adding appointment");
    } finally {
      setIsLoading(false);
    }
    setPatientName("");
    setPurpose("");
    setStatus("");
    setStartDate(null);
    setEndDate(null);
    setType("");
    setIsOnline(false);
  };

  const hanldeUpdate = async (e: React.FormEvent, id: string) => {
    e.preventDefault();
    setIsLoading(true);
    const isValid = await formValidation();
    if (!isValid) {
      setIsLoading(false);
      return;
    }
    const appointmentData = {
      id: id,
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
    const notificationString = `Congratulations, Doctor
     ${session?.user.name}. Your patient's (${patientName}) appointment has been successfully updated.`;
    const notification = {
      doctorId: session?.user.id as string,
      data: notificationString,
    };
    try {
      await dispatch(updateAppointments(appointmentData));
      await dispatch(addNotification(notification));
      setIsLoading(false);
      close();
      showToast("success", "Appointment Update successfully");
    } catch (error) {
      console.log("Error Update appointment", error);
      showToast("error", "Error Update appointment");
    }
    setPatientName("");
    setPurpose("");
    setStatus("");
    setStartDate(null);
    setEndDate(null);
    setType("");
    setIsOnline(false);
  };

  const modalClose = () => {
    dispatch(resetUpdateApp());
    close();
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
    isLoading,
    isOnline,
    setIsOnline,
    errors,
    date,
    time,
    user,
    dispatch,
    hanldeUpdate,
    handleAddAppointment,
    app,
    modalClose,
  };
}
