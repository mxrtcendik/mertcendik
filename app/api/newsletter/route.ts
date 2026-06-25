import * as z from "zod";

const buttondownApiKey = process.env.BUTTONDOWN_API_KEY;

const formSchema = z.object({
  email: z.email(),
});

function getButtondownErrorMessage(data: unknown) {
  if (!data || typeof data !== "object") {
    return "Failed to subscribe. Please try again later.";
  }

  const error = data as Record<string, unknown>;

  if (typeof error.detail === "string") {
    return error.detail;
  }

  if (Array.isArray(error.email_address) && typeof error.email_address[0] === "string") {
    return error.email_address[0];
  }

  if (Array.isArray(error.email) && typeof error.email[0] === "string") {
    return error.email[0];
  }

  if (typeof error.message === "string") {
    return error.message;
  }

  return "Failed to subscribe. Please try again later.";
}

export async function POST(req: Request) {
  if (!buttondownApiKey) {
    console.warn("[Newsletter] Buttondown API key not configured");
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

    const response = await fetch("https://api.buttondown.com/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Token ${buttondownApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_address: email }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      const message = getButtondownErrorMessage(data);

      return Response.json({ error: message }, { status: response.status });
    }

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
