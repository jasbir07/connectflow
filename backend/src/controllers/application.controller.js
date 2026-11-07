const applicationService = require("../services/application.service");

const createApplication = async (req, res) => {
  try {
    const { applicantName, applicantEmail, programmeName } = req.body;

    if (!applicantName || !applicantEmail || !programmeName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const application = await applicationService.createApplication({
      applicantName,
      applicantEmail,
      programmeName,
    });

    return res.status(201).json({
      success: true,
      message: "Application created successfully",
      data: application,
    });

  } catch (error) {
    console.error("Create application error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await applicationService.getApplicationById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application fetched successfully",
      data: application,
    });

  } catch (error) {
    console.error("Get application error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


module.exports = { createApplication, getApplicationById };