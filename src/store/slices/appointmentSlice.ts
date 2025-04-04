import { initialAppointment } from "@/types/types";
import { axiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialSate = {
  appointments: [] as initialAppointment[],
  updateApp: null as initialAppointment | null,
  isLoading: false,
  error: null as string | null,
};

export const fetchAppointments = createAsyncThunk(
  "fetchappointmes",
  async () => {
    try {
      const response = await axiosInstance.get("api/appointments");
      const data = await response.data;
      return data.Appointments;
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
      const data = (await response?.data?.appointment) || {};
      return data;
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  }
);

export const deleteAppointments = createAsyncThunk(
  "deleteAppointments",
  async (id: string) => {
    try {
      await axiosInstance.delete(`api/appointments`, {
        data: { id },
      });
      return id;
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  }
);

const Appointment = createSlice({
  name: "appointment",
  initialState: initialSate,
  reducers: {
    updateApp: (state, action) => {
      const appUpdate = state.appointments.find(
        (app) => app.id === action.payload.id
      );
      state.updateApp = appUpdate || null;
    },
    resetUpdateApp: (state) => {
      state.updateApp = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments = action.payload || [];
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to fetch appointments";
      })

      .addCase(createAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments = [action.payload, ...state.appointments];
      })
      .addCase(createAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to create appointment";
      })

      .addCase(updateAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments =
          state.appointments.map((app) =>
            app.id === action.payload.id ? action.payload : app
          ) || [];
      })
      .addCase(updateAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to update appointment";
      })

      .addCase(deleteAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments =
          state.appointments.filter((ap) => ap.id !== action.payload) || [];
      })
      .addCase(deleteAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to delete appointment";
      });
  },
});

export const { updateApp, resetUpdateApp } = Appointment.actions;
export default Appointment.reducer;
