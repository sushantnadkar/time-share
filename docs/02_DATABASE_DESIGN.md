# 02_DATABASE_DESIGN.md

# PART 1 — DATABASE ARCHITECTURE

Document Version: 1.0

Status: Approved for Design

Related Document:
MASTER_SRS_v4.0

---

# 1. Purpose

## 1.1 Objective

This document defines the database architecture for the POV Gaming Cafe Booking & Operations Platform.

The database design shall support:

* Reservation management
* Customer management
* Console management
* Payment tracking
* Credit management
* Reporting and analytics
* Audit logging
* Administrative operations

The database shall act as the single source of truth for all operational and financial data within the platform.

---

## 1.2 Scope

This document covers:

* Database architecture
* Collection design
* Relationship strategy
* Data ownership
* Validation requirements
* Indexing strategy
* Data retention
* Audit requirements

API specifications are intentionally excluded and will be defined in:

```text
03_API_SPECIFICATION.md
```

---

# 2. Database Technology

## 2.1 Database Engine

The application shall use:

```text
MongoDB Atlas
```

as the primary data store.

---

## 2.2 Justification

MongoDB Atlas has been selected because:

* Flexible schema evolution
* Excellent support for document-based data
* Native scalability
* Managed backups
* Managed replication
* Atlas Search support
* Strong Node.js ecosystem integration

---

## 2.3 Deployment Model

### Development

```text
MongoDB Atlas
Cluster: Development
Database: pov_gaming_dev
```

---

### Staging

```text
MongoDB Atlas
Cluster: Staging
Database: pov_gaming_stage
```

---

### Production

```text
MongoDB Atlas
Cluster: Production
Database: pov_gaming
```

---

# 3. Collection Inventory

The platform shall contain the following collections.

| Collection          | Purpose                          |
| ------------------- | -------------------------------- |
| users               | System users                     |
| customers           | Customer profiles                |
| bookings            | Reservation records              |
| consoles            | Gaming console resources         |
| settings            | Global application configuration |
| paymentTransactions | Financial transaction ledger     |
| credits             | Customer credit ledger           |
| auditLogs           | Immutable audit trail            |

---

# 4. Collection Ownership

## 4.1 Users

Purpose:

Authentication and authorization.

Contains:

* Owners
* Managers

---

## 4.2 Customers

Purpose:

Customer profiles and customer analytics.

Contains:

* Contact information
* Customer statistics
* Reliability metrics

---

## 4.3 Bookings

Purpose:

Reservation management.

Contains:

* Booking details
* Session information
* Booking lifecycle
* Console assignments

---

## 4.4 Consoles

Purpose:

Resource management.

Contains:

* Console metadata
* Availability settings
* Maintenance status

---

## 4.5 Settings

Purpose:

Global business configuration.

Contains:

* Pricing rules
* Deposit rules
* Notification settings
* Operating hours

---

## 4.6 Payment Transactions

Purpose:

Financial source of truth.

Contains:

* Deposits
* Balance payments
* Cash payments
* Credit redemptions
* Future refunds

---

## 4.7 Credits

Purpose:

Customer credit management.

Contains:

* Issued credits
* Redeemed credits
* Remaining balances

---

## 4.8 Audit Logs

Purpose:

System accountability.

Contains:

* User actions
* Financial actions
* Administrative actions

---

# 5. Naming Standards

## 5.1 Collection Names

Collection names shall:

* Use camelCase
* Use plural nouns
* Remain stable

Examples:

```text
customers
bookings
paymentTransactions
auditLogs
```

---

## 5.2 Field Names

Field names shall:

* Use camelCase
* Use descriptive names
* Avoid abbreviations

Good:

```javascript
customerName
remainingAmount
bookingReference
```

Bad:

```javascript
custNm
remAmt
bkRef
```

---

# 6. Common Document Structure

All business collections shall contain the following metadata.

```javascript
{
  createdAt: Date,

  updatedAt: Date,

  createdBy: ObjectId,

  updatedBy: ObjectId
}
```

---

## 6.1 Purpose

Provides:

* Auditability
* Traceability
* Reporting support

---

# 7. Timestamp Strategy

## 7.1 Storage Standard

All timestamps shall be stored in:

```text
UTC
```

---

## 7.2 Display Standard

The frontend shall convert timestamps into:

```text
Asia/Kolkata
```

for operational display.

---

## 7.3 Examples

Database:

```javascript
{
  createdAt: "2026-07-15T13:30:00.000Z"
}
```

Frontend:

```text
15 Jul 2026, 7:00 PM IST
```

---

# 8. Soft Delete Strategy

## 8.1 Objective

Prevent accidental data loss.

---

## 8.2 Applicable Collections

```text
users
customers
bookings
consoles
```

---

## 8.3 Structure

```javascript
{
  isDeleted: Boolean,

  deletedAt: Date,

  deletedBy: ObjectId
}
```

---

## 8.4 Query Policy

Operational queries shall exclude:

```javascript
{
  isDeleted: true
}
```

unless explicitly requested.

---

# 9. Relationship Strategy

## 9.1 Overview

MongoDB relationships shall be implemented using:

* ObjectId references
* Embedded snapshots
* Event histories

---

## 9.2 Reference Rule

Stable entities shall be referenced.

Example:

```javascript
{
  customerId: ObjectId
}
```

---

## 9.3 Snapshot Rule

Operationally important data shall be duplicated.

Example:

```javascript
{
  customerId: ObjectId,

  customerName: "Sushant",

  phone: "9876543210"
}
```

---

## 9.4 Reason

Historical records must remain accurate even when customer information changes later.

---

# 10. Booking Event Strategy

## 10.1 Objective

Maintain booking timelines.

---

## 10.2 Event Storage

Bookings shall contain:

```javascript
bookingEvents:[]
```

---

## 10.3 Example

```javascript
{
  bookingEvents: [
    {
      type: "created",
      timestamp: Date
    },
    {
      type: "paymentVerified",
      timestamp: Date
    },
    {
      type: "checkedIn",
      timestamp: Date
    }
  ]
}
```

---

## 10.4 Benefits

Supports:

* Analytics
* Auditing
* Operational metrics
* Customer timelines

