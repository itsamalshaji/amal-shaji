import assert from "node:assert/strict";
import { test } from "node:test";
import { parseContact } from "./contact.ts";

const ok = { name: "Asha", email: "asha@example.com", message: "Looking for a frontend lead." };

test("accepts a valid message and trims it", () => {
  const { fields, error } = parseContact({ ...ok, name: "  Asha  " });
  assert.equal(error, undefined);
  assert.equal(fields.name, "Asha");
});

test("refuses missing name, bad email and too-short message", () => {
  assert.ok(parseContact({ ...ok, name: " " }).error);
  assert.ok(parseContact({ ...ok, email: "asha@" }).error);
  assert.ok(parseContact({ ...ok, message: "hi" }).error);
});

test("strips line breaks from single-line fields and caps length", () => {
  const { fields } = parseContact({ ...ok, name: "A\r\nBcc: x@y.z", message: "x".repeat(9000) });
  assert.ok(!/[\r\n]/.test(fields.name));
  assert.equal(fields.message.length, 5000);
});
