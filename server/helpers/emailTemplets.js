const otpEmailTemplate = (fullName, otp) => {
  return `
    <div 
      style="
        font-family: Arial, sans-serif;
        max-width: 500px;
        margin: auto;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 10px;
      "
    >

      <h2 style="color: #333; text-align: center;">
        Email Verification
      </h2>

      <p>Hello <b>${fullName}</b>,</p>

      <p>
        Your OTP code is:
      </p>

      <div
        style="
          background: #f4f4f4;
          padding: 15px;
          text-align: center;
          font-size: 30px;
          letter-spacing: 5px;
          font-weight: bold;
          color: #007bff;
          border-radius: 8px;
        "
      >
        ${otp}
      </div>

      <p style="margin-top: 20px;">
        This OTP is valid for 5 minutes.
      </p>

      <p>
        Please do not share this code with anyone.
      </p>

      <br/>

      <p>
        Regards,<br/>
        Single Vendor Team
      </p>

    </div>
  `;
};

module.exports = otpEmailTemplate;