---

# 11. Settings Architecture

## 11.1 Rule

Exactly one settings document shall exist.

---

## 11.2 Rationale

The application represents a single gaming cafe.

A key-value configuration model is unnecessary.

---

## 11.3 Structure

```javascript
settings
{
  businessInfo: {},

  pricing: {},

  deposits: {},

  notifications: {},

  operatingHours: {},

  bookingRules: {},

  paymentSettings: {}
}
```

---

# 12. Financial Ledger Architecture

## 12.1 Principle

Bookings are operational records.

Payments are financial records.

These concerns must remain separate.

---

## 12.2 Payment Source Of Truth

Financial history shall be maintained in:

```text
paymentTransactions
```

---

## 12.3 Credit Source Of Truth

Credit history shall be maintained in:

```text
credits
```

---

## 12.4 Benefits

Supports:

* Financial audits
* Future refunds
* Multiple payments
* Customer credits

without schema redesign.

---

# 13. Data Retention Policy

## 13.1 Bookings

Retain indefinitely.

---

## 13.2 Customers

Retain indefinitely.

---

## 13.3 Payments

Retain indefinitely.

---

## 13.4 Credits

Retain indefinitely.

---

## 13.5 Audit Logs

Retain indefinitely.

---

# 14. Search Architecture

## 14.1 Searchable Fields

Primary search targets:

```text
bookingReference
customerName
phone
utr
```

---

## 14.2 Atlas Search

Future versions may leverage:

```text
MongoDB Atlas Search
```

for advanced querying.

---

# 15. Security Principles

## 15.1 Sensitive Data

The database shall never store:

* UPI PINs
* Banking passwords
* Payment credentials

---

## 15.2 Password Storage

Passwords shall be stored using:

```text
bcrypt hash
```

only.

---

# 16. Scalability Targets

The schema shall support:

| Entity     | Target     |
| ---------- | ---------- |
| Customers  | 100,000+   |
| Bookings   | 1,000,000+ |
| Payments   | 2,000,000+ |
| Audit Logs | 5,000,000+ |

without structural redesign.

---

# 17. Design Principles

The database design shall adhere to the following principles:

1. Historical records must remain immutable.
2. Financial records must be traceable.
3. Every critical action must be auditable.
4. Settings changes must not require deployment.
5. Reporting queries must remain performant.
6. Schema evolution must support future business growth.
7. Operational workflows must be enforceable through data structures.
8. Financial data and operational data shall remain separated.

---

# 18. Next Section

The next section of this document defines the foundational collections:

```text
PART 2

users
customers
consoles
```

For each collection the following will be specified:

* Collection purpose
* Complete schema
* Field definitions
* Validation rules
* Index strategy
* Example documents
* Relationship mappings
* Query patterns
* Scalability considerations
* Future expansion considerations

# 02_DATABASE_DESIGN.md

# PART 2 — CORE COLLECTIONS

Collections Covered:

* counters
* users
* customers
* consoles

---

# 19. Counters Collection

## 19.1 Purpose

The Counters collection provides atomic sequence generation for human-readable business identifiers.

This collection prevents race conditions and duplicate identifier generation under concurrent load.

Business identifiers generated through this collection include:

* Users
* Customers
* Bookings
* Payments
* Credits

MongoDB ObjectIds remain the primary relational keys.

Human-readable identifiers exist for operational purposes only.

---

## 19.2 Collection Name

```text
counters
```

---

## 19.3 Schema Definition

```javascript
{
  _id: ObjectId,

  counterName: String,

  currentValue: Number,

  prefix: String,

  createdAt: Date,

  updatedAt: Date
}
```

---

## 19.4 Initial Records

```javascript
{
  counterName: "user",
  currentValue: 0,
  prefix: "USR"
}
```

```javascript
{
  counterName: "customer",
  currentValue: 0,
  prefix: "CUS"
}
```

```javascript
{
  counterName: "booking",
  currentValue: 0,
  prefix: "POV"
}
```

```javascript
{
  counterName: "payment",
  currentValue: 0,
  prefix: "PAY"
}
```

```javascript
{
  counterName: "credit",
  currentValue: 0,
  prefix: "CRD"
}
```

---

## 19.5 Generation Strategy

Identifiers shall be generated using:

```javascript
findOneAndUpdate(
  { counterName },
  { $inc: { currentValue: 1 } },
  { new: true }
)
```

This operation must be atomic.

---

## 19.6 Indexes

### Unique Counter Name

```javascript
{
  counterName: 1
}
```

Unique

---

## 19.7 Identifier Formats

### User

```text
USR-000001
```

---

### Customer

```text
CUS-000001
```

---

### Booking

```text
POV-20260715-000001
```

---

### Payment

```text
PAY-000001
```

---

### Credit

```text
CRD-000001
```

---

# 20. Users Collection

## 20.1 Purpose

Stores authenticated administrative users.

Supported roles:

* Owner
* Manager

Customers shall never be stored in this collection.

---

## 20.2 Collection Name

```text
users
```

---

## 20.3 Schema Definition

```javascript
{
  _id: ObjectId,

  userCode: String,

  firstName: String,

  lastName: String,

  fullName: String,

  email: String,

  phone: String,

  passwordHash: String,

  role: String,

  isActive: Boolean,

  lastLoginAt: Date,

  createdAt: Date,

  updatedAt: Date,

  createdBy: ObjectId,

  updatedBy: ObjectId,

  isDeleted: Boolean,

  deletedAt: Date,

  deletedBy: ObjectId
}
```

---

## 20.4 Roles

Allowed values:

```text
owner
manager
```

---

## 20.5 Validation Rules

### Email

Requirements:

* Required
* Unique
* Lowercase
* RFC compliant

---

### Phone

Requirements:

* Required
* Unique
* 10 digits
* Numeric

---

### Password

Requirements:

* Store bcrypt hash only
* Never store plaintext passwords

---

## 20.6 Indexes

### Email

```javascript
{
  email: 1
}
```

Unique

---

### Phone

```javascript
{
  phone: 1
}
```

Unique

---

### Active User Queries

```javascript
{
  role: 1,
  isActive: 1
}
```

