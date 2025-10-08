const express = require("express");
const router = express.Router();
const { sendOTP, verifyOTP } = require("../controllers/emailController");

router.get("/", (req, res)=>{
    res.send("Hello from server");
})
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);

module.exports = router;
