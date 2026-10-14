# Product Requirements Document — ConnectFlow

## 1. Product Overview

ConnectFlow is an interoperability middleware platform inspired by SIH26129. It enables independent digital systems to exchange permitted information through reusable connectors and a common data model.

## 2. Problem Statement

Independent systems may use different APIs, field names, identifiers, validation rules, and workflows. Users may therefore need to submit the same information repeatedly, while operators lack a consolidated view of an application's progress.

## 3. Target Users

### Citizen
Submits an application, understands what information is requested, grants or denies permission, and tracks progress.

### Department Operator
Reviews application status and investigates failed or incomplete data exchanges.

### System Administrator
Manages connector configuration, monitors integration health, and reviews permitted audit records.

These roles are for our prototype; actual government workflows must be validated separately.

## 4. Primary User Journey

1. The citizen creates a skills-training application.
2. The application requests access to a specific eligibility result.
3. The citizen reviews the purpose, requested fields, and source system.
4. The citizen grants or denies permission.
5. ConnectFlow checks whether valid permission exists.
6. If permission exists, ConnectFlow requests the permitted information from the Eligibility Registry.
7. ConnectFlow validates the response and maps it to a common data format.
8. The application displays the result and records the exchange history.
9. If the other system fails, the application shows a clear pending or failed state instead of silently losing the request.

## 5. Functional Requirements

### FR-01: Application Management
Create an application with a unique identifier and a visible status.

### FR-02: Consent Management
Allow the applicant to grant, deny, and subsequently revoke permission for a defined purpose and set of fields.

### FR-03: Consent Enforcement
Do not retrieve protected information unless the required consent is valid for that operation.

### FR-04: Reusable Connector
Call the Eligibility Registry through a connector that separates integration logic from application logic.

### FR-05: Data Mapping
Convert differing source and destination field names into a documented common data model.

### FR-06: Validation
Reject or flag invalid, incomplete, or unexpected responses.

### FR-07: Audit History
Record who or what initiated the exchange, its purpose, the relevant application and consent references, the outcome, and the time.

Do not log credentials or unnecessary sensitive data.

### FR-08: Unified Tracking
Display the application lifecycle and its data-exchange events in one timeline.

### FR-09: Failure Handling
Handle timeouts, unavailable services, invalid responses, and denied consent with explicit outcomes.

### FR-10: Duplicate Prevention
Prevent a retried request from creating duplicate application records or repeating a non-idempotent operation unnecessarily.

### FR-11: Access Control
Restrict citizen, operator, and administrator actions according to their roles.

### FR-12: Integration Monitoring
Show connector availability, recent failures, and basic success/failure metrics.

## 6. Non-Functional Requirements

- Validate all incoming data.
- Protect credentials using environment configuration.
- Use least-privilege access.
- Record auditable outcomes.
- Return consistent API errors.
- Test successful and failed integration flows.
- Keep the interface usable on desktop and mobile.
- Use synthetic data in the initial prototype.

## 7. Success Criteria

- A citizen can create an application and see its status.
- An approved exchange retrieves only the permitted fields.
- A denied or revoked consent prevents a new protected-data retrieval.
- Differing source fields are mapped correctly.
- Every exchange has a traceable audit record.
- A failed dependency is visible and recoverable.
- Retrying a request does not create duplicate applications.
- Automated tests cover the main success and failure scenarios.

## 8. Out of Scope for the MVP

- Live integration with government systems.
- Production government identity federation or single sign-on.
- A universal connector marketplace.
- A complete master-data management platform.
- Kafka or Kubernetes before the need is established.
- Real citizen personal data.

## 9. Key Risks

- Incorrect identity matching.
- Invalid or expired consent.
- Duplicate messages and updates.
- Conflicting records between systems.
- Network failures.
- Excessive access to sensitive information.
- Treating a mock integration as proof of production interoperability.

## 10. Initial Constraints

The prototype will use two mock systems, synthetic identities, documented API contracts, and a limited set of eligibility fields. Any future connection to real services requires appropriate authorisation, security review, and agreements.