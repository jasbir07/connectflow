const express = require("express");
const router = express.Router();

const {
  createApplication,
  getApplicationById,
} = require("../controllers/application.controller");

const {
  createApplicationValidator,
  applicationIdValidator,
} = require("../validators/application.validator");

router.post("/", createApplicationValidator, createApplication);

router.get("/:id", applicationIdValidator, getApplicationById);

module.exports = router;