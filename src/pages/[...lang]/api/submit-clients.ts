import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { legal_name, client_email, phone_number, text, recaptcha } = body;

        // 1. Validar que todos los campos existan
        if (!legal_name || !client_email || !phone_number || !text || !recaptcha) {
            return new Response(JSON.stringify({ success: false, message: "Missing required fields" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }


        // 2. Prevenir payloads masivos (Basic sanitization & limit)
        if (
            legal_name.length > 100 ||
            client_email.length > 100 ||
            phone_number.length > 20
        ) {
            return new Response(JSON.stringify({ success: false, message: "Input fields are too long" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        // 3. Validar el token de reCAPTCHA con Google
        const recaptchaSecretKey = import.meta.env.RECAPTCHA_SECRET_KEY;
        if (!recaptchaSecretKey) {
            console.error("Server misconfiguration: missing RECAPTCHA_SECRET_KEY");
            return new Response(JSON.stringify({ success: false, message: "Server misconfiguration" }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }

        const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${recaptcha}`;
        const recaptchaResponse = await fetch(verifyURL, { method: "POST" });
        const recaptchaData = await recaptchaResponse.json();

        // reCAPTCHA v3 devuelve un "score" (0.0 a 1.0). 0.5 o mayor suele ser humano.
        if (!recaptchaData.success || recaptchaData.score < 0.5) {
            console.warn("reCAPTCHA validation failed or score too low:", recaptchaData);
            return new Response(JSON.stringify({ success: false, message: "Security validation failed. Please try again." }), {
                status: 403,
                headers: { "Content-Type": "application/json" }
            });
        }

        // 4. Conectar con Supabase e Insertar los datos
        const supabaseUrl = import.meta.env.SUPABASE_URL;
        const supabaseKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

        if (!supabaseUrl || !supabaseKey) {
            console.error("Server misconfiguration: missing SUPABASE credentials");
            return new Response(JSON.stringify({ success: false, message: "Server misconfiguration" }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }

        const keyFormat = supabaseKey.startsWith("sb_secret_") ? "new" : supabaseKey.startsWith("eyJ") ? "jwt" : "unknown";
        console.log(`[submit-clients] Key format: ${keyFormat}, length: ${supabaseKey.length}`);

        const supabase = createClient(supabaseUrl, supabaseKey);

        // Quick auth check: service role should be able to query even with RLS enabled
        const { error: authCheckError } = await supabase
            .from("leads_clients")
            .select("id", { count: "exact", head: true });

        if (authCheckError) {
            console.error("[submit-clients] Auth check FAILED:", authCheckError.message, authCheckError.code);
            return new Response(JSON.stringify({
                success: false,
                message: `Supabase auth check failed (${authCheckError.code}): ${authCheckError.message} — verify SUPABASE_SERVICE_ROLE_KEY in Vercel env vars`,
            }), { status: 500, headers: { "Content-Type": "application/json" } });
        }

        console.log("[submit-clients] Auth check PASSED — service role key is valid");
        const client_email_normalized = String(client_email).trim();

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client_email_normalized)) {
            return new Response(
                JSON.stringify({ success: false, message: "Invalid client_email" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }
        const { error } = await supabase
            .from('leads_clients')
            .insert([
                {
                    legal_name,
                    client_email: client_email_normalized,
                    phone_number,
                    message: text || null
                }
            ]);

        if (error) {
            // ESTO IMPRIMIRÁ EL ERROR REAL EN TU TERMINAL (VS Code)
            console.error("--- DETALLES DEL ERROR DE SUPABASE ---");
            console.error("Mensaje:", error.message);
            console.error("Detalles:", error.details);
            console.error("Sugerencia (Hint):", error.hint);
            console.error("Código de error:", error.code);
            console.error("--------------------------------------");

            // ESTO ENVIARÁ EL ERROR REAL AL NAVEGADOR PARA QUE LO VEAS EN LA PESTAÑA 'NETWORK'
            return new Response(JSON.stringify({
                success: false,
                message: `Error real de Supabase: ${error.message}`,
                details: error.details
            }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }

        // 5. Retornar éxito
        return new Response(JSON.stringify({ success: true, message: "Application submitted successfully" }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("API Route Error:", error);
        return new Response(JSON.stringify({ success: false, message: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }

};
