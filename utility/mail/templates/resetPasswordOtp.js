const resetPasswordOtp = (otp) => ({
  subject: "Reset Your Password - Nobbo",

  html: `
  <div style="background:#f4f6f8; padding:40px 10px; font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
    <div style="max-width:620px; margin:auto; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 8px 25px rgba(0,0,0,0.08);">

      <!-- Header -->
      <div style="background:#4b1207; padding:22px; text-align:center;">
        <h1 style="color:white; margin:0; font-size:22px; letter-spacing:0.5px;">Nobbo</h1>
        <p style="color:#f3f4f6; margin:6px 0 0; font-size:13px;">Premium Streetwear</p>
      </div>

      <!-- Title -->
      <div style="padding:30px 30px 10px; text-align:center;">
        <div style="display:inline-block; background:#fff4e6; color:#ea580c; padding:8px 16px; border-radius:50px; font-size:13px; font-weight:600;">
          Password Reset Request
        </div>

        <h2 style="margin:18px 0 8px; color:#111; font-size:24px;">
          Verify Your Identity 🔐
        </h2>

        <p style="color:#6b7280; font-size:15px; margin:0;">
          Use the OTP below to reset your password. This code is valid for only <strong>5 minutes</strong>.
        </p>
      </div>

      <!-- OTP Box -->
      <div style="padding:25px 30px; text-align:center;">
        <div style="border:1px dashed #e5e7eb; border-radius:14px; padding:25px; background:#fafafa;">
          <p style="margin:0; color:#6b7280; font-size:13px;">Your One-Time Password</p>

          <div style="font-size:36px; letter-spacing:8px; font-weight:700; color:#4b1207; margin:12px 0;">
            ${otp}
          </div>

          <p style="margin:0; color:#9ca3af; font-size:12px;">
            Expires in 5 minutes
          </p>
        </div>
      </div>

      <!-- Warning -->
      <div style="border-top:1px solid #f1f5f9; padding:25px 30px;">
        <p style="margin:0; color:#374151; font-size:14px;">
          If you didn’t request a password reset, please ignore this email. Your account remains secure.
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#fafafa; padding:20px; text-align:center; font-size:12px; color:#9ca3af;">
        <strong style="color:#4b1207;">Nobbo</strong><br/>
        Kolkata, India<br/><br/>
        For security reasons, never share this OTP with anyone.
      </div>

    </div>
  </div>
  `,
});

module.exports = resetPasswordOtp;
