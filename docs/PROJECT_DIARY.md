# ConnectFlow Project Diary

## Day 1 
### Objective
Define the SIH26129 problem and establish the engineering repository.

### Work Completed
- Selected SIH26129 as the project inspiration.
- Defined the interoperability problem.
- Identified the initial users and workflow.
- Chose two simulated systems for the MVP.
- Established the initial scope and exclusions.

### Key Learning
Interoperability means enabling independent systems to exchange information reliably and securely. It is not simply displaying data from two systems on one dashboard.

### Decisions
- Use synthetic data initially.
- Keep departmental systems independent.
- Build a separate integration layer.
- Introduce technologies incrementally.
- Record successful and failed exchanges.

### Blockers and Questions
- What canonical data model should the systems share?
- How should consent be represented and enforced?
- How should the platform recover when a connected system fails?

### Next Session
Define the MVP requirements, application lifecycle, system boundaries, and initial data model.

### Git Commit
Committed



## Day 2 

### Objective
Convert the interoperability problem into a defined MVP.

### Work Completed
- Defined the primary application-to-eligibility workflow.
- Identified citizen, operator, and administrator roles.
- Documented functional and non-functional requirements.
- Defined initial success criteria and out-of-scope features.
- Identified the need for a canonical data model.
- Separated application status from data-exchange status.

### Key Learning
An integration platform requires explicit contracts, permission checks, data validation, traceability, and failure handling. A successful API response alone is not sufficient to establish reliable interoperability.

### Decisions
- Use two independently implemented mock systems.
- Use synthetic data.
- Keep the initial architecture focused on one workflow.
- Define API contracts before implementation.
- Record metadata for every permitted data exchange.

### Open Questions
- How will connectors authenticate to each system?
- How should a retry behave after a timeout?
- What should happen if consent is revoked during an exchange?
- How will we ensure that identifiers refer to the same person?

### Next Session
Define API contracts, the canonical data model, and the initial architecture diagram.

### Git Commit
Commited

## Day 3 

### Objective
Design the initial system architecture and define API contracts.

### Work Completed
- Defined the responsibilities of the React frontend, ConnectFlow API, PostgreSQL database, and mock registry.
- Documented the initial data flow and failure boundaries.
- Defined API contracts for applications, consent, eligibility checks, exchanges, and timelines.
- Established a canonical response format.
- Documented initial architecture decisions.
- Identified idempotency and consent enforcement as important reliability requirements.

### Key Learning
An API contract specifies expected requests, responses, errors, and operation semantics. An architecture explains how components use those contracts to collaborate.

### Decisions
- Use a modular Node.js backend.
- Keep the mock registry independently implemented.
- Use PostgreSQL for ConnectFlow-owned records.
- Use synthetic data until real integration is authorised.
- Defer message brokers until the workflow requires asynchronous processing.

### Open Questions
- What authentication approach should the prototype use?
- How should the mock registry authenticate ConnectFlow?
- How will transactions protect application and exchange state?
- How should retries behave after a timeout where the source may already have processed a request?

### Next Session
Review the API contracts, confirm operation semantics, and begin the initial backend implementation.

### Git Commit
Committed


## Day 4 – Backend Initialization

### Completed
- Initialized Node.js and Express backend.
- Configured environment variables using dotenv.
- Added Helmet, CORS, and JSON parsing middleware.
- Created API health-check endpoint.
- Verified GET /api/v1/health returns HTTP 200.
- Confirmed backend runs successfully on port 5000.

### Outcome
ConnectFlow backend foundation is running successfully.

### Next
Design and implement the Application module.


# Day 5 – PostgreSQL Integration and Application Module

## Objective
Set up a local PostgreSQL database and implement the initial Application Management APIs for ConnectFlow.

## Tasks Completed

### 1. PostgreSQL Setup
- Installed PostgreSQL 18.6 on the local Windows machine.
- Installed and configured pgAdmin 4.
- Created the `connectflow` database.
- Verified database access using the pgAdmin Query Tool.

### 2. Backend Database Integration
- Installed the `pg` Node.js package.
- Configured database credentials using environment variables.
- Created a reusable database connection module at `src/config/db.js`.
- Implemented a PostgreSQL connection pool.
- Verified connectivity using the SQL query `SELECT NOW()`.
- Updated server startup to establish the database connection before starting Express.

### 3. Applications Database Table
Created the `applications` table with the following fields:
- `id` – UUID primary key.
- `applicant_name` – Applicant's name.
- `applicant_email` – Applicant's email.
- `programme_name` – Requested training programme.
- `status` – Application status with default value `PENDING`.
- `created_at` – Application creation timestamp.
- `updated_at` – Last update timestamp.

Added database constraints for required fields and valid application statuses.

### 4. Application Management APIs

**POST `/api/v1/applications`**
- Implemented application creation.
- Added required-field validation.
- Used parameterized SQL queries to prevent SQL injection.
- Generated unique application UUIDs.
- Returned the created application with HTTP 201.

**GET `/api/v1/applications/:id`**
- Implemented application retrieval using UUID.
- Added handling for applications that do not exist.
- Returned HTTP 200 for successful retrieval.
- Returned HTTP 404 when an application was not found.

### 5. Architecture and Code Organization
Followed a layered backend architecture:

- Routes – API endpoint definitions.
- Controllers – HTTP request and response handling.
- Services – Business logic and database operations.
- Config – Database connection management.

## Testing and Verification
- Successfully connected the Express backend to PostgreSQL.
- Tested application creation using Postman.
- Verified that application records were persisted in PostgreSQL.
- Tested application retrieval using the generated UUID.
- Confirmed that the API response matched the stored database record.

## Outcome
Successfully established PostgreSQL integration and implemented the first two Application Management APIs. ConnectFlow can now create and retrieve citizen training applications using persistent database storage.

## Next Steps
- Implement request validation and error handling.
- Add application status update functionality.
- Build the independent Eligibility Registry system.
- Begin integrating the Application Portal with the Eligibility Registry through ConnectFlow.