---

## 20.7 Query Patterns

Common operations:

* Login
* User Administration
* Manager Listing
* Owner Listing

---

# 21. Customers Collection

## 21.1 Purpose

Stores customer profiles and customer analytics.

A customer profile shall be created automatically upon first reservation.

Customer records shall remain even if all bookings are cancelled.

---

## 21.2 Collection Name

```text
customers
```

---

## 21.3 Schema Definition

```javascript
{
  _id: ObjectId,

  customerCode: String,

  name: String,

  phone: String,

  whatsappNumber: String,

  reliabilityRating: String,

  customerMetrics: {
    totalBookings: Number,

    completedBookings: Number,

    cancelledBookings: Number,

    noShowBookings: Number,

    totalSpent: Number,

    averageSpend: Number,

    totalCreditsIssued: Number,

    totalCreditsRedeemed: Number,

    lifetimeValue: Number,

    totalPlayTimeMinutes: Number,

    averageSessionDurationMinutes: Number,

    last12MonthSpend: Number,

    reliabilityScore: Number
  },

  notes: [
    {
      _id: ObjectId,

      note: String,

      createdAt: Date,

      createdBy: ObjectId
    }
  ],

  tags: [String],

  firstVisitDate: Date,

  lastVisitDate: Date,

  lastBookingDate: Date,

  createdAt: Date,

  updatedAt: Date,

  createdBy: ObjectId,

  updatedBy: ObjectId,

  isDeleted: Boolean,

  deletedAt: Date,

  deletedBy: ObjectId
}
```

---

## 21.4 Reliability Ratings

Allowed values:

```text
excellent
good
warning
highRisk
```

---

## 21.5 Customer Metrics

### Purpose

Store pre-calculated analytical values.

Metrics are system-managed.

Metrics must never be edited manually.

---

## 21.6 Notes

Customer notes shall be auditable.

Every note must contain:

* Author
* Timestamp

Example:

```javascript
{
  note: "Regular FIFA player",

  createdBy: ObjectId,

  createdAt: Date
}
```

---

## 21.7 Tags

Examples:

```javascript
[
  "regular",
  "vip",
  "weekendCustomer",
  "highValue"
]
```

Tags are intended for operational classification.

---

## 21.8 Validation Rules

### Name

Minimum Length:

```text
2
```

Maximum Length:

```text
100
```

---

### Phone

Requirements:

* Required
* Unique
* 10 digits

---

### WhatsApp Number

Requirements:

* Optional
* May equal phone number
* May differ from phone number

---

## 21.9 Indexes

### Customer Code

```javascript
{
  customerCode: 1
}
```

Unique

---

### Phone

```javascript
{
  phone: 1
}
```

Unique

---

### Name Search

```javascript
{
  name: "text"
}
```

Text Index

---

### High Value Customers

```javascript
{
  "customerMetrics.totalSpent": -1
}
```

---

### Recent Customers

```javascript
{
  lastVisitDate: -1
}
```

---

### Reliability

```javascript
{
  reliabilityRating: 1
}
```

---

## 21.10 Relationships

Referenced By:

```text
bookings
credits
paymentTransactions
```

---

# 22. Consoles Collection

## 22.1 Purpose

Represents bookable gaming resources.

Every booking must be assigned to exactly one console.

Console selection is performed by the booking engine.

Customers never choose consoles directly.

---

## 22.2 Collection Name

```text
consoles
```

---

## 22.3 Schema Definition

```javascript
{
  _id: ObjectId,

  consoleCode: String,

  name: String,

  displayName: String,

  displayOrder: Number,

  type: String,

  status: String,

  maxPlayers: Number,

  location: String,

  notes: String,

  isBookable: Boolean,

  createdAt: Date,

  updatedAt: Date,

  createdBy: ObjectId,

  updatedBy: ObjectId,

  isDeleted: Boolean,

  deletedAt: Date,

  deletedBy: ObjectId
}
```

---

## 22.4 Status Values

```text
active
maintenance
disabled
retired
```

---

## 22.5 Supported Types

Current:

```text
ps5
```

Future:

```text
ps6
xbox
gamingPc
vrStation
```

---

## 22.6 Display Order

Controls console ordering throughout the platform.

Example:

```text
PS5-001 → 1
PS5-002 → 2
PS5-003 → 3
```

---

## 22.7 Validation Rules

### Console Code

* Required
* Unique

---

### Name

* Required
* Unique

---

### Display Order

* Required
* Unique
* Positive Integer

---

### Max Players

Minimum:

```text
1
```

Maximum:

```text
10
```

---

## 22.8 Indexes

### Console Code

```javascript
{
  consoleCode: 1
}
```

Unique

---

### Display Order

```javascript
{
  displayOrder: 1
}
```

Unique

---

### Assignment Engine

```javascript
{
  status: 1,
  isBookable: 1
}
```

---

### Console Type

```javascript
{
  type: 1
}
```

---

## 22.9 Relationships

Referenced By:

```text
bookings
```

---

# 23. Core Design Principles

## Principle 1

Users represent staff only.

---

## Principle 2

Phone number is the primary customer identifier.

---

## Principle 3

Customer metrics are system-generated.

---

## Principle 4

Customer notes must be auditable.

---

## Principle 5

Console assignment is automatic.

---

## Principle 6

Business identifiers are generated through the counters collection.

---

## Principle 7

Historical records must remain immutable.

---

## Principle 8

MongoDB ObjectIds remain the primary relational keys.

Business identifiers exist solely for operational use.

---

# 24. Next Section

Part 3 defines the primary business collections:

```text
bookings
paymentTransactions
credits
settings
auditLogs
```

These collections contain the booking lifecycle, financial ledger, notification settings, pricing engine configuration, and audit architecture that power the entire platform.

# 02_DATABASE_DESIGN.md

# PART 3 — BUSINESS, FINANCIAL & CONFIGURATION COLLECTIONS

Collections Covered:

* bookings
* paymentTransactions
* credits
* settings
* auditLogs

---

# 25. Bookings Collection

## 25.1 Purpose

The Bookings collection represents reservation lifecycle management.

