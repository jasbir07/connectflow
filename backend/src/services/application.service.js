const { pool } = require("../config/db");

const createApplication = async (data) => {
  const { applicantName, applicantEmail, programmeName } = data;

  const query = `
    INSERT INTO applications
    (applicant_name, applicant_email, programme_name)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const values = [
    applicantName,
    applicantEmail,
    programmeName,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};


const getApplicationById = async (id) => {
  const query = `
    SELECT * FROM applications
    WHERE id = $1;
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0] || null;
};

const allowedTransitions = {
  PENDING: ["PROCESSING"],

  PROCESSING: ["APPROVED", "REJECTED", "FAILED"],

  FAILED: ["PROCESSING"],

  APPROVED: [],

  REJECTED: [],
};
const updateApplicationStatus = async (id, newStatus) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Get application and lock its row
    const result = await client.query(
      `SELECT * FROM applications WHERE id = $1 FOR UPDATE`,
      [id]
    );

    if (result.rows.length === 0) {
      await client.query("ROLLBACK");
      return { type: "NOT_FOUND" };
    }

    const application = result.rows[0];
    const currentStatus = application.status;

    // Check whether transition is allowed
    if (!allowedTransitions[currentStatus].includes(newStatus)) {
      await client.query("ROLLBACK");

      return {
        type: "INVALID_TRANSITION",
        currentStatus,
      };
    }

    // Update application status
    const updateResult = await client.query(
      `UPDATE applications
       SET status = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [newStatus, id]
    );

    await client.query("COMMIT");

    return {
      type: "SUCCESS",
      application: updateResult.rows[0],
    };

  } catch (error) {
    await client.query("ROLLBACK");
    throw error;

  } finally {
    client.release();
  }
};


module.exports = { createApplication, getApplicationById, updateApplicationStatus };