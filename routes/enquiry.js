const express = require('express');

const enquiryController = require("../controllers/enquiry");

const router = express.Router();

router.get('/enquiries', enquiryController.getEnquiry);

router.post('/enquiry', enquiryController.addEnquiry);

router.put('/enquiry/:enqId', enquiryController.updateEnquiry);

router.delete('/enquiry/:enqId', enquiryController.deleteEnquiry);

module.exports = router;