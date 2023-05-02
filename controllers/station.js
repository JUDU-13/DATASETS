const Station = require("../models/station");
const { cloudinary } = require("../services/multer");

exports.getStation = async (req, res, next) => {
  const stationName = req.query.stationName;

  try {
    const station = await Station.findOne({ stationName: stationName });
    if (!station) {
      const error = new Error("STATION_NOT_FOUND");
      error.statusCode = 401;
      throw error;
    }

    res.status(201).json({
      message: "STATION_FETCHED",
      station: station,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getStations = async (req, res, next) => {
  try {
    const stations = await Station.find();
    if (!stations) {
      const error = new Error("NO_STATIONS_FOUND");
      error.statusCode = 401;
      throw error;
    }

    res.status(201).json({
      message: "STATIONS_FETCHED",
      stations: stations,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addStation = async (req, res, next) => {
  const stationName = req.body.stationName;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  try {
    const station = new Station({
      stationName: stationName,
      latitude: latitude,
      longitude: longitude,
    });

    await station.save();

    res.status(201).json({
      message: "STATION_ADDED",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addArea = async (req, res, next) => {
  const areaName = req.body.areaName;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const area = req.body.area;
  const desc = req.body.desc;
  const floor = req.body.floor;
  const stationId = req.params.stationId;
  const images = [];
  const files = req.files;

  try {
    if (!files) {
      const error = new Error("No images provided.");
      error.statusCode = 422;
      throw error;
    }

    const imagePromise = files.map((image) =>
      cloudinary.uploader.upload(image.path)
    );
    const response = await Promise.all(imagePromise);
    response.forEach((image) => {
      images.push(image.url);
    });

    const station = await Station.findOne({ _id: stationId });
    if (!station) {
      const error = new Error("NO_STATION_FOUND");
      error.statusCode = 401;
      throw error;
    }

    const newArea = {
      areaName: areaName,
      latitude: latitude,
      longitude: longitude,
      area: area,
      desc: desc,
      images: images,
      floor: floor,
    };

    const updatedDetails = [...station.details, newArea];

    await station.updateOne({ details: updatedDetails });

    res.status(201).json({
      message: "AREA_ADDED",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateArea = async (req, res, next) => {
  const stationId = req.params.stationId;
  const areaId = req.query.areaId;
  const areaName = req.body.areaName;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const area = req.body.area;
  const desc = req.body.desc;
  const imgUrl = req.body.imgUrl;
  const floor = req.body.floor;

  try {
    const station = await Station.findOne({ _id: stationId });
    if (!station) {
      const error = new Error("NO_STATION_FOUND");
      error.statusCode = 401;
      throw error;
    }

    var areas = station.details;

    const findArea = station.details.find((e) => e._id == areaId);

    const updatedArea = {
      areaName: !areaName ? findArea.areaName : areaName,
      latitude: !latitude ? findArea.latitude : latitude,
      longitude: !longitude ? findArea.longitude : longitude,
      area: !area ? findArea.area : area,
      desc: !desc ? findArea.desc : desc,
      imgUrl: !imgUrl ? findArea.imgUrl : imgUrl,
      floor: !floor ? findArea.floor : floor,
    };

    const idx = station.details.findIndex((e) => e._id == areaId);

    areas[idx] = updatedArea;

    await station.updateOne({ details: areas });

    res.status(201).json({
      message: "AREA_UPDATED",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addStationOutline = async (req, res, next) => {
  const stationId = req.params.stationId;
  const stnOutline = req.body.stnOutline;

  try {
    const station = await Station.findOne({ _id: stationId });
    if (!station) {
      const error = new Error("NO_STATION_FOUND");
      error.statusCode = 401;
      throw error;
    }

    const outlineData = JSON.stringify(stnOutline);

    await station.updateOne({ outline: outlineData });

    res.status(201).json({
      message: "OUTLINE_ADDED",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getStationOutline = async (req, res, next) => {
  const stationName = req.query.stationName;

  try {
    const station = await Station.findOne({ stationName: stationName });
    if (!station) {
      const error = new Error("STATION_NOT_FOUND");
      error.statusCode = 401;
      throw error;
    }

    const outline = JSON.parse(station.outline);

    res.status(201).json({
      message: "OUTLINE_FETCHED",
      outline: outline
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};