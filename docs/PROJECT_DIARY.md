# ConnectFlow Project Diary

## Day 1 — 13 October 2026

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
Pending.



## Day 2 — 13 October 2026

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