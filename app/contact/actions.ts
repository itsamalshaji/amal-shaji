"use server";

import { parseContact } from "@/lib/contact";
import type { FormState } from "@/components/contact-form";

// ponytail: spam defence is a honeypot only; add rate limiting (Vercel WAF or Upstash) if junk starts arriving.
export async function sendMessage(_prev: FormState, data: FormData): Promise<FormState> {
  // Bots fill every field; people never see this one. Report success so they don't retry.
  if (String(data.get("website") ?? "")) return { status: "sent" };

  const { fields, error } = parseContact(Object.fromEntries(data));
  if (error) return { status: "error", message: error, fields };

  const key = process.env.RESEND_API_KEY;
  if (!key) return { status: "error", message: "The form isn't connected to email yet.", fields };

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
        to: process.env.CONTACT_TO ?? "itsamalshaji@gmail.com",
        reply_to: fields.email,
        subject: `Portfolio enquiry: ${fields.name}${fields.topic ? ` (${fields.topic})` : ""}`,
        text: `From: ${fields.name} <${fields.email}>\nCompany: ${fields.company || "—"}\nAbout: ${fields.topic || "—"}\n\n${fields.message}`,
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
  } catch (e) {
    console.error("contact form:", e);
    return { status: "error", message: "The message couldn't be sent just now.", fields };
  }
  return { status: "sent" };
}
