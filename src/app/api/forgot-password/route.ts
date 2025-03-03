import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (req: NextRequest) => {
  const { email } = await req.json();
  try {
    const user = await prisma.doctor.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 402 });
    }

    const resetToken = randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now() + 3600000);

    await prisma.doctor.update({
      where: { email: email },
      data: {
        resetToken: resetToken,
        resetTokenExpiry: tokenExpiry,
      },
    });

    const transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const reset_URL = `${process.env.NEXT_PUBLIC_NEXT_URL}/reset-password?token=${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "Password Reset",
      text: `<p>You requested a password reset. Click the link below to reset your password:</p>
             <a href="${reset_URL}" target="_blank">${reset_URL}</a>
             <p>This link will expire in 1 hour.</p>`,
    };

    await transport.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Reset token sent to your email" },
      { status: 202 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error to send Email", error: error });
  }
};
