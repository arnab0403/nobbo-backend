const help = () => ({
  subject: "We've Received Your Request",
  html: `
   <div style="background:#f4f6f8; padding:40px 10px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
    <div style="max-width:620px; margin:auto; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 8px 25px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <div style="background:#4b1207; padding:22px; text-align:center;">
        <h1 style="color:white; margin:0; font-size:22px;">Nobbo</h1>
        <p style="color:#f3f4f6; margin:6px 0 0; font-size:13px;">Premium Streetwear</p>
      </div>

      <!-- Main Content -->
      <div style="padding:40px 30px; text-align:center;">
        <h2 style="margin:0 0 15px; color:#111; font-size:22px;">
          We’ve Received Your Message ✅
        </h2>

        <p style="color:#6b7280; font-size:15px; line-height:1.6; margin:0;">
          Thank you for contacting us. Our team is currently reviewing your issue.
        </p>

        <p style="color:#6b7280; font-size:15px; line-height:1.6; margin:15px 0 0;">
          One of our team members will get back to you shortly.
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#fafafa; padding:20px; text-align:center; font-size:12px; color:#9ca3af;">
        <strong style="color:#4b1207;">Nobbo</strong><br/>
        Kolkata, India<br/><br/>
        This is an automated email confirmation. Please do not reply directly.
      </div>

    </div>
   </div>
  `,
});

module.exports = help;
