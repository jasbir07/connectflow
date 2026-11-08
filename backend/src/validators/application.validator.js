const { body, param, validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  }

  next();
};

const createApplicationValidator = [
  body("applicantName")
    .trim()
    .notEmpty()
    .withMessage("Applicant name is required")
    .isLength({ max: 100 })
    .withMessage("Applicant name cannot exceed 100 characters"),

  body("applicantEmail")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email address")
    .isLength({ max: 150 })
    .withMessage("Email cannot exceed 150 characters"),

  body("programmeName")
    .trim()
    .notEmpty()
    .withMessage("Programme name is required")
    .isLength({ max: 150 })
    .withMessage("Programme name cannot exceed 150 characters"),

  validateRequest,
];

const applicationIdValidator = [
  param("id")
    .isUUID()
    .withMessage("Invalid application ID format"),

  validateRequest,
];

module.exports = {
  createApplicationValidator,
  applicationIdValidator,
};