A booking represents a reservation of a console for a specific customer, date, time, and duration.

Bookings are operational records.

Bookings are not financial records.

Financial truth shall be derived from:

* paymentTransactions
* credits

---

## 25.2 Collection Name

```text
bookings
```

---

## 25.3 Schema Definition

```javascript
{
  _id: ObjectId,

  bookingReference: String,

  customerId: ObjectId,

  customerCode: String,

  customerName: String,

  customerSearchName: String,

  phone: String,

  whatsappNumber: String,

  numberOfPlayers: Number,

  consoleId: ObjectId,

  consoleCode: String,

  consoleName: String,

  bookingSource: String,

  bookingStatus: String,

  paymentStatus: String,

  visitDate: String,

  arrivalTime: String,

  durationMinutes: Number,

  scheduledEndTime: String,

  bookingBufferMinutes: Number,

  totalAmount: Number,

  pricingSnapshot: {
    pricingModel: String,

    hourlyRate: Number,

    calculatedAt: Date
  },

  depositRuleSnapshot: {
    enabled: Boolean,

    depositType: String,

    fixedAmount: Number,

    percentageAmount: Number,

    refundable: Boolean
  },

  checkInAt: Date,

  completedAt: Date,

  cancelledAt: Date,

  noShowAt: Date,

  cancellationReason: String,

  managerNotes: String,

  bookingEvents: [
    {
      type: String,

      timestamp: Date,

      performedBy: ObjectId,

      metadata: Mixed
    }
  ],

  createdAt: Date,

  updatedAt: Date,

  createdBy: ObjectId,

  updatedBy: ObjectId,

  isDeleted: Boolean,

  deletedAt: Date,

  deletedBy: ObjectId
}
```

---

## 25.4 Booking Reference

Format:

```text
POV-20260715-000001
```

Generated using:

```text
counters
```

collection.

Booking references are immutable.

---

## 25.5 Booking Sources

Allowed values:

```text
website
walkIn
phoneReservation
```

---

## 25.6 Booking Statuses

Allowed values:

```text
pendingPayment
pendingVerification
confirmed
checkedIn
completed
cancelled
noShow
```

---

## 25.7 Payment Statuses

Allowed values:

```text
pending
partiallyPaid
fullyPaid
rejected
```

---

## 25.8 Date & Time Design

The system stores:

```javascript
{
  visitDate: "2026-07-15",

  arrivalTime: "18:00",

  durationMinutes: 120
}
```

instead of a single datetime.

Benefits:

* Faster availability checks
* Easier reporting
* Simpler indexing
* More efficient scheduling

---

## 25.9 Snapshot Strategy

Historical bookings must remain accurate.

Therefore bookings store:

```javascript
pricingSnapshot
depositRuleSnapshot
```

Future configuration changes shall not affect historical bookings.

---

## 25.10 Booking Events

Every lifecycle transition shall generate an event.

Examples:

```javascript
{
  type: "created"
}
```

```javascript
{
  type: "paymentVerified"
}
```

```javascript
{
  type: "confirmed"
}
```

```javascript
{
  type: "checkedIn"
}
```

```javascript
{
  type: "completed"
}
```

---

## 25.11 Financial Rules

Bookings shall never store:

```text
amountPaid
remainingAmount
customerCreditBalance
```

These values must always be calculated from:

```text
paymentTransactions
credits
```

---

## 25.12 Indexes

### Booking Reference

```javascript
{
  bookingReference: 1
}
```

Unique

---

### Customer History

```javascript
{
  customerId: 1,
  createdAt: -1
}
```

---

### Daily Schedule

```javascript
{
  visitDate: 1,
  arrivalTime: 1
}
```

---

### Console Scheduling

```javascript
{
  visitDate: 1,
  consoleId: 1,
  bookingStatus: 1
}
```

---

### Search

```javascript
{
  customerSearchName: 1
}
```

---

### Dashboard Operations

```javascript
{
  bookingStatus: 1,
  visitDate: 1
}
```

---

# 26. Payment Transactions Collection

## 26.1 Purpose

The Payment Transactions collection is the financial source of truth.

All money movement must be represented in this collection.

Revenue reporting shall be generated exclusively from verified payment transactions.

---

## 26.2 Collection Name

```text
paymentTransactions
```

---

## 26.3 Schema Definition

```javascript
{
  _id: ObjectId,

  paymentReference: String,

  bookingId: ObjectId,

  bookingReference: String,

  customerId: ObjectId,

  customerCode: String,

  customerName: String,

  phone: String,

  transactionType: String,

  paymentMethod: String,

  amount: Number,

  utr: String,

  status: String,

  notes: String,

  verifiedBy: ObjectId,

  verifiedAt: Date,

  transactionDate: Date,

  createdAt: Date,

  updatedAt: Date,

  createdBy: ObjectId,

  updatedBy: ObjectId
}
```

---

## 26.4 Transaction Types

```text
deposit
balance
refund
cashPayment
creditRedemption
creditIssue
manualAdjustment
```

---

## 26.5 Payment Methods

Current:

```text
upi
cash
credit
```

Future:

```text
razorpay
card
wallet
```

---

## 26.6 Status Values

```text
pending
verified
rejected
refunded
```

---

## 26.7 UTR Rules

Required when:

```text
paymentMethod = upi
```

Optional otherwise.

---

## 26.8 Financial Design Rules

Revenue calculations shall only include:

```text
verified
```

transactions.

Rejected transactions must never affect reporting.

---

## 26.9 Indexes

### Payment Reference

```javascript
{
  paymentReference: 1
}
```

Unique

---

### Booking Transactions

```javascript
{
  bookingId: 1
}
```

---

### Customer Transactions

```javascript
{
  customerId: 1
}
```

---

### Financial Reports

```javascript
{
  transactionDate: -1,
  status: 1
}
```

---

### UTR Search

```javascript
{
  utr: 1
}
```

---

# 27. Credits Collection

## 27.1 Purpose

Represents customer credit balances.

Credits are financial records.

Credits are issued when management decides to provide value back to a customer instead of a cash refund.

---

## 27.2 Collection Name

```text
credits
```

---

## 27.3 Schema Definition

