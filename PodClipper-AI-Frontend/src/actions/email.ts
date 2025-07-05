// utils/email.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

type EmailOptions = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

export async function sendEmail({ to, subject, text, html }: EmailOptions) {
  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_USER}" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to", to);
  } catch (err) {
    console.error("Error sending email:", err);
  }
}
