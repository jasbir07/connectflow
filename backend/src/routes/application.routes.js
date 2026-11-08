const express = require("express");
const router = express.Router();

const {
  createApplication,
  getApplicationById,
  updateApplicationStatus,
} = require("../controllers/application.controller");

const {
  createApplicationValidator,
  applicationIdValidator,
  updateStatusValidator,
} = require("../validators/application.validator");

router.post("/", createApplicationValidator, createApplication);

router.get("/:id", applicationIdValidator, getApplicationById);

router.patch(
  "/:id/status",
  applicationIdValidator,
  updateStatusValidator,
  updateApplicationStatus
);
module.exports = router;