```javascript
{
  _id: ObjectId,

  creditReference: String,

  customerId: ObjectId,

  customerCode: String,

  customerName: String,

  phone: String,

  originalBookingId: ObjectId,

  originalBookingReference: String,

  amountIssued: Number,

  amountRedeemed: Number,

  remainingAmount: Number,

  status: String,

  reason: String,

  expiresAt: Date,

  notes: String,

  createdAt: Date,

  updatedAt: Date,

  createdBy: ObjectId,

  updatedBy: ObjectId
}
```

---

## 27.4 Status Values

```text
active
fullyRedeemed
expired
cancelled
```

---

## 27.5 Credit Reasons

```text
bookingCancellation
promotion
goodwill
managerAdjustment
```

---

## 27.6 Future Evolution

The current design represents a simple credit account model.

Future versions may evolve into a transaction-based credit ledger.

The current structure has been selected for operational simplicity.

---

## 27.7 Indexes

### Credit Reference

```javascript
{
  creditReference: 1
}
```

Unique

---

### Active Credits

```javascript
{
  customerId: 1,
  status: 1
}
```

---

# 28. Settings Collection

## 28.1 Purpose

Stores all configurable business rules.

The application shall maintain exactly one settings document.

---

## 28.2 Collection Name

```text
settings
```

---

## 28.3 Schema Definition

```javascript
{
  _id: ObjectId,

  businessInfo: {
    businessName: String,

    address: String,

    phone: String,

    whatsappNumber: String
  },

  pricing: {
    pricingModel: String,

    hourlyRate: Number
  },

  deposits: {
    enabled: Boolean,

    depositType: String,

    fixedAmount: Number,

    percentageAmount: Number,

    refundable: Boolean
  },

  bookingRules: {
    bookingBufferMinutes: Number,

    noShowGracePeriodMinutes: Number
  },

  operatingHours: {
    weekdays: {
      open: String,
      close: String
    },

    weekends: {
      open: String,
      close: String
    }
  },

  paymentSettings: {
    upiId: String,

    qrCodeUrl: String
  },

  notifications: {
    telegramEnabled: Boolean,

    telegramBotToken: String,

    telegramChatId: String,

    resendEnabled: Boolean,

    resendApiKey: String,

    fast2smsEnabled: Boolean,

    fast2smsApiKey: String
  },

  createdAt: Date,

  updatedAt: Date
}
```

---

## 28.4 Design Principles

All configurable business behavior must originate from Settings.

No business rule shall require deployment.

No pricing value shall be hardcoded.

---

# 29. Audit Logs Collection

## 29.1 Purpose

Provides immutable system traceability.

All critical actions shall generate audit records.

---

## 29.2 Collection Name

```text
auditLogs
```

---

## 29.3 Schema Definition

```javascript
{
  _id: ObjectId,

  action: String,

  entityType: String,

  entityId: ObjectId,

  entityReference: String,

  performedBy: {
    userId: ObjectId,

    userCode: String,

    name: String,

    role: String
  },

  previousValues: Mixed,

  newValues: Mixed,

  metadata: Mixed,

  ipAddress: String,

  userAgent: String,

  createdAt: Date
}
```

---

## 29.4 Entity Types

```text
booking
customer
payment
credit
user
console
settings
```

---

## 29.5 Example Actions

```text
BOOKING_CREATED
BOOKING_CONFIRMED
BOOKING_CANCELLED
PAYMENT_VERIFIED
PAYMENT_REJECTED
CUSTOMER_UPDATED
SETTINGS_UPDATED
USER_CREATED
```

---

## 29.6 Immutability Rules

Audit logs:

* Cannot be modified
* Cannot be deleted
* Cannot be restored

Audit records are immutable.

---

## 29.7 Indexes

### Entity History

```javascript
{
  entityType: 1,
  entityId: 1
}
```

---

### User Activity

```javascript
{
  "performedBy.userId": 1
}
```

---

### Timeline

```javascript
{
  createdAt: -1
}
```

---

# 30. Business Collection Design Principles

1. Bookings are operational records.
2. Payments are financial records.
3. Credits are financial records.
4. Audit logs are immutable.
5. Historical pricing must never change.
6. Financial truth resides in paymentTransactions.
7. Settings control business behavior.
8. Every booking lifecycle event must be recorded.
9. Every financial event must be traceable.
10. Historical records must remain accurate regardless of future configuration changes.

---

# 31. Next Section

Part 4 will define:

```text
Collection Relationships
Referential Integrity Rules
Index Strategy
Aggregation Design
Reporting Architecture
Data Lifecycle Rules
Archival Strategy
Performance Considerations
```

This section will formalize how the collections interact and how operational and financial reporting is generated efficiently at scale.

# 02_DATABASE_DESIGN.md

# PART 4 — RELATIONSHIPS, REPORTING, ANALYTICS & DATA LIFECYCLE

Topics Covered:

* Collection Relationships
* Referential Integrity
* Index Strategy
* Aggregation Architecture
* Reporting Architecture
* Analytics Architecture
* Daily Metrics Strategy
* Data Lifecycle Rules
* Archival Strategy
* Performance Standards

---

# 32. Collection Relationship Architecture

## 32.1 Purpose

This section defines how all collections interact and establishes ownership boundaries between operational, financial, analytical, and configuration data.

---

## 32.2 Relationship Overview

```text
users
 │
 ├── creates bookings
 ├── verifies payments
 ├── manages customers
 ├── manages credits
 └── generates audit logs

customers
 │
 ├── bookings
 ├── paymentTransactions
 └── credits

consoles
 │
 └── bookings

bookings
 │
 ├── paymentTransactions
 ├── credits
 └── auditLogs

settings
 │
 └── influences all business rules

auditLogs
 │
 └── references all collections
```

---

## 32.3 Ownership Model

### Users Own

* Authentication
* Authorization
* Administrative Actions

---

### Customers Own

* Customer identity
* Customer profile
* Customer metrics
* Customer notes

---

### Bookings Own

* Reservation lifecycle
* Console assignment
* Pricing snapshots
* Deposit snapshots

---

### Payment Transactions Own

* Money movement
* Revenue reporting
* Financial audit trail

