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


module.exports = { createApplication, getApplicationById };