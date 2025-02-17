import { initilaData } from "@/types/types";
import { axiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  patients: [] as initilaData[],
};

export const fetchPatientsData = createAsyncThunk("fetchPatients", async () => {
  try {
    const response = await axiosInstance.get("/api/patients");
    const patients = await response?.data();
    return patients;
  } catch (error) {
    console.log(error);
  }
});

export const addPatientData = createAsyncThunk(
  "addPatients",
  async (user: initilaData) => {
    try {
      const response = await axiosInstance.post("/api/patients", user);
      const patient = await response?.data();
      return patient;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updatePatientData = createAsyncThunk(
  "updatePatients",
  async (user: initilaData) => {
    try {
      const response = await axiosInstance.put(
        `/api/patients/${user.id}`,
        user
      );
      const patient = await response?.data();
      return patient;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deletePatientData = createAsyncThunk(
  "deletePatients",
  async (id: string) => {
    try {
      await axiosInstance.delete(`/api/patients/${id}`);
      return id;
    } catch (error) {
      console.log(error);
    }
  }
);

const Patients = createSlice({
  name: "Patients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPatientsData.fulfilled, (state, action) => {
      state.patients = action.payload;
    });
    builder.addCase(addPatientData.fulfilled, (state, action) => {
      state.patients.push(action.payload);
    });
    builder.addCase(updatePatientData.fulfilled, (state, action) => {
      state.patients = state.patients.map((patient) =>
        patient.id === action.payload.id ? action.payload : patient
      );
    });
    builder.addCase(deletePatientData.fulfilled, (state, action) => {
      state.patients = state.patients.filter(
        (patient) => patient.id !== action.payload
      );
    });
  },
});

export default Patients.reducer;