---

### Credits Own

* Credit issuance
* Credit redemption
* Credit balances

---

### Settings Own

* Business rules
* Pricing rules
* Deposit rules
* Notification rules
* Operational rules

---

# 33. Referential Integrity Rules

## 33.1 Principle

MongoDB does not provide foreign key enforcement.

Referential integrity shall be enforced by application services.

---

## 33.2 Customer Rules

Customers may never be physically deleted.

Only:

```javascript
{
  isDeleted: true
}
```

is permitted.

---

## 33.3 Booking Rules

Bookings may never be physically deleted.

Historical reservations must remain available for:

* Reporting
* Financial reconciliation
* Customer history
* Audit requirements

---

## 33.4 Payment Rules

Payment transactions may never be deleted.

Incorrect transactions must be corrected using:

```text
refund
manualAdjustment
```

records.

---

## 33.5 Credit Rules

Credits may never be deleted.

Credits may transition only through valid states.

---

## 33.6 Console Rules

Consoles with historical bookings:

```text
cannot be deleted
```

Allowed action:

```text
retired
```

---

## 33.7 Settings Rules

Exactly one settings document shall exist.

Deletion is prohibited.

---

## 33.8 Audit Rules

Audit logs are immutable.

They cannot be:

* Updated
* Deleted
* Restored

---

# 34. Relationship Standards

## 34.1 Primary Relationship Strategy

All collection relationships shall use:

```javascript
ObjectId
```

references.

---

## 34.2 Snapshot Strategy

Important operational data shall be duplicated into transactional documents.

Example:

```javascript
{
  customerId,

  customerName,

  phone
}
```

inside bookings.

---

## 34.3 Rationale

Historical records must remain accurate even when source records change later.

---

# 35. Index Architecture

## 35.1 Index Philosophy

Indexes shall only exist to support known query patterns.

Indexes shall not be created speculatively.

---

## 35.2 High Priority Queries

The system must optimize:

### Availability Checks

```text
Is Console Available?
```

---

### Daily Operations

```text
Today's Bookings
```

---

### Customer Search

```text
Find Customer
```

---

### Payment Verification

```text
Find Transaction by UTR
```

---

### Revenue Reporting

```text
Daily Revenue
Monthly Revenue
```

---

# 36. Aggregation Architecture

## 36.1 Purpose

Aggregation pipelines shall support:

* Reporting
* Analytics
* Dashboard metrics

---

## 36.2 Operational Queries

Operational APIs shall avoid heavy aggregation.

Examples:

```text
Today's bookings
Current sessions
Pending verifications
```

shall use indexed queries.

---

## 36.3 Reporting Queries

Reports may use aggregations.

Examples:

```text
Monthly revenue
Top customers
Console utilization
```

---

## 36.4 Analytics Queries

Analytics may use:

```text
MongoDB Aggregation Framework
```

for advanced calculations.

---

# 37. Reporting Architecture

## 37.1 Reporting Principle

Reports must originate from source-of-truth collections.

No report shall rely on manually maintained totals.

---

# 37.2 Revenue Reports

Source:

```text
paymentTransactions
```

Conditions:

```text
status = verified
```

Metrics:

* Daily Revenue
* Weekly Revenue
* Monthly Revenue
* Annual Revenue

---

# 37.3 Booking Reports

Source:

```text
bookings
```

Metrics:

* Booking Count
* Completion Rate
* Cancellation Rate
* No Show Rate

---

# 37.4 Customer Reports

Source:

```text
customers
```

Metrics:

* New Customers
* Returning Customers
* Top Customers
* Lifetime Value

---

# 37.5 Console Reports

Source:

```text
bookings
```

Metrics:

* Console Utilization
* Hours Booked
* Peak Hours
* Occupancy %

---

# 37.6 Payment Reports

Source:

```text
paymentTransactions
```

Metrics:

* Deposits Collected
* Outstanding Balances
* Cash Payments
* UPI Payments
* Refunds

---

# 38. Analytics Architecture

## 38.1 Objective

Provide business intelligence without impacting operational performance.

---

## 38.2 Core Analytics

### Revenue Analytics

* Revenue Trends
* Revenue Growth
* Revenue by Day

---

### Customer Analytics

* Customer Lifetime Value
* Visit Frequency
* Repeat Customer Rate

---

### Booking Analytics

* Peak Hours
* Peak Days
* Utilization Trends

---

### Console Analytics

* Utilization %
* Revenue Per Console
* Session Volume

---

# 39. Daily Metrics Collection (Future Phase)

## 39.1 Purpose

Provide pre-calculated reporting metrics.

Not required in Phase 1.

Recommended for Phase 2+.

---

## 39.2 Collection Name

```text
dailyMetrics
```

---

## 39.3 Example Schema

```javascript
{
  date: "2026-07-15",

  revenue: 5400,

  bookings: 38,

  completedBookings: 34,

  cancelledBookings: 2,

  noShows: 2,

  activeCustomers: 27,

  newCustomers: 5,

  utilizationPercent: 82,

  generatedAt: Date
}
```

---

## 39.4 Generation Strategy

Generated by scheduled background jobs.

Recommended frequency:

```text
Daily
```

after business closing.

---

## 39.5 Benefits

* Faster reports
* Reduced aggregation load
* Better scalability

---

# 40. Dashboard Architecture

## 40.1 Owner Dashboard

Displays:

* Today's Revenue
* Today's Bookings
* Active Sessions
* Pending Payments
* Recent Customers
* Console Utilization

---

## 40.2 Manager Dashboard

Displays:

* Today's Bookings
* Check-ins
* Walk-ins
* Pending Verifications
* Console Status

---

# 41. Data Lifecycle Rules

## 41.1 Retention Principle

Historical data is business-critical.

Default strategy:

```text
retain indefinitely
```

---

## 41.2 Users

Never delete.

Deactivate only.

---

## 41.3 Customers

Never delete.

Soft delete only.

---

## 41.4 Bookings

Never delete.

---

## 41.5 Payments

Never delete.

---

## 41.6 Credits

Never delete.

---

## 41.7 Audit Logs

Never delete.

---

# 42. Archival Strategy

