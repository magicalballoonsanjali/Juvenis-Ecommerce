import nodemailer from "nodemailer";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");

export const sendInvoiceEmail = async (
  userEmail,
  invoiceBuffer,
  invoiceNumber
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
    family: 4,
  });

  await transporter.verify();
  console.log("SMTP READY");

  const logoUrl =
    "https://res.cloudinary.com/dufk70tw7/image/upload/v1781867184/logo_wqkrdb.jpg";

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: userEmail,
    subject: `Invoice #${invoiceNumber} - Payment Successful`,

    html: `
      <div style="font-family: Arial, sans-serif; background:#f6f8fb; padding:30px;">
        
        <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <div style="text-align:center;">
            <img src="${logoUrl}" alt="Logo" style="height:100px; object-fit:contain;" />
          </div>

          <!-- Body -->
          <div style="padding:30px; color:#333;">
            <h2 style="color:#111827; margin-bottom:10px;">
              Payment Successful 🎉
            </h2>

            <p style="font-size:15px; line-height:1.6;">
              Thank you for your purchase. Your payment has been successfully processed.
            </p>

            <div style="margin:20px 0; padding:15px; background:#f3f4f6; border-radius:8px;">
              <p style="margin:0; font-size:14px;">
                <strong>Invoice Number:</strong> ${invoiceNumber}
              </p>
            </div>

            <p style="font-size:14px; color:#555;">
              Your invoice is attached to this email. You can download or print it for your records.
            </p>

            <p style="margin-top:25px; font-size:14px;">
              If you have any questions, feel free to contact our support team.
            </p>
          </div>

          <!-- Footer -->
          <div style="text-align:center; padding:15px; font-size:12px; color:#888; background:#f9fafb;">
            © ${new Date().getFullYear()} Your Company. All rights reserved.
          </div>

        </div>
      </div>
    `,

   attachments: [
  {
    filename: `${invoiceNumber}.pdf`,
    content: invoiceBuffer,
    contentType: "application/pdf",
  },
],
  });
};