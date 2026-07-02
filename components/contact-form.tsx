"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { getDict } from "@/lib/dictionary"

type ContactDict = ReturnType<typeof getDict>["contact"]

// Public Cloudflare Worker endpoint that forwards the message to Postmark.
// Overridable at build time via NEXT_PUBLIC_CONTACT_ENDPOINT.
const ENDPOINT =
  process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ??
  "https://email-postmark-worker.oieusouofinx.workers.dev"

export default function ContactForm({ t }: { t: ContactDict }) {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (loading) return

    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot: bots fill this hidden field; humans never do.
    if ((data.get("website") as string)?.trim()) return

    const payload = {
      name: (data.get("name") as string)?.trim(),
      email: (data.get("email") as string)?.trim(),
      subject: (data.get("subject") as string)?.trim(),
      message: (data.get("message") as string)?.trim(),
      website: data.get("website") as string,
    }

    setLoading(true)
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const json = await res.json().catch(() => null)
      if (!res.ok || !json?.ok) throw new Error("send failed")
      toast.success(t.success)
      form.reset()
    } catch {
      toast.error(t.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            {t.name}
          </label>
          <input
            id="name"
            name="name"
            required
            className="w-full p-2 border rounded-md"
            placeholder={t.namePlaceholder}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            {t.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full p-2 border rounded-md"
            placeholder={t.emailPlaceholder}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium">
          {t.subject}
        </label>
        <input
          id="subject"
          name="subject"
          className="w-full p-2 border rounded-md"
          placeholder={t.subjectPlaceholder}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          {t.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          className="w-full p-2 border rounded-md min-h-[120px]"
          placeholder={t.messagePlaceholder}
        ></textarea>
      </div>
      {/* Honeypot — visually hidden, off from a11y and tab order. */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? t.sending : t.send}
      </Button>
    </form>
  )
}
