import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// export const GET = async () => {
//   try {
//     const session = await auth();
//     if (!session) {
//       return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
//     }
//     const user = await prisma.user.findUnique({
//       where: { email: session.user?.email as string },
//     });
//     return NextResponse.json({ message: "Hello", user }, { status: 215 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Error in GET hello", error: error },
//       { status: 405 }
//     );
//   }
// };

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const existsUser = await prisma.user.findFirst({
      where: { email: body.email },
    });
    if (existsUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 401 }
      );
    }
    const user = await prisma.user.create({ data: body });
    return NextResponse.json(
      { message: "User registered successfully", user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({
      message: "error in POST register user",
      error: error,
    });
  }
};

export const PUT = async (req: Request) => {
  try {
    const body = await req.json();
    const { id } = body;
    const updatedUser = await prisma.user.update({
      where: { id: id as string },
      data: body,
    });
    return NextResponse.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error in PUT update user",
      error: error,
    });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();
    const { id } = body;
    await prisma.user.delete({ where: { id: id as string } });
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json({
      message: "Error in DELETE delete user",
      error: error,
    });
  }
};
