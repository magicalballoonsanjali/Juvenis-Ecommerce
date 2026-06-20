import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

import invoiceTemplate from "./invoiceTemplate";

export async function generateInvoice(
  order,
  user,
  address,
) {
  try{
console.log("START PDF");
  console.log("FETCHING LOGO");
    const response = await fetch("https://res.cloudinary.com/dufk70tw7/image/upload/v1781869545/favicon_gpav6m.jpg");
console.log("LOGO FETCHED");

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
console.log("CREATING DIRECTORY");
  if (!fs.existsSync(invoicesDir)) {
    fs.mkdirSync(invoicesDir, {
      recursive: true,
    });
  }
console.log("DIRECTORY CREATED");
const pdfPath = path.join(
  invoicesDir,
  `${order.invoiceNumber}.pdf`
);

console.log("LAUNCHING BROWSER");
  const browser =
    await puppeteer.launch({
      headless: true,
    });
console.log("BROWSER STARTED");

  const page =
    await browser.newPage();
console.log("PAGE CREATED");

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
console.log("CONTENT SET");

  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
  });
console.log("PDF SAVED");
  await browser.close();

  return pdfPath;
}catch(error){
console.error("GENERATE PDF ERROR");
    console.error(error);
    console.error(error.stack);

    throw error;
  }
}