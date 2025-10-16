export function generateOtpTemplate(otp,name="user") {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="text-align: center; color: #10b981;">KachaBazar</h2>
      <p style="font-size: 16px; color: #333;">
       Hello, <strong>${name}</strong>
      </p>
      <p style="font-size: 16px; color: #333;">
        We received a request to reset your password for your <strong>KachaBazar</strong> account.
      </p>
      <p style="font-size: 16px; color: #333;">
        Please use the OTP code below to complete your password reset:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 32px; font-weight: bold; color: #10b981;">${otp}</span>
      </div>

      <p style="font-size: 14px; color: #555;">
        This OTP is valid for the next 5 minutes. If you did not request a password reset, please ignore this email.
      </p>
    <div>
    <img src="https://static.vecteezy.com/system/resources/previews/007/410/289/large_2x/online-shop-logo-design-vector.jpg" alt="KachaBazar Logo" style="height: 130px; display: block; margin: auto;" />
    </div>

      <p style="margin-top: 40px; font-size: 14px; color: #999; text-align: center;">
        &copy;Copy right ${new Date().getFullYear()} KachaBazar. All rights reserved.
      </p>
    </div>
  `;
}
