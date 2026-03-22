const adminMail = (userEmail, userMessage) => ({
  subject: "New Support Message Received",
  html: `
   <div style="background:#f4f6f8; padding:40px 10px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
    <div style="max-width:620px; margin:auto; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 8px 25px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <div style="background:#4b1207; padding:22px; text-align:center;">
        <h1 style="color:white; margin:0; font-size:22px;">Nobbo</h1>
        <p style="color:#f3f4f6; margin:6px 0 0; font-size:13px;">Premium Streetwear</p>
      </div>

      <!-- Main Content -->
      <div style="padding:35px 30px;">
        <h2 style="margin:0 0 20px; color:#111; font-size:20px; text-align:center;">
          New Support Request 📩
        </h2>

        <!-- User Email -->
        <div style="margin-bottom:20px;">
          <p style="margin:0; color:#6b7280; font-size:13px;">From</p>
          <p style="margin:5px 0 0; color:#111; font-size:15px; font-weight:600;">
            ${userEmail}
          </p>
        </div>

        <!-- Divider -->
        <div style="height:1px; background:#e5e7eb; margin:20px 0;"></div>

        <!-- Message -->
        <div>
          <p style="margin:0 0 8px; color:#6b7280; font-size:13px;">User Message</p>
          <div style="background:#f9fafb; padding:15px; border-radius:10px; color:#374151; font-size:14px; line-height:1.6;">
            ${userMessage}
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div style="background:#fafafa; padding:20px; text-align:center; font-size:12px; color:#9ca3af;">
        <strong style="color:#4b1207;">Nobbo Admin Notification</strong><br/>
        Kolkata, India<br/><br/>
        This email was automatically generated from the Help page.
      </div>

    </div>
   </div>
  `,
});

module.exports = adminMail;
