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
    const exitsAppointments = await prisma.appointments.findFirst({
      where: { patientName: body.patientName },
    });
    if (exitsAppointments) {
      return NextResponse.json({
        message: "Patient already has an appointment",
      });
    }
    const newAppointment = await prisma.appointments.create({
      data: {
        doctorId: body.doctorId,
        doctorName: body.doctorName,
        patientName: body.patientName,
        purposeOfVisit: body.purposeOfVisit,
        appointmentStatus: body.appointmentStatus,
        startDate: body.startDate,
        endDate: body.endDate,
        appointmentType: body.appointmentType,
        isOnline: body.isOnline,
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

export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();
    console.log("put request form body", body);
    const updatedAppointment = await prisma.appointments.update({
      where: { id: body.id as string },
      data: {
        doctorId: body.doctorId,
        doctorName: body.doctorName,
        patientName: body.patientName,
        purposeOfVisit: body.purposeOfVisit,
        appointmentStatus: body.appointmentStatus,
        startDate: body.startDate,
        endDate: body.endDate,
        appointmentType: body.appointmentType,
        isOnline: body.isOnline,
      },
    });
    return NextResponse.json({
      message: "Succesfully Update Appointments",
      appointment: updatedAppointment,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error to PUT", error: error });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { id } = body;
    await prisma.appointments.delete({ where: { id: id } });
    return NextResponse.json({ message: "Succesfully Delete Appointment" });
  } catch (error) {
    return NextResponse.json({ message: "Error to DELETE", error: error });
  }
};
