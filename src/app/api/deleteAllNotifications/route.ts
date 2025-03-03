import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const DELETE = async () => {
  try {
    const session = await getServerSession(authOptions);
    const response = await prisma.notifications.deleteMany({
      where: {
        doctorId: session?.user?.id as string,
      },
    });
    return NextResponse.json({ message: "Delete All Notifications", response });
  } catch (error) {
    return NextResponse.json({ message: "Error to delete All", error });
  }
};
