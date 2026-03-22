const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
const templates = require("./templates");
dotenv.config();

const key = process.env.SENDGRID_KEY;
sgMail.setApiKey(key);

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
      from: "arnabdutta8584@gmail.com", // Change to your verified sender
      subject: template.subject,
      html: template.html,
    };
    console.log(msg);

    const response = await sgMail.send(msg);

    return response;
  } catch (error) {
    console.log("Error in mail server", error);
    return error;
  }
};

module.exports = { sendMail };
