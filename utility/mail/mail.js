const dotenv = require("dotenv");
const templates = require("./templates");
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_KEY);

dotenv.config();

const sendMail = async (
  orderId,
  templateName,
  price,
  recipient,
  otp,
  message,
) => {
  let template;
  if (templateName === "orderConfirmed") {
    template = templates["orderConfirmed"](orderId, price, recipient);
  }
  if (templateName === "resetPasswordOtp") {
    template = templates["resetPasswordOtp"](otp);
  }
  if (templateName === "help") {
    template = templates["help"]();
  }
  if (templateName === "adminMail") {
    template = templates["adminMail"](recipient, message);
  }
  try {
    const msg = {
      to: templateName === "adminMail" ? "arnabduttaspam@gmail.com" : recipient, // Change to your recipient
      from: "Nobbo <no-reply@business.nobbo.in>", // Change to your verified sender
      subject: template.subject,
      html: template.html,
    };
    console.log(msg);

    const response = await resend.emails.send(msg);

    console.log(response);

    return response;
  } catch (error) {
    console.log("Error in mail server", error);
    return error;
  }
};

module.exports = { sendMail };
