import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = await prisma.tasks.findMany();
    return NextResponse.json({
      message: "Successfully fetched tasks",
      tasks: response,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error", error });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    console.log("Task form API=========", body);
    const newTask = await prisma.tasks.create({
      data: {
        doctorId: body.doctorId,
        title: body.title,
        description: body.description,
        status: body.status,
      },
    });
    return NextResponse.json({
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error creating task", error });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const updatedTask = await prisma.tasks.update({
      where: { id: body.id },
      data: {
        title: body.title,
        description: body.description,
        status: body.status,
      },
    });
    return NextResponse.json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error updating task", error });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const body = await req.json();
    await prisma.tasks.delete({ where: { id: body.id } });
    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting task", error });
  }
};
