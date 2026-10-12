"use client";

import { useActionState } from "react";
import { sendMessage } from "@/app/contact/actions";
import type { ContactFields } from "@/lib/contact";

export type FormState = { status: "idle" | "sent" | "error"; message?: string; fields?: ContactFields };

const email = "itsamalshaji@gmail.com";
const topics = ["A role on your team", "A website", "An online store", "A web app", "Something else"];

const field =
  "mt-2 w-full border-b border-line bg-transparent pb-3 text-lg text-bone outline-none transition-colors duration-150 placeholder:text-mute/60 hover:border-mute focus-visible:border-accent";

function Label({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="label flex justify-between text-mute">
      {children}
      {optional && <span className="opacity-70">Optional</span>}
    </label>
  );
}

export default function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, { status: "idle" } as FormState);
  const f = state.fields;

  if (state.status === "sent")
    return (
      <div role="status" className="border border-line bg-ink-2 p-8 md:p-12">
        <p className="display text-5xl md:text-6xl">
          Message <span className="mark">sent</span>
        </p>
        <p className="mt-6 max-w-[40ch] text-mute">Thanks for writing. I read everything that comes through here and will reply to the address you gave.</p>
      </div>
    );

  // If sending fails, the same message can still go out from the visitor's own mail app.
  const mailto = f ? `mailto:${email}?subject=${encodeURIComponent(`Portfolio enquiry: ${f.name}`)}&body=${encodeURIComponent(f.message)}` : `mailto:${email}`;

  return (
    <form action={action} className="grid gap-9 sm:grid-cols-2">
      <div>
        <Label htmlFor="name">Your name</Label>
        <input id="name" name="name" required maxLength={120} autoComplete="name" defaultValue={f?.name} className={field} />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" defaultValue={f?.email} className={field} />
      </div>
      <div>
        <Label htmlFor="company" optional>
          Company
        </Label>
        <input id="company" name="company" maxLength={160} autoComplete="organization" defaultValue={f?.company} className={field} />
      </div>
      <div>
        <Label htmlFor="topic">What it&rsquo;s about</Label>
        <div className="relative">
          <select id="topic" name="topic" defaultValue={f?.topic ?? topics[0]} className={`${field} cursor-pointer appearance-none rounded-none pr-8`}>
            {topics.map((t) => (
              <option key={t} className="bg-ink text-bone">
                {t}
              </option>
            ))}
          </select>
          <span aria-hidden className="pointer-events-none absolute bottom-4 right-1 text-mute">↓</span>
        </div>
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="message">Message</Label>
        <textarea id="message" name="message" required minLength={10} maxLength={5000} rows={5} defaultValue={f?.message} className={`${field} resize-y`} />
      </div>

      {/* Honeypot: hidden from people and assistive tech, irresistible to bots. */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4 sm:col-span-2">
        <button
          disabled={pending}
          className="border border-volt bg-volt px-7 py-4 font-medium text-night transition-colors duration-150 hover:border-bone hover:bg-bone hover:text-ink active:bg-bone/80 disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message →"}
        </button>
        <p aria-live="polite" className="text-sm text-warn">
          {state.status === "error" && (
            <>
              {state.message}{" "}
              <a href={mailto} className="text-bone underline decoration-line underline-offset-4 hover:decoration-accent">
                Email me directly instead
              </a>
              .
            </>
          )}
        </p>
      </div>
    </form>
  );
}
