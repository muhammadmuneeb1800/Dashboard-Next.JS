import { prisma } from "@/lib/prisma";
import { TaskStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  try {
    const { data } = await req.json();
    console.log("Incoming API Request:", data);

    if (!data?.id || !data?.status) {
      return NextResponse.json(
        { message: "Missing required fields: id or status" },
        { status: 400 }
      );
    }

    if (!Object.values(TaskStatus).includes(data.status)) {
      return NextResponse.json(
        { message: "Invalid status provided" },
        { status: 400 }
      );
    }

    const updatedTask = await prisma.tasks.update({
      where: { id: data.id },
      data: { status: data.status as TaskStatus },
    });

    return NextResponse.json(
      { message: "Task updated successfully", task: updatedTask },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { message: "Failed to update task", error: error },
      { status: 500 }
    );
  }
};
