import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";

export const prerender = false;

const requestLog = new Map<string, number[]>();
const maxRequestsPerMinute = 5;

type LeadPayload = {
  legal_name?: unknown;
  client_email?: unknown;
  phone_number?: unknown;
  project_type?: unknown;
  budget_range?: unknown;
  timeline?: unknown;
  message?: unknown;
  language?: unknown;
  source_path?: unknown;
  referrer?: unknown;
  utm_source?: unknown;
  utm_medium?: unknown;
  utm_campaign?: unknown;
  recaptcha?: unknown;
};

const json = (body: Record<string, unknown>, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const text = (value: unknown, maxLength: number, required = false) => {
  if (typeof value !== "string") return required ? null : "";
  const result = value.trim();
  if (required && !result) return null;
  return result.slice(0, maxLength);
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] || character);

const isRateLimited = (key: string) => {
  const now = Date.now();
  const recent = (requestLog.get(key) || []).filter((time) => now - time < 60_000);
  if (recent.length >= maxRequestsPerMinute) {
    requestLog.set(key, recent);
    return true;
  }
  recent.push(now);
  requestLog.set(key, recent);
  return false;
};

const sendNotification = async (lead: Record<string, string>) => {
  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not configured; lead was stored without email notification.");
    return;
  }

  const from = import.meta.env.RESEND_FROM_EMAIL || "Keishmer Studio <onboarding@resend.dev>";
  const recipient = import.meta.env.LEAD_NOTIFICATION_EMAIL || "kshmr044@gmail.com";
  const safe = Object.fromEntries(Object.entries(lead).map(([key, value]) => [key, escapeHtml(value)]));
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [recipient],
      reply_to: lead.client_email,
      subject: `New Keishmer Studio project inquiry: ${lead.legal_name}`,
      html: `
        <h2>New project inquiry</h2>
        <p><strong>Name:</strong> ${safe.legal_name}</p>
        <p><strong>Email:</strong> ${safe.client_email}</p>
        <p><strong>Phone:</strong> ${safe.phone_number || "Not provided"}</p>
        <p><strong>Project type:</strong> ${safe.project_type}</p>
        <p><strong>Budget:</strong> ${safe.budget_range}</p>
        <p><strong>Timeline:</strong> ${safe.timeline}</p>
        <p><strong>Language:</strong> ${safe.language}</p>
        <p><strong>Source:</strong> ${safe.source_path}</p>
        <p><strong>Message:</strong></p>
        <p>${safe.message.replace(/\n/g, "<br />")}</p>
      `,
    }),
  });

  if (!response.ok) {
    console.error("Resend notification failed", response.status);
  }
};

export const POST: APIRoute = async ({ request }) => {
  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(clientIp)) return json({ success: false, message: "Too many requests" }, 429);

  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, message: "Invalid request" }, 400);
  }

  const lead = {
    legal_name: text(body.legal_name, 100, true),
    client_email: text(body.client_email, 100, true),
    phone_number: text(body.phone_number, 30),
    project_type: text(body.project_type, 40, true),
    budget_range: text(body.budget_range, 40, true),
    timeline: text(body.timeline, 40, true),
    message: text(body.message, 3000, true),
    language: text(body.language, 2, true),
    source_path: text(body.source_path, 200, true),
    referrer: text(body.referrer, 500),
    utm_source: text(body.utm_source, 100),
    utm_medium: text(body.utm_medium, 100),
    utm_campaign: text(body.utm_campaign, 100),
  };

  if (Object.values(lead).some((value, index) => index < 9 && value === null)) {
    return json({ success: false, message: "Please complete the required fields" }, 400);
  }

  if (lead.language !== "en" && lead.language !== "es") {
    return json({ success: false, message: "Invalid language" }, 400);
  }

  if (!/^\S+@\S+\.\S+$/.test(lead.client_email || "")) {
    return json({ success: false, message: "Invalid email" }, 400);
  }

  const allowedProjectTypes = ["ux-ui", "web-frontend", "branding", "ongoing-support"];
  const allowedBudgets = ["under-1000", "1000-3000", "over-3000"];
  const allowedTimelines = ["asap", "within-month", "one-to-three-months", "exploring"];
  if (!allowedProjectTypes.includes(lead.project_type || "") || !allowedBudgets.includes(lead.budget_range || "") || !allowedTimelines.includes(lead.timeline || "")) {
    return json({ success: false, message: "Invalid project details" }, 400);
  }

  const recaptcha = text(body.recaptcha, 2000, true);
  const recaptchaSecretKey = import.meta.env.RECAPTCHA_SECRET_KEY;

  console.log("Token received:", {
    length: recaptcha?.length,
    prefix: recaptcha?.slice(0, 30),
    hasSecret: !!recaptchaSecretKey,
  });

  if (!recaptcha || !recaptchaSecretKey) {
    return json({ success: false, message: "Security validation unavailable" }, 500);
  }

  const verifyResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: recaptchaSecretKey,
      response: recaptcha,
      remoteip: clientIp,
    }),
  });
  const recaptchaData = await verifyResponse.json();
  console.log("reCAPTCHA response:", recaptchaData);

  const allowedHosts = (import.meta.env.RECAPTCHA_ALLOWED_HOSTNAMES || "keishmerstudio.com,localhost").split(",").map((host: string) => host.trim());
  const validHost = !recaptchaData.hostname || allowedHosts.includes(recaptchaData.hostname);

  console.log("reCAPTCHA checks:", {
    success: recaptchaData.success,
    score: recaptchaData.score,
    action: recaptchaData.action,
    hostname: recaptchaData.hostname,
    validHost,
    allowedHosts,
  });

  const failedChecks = {
    success: !recaptchaData.success,
    lowScore: (recaptchaData.score ?? 0) < 0.5,
    wrongAction: recaptchaData.action !== "submit",
    invalidHost: !validHost,
  };

  if (Object.values(failedChecks).some(Boolean)) {
    return json(
      {
        success: false,
        message: "Security validation failed",
        debug: {
          ...failedChecks,
          score: recaptchaData.score,
          action: recaptchaData.action,
          hostname: recaptchaData.hostname,
          allowedHosts,
          errorCodes: recaptchaData["error-codes"] || null,
          tokenLength: recaptcha?.length,
          tokenPrefix: recaptcha?.slice(0, 30),
          hasSecretKey: !!recaptchaSecretKey,
        },
      },
      403
    );
  }

  const supabaseUrl = import.meta.env.SUPABASE_URL;
  const supabaseKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase credentials are not configured");
    return json({ success: false, message: "Server unavailable" }, 500);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { error } = await supabase.from("leads_clients").insert([lead]);
  if (error) {
    console.error("Lead insert failed", error.code, error.message);
    return json({ success: false, message: "We could not save your inquiry" }, 500);
  }

  try {
    await sendNotification(lead as Record<string, string>);
  } catch (error) {
    console.error("Lead notification failed", error);
  }

  return json({ success: true, message: lead.language === "es" ? "Gracias. Te responderé en menos de 24 horas." : "Thanks. I will reply within 24 hours." }, 200);
};
