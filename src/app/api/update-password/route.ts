import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const password = await prisma.doctor.findUnique({
      where: { id: body.id },
    });
    if (!password) {
      return NextResponse.json(
        {
          message: "Password is required to update patient details",
        },
        {
          status: 401,
        }
      );
    }
    const hashPassword = await bcrypt.compare(
      body.oldPassword as string,
      password.password as string
    );
    if (!hashPassword) {
      return NextResponse.json(
        {
          message: "Incorrect password provided",
        },
        {
          status: 402,
        }
      );
    }
    const newHashPassword = await bcrypt.hash(body.newPassword, 10);
    const userUpdate = await prisma.doctor.update({
      where: { id: body.id },
      data: {
        password: newHashPassword,
      },
    });
    return NextResponse.json(
      {
        message: "Succesfully Update Patient",
        userUpdate: userUpdate,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json({ message: "error", error });
  }
};
