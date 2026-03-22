const orderConfirmedTemplate = (orderId, price, orderLink) => ({
  subject: "Your Order is Confirmed 🎉",
  html: `
   <div style="background:#f4f6f8; padding:40px 10px; font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
  <div style="max-width:620px; margin:auto; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 8px 25px rgba(0,0,0,0.08);">
    <!-- Header -->
    <div style="background:#4b1207; padding:22px; text-align:center;">
      <h1 style="color:white; margin:0; font-size:22px; letter-spacing:0.5px;">Nobbo</h1>
      <p style="color:#f3f4f6; margin:6px 0 0; font-size:13px;">Premium Streetwear</p>
    </div>
    <!-- Success Banner -->
    <div style="padding:30px 30px 10px; text-align:center;">
      <div style="display:inline-block; background:#e8f8ef; color:#16a34a; padding:8px 16px; border-radius:50px; font-size:13px; font-weight:600;">
        ✔ Payment Successful
      </div>
      <h2 style="margin:18px 0 8px; color:#111; font-size:24px;">
        Order Confirmed 🎉
      </h2>
      <p style="color:#6b7280; font-size:15px; margin:0;">
        Thanks for shopping with us! We’ve received your order and are getting it ready.
      </p>
    </div>
    <!-- Order Card -->
    <div style="padding:25px 30px;">
      <div style="border:1px solid #e5e7eb; border-radius:14px; padding:20px;">
        <table width="100%" style="border-collapse:collapse;">
          <tr>
            <td style="color:#6b7280; font-size:14px;">Order ID</td>
            <td align="right" style="color:#111; font-weight:600;">${orderId}</td>
          </tr>
          <tr>
            <td colspan="2" style="height:14px;"></td>
          </tr>
          <tr>
            <td style="color:#6b7280; font-size:14px;">Amount Paid</td>
            <td align="right" style="color:#16a34a; font-size:20px; font-weight:700;">
              ₹${price}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <!-- CTA Button -->
    <div style="text-align:center; padding:10px 30px 30px;">
      <a href="${orderLink}"
         style="background:#4b1207; color:white; text-decoration:none; padding:14px 28px; border-radius:10px; display:inline-block; font-weight:600; font-size:14px;">
        View Your Order
      </a>
    </div>
    <!-- Info Section -->
    <div style="border-top:1px solid #f1f5f9; padding:25px 30px;">
      <p style="margin:0; color:#374151; font-size:14px;">
        We’re preparing your items and you’ll receive shipping & tracking details soon.
      </p>
      <p style="margin:12px 0 0; color:#6b7280; font-size:13px;">
        Need help? Contact our support anytime.
      </p>
    </div>
    <!-- Footer -->
    <div style="background:#fafafa; padding:20px; text-align:center; font-size:12px; color:#9ca3af;">
      <strong style="color:#4b1207;">Nobbo</strong><br/>
      Kolkata, India<br/><br/>
      This is a secure transaction email. Please do not reply directly.
    </div>
  </div>
</div>
  `,
});

module.exports = orderConfirmedTemplate;
