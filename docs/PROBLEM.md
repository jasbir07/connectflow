# Problem Definition — ConnectFlow

## 1. Background

Government departments can operate separate portals, applications, registries, databases, and workflow systems. These systems may have been developed independently and may use incompatible APIs, identifiers, formats, and processes.

Consequently, citizens and businesses may need to submit the same information more than once, track applications through separate portals, or visit multiple offices. Officials may lack a consolidated view of application progress.

## 2. Problem Statement

How can independent digital systems exchange permitted information securely and reliably, maintain consistent records, and coordinate workflows without requiring the existing systems to be completely replaced?

## 3. Target Users

- Citizens and applicants
- Departmental service operators
- System administrators
- Developers responsible for integrating existing systems

These are initial user hypotheses to be validated.

## 4. Proposed Solution

Build an interoperability middleware platform that connects separate systems through reusable API connectors and a common data model.

The platform will support consent checks, field mapping, data validation, workflow coordination, event notifications, audit logs, exception handling, and unified application tracking.

## 5. Initial Use Case

A citizen applies for a skills-training programme through one system. That system needs an eligibility record held by another system.

ConnectFlow obtains the required permission, requests the permitted data, maps the response into a standard format, records the exchange, and updates the application's progress.

Both departmental systems remain independent.

## 6. Initial Scope

- Two simulated departmental systems
- API-based integration
- Common data model
- Consent recording and enforcement
- Application-status tracking
- Audit history
- Validation and error handling
- Demonstration of successful and failed exchanges

## 7. Out of Scope for the MVP

- Direct integration with real government systems
- Production identity federation across government departments
- A complete national master-data platform
- Integration with every departmental portal
- Real citizen personal data

## 8. Success Criteria

- Exchange valid data between two independently implemented APIs.
- Convert differing schemas into a common representation.
- Enforce required consent before permitted data is transferred.
- Record an auditable exchange history.
- Handle unavailable services and invalid responses safely.
- Prevent duplicate operations when requests are retried.
- Demonstrate a unified application timeline.

## 9. Key Risks

- Inconsistent records across systems
- Network failures and duplicate messages
- Conflicting status updates
- Unauthorised data access
- Incorrect identity matching
- Overcomplicated architecture without measurable benefit

## 10. Validation Plan

Use synthetic data to validate the integration mechanics. Document the difference between the prototype's demonstrated capabilities and those that would require real departmental agreements, credentials, and production integrations.