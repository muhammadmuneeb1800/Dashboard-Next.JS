import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const patients = await prisma.patients.findMany();
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
    console.log("user form API=========", body);
    const exitPatient = await prisma.patients.findFirst({
      where: { foreName: body.foreName },
    });
    console.log("into post... ", exitPatient);
    if (exitPatient) {
      return NextResponse.json(
        { message: "Patient already exists" },
        { status: 401 }
      );
    }

    const newPatient = await prisma.patients.create({
      data: body,
    });

    console.log("Newly created... ", newPatient);
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

export const PUT = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const body = await req.json();
    const updatedPatient = await prisma.patients.update({
      where: { id: id as string },
      data: body,
    });
    return NextResponse.json({
      message: "Succesfully Update Patient",
      patient: updatedPatient,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error to PUT", error: error });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();
    const { id } = body;
    await prisma.patients.delete({ where: { id: id } });
    return NextResponse.json({ message: "Succesfully Delete Patient" });
  } catch (error) {
    return NextResponse.json({ message: "Error to DELETE", error: error });
  }
};
