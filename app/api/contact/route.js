import nodemailer from "nodemailer";

async function sendMail(data) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

 await transporter.sendMail({
  from: process.env.GMAIL_USER,
  to: process.env.GMAIL_USER, // your email (receptionist)
  subject: `📩 New Appointment Request from ${data.name}`,
  html: `
  <div style="background:#f4f4f4; padding:40px 0; font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 8px rgba(0,0,0,0.1);">
      
      <div style="background:#283e51; background:linear-gradient(90deg,#283e51 0%,#4b79a1 100%); padding:20px; text-align:center;">
        <h1 style="margin:0; font-size:24px; color:#ffffff;">New Appointment Request</h1>
      </div>
      
      <div style="padding:30px;">
        <p style="font-size:16px; color:#333;">A new appointment request has been submitted:</p>
        
        <table style="width:100%; border-collapse:collapse; margin:20px 0;">
          <tr>
            <td style="padding:8px 0; font-weight:bold; color:#555;">Name:</td>
            <td style="padding:8px 0;">${data.name}</td>
          </tr>
          <tr style="background:#f9f9f9;">
            <td style="padding:8px 0; font-weight:bold; color:#555;">Email:</td>
            <td style="padding:8px 0;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding:8px 0; font-weight:bold; color:#555;">Phone:</td>
            <td style="padding:8px 0;">${data.phone}</td>
          </tr>
          <tr style="background:#f9f9f9;">
            <td style="padding:8px 0; font-weight:bold; color:#555;">Preferred Date & Time:</td>
            <td style="padding:8px 0;">${data.date}</td>
          </tr>
        </table>
        
        <p style="font-weight:bold; margin-top:20px; color:#333;">Message:</p>
        <p style="background:#f6f6f6; padding:15px; border-radius:6px; font-size:15px; color:#555;">${data.message}</p>
        
        <p style="margin-top:30px; font-size:14px; color:#888;">This request was generated from your website appointment form.</p>
      </div>
      
      <div style="background:#f4f4f4; text-align:center; padding:15px; font-size:12px; color:#999;">
        Please respond to the client promptly.
      </div>
      
    </div>
  </div>
  `
});


 await transporter.sendMail({
  from: process.env.GMAIL_USER,
  to: data.email,
  subject: `✅ Appointment Confirmed – ${data.name}`,
  html: `
  <div style="background:#f4f4f4; padding:40px 0; font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 8px rgba(0,0,0,0.1);">
      
      <div style="background:#4b79a1; background:linear-gradient(90deg,#4b79a1 0%,#283e51 100%); padding:20px; text-align:center;">
        <h1 style="margin:0; font-size:24px; color:#ffffff;">Your Appointment is Confirmed</h1>
      </div>
      
      <div style="padding:30px;">
        <p style="font-size:16px; color:#333;">Hello <strong>${data.name}</strong>,</p>
        <p style="font-size:16px; color:#333;">Thank you for booking with us. Here are your appointment details:</p>
        
        <table style="width:100%; border-collapse:collapse; margin:20px 0;">
          <tr>
            <td style="padding:8px 0; font-weight:bold; color:#555;">Name:</td>
            <td style="padding:8px 0;">${data.name}</td>
          </tr>
          <tr style="background:#f9f9f9;">
            <td style="padding:8px 0; font-weight:bold; color:#555;">Email:</td>
            <td style="padding:8px 0;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding:8px 0; font-weight:bold; color:#555;">Phone:</td>
            <td style="padding:8px 0;">${data.phone}</td>
          </tr>
          <tr style="background:#f9f9f9;">
            <td style="padding:8px 0; font-weight:bold; color:#555;">Date & Time:</td>
            <td style="padding:8px 0;">${data.date}</td>
          </tr>
        </table>
        
        <p style="font-weight:bold; margin-top:20px; color:#333;">Message:</p>
        <p style="background:#f6f6f6; padding:15px; border-radius:6px; font-size:15px; color:#555;">${data.message}</p>
        
        <p style="font-size:16px; color:#333;">We look forward to seeing you!</p>
        <p style="margin-top:30px; font-size:14px; color:#888;">Best regards,<br><strong>Your Clinic Name</strong></p>
      </div>
      
      <div style="background:#f4f4f4; text-align:center; padding:15px; font-size:12px; color:#999;">
        This is an automated confirmation. If you have questions, please contact us.
      </div>
      
    </div>
  </div>
  `
});


}

export async function POST(req) {
  const data = await req.json();
  const response = new Response(JSON.stringify({ ok: true }), { status: 200 });
  await sendMail(data);
  return response;
}
