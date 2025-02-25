"use client";
import { LineChart1 } from "@/components/charts/Charts";
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

  return [
    {
      title: "Offline Consultations",
      number: offlineAppointments.length,
      upAndDown: "+3.11%",
      width: 200,
      icon: FaArrowAltCircleUp,
      // chart: LineChart1,
    },
    {
      title: "Online Consultations",
      number: onlineAppointments.length,
      img: "/assets/images/graphRed.png",
      width: 240,
      upAndDown: "-20.9%",
      icon: FaArrowAltCircleUp,
    },
    {
      title: "Total Patients",
      number: allPatients.length,
      width: 200,
    },
  ];
};
