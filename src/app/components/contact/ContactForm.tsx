'use client';
import { useState } from "react";

type FormState = { name: string; email: string; message: string };
const initialState: FormState = { name: "", email: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-xl">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          required
          className="mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          required
          className="mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={onChange}
          required
          rows={5}
          className="mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
          placeholder="How can I help?"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center rounded bg-brand px-4 py-2 text-white hover:bg-brand-dark disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
      {status === "success" && <p className="text-green-600">Thanks! I'll get back to you soon.</p>}
      {status === "error" && <p className="text-red-600">{error}</p>}
    </form>
  );
}

