"use client"; // needed because we have form event handling on the client

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const formData = new FormData(event.target as HTMLFormElement);
    formData.append("access_key", "2cb04515-c91b-4371-a7ed-08db9ac063be"); // Replace with your Web3Forms key

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Contact Me</h1>
      <p className="mb-6 text-gray-600">
        Fill out the form below and I’ll get back to you soon.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full border border-gray-300 rounded-md p-2"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="w-full border border-gray-300 rounded-md p-2"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          rows={4}
          required
          className="w-full border border-gray-300 rounded-md p-2"
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Submit Form"}
        </button>
      </form>

      {status === "success" && (
        <p className="mt-4 text-green-600">Message sent successfully!</p>
      )}
      {status === "error" && (
        <p className="mt-4 text-red-600">Something went wrong. Please try again.</p>
      )}
    </section>
  );
}
