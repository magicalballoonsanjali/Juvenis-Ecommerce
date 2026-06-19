export default function invoiceTemplate(
  order,
  user,
  address,
  logoBase64
) {
  const totalAmount = 
    order.amount ;

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />

<style>

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

body{
  font-family: Arial, sans-serif;
  background:#f4f6f4;
  padding:30px;
  color:#222;
}

.invoice-container{
  max-width:850px;
  margin:auto;
  background:white;
  position:relative;
  overflow:hidden;
  border-radius:10px;
  box-shadow:0 10px 30px rgba(0,0,0,0.08);
}

.top-corner{
  position:absolute;
  top:0;
  right:0;
  width:0;
  height:0;
  border-top:90px solid #16a34a;
  border-left:90px solid transparent;
}

.bottom-corner{
  position:absolute;
  bottom:0;
  left:0;
  width:0;
  height:0;
  border-bottom:90px solid #16a34a;
  border-right:90px solid transparent;
}

.content{
  padding:40px;
}

.header{
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  margin-bottom:35px;
}

.company{
  display:flex;
  gap:5px;
  align-items:center;
}

.logo{
  width:65px;
  height:65px;
  border-radius:12px;

  display:flex;
  align-items:center;
  justify-content:center;
  color:white;
  font-size:26px;
  font-weight:bold;
}

.company-details h1{
  color:#166534;
  font-size:30px;
  margin-bottom:4px;
}

.company-details p{
  color:#666;
  font-size:13px;
}

.invoice-title{
  text-align:right;
}

.invoice-title h2{
  color:#166534;
  font-size:34px;
  margin-bottom:10px;
}

.invoice-title p{
  font-size:13px;
  margin:4px 0;
}

.info-section{
  display:flex;
  justify-content:space-between;
  gap:30px;
  margin-bottom:30px;
}

.box{
  flex:1;
  background:#f7faf7;
  border:1px solid #e5e7eb;
  border-radius:12px;
  padding:18px;
}

.box h3{
  color:#166534;
  margin-bottom:12px;
  font-size:16px;
}

.box p{
  margin-bottom:6px;
  font-size:14px;
}

table{
  width:100%;
  border-collapse:collapse;
  margin-top:25px;
}

thead{
  background:#16a34a;
  color:white;
}

th{
  padding:14px;
  text-align:left;
  font-size:14px;
}

td{
  padding:14px;
  border-bottom:1px solid #e5e7eb;
  font-size:14px;
}

tbody tr:nth-child(even){
  background:#f8faf8;
}

.total-section{
  display:flex;
  justify-content:flex-end;
  margin-top:25px;
}

.total-box{
  width:320px;
  background:#f0fdf4;
  border:1px solid #bbf7d0;
  border-radius:12px;
  padding:20px;
}

.total-row{
  display:flex;
  justify-content:space-between;
  margin-bottom:12px;
}

.grand-total{
  font-size:22px;
  font-weight:bold;
  color:#166534;
}

.payment-status{
  display:inline-block;
  margin-top:15px;
  background:#dcfce7;
  color:#166534;
  padding:8px 16px;
  border-radius:50px;
  font-weight:600;
  font-size:13px;
}

.footer{
  margin-top:50px;
  border-top:1px solid #e5e7eb;
  padding-top:20px;
  text-align:center;
}

.footer h3{
  color:#166534;
  margin-bottom:10px;
}

.footer p{
  color:#666;
  font-size:13px;
  line-height:1.6;
}

.signature{
  margin-top:35px;
  text-align:right;
}

.signature p{
  color:#666;
  font-size:13px;
}

.signature strong{
  color:#166534;
}

</style>
</head>

<body>

<div class="invoice-container">

<div class="top-corner"></div>
<div class="bottom-corner"></div>

<div class="content">

<div class="header">

<div class="company">

<div class="logo">

<img
  src="${logoBase64}"
   alt="Juvenis Logo"
  style="width:100%;height:100%;object-fit:contain;"
/>
</div>


<div class="company-details">

<h1>JUVENIS</h1>

<p>Premium Skin & Hair Care Solutions</p>

<p>products@juvenisinnovations.in</p>

<p>www.juvenis.in</p>

</div>

</div>

<div class="invoice-title">

<h2>INVOICE</h2>

<p><strong>Invoice No:</strong> ${order.invoiceNumber}</p>

<p><strong>Order ID:</strong> ${order._id}</p>

<p><strong>Date:</strong> ${new Date(
    order.date
  ).toLocaleDateString()}</p>

</div>

</div>

<div class="info-section">

<div class="box">

<h3>Bill To</h3>

<p><strong>${user.name}</strong></p>

<p>${user.email}</p>

<p>${address.phoneNumber || ""}</p>

<p>
${address.area},
${address.city},
${address.state}
</p>

</div>

<div class="box">

<h3>Payment Details</h3>

<p><strong>Payment ID:</strong></p>

<p>${order.razorpayPaymentId || "-"}</p>

<div class="payment-status">
${order.paymentStatus}
</div>

</div>

</div>

<table>

<thead>

<tr>
<th>Product</th>
<th>Quantity</th>
<th>Price</th>
<th>Total</th>
</tr>

</thead>

<tbody>

${order.items
  .map(
    (item) => `
<tr>

<td>${item.product.name}</td>

<td>${item.quantity}</td>

<td>₹${item.product.offerPrice}</td>

<td>₹${
      item.quantity *
      item.product.offerPrice
    }</td>

</tr>
`
  )
  .join("")}

</tbody>

</table>

<div class="total-section">

<div class="total-box">

<div class="total-row">
<span>Subtotal</span>
<span>₹${totalAmount}</span>
</div>

<div class="total-row">
<span>Shipping</span>
<span>Free</span>
</div>

<hr style="margin:15px 0; border:none; border-top:1px solid #d1d5db;">

<div class="total-row grand-total">
<span>Total</span>
<span>₹${totalAmount}</span>
</div>

</div>

</div>

<div class="signature">

<p>Authorized Signature</p>

<strong>JUVENIS</strong>

</div>

<div class="footer">

<h3>Thank You For Your Purchase</h3>

<p>
This is a computer generated invoice and does not
require a physical signature.
</p>

<p>
We appreciate your trust in Juvenis.
</p>

</div>

</div>

</div>

</body>
</html>
`;
}