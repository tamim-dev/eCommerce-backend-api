const express = require("express");
const router = express.Router();
const registrationController = require("../../controllers/registrationController");
const otpController = require("../../controllers/otpController");


router.post("/registration", registrationController);
router.post("/otpverify", otpController)

module.exports = router;
