import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const appointments = await prisma.appointments.findMany();
    return NextResponse.json({
      message: "Succesfully Fetch Appointments",
      Appointments: appointments,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error to GET", error: error });
  }
};

export const POST = async (req: Request) => {
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
      data: body,
    });
    return NextResponse.json({
      message: "Succesfully Create Appointment",
      Appointment: newAppointment,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error to POST", error: error });
  }
};

export const PUT = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const body = await req.json();
    const updatedAppointment = await prisma.appointments.update({
      where: { id: id as string },
      data: body,
    });
    return NextResponse.json({
      message: "Succesfully Update Appointments",
      patient: updatedAppointment,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error to PUT", error: error });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();
    const { id } = body;
    await prisma.appointments.delete({ where: { id: id } });
    return NextResponse.json({ message: "Succesfully Delete Appointment" });
  } catch (error) {
    return NextResponse.json({ message: "Error to DELETE", error: error });
  }
};
