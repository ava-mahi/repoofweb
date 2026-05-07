import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    // TODO: Integrate with Supabase or email service (e.g., Resend, Mailchimp)
    console.log("Newsletter signup:", email);

    return NextResponse.redirect(new URL("/?subscribed=1", request.url));
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
