# ConnectFlow — System Architecture

## 1. Architecture Goal

Enable independent digital systems to exchange permitted information through a controlled integration layer without requiring the source systems to be replaced.

## 2. Initial Components

### A. React Frontend
Responsibilities:
- Create and view applications.
- Present the purpose and fields requested for an information exchange.
- Allow the user to grant or deny consent.
- Display application status and exchange history.
- Present understandable errors without exposing internal details.

### B. ConnectFlow API
Technology: Node.js and Express.

Responsibilities:
- Validate incoming requests.
- Manage applications and consent records.
- Enforce consent checks before protected-data retrieval.
- Call the Eligibility Registry through a connector.
- Map and validate source responses.
- Maintain exchange status and audit records.
- Return consistent API responses.

The first implementation will be a modular backend rather than multiple independently deployed microservices.

### C. PostgreSQL
Stores ConnectFlow-owned data:
- Applications
- Consent records
- Integration exchange records
- Application timeline events
- Audit metadata

Use relational constraints and transactions where required to maintain data integrity.

### D. Eligibility Registry Mock API
A separately implemented service with synthetic eligibility records.

Responsibilities:
- Accept a defined eligibility query.
- Validate its request contract.
- Return a documented response.
- Simulate unavailable-service and invalid-response scenarios for testing.

It represents an independent source system, not a connection to a real government database.

## 3. Main Data Flow

1. A citizen creates an application.
2. ConnectFlow assigns an application identifier.
3. The user reviews the purpose and fields needed for an eligibility check.
4. The application records a grant or denial of consent.
5. The citizen requests an eligibility check.
6. The backend verifies application access and valid consent.
7. ConnectFlow creates an exchange record.
8. The eligibility connector calls the mock registry.
9. The backend validates and maps the response into the canonical model.
10. The exchange outcome and audit metadata are saved.
11. The application status and timeline are updated.
12. The frontend displays the result or an actionable error.

## 4. Failure Handling

- Consent absent, denied, or revoked: do not initiate a new protected-data retrieval.
- Registry timeout: record an appropriate failed or pending outcome without falsely reporting success.
- Invalid registry response: reject or quarantine the response and record the validation failure.
- Duplicate submission: use an idempotency mechanism for supported operations.
- Database failure: do not report success if the necessary persistent records were not saved.
- Retry: retry only when appropriate; avoid blindly repeating non-idempotent side effects.

## 5. Security Boundaries

- The backend, not the browser, enforces protected-data access.
- Use server-side configuration for credentials.
- Return only fields needed by the requesting workflow.
- Record consent scope and purpose.
- Avoid storing or logging unnecessary personal information.
- Enforce access control on application and audit endpoints.
- Validate inputs and authenticate service-to-service requests as the project evolves.

The initial prototype will use synthetic identities and records.

## 6. Observability

Record structured events for:
- Exchange requested
- Consent check outcome
- Source request outcome
- Validation failure
- Retry attempt
- Exchange completed or failed

Metrics will include request count, success/failure rate, duration, and source availability.

Do not put credentials, access tokens, or unnecessary sensitive information in logs.

## 7. Initial Deployment Approach

Develop and test the frontend, ConnectFlow API, PostgreSQL, and mock registry locally. Add Docker Compose after the basic services run successfully.

CI/CD and cloud deployment will be introduced after automated tests and configuration practices are established.

## 8. Current Limitations

- No live government integration.
- No production identity federation.
- No claim of regulatory certification.
- Synthetic data only.
- Consent recording is a prototype feature and does not, by itself, establish legal compliance for a real government deployment.

## 9. Architectural Evolution

Consider background queues if integrations become long-running or require asynchronous processing. Consider Redis if measured requirements justify caching, distributed coordination, or rate limiting. Introduce independently deployed services only when there is a clear operational or scaling reason.