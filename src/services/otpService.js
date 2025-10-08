// const otpStore = {}; // Temporary in-memory storage

// function saveOTP(email, otp) {
//   otpStore[email] = otp;
// }

// function verifyOTP(email, otp) {
//   if (otpStore[email] && otpStore[email] == otp) {
//     delete otpStore[email];
//     return true;
//   }
//   return false;
// }

// module.exports = { saveOTP, verifyOTP };
const OTP = require("../models/otpModel");

// Save OTP to MongoDB
async function saveOTP(email, otp) {
  try {
    await OTP.deleteMany({ email }); // remove old OTPs for same email
    const newOTP = new OTP({ email, otp });
    await newOTP.save();
  } catch (error) {
    console.error("Error saving OTP:", error);
  }
}

// Verify OTP from MongoDB
async function verifyOTP(email, otp) {
  try {
    const record = await OTP.findOne({ email, otp });
    if (!record) return false;

    // delete OTP after successful verification
    await OTP.deleteOne({ _id: record._id });
    return true;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return false;
  }
}

module.exports = { saveOTP, verifyOTP };
