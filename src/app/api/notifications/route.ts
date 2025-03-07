import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);
    const notification = await prisma.notifications.findMany({
      where: {
        doctorId: session?.user.id as string,
      },
    });
    return NextResponse.json({
      message: "Succesfully Fetch notification",
      notification: notification,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error to GET", error: error });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const newAppointment = await prisma.notifications.create({
      data: {
        doctorId: body.doctorId,
        data: body.data,
      },
    });
    return NextResponse.json({
      message: "Succesfully Create Appointment",
      Appointment: newAppointment,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error to POST", error: error });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { id } = body;
    await prisma.notifications.delete({ where: { id: id } });
    return NextResponse.json({ message: "Succesfully Delete Appointment" });
  } catch (error) {
    return NextResponse.json({ message: "Error to DELETE", error: error });
  }
};
