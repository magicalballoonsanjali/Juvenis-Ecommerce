import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export async function generateInvoice(
  order,
  user,
  address
) {
  const response = await fetch(
"https://res.cloudinary.com/dufk70tw7/image/upload/v1781869545/favicon_gpav6m.jpg"
);

  const arrayBuffer =
    await response.arrayBuffer();

 const logoBuffer =
    Buffer.from(arrayBuffer);


  return new Promise((resolve, reject) => {
   try{

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

      // Colors
const primary = "#166534";
const lightGreen = "#f0fdf4";
const borderGreen = "#bbf7d0";



// Top Header Background
doc
.rect(0, 0, 595, 95)
.fill(primary);


// Logo
  doc.image(
    logoBuffer,
    40,
    10,
    { width: 60 }
  );

// Company Name
doc
  .fillColor("white")
  .fontSize(20)
  .text("Juvenis Innovations", 120, 30);

doc
  .fontSize(11)
  .text(
    "Premium Skin & Hair Care Solutions",
    120,
    62
  );

// Invoice Title
doc
  .fontSize(20)
  .text("INVOICE", 480, 30);

doc.fillColor("black");

// Invoice Details
doc
  .fontSize(11)
  .text(
    `Invoice No: ${order.invoiceNumber}`,
    380,
    120
  );

doc.text(
  `Order ID: ${order._id}`,
  380,
  140
);

doc.text(
  `Date: ${new Date(
    order.date
  ).toLocaleDateString()}`,
  380,
  170
);


//  Payment Box
doc
  .roundedRect(
    40,
    120,
    240,
    130,
    8
  )
  .fillAndStroke(
    lightGreen,
    borderGreen
  );

doc
  .fillColor(primary)
  .fontSize(14)
  .text(
    "Payment Details",
    55,
    120
  );

doc.fillColor("black");

doc
  .fontSize(11)
  .text(
    `Payment ID : ${order.razorpayPaymentId || "-"}`,
    55,
    140,
    {
      width: 190,
    }
  );

// Paid Badge
doc
  .roundedRect(
    55,
    160,
    80,
    25,
    12
  )
  .fill("#16a34a");

doc
  .fillColor("white")
  .fontSize(10)
  .text(
    order.paymentStatus || "PAID",
    55,
    160
  );


// Bill from Box
doc
  .roundedRect(
    40,
    200,
    240,
    150,
    8
  )
  .fillAndStroke(
    lightGreen,
    borderGreen
  );

doc
  .fillColor(primary)
  .fontSize(14)
  .text("Bill From", 55, 215);

doc.fillColor("black");

doc
  .fontSize(11)
  .text("Juvenis Innovations", 55, 240);

doc.text(
 "juvenis@gmail.com",
  55,
  260
);

doc.text(
  "+91 9769911196",
  55,
  280
);

doc.text(
  "4 Adarsh, Ground Floor, Behind Archies Gallery 86 S V Road,Santacruz West\nMumbai 400054",
  55,
  300,
  {
    width: 200,
  }
);

// Bill To Box
doc
  .roundedRect(
    315,
    200,
    240,
    150,
    8
  )
  .fillAndStroke(
    lightGreen,
    borderGreen
  );

doc
  .fillColor(primary)
  .fontSize(14)
  .text("Bill To", 330, 215);

doc.fillColor("black");

doc
  .fontSize(11)
  .text(user.name, 330, 240);

doc.text(
  user.email,
  330,
  260
);

doc.text(
  address.phoneNumber || "",
  330,
  280
);

doc.text(
  `${address.area},
${address.city},
${address.state}`,
  330,
  300,
  {
    width: 200,
  }
);

// Payment Box
// doc
//   .roundedRect(
//     315,
//     200,
//     240,
//     130,
//     8
//   )
//   .fillAndStroke(
//     lightGreen,
//     borderGreen
//   );

// doc
//   .fillColor(primary)
//   .fontSize(14)
//   .text(
//     "Payment Details",
//     330,
//     215
//   );

// doc.fillColor("black");

// doc
//   .fontSize(11)
//   .text(
//     `Payment ID : ${order.razorpayPaymentId || "-"}`,
//     330,
//     245,
//     {
//       width: 190,
//     }
//   );

// // Paid Badge
// doc
//   .roundedRect(
//     330,
//     290,
//     80,
//     25,
//     12
//   )
//   .fill("#16a34a");

// doc
//   .fillColor("white")
//   .fontSize(10)
//   .text(
//     order.paymentStatus || "PAID",
//     352,
//     298
//   );

doc.fillColor("black");

// Products Table
let tableTop = 380;

doc
  .rect(
    40,
    tableTop,
    515,
    30
  )
  .fill(primary);

doc.fillColor("white");

doc.text(
  "Product",
  55,
  tableTop + 10
);

doc.text(
  "Qty",
  290,
  tableTop + 10
);

doc.text(
  "Price",
  370,
  tableTop + 10
);

doc.text(
  "Total",
  470,
  tableTop + 10
);

doc.fillColor("black");

let y = tableTop + 45;

let grandTotal = 0;

order.items.forEach(
  (item, index) => {
    const qty =
      item.quantity;

    const price =
      item.product.offerPrice;

    const total =
      qty * price;

    grandTotal += total;

    if (index % 2 === 0) {
      doc
        .rect(
          40,
          y - 5,
          515,
          25
        )
        .fill("#f8faf8");
    }

    doc.fillColor("black");

    doc.text(
      item.product.name,
      55,
      y
    );

    doc.text(
      qty.toString(),
      290,
      y
    );

    doc.text(
      `Rs ${price}`,
      370,
      y
    );

    doc.text(
      `Rs ${total}`,
      470,
      y
    );

    y += 30;
  }
);

// Total Box
y += 30;

doc
  .roundedRect(
    335,
    y,
    220,
    110,
    10
  )
  .fillAndStroke(
    lightGreen,
    borderGreen
  );

doc.fillColor("black");

doc.text(
  "Subtotal",
  355,
  y + 20
);

doc.text(
  `Rs ${order.amount}`,
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
  .moveTo(335, y+65)
  .lineTo(550, y+65)
  .stroke("black");

doc
  .fillColor(primary)
  .fontSize(18)
  .text(
    `Total`,
    355,
    y + 75
  );
  
 doc
  .fillColor(primary)
  .fontSize(18)
  .text(
    `Rs ${order.amount}`,
    450,
    y + 75
  );

// Signature
doc
  .fillColor("black")
  .fontSize(11)
  .text(
    "Authorized Signature",
    450,
    y + 140
  );

doc
  .fillColor(primary)
  .fontSize(14)
  .text(
    "Juvenis Innovations",
    420,
    y + 160
  );

// Footer
doc
  .moveTo(40, 750)
  .lineTo(550, 750)
  .stroke("#e5e7eb");

doc
  .fillColor(primary)
  .fontSize(16)
  .text(
    "Thank You For Your Purchase",
    40,
    760,
    {
      align: "center",
      width: 500,
    }
  );

doc
  .fillColor("#666")
  .fontSize(10)
  .text(
    "This is a computer generated invoice and does not require a physical signature.",
    40,
    785,
    {
      align: "center",
      width: 500,
    }
  );

// doc.text(
//   "We appreciate your trust in Juvenis.",
//   40,
//   800,
//   {
//     align: "center",
//     width: 500,
//   }
// );

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