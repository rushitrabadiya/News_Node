const nodemailer = require("nodemailer");
const {
  AUTH_USER,
  AUTH_PASS,
  FRONTEND_URL,
  JWT_SECRET,
  LINK_TOKEN_JWT_EXPIRES_IN,
} = require("../config/config");
const jwt = require("jsonwebtoken");

exports.sendLinkByEmail = async (user, res) => {
  const resetToken = jwt.sign(
    { email: user.email, userId: user._id },
    JWT_SECRET,
    { expiresIn: LINK_TOKEN_JWT_EXPIRES_IN },
  );

  const resetLink = `${FRONTEND_URL}/reset-password?token=${resetToken}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: AUTH_USER, pass: AUTH_PASS },
  });

  const mailOptions = {
    from: AUTH_USER,
    to: user.email,
    subject: "Password Reset Request",
    text: `Click the link below to reset your password. The link will expire in 1 hour:
          ${resetLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      success: true,
      message: "Link has been sent successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send link. Please try again.",
    });
  }
};
