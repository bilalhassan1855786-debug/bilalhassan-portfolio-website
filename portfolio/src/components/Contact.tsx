"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const EMAIL = "bilalhassan.1855786@gmail.com", PHONE = "+923213174024";

export default function Contact() {
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState("");
  const copy = async (t: string) => {
    try { await navigator.clipboard.writeText(t); } catch {}
    setCopied(t); setTimeout(() => setCopied(""), 1600);
  };
  const send = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget, d = new FormData(f);
    const s = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, t = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, k = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (!s || !t || !k) { // EmailJS not configured yet: fall back to the visitor's mail app
      location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Portfolio message from " + d.get("from_name"))}&body=${encodeURIComponent(d.get("message") + "\n\n" + d.get("from_name") + " (" + d.get("reply_to") + ")")}`;
      return;
    }
    setStatus("Sending…");
    try { await emailjs.sendForm(s, t, f, { publicKey: k }); setStatus("Message sent. Thank you, I’ll reply soon."); f.reset(); }
    catch { setStatus("Could not send. Please email me directly."); }
  };
  return (
    <section id="contact"><div className="w"><div className="ct rv"><div>
      <div>
        <h2>Let’s build <span className="g">something great</span></h2>
        <p className="sub" style={{ marginBottom: 10 }}>Available for remote work. Send a message and I’ll reply by email.</p>
        <div className="rw"><a className="m" href={`mailto:${EMAIL}`}>{EMAIL}</a><button className="cp" type="button" onClick={() => copy(EMAIL)}>{copied === EMAIL ? "Copied ✓" : "Copy"}</button></div>
        <div className="rw"><a className="m" href="https://wa.me/923213174024" target="_blank" rel="noopener noreferrer">WhatsApp +92 321 3174024</a><button className="cp" type="button" onClick={() => copy(PHONE)}>{copied === PHONE ? "Copied ✓" : "Copy"}</button></div>
        <div className="rw"><a className="m" href="https://github.com/bilalhassan1855786-debug" target="_blank" rel="noopener noreferrer">github.com/bilalhassan1855786-debug</a></div>
      </div>
      <form onSubmit={send}>
        <input name="from_name" placeholder="Your name" aria-label="Your name" required />
        <input name="reply_to" type="email" placeholder="Your email" aria-label="Your email" required />
        <textarea name="message" placeholder="What are you building?" aria-label="Message" required />
        <button className="btn p" type="submit">Send message</button>
        {status && <p className="fm" role="status">{status}</p>}
      </form>
    </div></div></div></section>
  );
}
