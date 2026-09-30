import nodemailer from "nodemailer";

// Secrets live ONLY in environment variables (never in frontend code):
//   GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO_EMAIL, CALLMEBOT_PHONE, CALLMEBOT_APIKEY

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const oneLine = (s) => String(s).replace(/[\r\n]+/g, " ").trim();
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Best-effort rate limit: 5 messages per IP per 10 minutes.
const hits = new Map();
function tooMany(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

async function sendEmail({ name, email, topic, message }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
    to: process.env.CONTACT_TO_EMAIL,
    replyTo: email, // pressing Reply in Gmail answers the visitor
    subject: `Portfolio: ${topic} - ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`,
    html: `<p><b>Name:</b> ${esc(name)}</p>
           <p><b>Email:</b> ${esc(email)}</p>
           <p><b>Topic:</b> ${esc(topic)}</p>
           <p><b>Message:</b></p>
           <p>${esc(message).replace(/\n/g, "<br>")}</p>`,
  });
}

async function sendWhatsApp({ name, email, topic, message }) {
  const text =
    `New portfolio message\n\nName: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`.slice(0, 900);
  const url =
    `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(process.env.CALLMEBOT_PHONE)}` +
    `&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(process.env.CALLMEBOT_APIKEY)}`;

  const r = await fetch(url);
  if (!r.ok) throw new Error(`CallMeBot responded ${r.status}`);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip = String(req.headers["x-forwarded-for"] || "unknown").split(",")[0].trim();
  if (tooMany(ip)) {
    return res.status(429).json({ error: "Too many messages. Please try again later." });
  }

  const body = req.body || {};

  // Honeypot: real visitors never fill this hidden field, bots do.
  if (body.website) return res.status(200).json({ ok: true });

  const name = oneLine(body.from_name || "");
  const email = oneLine(body.from_email || "");
  const topic = oneLine(body.topic || "General Inquiry");
  const message = String(body.message || "").trim();

  if (!name || name.length > 80) return res.status(400).json({ error: "Please enter your name." });
  if (!EMAIL_RE.test(email) || email.length > 120) return res.status(400).json({ error: "Please enter a valid email." });
  if (topic.length > 100) return res.status(400).json({ error: "Invalid topic." });
  if (message.length < 5 || message.length > 2000) {
    return res.status(400).json({ error: "Message must be 5 to 2000 characters." });
  }

  const payload = { name, email, topic, message };
  const [mail, wa] = await Promise.allSettled([sendEmail(payload), sendWhatsApp(payload)]);

  if (mail.status === "rejected") console.error("Email failed:", mail.reason);
  if (wa.status === "rejected") console.error("WhatsApp failed:", wa.reason);

  // Success if at least one channel delivered the message.
  if (mail.status === "fulfilled" || wa.status === "fulfilled") {
    return res.status(200).json({ ok: true });
  }
  return res.status(500).json({ error: "Could not send your message right now." });
}