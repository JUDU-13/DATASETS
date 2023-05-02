const express = require('express');

const stationController = require("../controllers/station");
const { upload } = require("../services/multer");

const router = express.Router();

router.get('/station', stationController.getStation);

router.get('/stations', stationController.getStations);

router.post('/add-station', stationController.addStation);

router.post('/add-area/:stationId', upload.array("images[]"), stationController.addArea);

router.put('/update-area/:stationId', stationController.updateArea);

router.post('/add-station-outline/:stationId', stationController.addStationOutline);

router.get('/station-outline', stationController.getStationOutline);

module.exports = router;