## 42.1 Objective

Maintain performance while preserving history.

---

## 42.2 Archive Threshold

Recommended:

```text
3 years
```

---

## 42.3 Eligible Collections

Future archival candidates:

* Completed Bookings
* Expired Credits
* Historical Audit Logs

---

## 42.4 Non-Archivable Collections

Must remain active:

* Settings
* Users
* Customers
* Active Credits
* Active Bookings

---

# 43. Performance Standards

## 43.1 Pagination

Default:

```text
25 records
```

Maximum:

```text
100 records
```

---

## 43.2 Search Strategy

Primary search fields:

```text
customerCode
customerSearchName
phone
bookingReference
```

---

## 43.3 Dashboard Queries

Dashboard endpoints shall never load complete datasets.

Always use:

* Filtering
* Pagination
* Aggregation limits

---

## 43.4 Query Design Rule

Always:

```text
Filter
→ Sort
→ Paginate
```

---

## 43.5 Aggregation Rule

Long-running aggregations shall execute through dedicated reporting services.

Operational APIs must remain lightweight.

---

# 44. Scalability Roadmap

## Phase 1

```text
Single MongoDB Atlas Cluster
```

---

## Phase 2

```text
Read Replicas
Daily Metrics Collection
```

---

## Phase 3

```text
Dedicated Reporting Database
```

---

## Phase 4

```text
Data Warehouse
Business Intelligence Platform
```

---

# 45. Relationship & Reporting Design Principles

1. ObjectIds are the primary relational keys.
2. Historical records must remain immutable.
3. Financial truth resides in paymentTransactions.
4. Settings drive all business behavior.
5. Reports use source-of-truth collections.
6. Audit logs are immutable.
7. Analytics must not impact operational performance.
8. Daily metrics are optimization layers, never sources of truth.
9. Soft deletion is preferred over hard deletion.
10. Every critical business event must remain traceable.

---

# 46. Next Section

Part 5 will define:

```text
Security Architecture
RBAC (Owner / Manager Permissions)
Authentication Design
Password Security
Encryption Standards
Backup Strategy
Disaster Recovery
Monitoring & Alerting
Production Operations
```

This section establishes production-grade operational and security standards for the platform.

# 02_DATABASE_DESIGN.md

# PART 5 — SECURITY, AUTHORIZATION, OPERATIONS & DISASTER RECOVERY

Topics Covered:

* Security Architecture
* Authentication Design
* Authorization Architecture (RBAC + Permissions)
* Password Security
* Encryption Standards
* Backup Strategy
* Disaster Recovery
* Monitoring & Alerting
* Production Operations
* Security Roadmap

---

# 47. Security Architecture

## 47.1 Purpose

Protect:

* Customer Information
* Booking Information
* Financial Information
* Administrative Access
* Business Operations

while maintaining operational efficiency.

---

## 47.2 Security Principles

The platform shall follow:

1. Least Privilege Access
2. Defense In Depth
3. Secure By Default
4. Audit Everything
5. Separation Of Duties
6. Zero Trust For Administrative Operations

---

## 47.3 Security Layers

### Layer 1

```text
Frontend Security
```

---

### Layer 2

```text
Authentication
```

---

### Layer 3

```text
Authorization
```

---

### Layer 4

```text
API Security
```

---

### Layer 5

```text
Database Security
```

---

### Layer 6

```text
Infrastructure Security
```

---

### Layer 7

```text
Backup & Recovery
```

---

# 48. Authentication Architecture

## 48.1 Authentication Model

Phase 1 shall use:

```text
JWT Authentication
```

with secure HTTP-only cookies.

---

## 48.2 Authentication Scope

Authentication is mandatory for:

```text
Owner Dashboard
Manager Dashboard
Admin APIs
Settings APIs
Payment Verification APIs
Reporting APIs
User Management APIs
```

---

## 48.3 Public Endpoints

Authentication is not required for:

```text
Public Website
Availability Checks
Booking Creation
```

---

## 48.4 Session Flow

```text
Login
↓
JWT Issued
↓
HTTP-Only Cookie
↓
Authenticated Requests
↓
Token Refresh
```

---

## 48.5 Session Lifetime

### Access Token

```text
8 Hours
```

---

### Refresh Token

```text
30 Days
```

---

## 48.6 Session Revocation

The system shall support:

```text
Logout Current Session
Logout All Sessions
Forced Logout
```

---

# 49. Authorization Architecture

## 49.1 Design Philosophy

The system shall use:

```text
Role Based Access Control (RBAC)
+
Permission Based Access Control
```

Hybrid architecture.

---

## 49.2 Why Hybrid RBAC

Current roles:

```text
owner
manager
```

Future roles may include:

```text
cashier
shiftSupervisor
operationsManager
```

Permissions prevent database redesign when new roles are introduced.

---

## 49.3 Roles

### Owner

Full system access.

---

### Manager

Operational access.

Restricted administrative access.

---

# 49.4 Permission Model

Permissions shall be represented as strings.

Examples:

```text
users.create
users.update
users.view
users.disable

customers.create
customers.update
customers.view

bookings.create
bookings.update
bookings.cancel
bookings.checkin
bookings.complete

payments.view
payments.verify
payments.refund

credits.create
credits.redeem
credits.view

reports.view

settings.view
settings.update

auditlogs.view
```

---

# 49.5 Owner Permission Set

Owners shall automatically receive:

```text
*
```

(all permissions)

---

# 49.6 Manager Permission Set

Managers shall receive:

```text
customers.create
customers.update
customers.view

bookings.create
bookings.update
bookings.cancel
bookings.checkin
bookings.complete

payments.view
payments.verify

credits.create
credits.redeem
credits.view

reports.view
```

---

Managers shall not receive:

```text
users.create
users.update
users.disable

settings.update

auditlogs.view
```

---

# 49.7 Permission Storage

Future schema enhancement:

```javascript
{
  role: "manager",

  permissions: [
    "bookings.create",
    "payments.verify"
  ]
}
```

---

# 50. Password Security

## 50.1 Password Storage

Passwords shall never be stored in plaintext.

Only:

```text
bcrypt
```

hashes shall be stored.

---

