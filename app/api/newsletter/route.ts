import { personalInfo } from "@/lib/constants";
import { Resend } from "resend";
import * as z from "zod";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const formSchema = z.object({
  email: z.email(),
});

export async function POST(req: Request) {
  if (!resend) {
    console.warn("[Newsletter] Resend API key not configured");
    return Response.json(
      { error: "Newsletter service is not configured" },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const result = formSchema.safeParse(body);

    if (!result.success) {
      return Response.json({ error: "Invalid email address" }, { status: 400 });
    }

    const { email } = result.data;

    await resend.contacts.create({
      email,
      firstName: "",
      lastName: "",
      unsubscribed: false,
    });

    await resend.emails.send({
      from: `Newsletter <newsletter@${personalInfo.baseUrl.replace("https://", "")}>`,
      to: email,
      subject: "Welcome to my newsletter!",
      html: `
        <h1>Thanks for subscribing!</h1>
        <p>You've successfully subscribed to my newsletter. I'll keep you updated with my latest posts and projects.</p>
        <p>Best,<br>${personalInfo.name}</p>
      `,
    });

    await resend.emails.send({
      from: `Newsletter <newsletter@${personalInfo.baseUrl.replace("https://", "")}>`,
      to: personalInfo.email,
      subject: "New newsletter subscription",
      text: `New subscriber: ${email}`,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("[Newsletter] Subscription failed:", error);

    if (error instanceof z.ZodError) {
      return Response.json({ error: "Invalid email format" }, { status: 400 });
    }

    return Response.json(
      { error: "Failed to subscribe. Please try again later." },
      { status: 500 }
    );
  }
}
