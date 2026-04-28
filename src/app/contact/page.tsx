"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Submit error:", error);
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const inputClass =
    "w-full px-0 py-3 bg-transparent text-ink-primary border-0 border-b border-rule-subtle focus:border-rule-strong focus:outline-none transition-colors placeholder:text-ink-dim";

  return (
    <main className="min-h-screen pt-32 pb-24 px-4">
      <div className="max-w-xl mx-auto">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-ink-dim mb-6">
          zadell.com · contact
        </div>
        <h1 className="font-serif text-4xl md:text-5xl text-ink-primary leading-[1.1] mb-6">
          Get in touch
        </h1>
        <p className="text-ink-secondary leading-relaxed mb-12 pb-8 border-b border-rule-subtle">
          For anything worth saying. Replies aren&apos;t guaranteed but they&apos;re likely.
        </p>

        {status === "success" && (
          <div className="mb-12 pb-6 border-b border-accent-olive font-mono text-xs uppercase tracking-[0.2em] text-accent-olive">
            Message sent. I&apos;ll get back to you.
          </div>
        )}
        {status === "error" && (
          <div className="mb-12 pb-6 border-b border-rule-strong font-mono text-xs uppercase tracking-[0.2em] text-ink-primary">
            Something went wrong. Please try again.
          </div>
        )}

        <form className="space-y-10" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block font-mono text-xs uppercase tracking-[0.2em] text-ink-dim mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Your name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block font-mono text-xs uppercase tracking-[0.2em] text-ink-dim mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block font-mono text-xs uppercase tracking-[0.2em] text-ink-dim mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
              className={`${inputClass} resize-y`}
              placeholder="What&rsquo;s on your mind?"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="font-mono text-xs uppercase tracking-[0.2em] text-accent-olive hover:text-ink-primary transition-colors disabled:opacity-40 pt-2"
          >
            {status === "loading" ? "Sending…" : "Send message →"}
          </button>
        </form>
      </div>
    </main>
  );
}
