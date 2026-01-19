import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // In a production environment, you would integrate with an email service here
    // For example: Resend, SendGrid, Nodemailer with SMTP, etc.
    // For now, we'll simulate sending the email by logging the data
    
    console.log('Contact form submitted:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    });

    // Simulate email sending (in real implementation, this would be an actual email service)
    // For demo purposes, we'll just return success
    return NextResponse.json({
      message: 'Message received! We will get back to you soon.',
      success: true
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}