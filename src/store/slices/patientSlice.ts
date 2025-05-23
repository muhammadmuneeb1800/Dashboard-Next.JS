import { showToast } from "@/components/toast/Toast";
import { InitialData } from "@/types/types";
import { axiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  patients: [] as InitialData[],
  updatePatientData: null as InitialData | null,
  isLoading: false,
  error: null as string | null,
};

export const fetchPatientsData = createAsyncThunk(
  "patients/fetchPatients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("api/patients");
      return response?.data?.patients || [];
    } catch (error) {
      console.error("Error fetching patients:", error);
      return rejectWithValue("Failed to fetch patients");
    }
  }
);

export const addPatientData = createAsyncThunk(
  "patients/addPatients",
  async (user: InitialData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post("api/patients", user);
      if (response.status === 501) {
        showToast("error", "Server error. Please try again later.");
        return rejectWithValue("Server error");
      }
      const patient = response?.data || {};
      dispatch(fetchPatientsData());
      return patient;
    } catch (error) {
      console.error("Error creating patient:", error);
      return rejectWithValue("Failed to create patient");
    }
  }
);

export const updatePatientDataThunk = createAsyncThunk(
  "patients/updatePatients",
  async (user: InitialData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.put("api/patients", user);
      if (response.status !== 200) {
        showToast("error", "Failed to update patient.");
        return rejectWithValue("Update failed");
      }
      const updatedPatient = response?.data;
      dispatch(fetchPatientsData());
      return updatedPatient;
    } catch (error) {
      console.error("Error updating patient:", error);
      return rejectWithValue("Failed to update patient");
    }
  }
);

export const deletePatientData = createAsyncThunk(
  "patients/deletePatients",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      await axiosInstance.delete("api/patients", { data: { id } });
      dispatch(fetchPatientsData());
      return id;
    } catch (error) {
      console.error("Error deleting patient:", error);
      return rejectWithValue("Failed to delete patient");
    }
  }
);

const PatientsSlice = createSlice({
  name: "Patients",
  initialState,
  reducers: {
    updatePatient: (state, action) => {
      const patientToUpdate = state.patients.find(
        (patient) => patient.id === action.payload
      );
      state.updatePatientData = patientToUpdate || null;
    },
    resetUpdatePatientData: (state) => {
      state.updatePatientData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPatientsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patients = action.payload || [];
      })
      .addCase(fetchPatientsData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to fetch patients data";
      })

      .addCase(addPatientData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patients = [action.payload, ...state.patients];
      })
      .addCase(addPatientData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to add patient data";
      })

      .addCase(updatePatientDataThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patients =
          state.patients.map((patient) =>
            patient.id === action.payload.id ? action.payload : patient
          ) || [];
      })
      .addCase(updatePatientDataThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to update patient data";
      })

      .addCase(deletePatientData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patients =
          state.patients.filter((patient) => patient.id !== action.payload) ||
          [];
      })
      .addCase(deletePatientData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to delete patient data";
      });
  },
});

export const { updatePatient, resetUpdatePatientData } = PatientsSlice.actions;
export default PatientsSlice.reducer;
