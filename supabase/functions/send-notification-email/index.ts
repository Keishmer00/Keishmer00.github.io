import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const ENV = Deno.env.get('ENVIRONMENT') || 'production'

serve(async (req: any) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { 
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      } 
    })
  }

  try {
    const payload = await req.json()
    const record = payload.record || payload // Fallback in case payload IS the record

    if (!record) {
      return new Response(JSON.stringify({ success: false, error: "No record in payload" }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    const nombreCliente  = record.legal_name   || 'No especificado';
    const correoCliente = record.client_email || 'No especificado';
    const telefono       = record.phone_number || 'No especificado';
    const mensaje       = record.message || 'No especificado';
    const correosDestinatarios = ['kshmr044@gmail.com'];   
    const subtituloTexto = 'New client application. A potential client has submitted a request through the Keishmer Studio form in the landing page.';
    const colorBannerBackground = '#f7fafc';
    const colorBannerBorder     = '#ecc94b';
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Keishmer Studio <onboarding@resend.dev>',
        to: correosDestinatarios, 
        subject: `Keishmer Studio client request: ${nombreCliente}`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; color: #1a202c;">
            
            <div style="background-color: ${colorBannerBackground}; padding: 15px; border-radius: 6px; text-align: center; border-bottom: 3px solid ${colorBannerBorder};">
              <h2 style="margin: 0; color: #2d3748; font-size: 18px;">New Client Request</h2>
              <p style="margin: 5px 0 0 0; color: #4a5568; font-size: 14px;">${subtituloTexto}</p> 
            </div>

            <div style="padding: 20px 10px;">
              <h3 style="color: #4a5568; font-size: 15px; margin-top: 0; border-bottom: 1px solid #edf2f7; padding-bottom: 8px;">Client Information</h3>
              
              <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
                <tr>
                  <td style="padding: 8px 0; color: #718096; width: 40%;"><strong>Name:</strong></td>
                  <td style="padding: 8px 0; color: #1a202c;">${nombreCliente}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #718096;"><strong>Client Email:</strong></td>
                  <td style="padding: 8px 0; color: #1a202c;">
                    <a href="mailto:${correoCliente}" style="color: #3182ce; text-decoration: none;">${correoCliente}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #718096;"><strong>Phone Number:</strong></td>
                  <td style="padding: 8px 0; color: #1a202c;">${telefono}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #718096;"><strong>Message:</strong></td>
                  <td style="padding: 8px 0; color: #1a202c;">${mensaje}</td>
                </tr>
              </table>
            </div>

            <div style="background-color: #ebf8ff; padding: 15px; border-radius: 6px; border-left: 4px solid #3182ce; font-size: 13px; color: #2b6cb0; line-height: 1.5;">
              <strong>Quick Action:</strong><br>
              To reply to this client immediately, simply click <strong>"Reply"</strong> from your inbox. The email is configured to write directly to: <em>${correoCliente}</em>.
            </div>

          </div>
        `,
      reply_to: correoCliente 
      }),
    })

    const responseData = await response.json()

    return new Response(JSON.stringify({ success: true, data: responseData }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})