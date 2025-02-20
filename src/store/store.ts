import { configureStore } from "@reduxjs/toolkit";
import authentication from "@/store/slices/authSlice";
import patients from "@/store/slices/patientSlice";
import tasks from "@/store/slices/taskSlice";
import { useDispatch, useSelector, useStore } from "react-redux";

export const makeStore = () => {
  return configureStore({
    reducer: {
      authSlice: authentication,
      patientSlice: patients,
      tasksSlice: tasks,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
