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
    text: `Dear User,

    A password reset for your account was requested.
    
    Please click the Link below to change your password.
    
    ${resetLink}
    
    Note that this link is valid for 10 min. After the time limit has expired, you will have to resubmit the request for a password reset.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Link has been sent successfully." };
  } catch (error) {
    return {
      success: false,
      message: "Failed to send link. Please try again.",
    };
  }
};
