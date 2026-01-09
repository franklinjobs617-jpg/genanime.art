// app/api/feedback/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_LgHHkE85_KVTAgAU1Bw68XWBx5SG9GRSv");

export async function POST(request: Request) {
    try {
        const { message, contact } = await request.json();
        if (!message) {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 }
            );
        }

        const data = await resend.emails.send({
            from: "amine Feedback <onboarding@resend.dev>",
            to: "nice2culuvs@gmail.com",
            subject: "📢 New User Feedback",
            html: `
        <h2>New Feedback Received</h2>
        <p><strong>Message:</strong></p>
        <blockquote style="background: #f9f9f9; padding: 10px; border-left: 3px solid #ccc;">
          ${message}
        </blockquote>
        <p><strong>Contact Info:</strong> ${contact || "Anonymous"}</p>
      `,
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Feedback Error:", error);
        return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
        );
    }
}
