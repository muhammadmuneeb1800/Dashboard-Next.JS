"use client";
import { fetchAppointments } from "@/store/slices/appointmentSlice";
import { fetchPatientsData } from "@/store/slices/patientSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { initialAppointment } from "@/types/types";
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

  const onlineAppointments = allAppointments.filter((a) => a.isOnline === true);
  const offlineAppointments = allAppointments.filter(
    (a) => a.isOnline === false
  );

  const getWeeklyAppointments = (appointments: initialAppointment[]) => {
    const weeklyData = new Array(7).fill(0);

    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7));
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    appointments.forEach((appt) => {
      if (!appt.createdAt) return;

      const apptDate = new Date(appt.createdAt);
      if (apptDate >= startOfWeek && apptDate <= endOfWeek) {
        const dayIndex = (apptDate.getDay() + 6) % 7;
        weeklyData[dayIndex] += 1;
      }
    });

    return weeklyData;
  };

  const offline = getWeeklyAppointments(offlineAppointments);
  const online = getWeeklyAppointments(onlineAppointments);
  const femaleCount = allPatients.filter((p) => p.sex === "Female").length;
  const maleCount = allPatients.length - femaleCount;

  console.log("new", offline);
  console.log("old", online);

  const thisWeekOfflineAppointments = offline.reduce(
    (sum, count) => sum + count,
    0
  );
  const thisWeekOnlineAppointments = online.reduce(
    (sum, count) => sum + count,
    0
  );
  const onlinePercentage = onlineAppointments
    ? ((thisWeekOnlineAppointments / onlineAppointments.length) * 100).toFixed(
        1
      ) + "%"
    : "0%";
  const offlinePercentage = offlineAppointments
    ? (
        (thisWeekOfflineAppointments / offlineAppointments.length) *
        100
      ).toFixed(1) + "%"
    : "0%";

  return [
    {
      title: "Offline Consultations",
      number: offlineAppointments.length,
      upAndDown: "+" + offlinePercentage,
      width: 200,
      icon: FaArrowAltCircleUp,
      chart: offline,
      type: "line",
      status: "offline",
    },
    {
      title: "Online Consultations",
      number: onlineAppointments.length,
      img: "/assets/images/graphRed.png",
      width: 240,
      upAndDown: "-" + onlinePercentage,
      icon: FaArrowAltCircleUp,
      chart: online,
      type: "line",
      status: "online",
    },
    {
      title: "Total Patients",
      number: allPatients.length,
      width: 200,
      chart: [
        { value: femaleCount, color: "blue" },
        { value: maleCount, color: "red" },
      ],
      type: "pie",
    },
  ];
};
