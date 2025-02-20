import { taskData } from "@/types/types";
import { axiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  task: [] as taskData[],
};

export const fetchTasksData = createAsyncThunk("fetchTasks", async () => {
  try {
    const response = await axiosInstance.get("/api/tasks");
    return response?.data || [];
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
});

export const addTasks = createAsyncThunk("addTasks", async (task: taskData) => {
  try {
    const response = await axiosInstance.post("/api/tasks", task);
    console.log("fomsdkfllflsdfldfsdhkhsdkkhsd", response);
    return response?.data || [];
  } catch (error) {
    console.error("Error adding task:", error);
  }
});

export const updateTasks = createAsyncThunk(
  "updateTasks",
  async (task: taskData) => {
    try {
      const response = await axiosInstance.put(`/api/tasks/$`, task);
      return response?.data || [];
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }
);

export const deleteTasks = createAsyncThunk(
  "deleteTasks",
  async (id: string) => {
    try {
      await axiosInstance.delete(`/api/tasks/${id}`);
      return id;
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }
);

const Task = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasksData.fulfilled, (state, action) => {
      state.task = action.payload || [];
    });
    builder.addCase(addTasks.fulfilled, (state, action) => {
      state.task = [action.payload, ...state.task];
    });
    builder.addCase(updateTasks.fulfilled, (state, action) => {
      const index = state.task.findIndex(
        (task) => task?.id === action.payload._id
      );
      if (index !== -1) {
        state.task[index] = action.payload;
      }
    });
  },
});

export default Task.reducer;
