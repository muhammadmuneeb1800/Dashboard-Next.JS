import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const existsUser = await prisma.user.findFirst({
      where: { email: body.email },
    });
    if (existsUser) {
      return NextResponse.json({ message: "User already exists" });
    }
    const user = await prisma.user.create({ data: body });
    return NextResponse.json({ message: "User registered successfully", user });
  } catch (error) {
    return NextResponse.json({
      message: "error in POST register user",
      error: error,
    });
  }
};

export const PUT = async (req: Request) => {
  try {
    const body = await req.json();
    const { id } = body;
    const updatedUser = await prisma.user.update({
      where: { id: id as string },
      data: body,
    });
    return NextResponse.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error in PUT update user",
      error: error,
    });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();
    const { id } = body;
    await prisma.user.delete({ where: { id: id as string } });
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json({
      message: "Error in DELETE delete user",
      error: error,
    });
  }
};
