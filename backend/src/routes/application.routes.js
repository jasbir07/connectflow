const express = require("express");
const router = express.Router();

const {
  createApplication,
  getApplicationById,
} = require("../controllers/application.controller");

router.post("/", createApplication);

router.get("/:id", getApplicationById);

module.exports = router;