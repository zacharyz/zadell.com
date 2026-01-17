"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      console.log('Sending request to:', '/api/send');
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Response error:', errorData);
        throw new Error("Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error('Submit error:', error);
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="pt-40 px-4 bg-background strange-loop min-h-screen">
      <div className="max-w-3xl mx-auto py-8 relative z-10 bg-card ink-sketch p-8">
        <h1 className="text-5xl font-serif font-bold mb-6 tracking-tighter uppercase italic text-center">
          Send a Raven
        </h1>
        {status === "success" && (
          <div className="mb-10 p-6 bg-secondary text-secondary-foreground font-bold ink-sketch text-center">
            Your message has traveled through the looking glass!
          </div>
        )}
        {status === "error" && (
          <div className="mb-10 p-6 bg-primary text-primary-foreground font-bold ink-sketch text-center">
            A strange loop occurred. Please try again.
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <label htmlFor="name" className="block text-2xl font-serif font-bold italic tracking-tight">
              What is your name?
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 rounded-none border-4 border-foreground bg-background text-foreground text-xl focus:ring-4 focus:ring-primary outline-none transition-all"
              placeholder="e.g. The Mad Hatter"
            />
          </div>
          <div className="space-y-4">
            <label htmlFor="email" className="block text-2xl font-serif font-bold italic tracking-tight">
              Where shall we reply?
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 rounded-none border-4 border-foreground bg-background text-foreground text-xl focus:ring-4 focus:ring-primary outline-none transition-all"
              placeholder="e.g. hatter@wonderland.com"
            />
          </div>
          <div className="space-y-4">
            <label htmlFor="message" className="block text-2xl font-serif font-bold italic tracking-tight">
              The nature of your puzzle?
            </label>
            <textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 rounded-none border-4 border-foreground bg-background text-foreground text-xl focus:ring-4 focus:ring-primary outline-none transition-all"
              placeholder="Detail your curiosity here..."
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-primary text-primary-foreground px-12 py-4 text-2xl rounded-none hover:translate-x-1 hover:translate-y-1 transition-all ink-sketch font-bold uppercase tracking-widest disabled:opacity-50"
          >
            {status === "loading" ? "TRANSMITTING..." : "DISPATCH MESSAGE"}
          </button>
        </form>
      </div>
    </div>
  );
}
