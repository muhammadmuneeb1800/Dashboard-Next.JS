import { configureStore } from "@reduxjs/toolkit";
import authentication from "@/store/slices/authSlice";
import patients from "@/store/slices/patientSlice";
import tasks from "@/store/slices/taskSlice";
import appointment from "@/store/slices/appointmentSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    authSlice: authentication,
    patientSlice: patients,
    tasksSlice: tasks,
    appointmentSlice: appointment,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
