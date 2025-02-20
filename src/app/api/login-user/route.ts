import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  try {
    // if (!session || !session.user || !session.user.email) {
    //   return new NextResponse("Unauthorized");
    // }
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
