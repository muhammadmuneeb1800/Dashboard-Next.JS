import { showToast } from "@/components/toast/Toast";
import { taskData } from "@/types/types";
import { axiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  task: [] as taskData[],
  updateTask: null as taskData | null,
  isLoading: false,
  error: null as string | null,
};

export const fetchTasksData = createAsyncThunk("fetchTasks", async () => {
  try {
    const response = await axiosInstance.get("/api/tasks");
    console.log("response", response);
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
        state.updateTask = null;
      }
    },
    resetUpdateTaskId: (state) => {
      state.updateTask = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTasksData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.task = action.payload || [];
      })
      .addCase(fetchTasksData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to fetch tasks";
      })

      .addCase(addTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.task = [action.payload, ...state.task];
      })
      .addCase(addTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to add task";
      })

      .addCase(updateTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.task =
          state.task.map((task) =>
            task.id === action.payload.id ? action.payload : task
          ) || [];
      })
      .addCase(updateTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to update task";
      })

      .addCase(deleteTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.task = state.task.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to delete task";
      });
  },
});

export const { updateTaskId, resetUpdateTaskId } = Task.actions;

export default Task.reducer;
