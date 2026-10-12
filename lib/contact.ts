export type ContactFields = { name: string; email: string; company: string; topic: string; message: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

/** Normalises raw form input and returns either the cleaned fields or the reason they were refused. */
export function parseContact(raw: Record<string, unknown>): { fields: ContactFields; error?: string } {
  const fields: ContactFields = {
    name: clean(raw.name, 120).replace(/[\r\n]+/g, " "),
    email: clean(raw.email, 200),
    company: clean(raw.company, 160).replace(/[\r\n]+/g, " "),
    topic: clean(raw.topic, 60).replace(/[\r\n]+/g, " "),
    message: clean(raw.message, 5000),
  };
  if (!fields.name) return { fields, error: "Please add your name." };
  if (!EMAIL.test(fields.email)) return { fields, error: "That email address doesn't look right." };
  if (fields.message.length < 10) return { fields, error: "Please write a short message (10 characters or more)." };
  return { fields };
}
