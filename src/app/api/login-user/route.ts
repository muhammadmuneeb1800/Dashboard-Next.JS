import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  try {
    if (!session || !session.user || !session.user.email) {
      return new NextResponse("Unauthorized");
    }
    const user = await prisma.doctor.findUnique({
      where: { email: session?.user?.email as string },
    });
    if (!user) {
      return new NextResponse("User not found");
    }

    return NextResponse.json({
      message: "succesfully get user info",
      user: user,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error While Geting Session Data",
      error: error,
    });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const updatedDoctor = await prisma.doctor.update({
      where: { id: body.id },
      data: {
        name: body.name,
        email: body.email,
        companyName: body.companyName,
      },
    });

    return NextResponse.json({
      message: "succesfully updated user info",
      user: updatedDoctor,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error while PUTing Session user Data",
      error,
    });
  }
};
