import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { token, password } = body;
    const res = await prisma.doctor.findUnique({
      where: {
        resetToken: token as string,
      },
    });

    if (!res) {
      return NextResponse.json({ message: "Invalid token" });
    }
    await prisma.doctor.update({
      where: {
        id: res.id as string,
      },
      data: {
        password: password,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
    return NextResponse.json({ message: "Password reset successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error to reset password", error });
  }
};