## 50.2 Password Requirements

Minimum:

```text
12 Characters
```

Required:

```text
1 Uppercase
1 Lowercase
1 Number
1 Special Character
```

---

## 50.3 Password Reset

Password reset shall require:

```text
Email Verification
```

---

## 50.4 Password Reuse

Future Phase:

```text
Last 5 Passwords
```

cannot be reused.

---

# 51. API Security

## 51.1 API Access

All protected APIs shall require:

```text
Valid JWT
```

---

## 51.2 Authorization Checks

Every protected endpoint shall perform:

```text
Authentication Check
↓
Permission Check
↓
Business Validation
↓
Execution
```

---

## 51.3 Rate Limiting

Recommended:

### Public APIs

```text
100 Requests / 15 Minutes
```

per IP.

---

### Authentication APIs

```text
10 Requests / 15 Minutes
```

per IP.

---

### Administrative APIs

```text
500 Requests / 15 Minutes
```

per user.

---

# 52. Encryption Standards

## 52.1 Data In Transit

Minimum:

```text
HTTPS
TLS 1.2+
```

---

## 52.2 Data At Rest

MongoDB Atlas encryption shall remain enabled.

---

## 52.3 Secret Storage

Secrets shall never be stored in:

```text
Frontend Code
Database
Git Repository
```

---

## 52.4 Environment Variables

Examples:

```text
MONGODB_URI
JWT_SECRET
JWT_REFRESH_SECRET

RESEND_API_KEY
FAST2SMS_API_KEY

TELEGRAM_BOT_TOKEN

COOKIE_SECRET
```

---

# 53. Audit Requirements

## 53.1 Mandatory Audit Events

The following actions shall generate audit records:

```text
Login
Logout

Booking Creation
Booking Modification
Booking Cancellation

Payment Verification
Payment Rejection
Payment Refund

Credit Issuance
Credit Redemption

Customer Modification

Settings Modification

User Creation
User Modification
User Disable
```

---

## 53.2 Audit Data Requirements

Audit records must include:

```text
Who
When
What Changed
Previous Value
New Value
```

---

# 54. Backup Strategy

## 54.1 Backup Objectives

Protect against:

* Human Error
* Software Defects
* Infrastructure Failure
* Malicious Activity

---

## 54.2 Backup Provider

Phase 1:

```text
MongoDB Atlas Backups
```

---

## 54.3 Backup Frequency

Preferred:

```text
Continuous Backup
```

Fallback:

```text
Daily Snapshots
```

---

## 54.4 Retention Period

Minimum:

```text
30 Days
```

Recommended:

```text
90 Days
```

---

## 54.5 Backup Testing

Restore testing shall occur:

```text
Quarterly
```

---

# 55. Disaster Recovery

## 55.1 Recovery Point Objective (RPO)

Maximum acceptable data loss:

```text
15 Minutes
```

---

## 55.2 Recovery Time Objective (RTO)

Maximum acceptable downtime:

```text
4 Hours
```

---

## 55.3 Disaster Scenarios

Covered scenarios:

```text
Database Corruption
Accidental Deletion
Cloud Provider Failure
Credential Compromise
Application Failure
```

---

## 55.4 Recovery Workflow

```text
Incident Detection
↓
System Isolation
↓
Restore Backup
↓
Validate Integrity
↓
Resume Operations
```

---

# 56. Monitoring & Alerting

## 56.1 Monitoring Scope

Monitor:

```text
API Availability
Database Availability
Authentication Errors
Payment Verification Failures
Notification Failures
Background Job Failures
```

---

## 56.2 Infrastructure Monitoring

Monitor:

```text
CPU
Memory
Disk
Network
```

---

## 56.3 Alert Channels

Recommended:

```text
Email
Telegram
```

---

## 56.4 Critical Alerts

Immediate notification required for:

```text
Database Offline
API Offline
Backup Failure
Authentication Failure Spike
Job Failure Spike
```

---

# 57. Background Job Operations

## 57.1 Future Collection

Phase 2 introduces:

```text
systemJobs
```

collection.

---

## 57.2 Managed Jobs

Examples:

```text
Daily Metrics Generation

No Show Detection

Booking Reminders

Credit Expiration Processing

Notification Delivery
```

---

## 57.3 Job Monitoring

Every job execution shall record:

```javascript
{
  jobName,
  status,
  startedAt,
  completedAt,
  errorMessage
}
```

---

# 58. Production Operations

## 58.1 Hosting Architecture

Recommended:

```text
Frontend:
Vercel

Backend:
Vercel Serverless Functions

Database:
MongoDB Atlas
```

---

## 58.2 Environment Separation

Mandatory environments:

```text
Development
Staging
Production
```

---

## 58.3 Data Separation

Production data shall never be used in development.

---

## 58.4 Logging Standards

Application logs shall include:

```text
Timestamp
Request ID
User ID
Action
Status
Duration
```

---

## 58.5 Deployment Strategy

```text
Development
↓
Staging
↓
Production
```

---

## 58.6 Rollback Capability

Every production deployment must support:

```text
Immediate Rollback
```

within minutes.

---

# 59. Security Roadmap

## Phase 2

```text
Owner Two-Factor Authentication
```

---

## Phase 3

```text
Manager Two-Factor Authentication
```

---

## Phase 4

```text
Device Trust Management
```

---

## Phase 5

```text
Administrative IP Whitelisting
```

---

# 60. Security & Operations Principles

1. Security is mandatory.
2. Authentication protects access.
3. Authorization controls actions.
4. Permissions are more important than roles.
5. Financial operations must be traceable.
6. Audit logs must be immutable.
7. Secrets must never reach the frontend.
8. Production data must always be recoverable.
9. Monitoring must detect failures proactively.
10. Every administrative action must be attributable to a specific user.

---

# 61. Database Design Specification Completion

The database design is now composed of:

```text
Part 1 — Database Architecture

Part 2 — Core Collections

Part 3 — Business, Financial & Configuration Collections

Part 4 — Relationships, Reporting, Analytics & Lifecycle

Part 5 — Security, Authorization, Operations & Disaster Recovery
```

This completes the database design specification for Version 1.0.
