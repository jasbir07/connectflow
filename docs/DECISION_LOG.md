# ConnectFlow — Architecture Decision Log

## ADR-001: Start with a Modular Backend

**Status:** Accepted

### Decision
Use Node.js and Express in a modular backend for ConnectFlow, with a separately implemented mock Eligibility Registry.

### Context
The project needs to demonstrate integration between independent systems without adding unnecessary deployment complexity.

### Alternatives
- One application containing all components
- Modular backend plus an independent mock registry
- Multiple independently deployed microservices

### Rationale
A modular backend keeps application logic manageable, while a separate registry creates a genuine API boundary to exercise integration, validation, timeouts, and retries.

### Consequences
- Fewer deployment dependencies during initial development.
- Clearer separation between ConnectFlow and the simulated external system.
- Future migration to additional independent services remains possible.

## ADR-002: PostgreSQL for ConnectFlow-Owned Records

**Status:** Accepted

### Decision
Use PostgreSQL for applications, consent records, exchange states, and audit metadata.

### Rationale
These records have relationships, constraints, and state transitions that benefit from relational integrity and transactions.

### Consequences
- Foreign keys and constraints can protect data integrity.
- Multi-record state changes can use transactions.
- Schema changes must be managed through database migrations.

## ADR-003: Use a Canonical Data Model

**Status:** Accepted

### Decision
Map source-system responses into a documented canonical representation before returning them to the application.

### Rationale
Different systems can use different field names and representations for equivalent concepts.

### Consequences
- Each connector needs explicit mapping and validation rules.
- The canonical model must define field meaning and allowed values.
- Invalid or ambiguous mappings must be rejected or reviewed.

## ADR-004: Use Synthetic Data Initially

**Status:** Accepted

### Decision
Use synthetic applicants and eligibility records during initial development.

### Rationale
Real government integration requires permission, appropriate credentials, security review, and agreements that we do not currently have.

### Consequences
- The prototype can be developed and tested independently.
- The README and demo must clearly disclose that external systems are simulated.
- Production integration remains future work.

## ADR-005: Defer a Message Broker

**Status:** Accepted

### Decision
Do not introduce Kafka or another message broker in the first iteration.

### Rationale
The first workflow is small enough to demonstrate request/response integration directly.

### Consequences
- The initial API will handle the basic workflow synchronously.
- We will record integration failures and implement safe retry behaviour.
- An asynchronous queue can be introduced later if reliability, latency, or throughput requirements justify it.