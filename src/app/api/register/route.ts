import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const existsUser = await prisma.doctor.findFirst({
      where: { email: body.email },
    });
    if (existsUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 401 }
      );
    }
    const user = await prisma.doctor.create({ data: body });
    return NextResponse.json(
      { message: "User registered successfully", user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({
      message: "error in POST register user",
      error: error,
    });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { id } = body;
    const updatedUser = await prisma.doctor.update({
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
