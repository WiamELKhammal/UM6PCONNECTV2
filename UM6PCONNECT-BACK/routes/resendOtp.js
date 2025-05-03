const express = require("express");
const router = express.Router();
const { resendOtp } = require("../controllers/otpController");

router.post("/", resendOtp);

module.exports = router;
