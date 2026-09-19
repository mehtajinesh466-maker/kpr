import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { parentFirstName, parentLastName, studentFullName, email, contactNumber, whatsappNumber, message } = body;

    if (!parentFirstName || !studentFullName || !contactNumber) {
      return NextResponse.json(
        { error: "Parent Name, Student Name, and Contact Number are required." },
        { status: 400 }
      );
    }

    // Log the submission payload (and can be extended for database insertion or email sending)
    console.log("New Demo Booking Inquiry:", {
      parentFirstName,
      parentLastName,
      studentFullName,
      email,
      contactNumber,
      whatsappNumber,
      message,
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Demo booking request received successfully!",
      data: {
        parentFirstName,
        studentFullName,
        contactNumber,
      },
    });
  } catch (error) {
    console.error("Error processing demo booking:", error);
    return NextResponse.json(
      { error: "Failed to submit demo booking request." },
      { status: 500 }
    );
  }
}
