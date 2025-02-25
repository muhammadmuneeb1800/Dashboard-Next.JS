import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const id = await getServerSession(authOptions);
    const patients = await prisma.patients.findMany({
      where: {
        doctorId: id?.user.id as string,
      },
    });
    return NextResponse.json({
      message: "Succesfully Fetch Patients",
      patients: patients,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error to GET", error: error });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const newPatient = await prisma.patients.create({
      data: {
        doctorId: body.doctorId,
        foreName: body.foreName,
        surName: body.surName,
        dob: body.dob,
        sex: body.sex,
        diagnosis: body.diagnosis,
        status: body.status,
        appointmentDate: body.appointmentDate,
        phoneNumber: body.phoneNumber,
      },
    });
    return NextResponse.json(
      {
        message: "Succesfully Create Patient",
        patient: newPatient,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("erro from api====", error);
    return NextResponse.json(
      { message: "Error to POST", error: error },
      { status: 501 }
    );
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const updatedPatient = await prisma.patients.update({
      where: { id: body.id as string },
      data: {
        foreName: body.foreName,
        surName: body.surName,
        dob: body.dob,
        sex: body.sex,
        diagnosis: body.diagnosis,
        status: body.status,
        appointmentDate: body.appointmentDate,
        phoneNumber: body.phoneNumber,
        doctorId: body.doctorId,
        updatedAt: new Date(),
      },
    });
    return NextResponse.json(
      {
        message: "Succesfully Update Patient",
        patient: updatedPatient,
      },
      { status: 205 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error to PUT", error: error });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { id } = body;
    await prisma.patients.delete({ where: { id: id } });
    return NextResponse.json({ message: "Succesfully Delete Patient" });
  } catch (error) {
    return NextResponse.json({ message: "Error to DELETE", error: error });
  }
};
