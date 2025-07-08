import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, role, applicationType } = await request.json();

    if (!name || !email || !role || !applicationType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey || resendApiKey === 'your_resend_api_key_here') {
      // API key not configured, return success but log that email wasn't sent
      console.log(`Email confirmation would be sent to ${email} for ${role} application (API key not configured)`);
      return NextResponse.json({ 
        success: true, 
        message: 'Application received (email confirmation not configured)' 
      });
    }

    // Removed roleDisplayNames as it is unused while email sending is disabled

    // Simulate success response for now
    return NextResponse.json({ success: true, message: 'Application received (email confirmation not sent)' });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}