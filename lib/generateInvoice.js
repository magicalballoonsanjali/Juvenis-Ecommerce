import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

import invoiceTemplate from "./invoiceTemplate";

export async function generateInvoice(
  order,
  user,
  address,

) {
    const response = await fetch("https://res.cloudinary.com/dufk70tw7/image/upload/v1781869545/favicon_gpav6m.jpg");

     const buffer = Buffer.from(
    await response.arrayBuffer()
  );

  const logoBase64 =
    `data:image/png;base64,${buffer.toString("base64")}`;

  const invoicesDir = path.join(
    process.cwd(),
    "public",
    "invoices"
  );

  if (!fs.existsSync(invoicesDir)) {
    fs.mkdirSync(invoicesDir, {
      recursive: true,
    });
  }

  const pdfPath = path.join(
    invoicesDir,
    `${order.invoiceNumber}.pdf`
  );

  const browser =
    await puppeteer.launch({
      headless: true,
    });

  const page =
    await browser.newPage();

  await page.setContent(
    invoiceTemplate(
      order,
      user,
      address,
      logoBase64
    ),{
      waitUntil: "networkidle0",
    }
  );

  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  return pdfPath;
}