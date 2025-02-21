import { initialAppointment } from "@/types/types";
import { axiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialSate = {
  appointments: [] as initialAppointment[],
};

export const fetchAppointments = createAsyncThunk(
  "fetchappointmes",
  async () => {
    try {
      const response = await axiosInstance.get("api/appointments");
      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  }
);

export const createAppointments = createAsyncThunk(
  "createAppointments",
  async (appointment: initialAppointment) => {
    try {
      const response = await axiosInstance.post(
        "api/appointments",
        appointment
      );
      const data = await response.data;
      console.log("appointment from slice data ====", data);
      return data;
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  }
);

export const updateAppointments = createAsyncThunk(
  "updateAppointments",
  async (appointment: initialAppointment) => {
    try {
      const response = await axiosInstance.put(`api/appointments`, appointment);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  }
);

export const deleteAppointments = createAsyncThunk(
  "deleteAppointments",
  async (appointmentId: string) => {
    try {
      await axiosInstance.delete(`api/appointments/${appointmentId}`);
      return appointmentId;
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  }
);

const Appointment = createSlice({
  name: "appointment",
  initialState: initialSate,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAppointments.fulfilled, (state, action) => {
      state.appointments = action.payload || [];
    });
    builder.addCase(createAppointments.fulfilled, (state, action) => {
      state.appointments = [action.payload, ...state.appointments];
    });
    builder.addCase(updateAppointments.fulfilled, (state, action) => {
      const index = state.appointments.findIndex(
        (ap) => ap.id === action.payload.id
      );
      if (index > -1) {
        state.appointments[index] = action.payload;
      }
    });
    builder.addCase(deleteAppointments.fulfilled, (state, action) => {
      state.appointments = state.appointments.filter(
        (ap) => ap.id !== action.payload
      );
    });
  },
});

export default Appointment.reducer;
