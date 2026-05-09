import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, subject, message } = body;

    console.log("Contact form submission:", { firstName, lastName, email, subject, message });

    if (resend) {
      await resend.emails.send({
        from: "GHLAE Contact <onboarding@resend.dev>",
        to: "info@ghlae.henafekhome.com",
        subject: `New Contact Inquiry: ${subject}`,
        html: `
          <h3>New Message from GREAT HOPE Website</h3>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });
      return NextResponse.json({ success: true, message: "Email sent" });
    } else {
      console.warn("RESEND_API_KEY not found. Logging message to console instead.");
      return NextResponse.json({ success: true, message: "Log success (No API key)" });
    }
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
