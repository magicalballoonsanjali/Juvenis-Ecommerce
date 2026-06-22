import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export async function generateInvoice(
  order,
  user,
  address
) {
  return new Promise((resolve, reject) => {
    try {
     

console.log("BEFORE PDFDOCUMENT");

     const doc = new PDFDocument({
  margin: 40,
  size: "A4",
  autoFirstPage: true,
});

console.log("AFTER PDFDOCUMENT");

const fontPath = path.join(
  process.cwd(),
  "public",
  "fonts",
  "Roboto-Regular.ttf"
);
console.log(
  fs.existsSync(fontPath),
  fontPath
);
doc.registerFont("Roboto", fontPath);
doc.font("Roboto");

     const chunks = [];

doc.on("data", (chunk) => {
  chunks.push(chunk);
});

      // Header
      doc
        .fontSize(24)
        .text("JUVENIS", 40, 40);

      doc
        .fontSize(11)
        .text(
          "Premium Skin & Hair Care Solutions",
          40,
          70
        );

      doc.text(
        "products@juvenisinnovations.in",
        40,
        88
      );

      doc.text(
        "www.juvenis.in",
        40,
        104
      );

      doc
        .fontSize(26)
        .text("INVOICE", 400, 40);

      doc
        .fontSize(11)
        .text(
          `Invoice No: ${order.invoiceNumber}`,
          400,
          85
        );

      doc.text(
        `Order ID: ${order._id}`,
        400,
        102
      );

      doc.text(
        `Date: ${new Date(
          order.date
        ).toLocaleDateString()}`,
        400,
        119
      );

      // Bill To Box
      doc
        .roundedRect(40, 160, 250, 120, 8)
        .stroke();

      doc
        .fontSize(14)
        .text("Bill To", 50, 175);

      doc
        .fontSize(11)
        .text(user?.name || "", 50, 200);

      doc.text(
        user?.email || "",
        50,
        218
      );

      doc.text(
        address?.phoneNumber || "",
        50,
        236
      );

      doc.text(
        `${address?.area || ""}, ${
          address?.city || ""
        }, ${address?.state || ""}`,
        50,
        254,
        {
          width: 220,
        }
      );

      // Payment Box
      doc
        .roundedRect(320, 160, 230, 120, 8)
        .stroke();

      doc
        .fontSize(14)
        .text(
          "Payment Details",
          330,
          175
        );

      doc
        .fontSize(11)
        .text(
          `Payment ID: ${
            order.razorpayPaymentId || "-"
          }`,
          330,
          205,
          { width: 200 }
        );

      doc.text(
        `Status: ${
          order.paymentStatus || "PAID"
        }`,
        330,
        235
      );

      // Table Header
      let tableTop = 320;

      doc
        .rect(40, tableTop, 510, 30)
        .fillAndStroke(
          "#e5e7eb",
          "#e5e7eb"
        );

      doc.fillColor("black");

      doc.text(
        "Product",
        50,
        tableTop + 10
      );

      doc.text(
        "Qty",
        290,
        tableTop + 10
      );

      doc.text(
        "Price",
        360,
        tableTop + 10
      );

      doc.text(
        "Total",
        460,
        tableTop + 10
      );

      // Products
      let y = tableTop + 40;

      let grandTotal = 0;

      order.items.forEach((item) => {
        const qty =
          item.quantity || 1;

        const price =
          item.product?.offerPrice || 0;

        const total =
          qty * price;

        grandTotal += total;

        doc.text(
          item.product?.name || "",
          50,
          y,
          { width: 220 }
        );

        doc.text(
          qty.toString(),
          290,
          y
        );

        doc.text(
          `₹${price}`,
          360,
          y
        );

        doc.text(
          `₹${total}`,
          460,
          y
        );

        y += 28;
      });

      // Total Box
      y += 30;

      doc
        .roundedRect(
          340,
          y,
          210,
          100,
          8
        )
        .stroke();

      doc.text(
        "Subtotal",
        355,
        y + 20
      );

      doc.text(
        `₹${grandTotal}`,
        470,
        y + 20
      );

      doc.text(
        "Shipping",
        355,
        y + 45
      );

      doc.text(
        "Free",
        470,
        y + 45
      );

      doc
        .fontSize(16)
        .text(
          `Total: ₹${order.amount}`,
          355,
          y + 70
        );

      // Footer
      doc
        .fontSize(14)
        .text(
          "Thank You For Your Purchase",
          40,
          720,
          {
            align: "center",
            width: 500,
          }
        );

      doc
        .fontSize(10)
        .text(
          "This is a computer generated invoice and does not require a physical signature.",
          40,
          745,
          {
            align: "center",
            width: 500,
          }
        );

      doc.end();

doc.on("end", () => {
  const pdfBuffer = Buffer.concat(chunks);

  console.log(
    "PDF BUFFER SIZE:",
    pdfBuffer.length
  );

  resolve(pdfBuffer);
});

doc.on("error", reject);
    } catch (error) {
      reject(error);
    }
  });
}