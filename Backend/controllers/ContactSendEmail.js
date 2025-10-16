import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const ContactSendEmail = async (req, res) => {
    const { name, email, phone, message } = req.body;

    // Simple validation
    if (!name || !email || !phone || !message) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    try {
        // Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false // ✅ Add this line
            }
        });

        const mailOptions = {
            from: `"Contact Form" <${process.env.EMAIL_USER}>`, // always send from your email
            to: process.env.EMAIL_USER,
            subject: 'kachaBazar Message',
            html: `
  <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <div style="background-color: #10b981; padding: 20px; text-align: center; color: white;">
      <h1 style="margin: 0;">Kachabazar</h1>
      <p style="margin: 5px 0;">New Contact Request</p>
    </div>

    <div style="background-color: #fff; padding: 20px; border-radius: 5px;">
      <h2 style="color: #333;">You have received a new message</h2>
      <p style="font-size: 16px; color: #555;">
        A user has submitted a message via the contact form.
      </p>

      <table style="width: 100%; margin-top: 20px;">
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #333;">Name:</td>
          <td style="padding: 8px; color: #555;">${name}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 8px; font-weight: bold; color: #333;">Email:</td>
          <td style="padding: 8px; color: #555;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #333;">Phone:</td>
          <td style="padding: 8px; color: #555;">${phone}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 8px; font-weight: bold; color: #333;">Message:</td>
          <td style="padding: 8px; color: #555;">${message}</td>
        </tr>
      </table>

      <div style="margin-top: 30px; font-size: 14px; color: #777;">
        <p>Thank you for using <strong>Kachabazar</strong>.</p>
        <p>We’ll contact this user as soon as possible.</p>
      </div>
    </div>

    <div style="text-align: center; font-size: 12px; color: #aaa; margin-top: 20px;">
      &copy; ${new Date().getFullYear()} Kachabazar. All rights reserved.
    </div>
  </div>
`

        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: "Email sent successfully. Thank you for contacting us!",
        });

    } catch (error) {
        console.error("Email send error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error: Could not send email.",
        });
    }
};
