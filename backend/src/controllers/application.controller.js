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

const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await applicationService.updateApplicationStatus(id, status);

    if (result.type === "NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (result.type === "INVALID_TRANSITION") {
      return res.status(409).json({
        success: false,
        message: `Cannot change application status from ${result.currentStatus} to ${status}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      data: result.application,
    });
  } catch (error) {
    console.error("Update application status error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createApplication,
  getApplicationById,
  updateApplicationStatus,
};