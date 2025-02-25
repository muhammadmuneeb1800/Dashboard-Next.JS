import { showToast } from "@/components/toast/Toast";
import { taskData } from "@/types/types";
import { axiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  task: [] as taskData[],
  updateTask: {} as taskData | null,
};

export const fetchTasksData = createAsyncThunk("fetchTasks", async () => {
  try {
    const response = await axiosInstance.get("/api/tasks");
    return response?.data?.tasks || [];
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
});

export const addTasks = createAsyncThunk("addTasks", async (task: taskData) => {
  try {
    const response = await axiosInstance.post("/api/tasks", task);
    return response?.data?.task || [];
  } catch (error) {
    console.error("Error adding task:", error);
  }
});

export const updateTasks = createAsyncThunk(
  "updateTasks",
  async (task: taskData) => {
    try {
      const response = await axiosInstance.put(`/api/tasks`, task);
      if (response.status === 401) {
        showToast("error", "Error updating tasks");
        return;
      }
      return response?.data?.task || [];
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }
);

export const deleteTasks = createAsyncThunk(
  "deleteTasks",
  async (id: string) => {
    try {
      await axiosInstance.delete(`/api/tasks`, { data: { id } });
      return id;
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }
);

export const updateTaskCheckBox = createAsyncThunk(
  "updateTaskCheckBox",
  async ({ id, status }: { id: string; status: string }) => {
    try {
      const response = await axiosInstance.put(`/api/task-checkbox`, {
        data: { id, status },
      });
      return response?.data?.task || [];
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  }
);

const Task = createSlice({
  name: "task",
  initialState,
  reducers: {
    updateTaskId: (state, action) => {
      const taskToUpdate = state.task.find(
        (task) => task.id === action.payload
      );
      if (taskToUpdate) {
        state.updateTask = taskToUpdate;
      } else {
        console.log("task not found in state");
        state.updateTask = null;
      }
    },
    resetUpdateTaskId: (state) => {
      state.updateTask = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasksData.fulfilled, (state, action) => {
      state.task = action.payload || [];
    });
    builder.addCase(addTasks.fulfilled, (state, action) => {
      state.task = [action.payload, ...state.task];
    });
    builder.addCase(updateTasks.fulfilled, (state, action) => {
      state.task =
        state.task.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ) || [];
    });
    builder.addCase(deleteTasks.fulfilled, (state, action) => {
      state.task = state.task.filter((task) => task.id !== action.payload);
    });
  },
});

export const { updateTaskId, resetUpdateTaskId } = Task.actions;

export default Task.reducer;
