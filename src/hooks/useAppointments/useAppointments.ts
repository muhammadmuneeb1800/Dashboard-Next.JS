"use client";
import { fetchAppointments } from "@/store/slices/appointmentSlice";
import { fetchPatientsData } from "@/store/slices/patientSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";

export const useGraphData = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAppointments());
    dispatch(fetchPatientsData());
  }, [dispatch]);
  const allAppointments =
    useAppSelector((store) => store.appointmentSlice.appointments) || [];
  const allPatients =
    useAppSelector((store) => store.patientSlice.patients) || [];
  const onlineAppointments = allAppointments.filter((a) => a.isOnline);
  const offlineAppointments = allAppointments.filter((a) => !a.isOnline);


const offlineAppointmentsFormatted = offlineAppointments.map((app) => ({
  isOnline: 1,
  startDate: new Date(app.startDate as Date).toISOString().slice(0, 10),
}));

const onlineAppointmentsFormatted = onlineAppointments.map((app) => ({
  isOnline: 0,
  startDate: new Date(app.startDate as Date).toISOString().slice(0, 10),
}));

console.log("Offline Appointments:", offlineAppointmentsFormatted);
console.log("Online Appointments:", onlineAppointmentsFormatted);

  return [
    {
      title: "Offline Consultations",
      number: offlineAppointments.length,
      upAndDown: "+3.11%",
      width: 200,
      icon: FaArrowAltCircleUp,
      chart: offlineAppointmentsFormatted,
    },
    {
      title: "Online Consultations",
      number: onlineAppointments.length,
      img: "/assets/images/graphRed.png",
      width: 240,
      upAndDown: "-20.9%",
      icon: FaArrowAltCircleUp,
      chart: onlineAppointmentsFormatted,
    },
    {
      title: "Total Patients",
      number: allPatients.length,
      width: 200,
    },
  ];
};
