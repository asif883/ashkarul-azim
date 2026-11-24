"use client";
import { useState } from "react";
import { ArrowUpRight, Link2, Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/lib/data";
import { FadeUp, Line, SectionLabel, SplitWords } from "@/components/ui";

type Fields = { name: string; email: string; subject: string; message: string };
type Status = "idle" | "loading" | "success" | "error";
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(f: Fields) {
  const e: Partial<Fields> = {};
  if (!f.name.trim()) e.name = "Please enter your name.";
  if (!f.email.trim()) e.email = "Please enter your email.";
  else if (!emailRe.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (!f.subject.trim()) e.subject = "Please add a subject.";
  if (!f.message.trim()) e.message = "Please write a message.";
  return e;
}

const links = [
  { icon: Mail, label: "Email Me", href: `mailto:${profile.email}`, text: profile.email, external: false },
  { icon: Link2, label: "Connect on LinkedIn", href: profile.linkedin, text: "in/ashkarul-azim", external: true },
  { icon: Phone, label: "Call Now", href: profile.phoneHref, text: profile.phone, external: false },
];

export default function Contact() {
  const [f, setF] = useState<Fields>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setF((p) => ({ ...p, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  // No backend or email service is configured, so a valid submission hands off to the visitor's
  // own email app (mailto:) addressed to Ashkarul — nothing is sent from this page itself.
  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    setTimeout(() => {
      try {
        const body = `${f.message}\n\n— ${f.name} (${f.email})`;
        window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(f.subject)}&body=${encodeURIComponent(body)}`;
        setStatus("success");
      } catch {
        setStatus("error");
      }
    }, 700);
  };

  const field = "w-full border-0 border-b border-black/40 bg-transparent px-0 py-3 text-lg text-black placeholder:text-black/40 transition-[border-color,box-shadow] duration-300 focus:border-black focus:shadow-[0_1px_0_0_#000] focus:outline-none! focus-visible:outline-none!";

  return (
    <section id="contact" data-cursor-dark className="on-light bg-paper py-24 text-black md:py-40">
      <div className="wrap">
        <SectionLabel n="09">Contact</SectionLabel>
        <SplitWords as="h2" text="LET’S TALK ABOUT *QUALITY.*" hl="bg" className="display mb-8 mt-6 max-w-6xl text-[clamp(2.8rem,9vw,9.5rem)]" />
        <FadeUp className="mb-16 max-w-xl md:mb-24">
          <p className="text-lg leading-relaxed text-black/70">
            Interested in professional collaboration, apparel quality, inspection, and technical discussions? Get in touch.
          </p>
        </FadeUp>

        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ul>
              {links.map((l) => (
                <li key={l.label}>
                  <Line className="bg-black/25!" />
                  <a
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center justify-between gap-4 py-6"
                  >
                    <span className="flex items-center gap-4">
                      <l.icon size={20} aria-hidden="true" />
                      <span>
                        <span className="label block">{l.label}</span>
                        <span className="mt-1 block break-all text-black/70 transition-colors group-hover:text-black">{l.text}</span>
                      </span>
                    </span>
                    <ArrowUpRight className="shrink-0 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
                  </a>
                </li>
              ))}
              <li>
                <Line className="bg-black/25!" />
                <p className="flex items-center gap-4 py-6">
                  <MapPin size={20} aria-hidden="true" />
                  <span>
                    <span className="label block">Location</span>
                    <span className="mt-1 block text-black/70">{profile.location}</span>
                  </span>
                </p>
                <Line className="bg-black/25!" />
              </li>
            </ul>
          </div>

          <form onSubmit={onSubmit} noValidate className="lg:col-span-7" aria-describedby="form-status">
            <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
              {(
                [
                  ["name", "Name", "text", "name"],
                  ["email", "Email", "email", "email"],
                ] as const
              ).map(([k, label, type, ac]) => (
                <div key={k}>
                  <label htmlFor={k} className="label">{label} *</label>
                  <input id={k} name={k} type={type} autoComplete={ac} value={f[k]} onChange={set(k)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `${k}-err` : undefined} className={field} placeholder={label === "Name" ? "Your name" : "you@example.com"} />
                  {errors[k] && <p id={`${k}-err`} className="mt-1 text-sm font-medium text-red-800">{errors[k]}</p>}
                </div>
              ))}
              <div className="md:col-span-2">
                <label htmlFor="subject" className="label">Subject *</label>
                <input id="subject" name="subject" value={f.subject} onChange={set("subject")} aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "subject-err" : undefined} className={field} placeholder="What would you like to discuss?" />
                {errors.subject && <p id="subject-err" className="mt-1 text-sm font-medium text-red-800">{errors.subject}</p>}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="message" className="label">Message *</label>
                <textarea id="message" name="message" rows={4} value={f.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} className={`${field} resize-none`} placeholder="Write your message" />
                {errors.message && <p id="message-err" className="mt-1 text-sm font-medium text-red-800">{errors.message}</p>}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <button
                type="submit"
                disabled={status === "loading"}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-black bg-black px-8 py-4 text-lime transition-opacity disabled:opacity-70"
              >
                <span className="absolute inset-0 translate-y-full bg-lime transition-transform duration-500 group-hover:translate-y-0" />
                <span className="label relative transition-colors duration-500 group-hover:text-black">{status === "loading" ? "Preparing…" : "Send Message"}</span>
                <ArrowUpRight size={16} className="relative transition-all duration-500 group-hover:rotate-45 group-hover:text-black" aria-hidden="true" />
              </button>
              <p id="form-status" role="status" aria-live="polite" className="max-w-sm text-sm font-medium">
                {status === "success" && "Your email app should now open with the message ready to send. If it didn’t, email me directly at the address on the left."}
                {status === "error" && (Object.keys(errors).length ? "Please fix the highlighted fields and try again." : "Something went wrong. Please email me directly instead.")}
              </p>
            </div>
            <p className="mt-6 text-xs text-black/60">This form opens your email app with the message addressed to {profile.email} — it does not send messages from this page.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
