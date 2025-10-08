// const transporter = require("../config/emailConfig");
// const generateOTP = require("../utils/generateOTP");
// const { saveOTP, verifyOTP } = require("../services/otpService");

// exports.sendOTP = async (req, res, next) => {
//   try {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ message: "Email is required" });

//     const otp = generateOTP();
//     saveOTP(email, otp);

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Your Verification Code",
//       text: `Your OTP code is ${otp}`
//     };

//     await transporter.sendMail(mailOptions);
//     res.json({ message: "OTP sent successfully!" });
//   } catch (error) {
//     next(error);
//   }
// };

// exports.verifyOTP = (req, res) => {
//   const { email, otp } = req.body;
//   if (!email || !otp)
//     return res.status(400).json({ message: "Email and OTP are required" });

//   const isValid = verifyOTP(email, otp);
//   if (isValid) {
//     res.json({ message: "Email verified successfully" });
//   } else {
//     res.status(400).json({ message: "Invalid or expired OTP" });
//   }
// };
const transporter = require("../config/emailConfig");
const generateOTP = require("../utils/generateOTP");
const { saveOTP, verifyOTP } = require("../services/otpService");

exports.sendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const otp = generateOTP();
    await saveOTP(email, otp); // ✅ await added

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Verification Code",
      text: `Your OTP code is ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "OTP sent successfully!" });
  } catch (error) {
    next(error);
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res.status(400).json({ message: "Email and OTP are required" });

    const isValid = await verifyOTP(email, otp); 
    if (isValid) {
      res.json({ message: "Email verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid or expired OTP" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
