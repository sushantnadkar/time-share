# POV Gaming Cafe

# MASTER SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

Version: 4.0

Status: Requirements Frozen

Document Type: Master Requirements Specification

Project Name: POV Gaming Cafe Booking & Operations Platform

Prepared For: POV – Place Of Virtuality

---

# Revision History

| Version | Date          | Description                                            |
| ------- | ------------- | ------------------------------------------------------ |
| 1.0     | Initial Draft | Base booking system requirements                       |
| 2.0     | Revision      | Dynamic pricing, deposits, notifications               |
| 3.0     | Revision      | Customer management, no-show handling, operating hours |
| 4.0     | Current       | Requirements Freeze Version                            |

---

# 1. Introduction

## 1.1 Purpose

This document defines the complete functional and non-functional requirements for the POV Gaming Cafe Booking & Operations Platform.

The purpose of this document is to serve as the single source of truth for:

* Software development
* Project planning
* Architecture design
* Database design
* API design
* Frontend design
* Testing
* Future enhancements

No implementation shall intentionally deviate from this document without an approved change request.

---

## 1.2 Project Objective

POV Gaming Cafe currently manages customer bookings manually.

The objective of this project is to create a centralized platform that:

* Manages reservations
* Assigns consoles automatically
* Handles advance payments
* Tracks customer activity
* Reduces no-shows
* Improves operational efficiency
* Supports future business growth

The platform shall function as both a customer-facing booking system and an internal business operations platform.

---

## 1.3 Business Context

POV Gaming Cafe operates as a PlayStation gaming cafe located in Kalyan East, Maharashtra, India.

The business currently experiences:

* Peak-hour congestion
* Long customer waiting times
* Manual reservation management
* Limited operational visibility
* No centralized customer tracking

The business currently operates with multiple PlayStation consoles and plans future expansion.

The software platform must support both current operations and future growth without requiring major redesign.

---

# 2. Business Overview

## 2.1 Business Information

### Business Name

POV – Place Of Virtuality

### Business Type

PlayStation Gaming Cafe

### Location

Shop No. 6
Vishwamitri CHS Ltd.
Lokgram
Kalyan East – 421306
Maharashtra, India

---

## 2.2 Business Model

Customers pay to use PlayStation gaming stations for a selected duration.

Reservations may be created through:

* Website bookings
* Walk-in bookings
* Phone reservations

Revenue is generated through gaming session charges.

Future revenue streams may include:

* Membership plans
* Loyalty programs
* Food & beverage sales
* Multi-branch operations

These future capabilities are outside Phase 1 scope.

---

## 2.3 Current Operational Challenges

### Challenge 1

Manual reservation management.

Current booking tracking is performed manually and does not provide centralized visibility.

---

### Challenge 2

Customer waiting times.

High-demand periods result in:

* Customer dissatisfaction
* Lost revenue opportunities
* Operational inefficiencies

---

### Challenge 3

No-show reservations.

Customers may reserve slots but fail to arrive.

This creates revenue loss due to unused console time.

---

### Challenge 4

Limited customer insights.

The business currently lacks:

* Customer history
* Spending analytics
* Visit frequency tracking
* Reliability tracking

---

### Challenge 5

Lack of operational reporting.

Management currently lacks visibility into:

* Revenue trends
* Booking source performance
* Console utilization
* Customer behavior

---

# 3. Project Scope

## 3.1 In Scope (Phase 1)

The following capabilities are included in the initial release.

### Reservation Management

* Website bookings
* Walk-in bookings
* Phone reservations
* Booking modification
* Booking cancellation
* Booking completion

---

### Availability Management

* Console assignment
* Availability checking
* Booking conflict prevention
* Booking buffer enforcement
* Operating hours validation

---

### Payment Management

* Deposit calculation
* UPI payments
* UTR collection
* Manual payment verification
* Balance tracking

---

### Customer Management

* Customer profiles
* Customer history
* Customer analytics
* Customer notes
* Reliability scoring

---

### Session Management

* Check-in
* Active sessions
* Session extensions
* Session completion

---

### No Show Management

* Grace periods
* No-show identification
* No-show reporting
* Deposit forfeiture

---

### Notifications

* Telegram notifications
* Email notifications
* SMS notifications

---

### Reporting

* Revenue reporting
* Customer reporting
* Console utilization reporting
* Booking source reporting

---

### Administration

* User management
* Console management
* Settings management
* Pricing management

---

# 3.2 Out of Scope (Phase 1)

The following features are intentionally excluded.

### Payment Gateway Integration

Excluded:

* Razorpay
* Cashfree
* PayU
* Automatic payment verification

---

### Membership Programs

Excluded:

* Membership plans
* Subscription models
* Loyalty points

---

### Customer Self-Service

Excluded:

* Customer login
* Customer portal
* Self-managed cancellations
* Self-managed rescheduling

---

### Food & Beverage Operations

Excluded:

* Food ordering
* Inventory management
* Kitchen workflows

---

### Multi-Branch Management

Excluded:

* Multiple locations
* Branch management
* Cross-branch reporting

---

# 4. Stakeholders

## 4.1 Business Owner

Primary decision maker.

Responsibilities:

* Business rules
* Pricing strategy
* System configuration
* User management

Success Criteria:

* Increased operational efficiency
* Reduced no-shows
* Better reporting

---

## 4.2 Managers

Daily operators of the business.

Responsibilities:

* Booking management
* Customer management
* Payment verification
* Session management

Success Criteria:

* Faster customer servicing
* Reduced manual work
* Improved operational visibility

---

## 4.3 Customers

End users who reserve gaming sessions.

Success Criteria:

* Easy booking process
* Quick confirmations
* Reliable reservation experience

---

# 5. User Roles

## 5.1 Owner

The Owner role has unrestricted system access.

### Permissions

* Manage users
* Manage managers
* Manage pricing
* Manage deposits
* Manage notifications
* Manage consoles
* Manage operating hours
* View reports
* View analytics
* View audit logs
* Configure system settings

---

## 5.2 Manager

The Manager role has operational access only.

### Permissions

* Create bookings
* Edit bookings
* Confirm deposits
* Check-in customers
* Complete sessions
* Extend sessions
* Manage customers
* Add customer notes
* View reports

---

### Restrictions

Managers cannot:

* Manage users
* Modify pricing rules
* Modify deposit rules
* Modify notification settings
* Modify security settings
* Access audit logs

---

# 6. Assumptions

The system assumes:

1. Customers possess a valid mobile number.
2. Customers are capable of making UPI payments.
3. Internet connectivity is available.
4. Managers are trained on dashboard usage.
5. UPI payments are verified manually during Phase 1.
6. All console assignments are controlled by the system.

---

# 7. Constraints

## Business Constraints

* Limited initial hardware footprint
* Small team operation
* Manual payment verification

---

## Technical Constraints

* MongoDB Atlas as database
* Railway as backend hosting platform
* Vercel as frontend hosting platform
* Node.js backend architecture
* React frontend architecture

---

## Operational Constraints

* No digital queue management
* No customer self-service portal
* No automated refunds
* No automatic payment verification

---

# 8. Success Criteria

The project shall be considered successful when the following conditions are met.

## Operational

* Manual reservation tracking eliminated
* No double bookings occur
* Console utilization increases

---

## Customer Experience

* Customers can reserve slots online
* Customers receive confirmation notifications
* Reservation process is simple and reliable

---

## Business Performance

* No-show tracking implemented
* Revenue reporting available
* Customer analytics available
* Booking source analytics available

---

## Technical

* System operates reliably during business hours
* Dashboard supports daily operations
* System supports future expansion without redesign

---

# 9. Definitions

| Term              | Definition                                        |
| ----------------- | ------------------------------------------------- |
| Booking           | Reservation for a gaming session                  |
| Deposit           | Advance payment required to reserve a slot        |
| Buffer            | Time gap between bookings                         |
| No Show           | Customer fails to arrive within grace period      |
| Session Extension | Increase in session duration after booking        |
| Console Resource  | Managed gaming station available for booking      |
| Booking Reference | Human-readable booking identifier                 |
| UTR               | Unique Transaction Reference from UPI payment     |
| Reliability Score | Customer trust indicator based on booking history |

---

# 10. Document Governance

This document serves as the authoritative requirements specification for the POV Gaming Cafe Booking & Operations Platform.

All future technical documentation shall conform to the requirements defined in this document.

Subsequent documents include:

* 02_DATABASE_DESIGN.md
* 03_API_SPECIFICATION.md
* 04_FRONTEND_SPECIFICATION.md
* 05_SYSTEM_ARCHITECTURE.md
* 06_DEVELOPMENT_ROADMAP.md

No feature shall be considered approved unless it is represented within this document or formally added through a requirements change process.

# PART 2 — CORE FUNCTIONAL REQUIREMENTS

---

# 11. Reservation Management System

## 11.1 Overview

The Reservation Management System is the core business function of the platform.

The system shall:

* Accept reservation requests
* Validate reservation eligibility
* Assign consoles automatically
* Prevent double bookings
* Track booking status
* Support multiple booking sources
* Support operational workflows

The reservation system shall act as the single source of truth for all customer gaming sessions.

---

# 12. Booking Sources

## 12.1 Objective

The platform must support multiple booking creation channels while maintaining a single booking lifecycle.

Every booking must contain a booking source.

---

## 12.2 Supported Sources

### Website Booking

Created by customers through the public website.

Source Value:

```text
website
```

Characteristics:

* Customer initiated
* Deposit required
* UTR submission required
* Payment verification required

---

### Walk-In Booking

Created by staff when customer arrives physically.

Source Value:

```text
walkin
```

Characteristics:

* Staff initiated
* Immediate console allocation
* Payment collected directly
* No deposit workflow required

---

### Phone Reservation

Created by staff after customer calls.

Source Value:

```text
phone
```

Characteristics:

* Staff initiated
* Future reservation
* Deposit optional
* Manual follow-up possible

---

## 12.3 Source Tracking Requirements

The system shall:

* Store booking source permanently
* Include source in reporting
* Include source in analytics
* Support source-based filtering

Booking source history shall never be modified retroactively.

---

# 13. Booking Lifecycle

## 13.1 Objective

All bookings shall follow a defined lifecycle.

This ensures operational consistency and auditability.

---

## 13.2 Booking States

### Pending Verification

Deposit submitted.

Awaiting manager verification.

---

### Confirmed

Reservation accepted.

Console reserved.

Customer expected.

---

### In Progress

Customer has arrived.

Session has started.

---

### Completed

Session finished.

Booking closed.

---

## 13.3 Terminal States

### Rejected

Reservation denied.

---

### Cancelled

Reservation cancelled by staff.

---

### No Show

Customer failed to arrive.

---

## 13.4 Valid State Transitions

```text
Pending Verification
        ↓

Confirmed
        ↓

In Progress
        ↓

Completed
```

Alternative transitions:

```text
Pending Verification
        ↓

Rejected
```

```text
Confirmed
        ↓

Cancelled
```

```text
Confirmed
        ↓

No Show
```

---

## 13.5 Invalid State Transitions

The following transitions are prohibited.

```text
Completed → Confirmed
```

```text
No Show → In Progress
```

```text
Rejected → Confirmed
```

```text
Cancelled → In Progress
```

---

# 14. Booking Reference System

## 14.1 Objective

Provide a human-readable identifier.

MongoDB ObjectIds shall never be used operationally.

---

## 14.2 Format

```text
POV-YYYYMMDD-XXXX
```

Example:

```text
POV-20260715-0042
```

---

## 14.3 Requirements

Booking references must:

* Be unique
* Be searchable
* Be immutable
* Be displayed throughout the platform

---

## 14.4 Usage

Booking references shall appear in:

* Dashboard
* Notifications
* Reports
* Booking confirmations
* Customer communications

---

# 15. Customer Booking Workflow

## 15.1 Overview

Public customers may create bookings through the website.

---

## 15.2 Required Fields

### Customer Information

| Field           | Required |
| --------------- | -------- |
| Name            | Yes      |
| Phone Number    | Yes      |
| WhatsApp Number | Yes      |
| Players         | Yes      |

---

### Session Information

| Field        | Required |
| ------------ | -------- |
| Visit Date   | Yes      |
| Arrival Time | Yes      |
| Duration     | Yes      |

---

## 15.3 Validation Sequence

The booking engine shall perform validations in the following order.

### Validation 1

Operating Hours

---

### Validation 2

Special Closures

---

### Validation 3

Booking Buffer

---

### Validation 4

Console Availability

---

### Validation 5

Pricing Calculation

---

### Validation 6

Deposit Calculation

---

Only after all validations pass may a booking proceed.

---

# 16. Admin Booking Workflow

## 16.1 Objective

Allow managers to create reservations directly.

---

## 16.2 Supported Scenarios

### Walk-In Customer

Customer is physically present.

---

### Phone Reservation

Customer calls to reserve a slot.

---

### Operational Override

Manager manually creates reservation.

---

## 16.3 Workflow

Manager:

1. Opens Dashboard
2. Creates Booking
3. Selects Source
4. Enters Details
5. System Validates Availability
6. Console Assigned
7. Booking Created

---

# 17. Console Assignment Engine

## 17.1 Objective

Automatically allocate consoles.

Customers shall never select consoles manually.

---

## 17.2 Assignment Rules

The engine shall:

1. Load active consoles.
2. Exclude disabled consoles.
3. Exclude maintenance consoles.
4. Check availability.
5. Assign first available console.

---

## 17.3 Assignment Inputs

Required:

* Date
* Start Time
* Duration
* Active Consoles
* Existing Reservations
* Booking Buffer

---

## 17.4 Assignment Outputs

Success:

```text
Console Assigned
```

Failure:

```text
No Consoles Available
```

---

## 17.5 Double Booking Prevention

Two bookings may never occupy the same console during overlapping periods.

---

## 17.6 Overlap Formula

```javascript
newStart < existingEnd &&
newEnd > existingStart
```

---

# 18. Operating Hours Validation

## 18.1 Objective

Prevent reservations outside business hours.

---

## 18.2 Default Schedule

### Weekdays

```text
11:00 AM – 10:00 PM
```

### Weekends

```text
11:00 AM – 11:00 PM
```

---

## 18.3 Validation Rules

Booking start time must fall within operating hours.

Booking end time must fall within operating hours.

Booking buffer must also fit within operating hours.

---

## 18.4 Example

Request:

```text
Arrival:
9:30 PM

Duration:
1 Hour
```

Result:

```text
Rejected
```

Reason:

```text
Exceeds Closing Time
```

---

# 19. Special Closures & Exceptions

## 19.1 Objective

Support temporary schedule modifications.

---

## 19.2 Closure Types

### Full Closure

Business unavailable.

Example:

```text
Maintenance Day
```

---

### Partial Closure

Reduced operating hours.

Example:

```text
Tournament Event
```

---

## 19.3 Priority

Exception schedules override normal schedules.

---

# 20. Booking Buffer System

## 20.1 Objective

Provide operational breathing room.

---

## 20.2 Default Configuration

```text
10 Minutes
```

---

## 20.3 Purpose

Buffer protects against:

* Late departures
* Setup time
* Controller charging
* Cleaning
* Session overruns

---

## 20.4 Availability Impact

Buffer time is considered occupied time.

---

## 20.5 Example

Booking:

```text
12:00 PM – 1:00 PM
```

Buffer:

```text
10 Minutes
```

Next booking:

```text
1:10 PM
```

---

# 21. Cancellation Management

## 21.1 Objective

Allow operational flexibility.

Cancellation decisions are manager controlled.

---

## 21.2 Cancellation Authority

Managers may:

* Cancel reservations
* Approve refunds
* Forfeit deposits
* Convert deposits into credits
* Reschedule bookings

---

## 21.3 Cancellation Outcomes

Supported outcomes:

```text
depositForfeited
```

```text
depositRefunded
```

```text
depositConvertedToCredit
```

```text
rescheduled
```

---

## 21.4 Audit Requirements

All cancellations must record:

* Cancellation Reason
* Cancellation Notes
* Cancelled By
* Cancellation Outcome
* Timestamp

---

# 22. Walk-In Queue Policy

## 22.1 Current Policy

No digital queue system.

---

## 22.2 Operational Handling

When no consoles are available:

* Manager handles customers manually.
* No waitlist is maintained.
* No queue notifications are sent.

---

## 22.3 Future Consideration

Digital queue management is outside Phase 1 scope.

---

# 23. Operational Permissions Matrix

| Operation         | Owner | Manager |
| ----------------- | ----- | ------- |
| Create Booking    | Yes   | Yes     |
| Edit Booking      | Yes   | Yes     |
| Cancel Booking    | Yes   | Yes     |
| Confirm Deposit   | Yes   | Yes     |
| Check In Customer | Yes   | Yes     |
| Extend Session    | Yes   | Yes     |
| Complete Session  | Yes   | Yes     |
| Manage Pricing    | Yes   | No      |
| Manage Deposits   | Yes   | No      |
| Manage Users      | Yes   | No      |
| Manage Security   | Yes   | No      |
| View Audit Logs   | Yes   | No      |

---

# 24. Functional Acceptance Criteria

The reservation system shall be considered complete when:

### FR-001

Customers can create bookings online.

---

### FR-002

Managers can create walk-in bookings.

---

### FR-003

Managers can create phone reservations.

---

### FR-004

The system prevents double bookings.

---

### FR-005

The system automatically assigns consoles.

---

### FR-006

The system validates operating hours.

---

### FR-007

The system enforces booking buffers.

---

### FR-008

The system generates unique booking references.

---

### FR-009

The system tracks booking lifecycle states.

---

### FR-010

The system records all booking actions for audit purposes.

# PART 3 — PRICING, PAYMENTS & SESSION MANAGEMENT

---

# 25. Pricing Engine

## 25.1 Objective

The Pricing Engine shall calculate all booking charges.

Pricing must never be hardcoded within application code.

All pricing shall be configurable through the Admin Dashboard.

---

## 25.2 Pricing Principles

The system shall support:

* Dynamic pricing
* Future pricing expansion
* Real-time pricing updates
* Settings-driven configuration

No deployment shall be required to modify pricing.

---

## 25.3 Current Pricing Model

Current business pricing:

```text
₹60 Per Person Per Hour
```

Example:

| Players | Duration | Total |
| ------- | -------- | ----- |
| 1       | 1 Hour   | ₹60   |
| 2       | 1 Hour   | ₹120  |
| 3       | 1 Hour   | ₹180  |
| 4       | 1 Hour   | ₹240  |

---

## 25.4 Duration Multipliers

Default duration options:

| Duration          | Multiplier |
| ----------------- | ---------- |
| 30 Minutes        | 0.5        |
| 1 Hour            | 1.0        |
| 1 Hour 30 Minutes | 1.5        |
| 2 Hours           | 2.0        |

---

## 25.5 Price Calculation Formula

Current formula:

```text
Total Amount =
Hourly Rate × Number Of Players × Duration Multiplier
```

Example:

```text
Rate:
₹60

Players:
4

Duration:
2 Hours
```

Calculation:

```text
₹60 × 4 × 2

= ₹480
```

---

## 25.6 Supported Pricing Modes

### Flat Pricing

Example:

```text
₹60 Per Person Per Hour
```

---

### Player-Based Pricing

Example:

```text
1 Player = ₹80

2 Players = ₹70

3 Players = ₹60

4 Players = ₹50
```

---

### Weekend Pricing

Example:

```text
Weekday = ₹60

Weekend = ₹80
```

---

### Time-Based Pricing

Example:

```text
11 AM - 3 PM

₹40 Per Person
```

---

### Promotional Pricing

Future campaigns.

Example:

```text
Summer Offer
```

---

## 25.7 Pricing Versioning

The system shall retain pricing history.

Historical bookings must never change when pricing rules are modified.

Each booking shall store:

```javascript
{
  pricingSnapshot: {}
}
```

at the time of booking.

---

# 26. Deposit Management System

## 26.1 Objective

Reduce no-shows by requiring an advance payment.

---

## 26.2 Deposit Modes

### Fixed Amount

Example:

```text
₹100
```

---

### Percentage

Example:

```text
25%
```

---

### Greater Of

Example:

```text
Fixed Amount = ₹100

Percentage = 25%
```

System charges whichever amount is higher.

---

## 26.3 Recommended Configuration

```text
Mode:
Greater Of

Fixed:
₹100

Percentage:
25%
```

---

## 26.4 Deposit Calculation Formula

Fixed Mode:

```text
Deposit = Fixed Amount
```

---

Percentage Mode:

```text
Deposit = Total Amount × Percentage
```

---

Greater Of Mode:

```text
Deposit = Max(
  Fixed Amount,
  Percentage Amount
)
```

---

## 26.5 Deposit Validation

The system shall:

* Calculate deposit automatically
* Display deposit amount
* Display remaining balance
* Prevent underpayment

---

# 27. Payment Management System

## 27.1 Objective

Allow customers to reserve slots using UPI payments.

---

## 27.2 Supported Payment Methods

Phase 1:

* UPI QR Code
* UPI Deep Link

---

## 27.3 UPI QR Code

The system shall generate a QR code dynamically using:

```text
UPI ID

Payee Name
```

stored in Settings.

---

## 27.4 UPI Deep Link

The system shall generate:

```text
upi://pay
```

links dynamically.

The customer may use:

* Google Pay
* PhonePe
* Paytm
* BHIM
* Any supported UPI application

---

## 27.5 Payment Settings

Configurable by Owner.

Fields:

* UPI ID
* Payee Name

---

## 27.6 Payment Calculation Display

The booking page shall display:

```text
Total Amount

Deposit Amount

Remaining Balance
```

---

# 28. UTR Submission System

## 28.1 Objective

Allow customers to provide proof of payment.

---

## 28.2 UTR Requirement

Customers must submit:

```text
UTR Number
```

after payment.

---

## 28.3 Booking Status

After UTR submission:

```text
Pending Verification
```

---

## 28.4 UTR Validation

The system shall validate:

* UTR field present
* Minimum length
* Maximum length

Actual payment verification remains manual.

---

# 29. Manual Payment Verification

## 29.1 Objective

Allow managers to verify deposits manually.

---

## 29.2 Verification Workflow

Manager:

1. Opens Booking
2. Reviews UTR
3. Confirms Payment
4. Booking Becomes Confirmed

---

## 29.3 Rejection Workflow

Manager may reject payment.

Result:

```text
Rejected
```

---

## 29.4 Audit Requirements

Record:

* Verified By
* Verified At
* Verification Notes

---

# 30. Remaining Balance Tracking

## 30.1 Objective

Track money due at the cafe.

---

## 30.2 Stored Values

Each booking shall store:

```javascript
{
  totalAmount,
  advanceAmount,
  remainingAmount
}
```

---

## 30.3 Balance Formula

```text
Remaining Balance

=

Total Amount

-

Advance Amount
```

---

## 30.4 Walk-In Scenario

Walk-ins may have:

```text
Remaining Balance = 0
```

when payment collected immediately.

---

# 31. Session Check-In System

## 31.1 Objective

Track session start.

---

## 31.2 Check-In Action

Performed by:

* Owner
* Manager

---

## 31.3 Workflow

Staff clicks:

```text
Check In
```

---

Booking becomes:

```text
In Progress
```

---

## 31.4 Recorded Data

Store:

```javascript
{
  checkedInAt,
  checkedInBy
}
```

---

# 32. Session Completion System

## 32.1 Objective

Track session end.

---

## 32.2 Completion Action

Staff clicks:

```text
Complete Session
```

---

Booking becomes:

```text
Completed
```

---

## 32.3 Recorded Data

Store:

```javascript
{
  completedAt,
  completedBy
}
```

---

## 32.4 Final Settlement

Manager may record:

```text
Remaining Balance Paid
```

before completion.

---

# 33. Session Extension System

## 33.1 Objective

Allow customers to extend play time.

---

## 33.2 Extension Request

Customer requests additional time.

Examples:

```text
+30 Minutes
```

```text
+1 Hour
```

---

## 33.3 Validation Sequence

The system shall validate:

### Step 1

Operating Hours

---

### Step 2

Console Availability

---

### Step 3

Booking Buffer

---

### Step 4

Future Reservations

---

Only then may extension proceed.

---

## 33.4 Extension Approval

When available:

* Booking updated
* Price recalculated
* Balance recalculated

---

## 33.5 Extension Rejection

Reasons include:

* Future booking conflict
* Closing time reached
* Console unavailable

---

## 33.6 Extension History

The system shall maintain a permanent extension log.

Example:

```javascript
{
  extensions: [
    {
      addedMinutes: 30,
      amount: 30,
      createdAt: ""
    }
  ]
}
```

---

# 34. No Show Management System

## 34.1 Objective

Reduce lost revenue.

---

## 34.2 Grace Period

Default:

```text
15 Minutes
```

Configurable from Settings.

---

## 34.3 No Show Conditions

Customer has not checked in.

AND

Current time exceeds:

```text
Arrival Time + Grace Period
```

---

## 34.4 Example

Booking:

```text
6:00 PM
```

Grace Period:

```text
15 Minutes
```

Customer not present by:

```text
6:15 PM
```

Result:

```text
Eligible For No Show
```

---

## 34.5 No Show Processing

Manager may mark booking:

```text
No Show
```

---

## 34.6 Recorded Data

Store:

```javascript
{
  noShowAt,
  noShowBy,
  noShowReason
}
```

---

## 34.7 Deposit Handling

Current policy:

```text
Non-Refundable
```

Deposit is forfeited.

---

# 35. Rescheduling

## 35.1 Objective

Allow operational flexibility.

---

## 35.2 Authority

Managers may reschedule bookings.

Owners may reschedule bookings.

Customers may not self-reschedule.

---

## 35.3 Workflow

Manager:

1. Opens Booking
2. Selects Reschedule
3. Chooses New Slot
4. System Runs Availability Engine
5. Console Assigned
6. Booking Updated

---

## 35.4 Validation

Rescheduled bookings must pass:

* Operating Hours
* Buffer Rules
* Console Availability
* Conflict Detection

---

## 35.5 Audit Requirements

Store:

```javascript
{
  rescheduledAt,
  rescheduledBy,
  previousDate,
  previousTime,
  newDate,
  newTime
}
```

---

# 36. Cancellation Management

## 36.1 Objective

Provide operational discretion.

---

## 36.2 Authority

Managers may decide outcomes manually.

Owners may decide outcomes manually.

---

## 36.3 Supported Outcomes

### Deposit Forfeited

```text
depositForfeited
```

---

### Deposit Refunded

```text
depositRefunded
```

---

### Deposit Converted To Credit

```text
depositConvertedToCredit
```

---

### Rescheduled

```text
rescheduled
```

---

## 36.4 Required Fields

Every cancellation must include:

* Reason
* Notes
* Performed By
* Outcome

---

# 37. Payment & Session Acceptance Criteria

### FR-011

Pricing must be configurable.

---

### FR-012

Deposits must calculate automatically.

---

### FR-013

Remaining balances must calculate automatically.

---

### FR-014

UPI QR codes must generate dynamically.

---

### FR-015

UPI deep links must generate dynamically.

---

### FR-016

UTR submission must be supported.

---

### FR-017

Managers must be able to verify payments.

---

### FR-018

Customers must be checkable into sessions.

---

### FR-019

Sessions must support extensions.

---

### FR-020

The system must enforce no-show rules.

---

### FR-021

Managers must be able to reschedule bookings.

---

### FR-022

Managers must be able to cancel bookings.

---

### FR-023

All payment and session actions must be auditable.

# PART 4 — CUSTOMER MANAGEMENT, NOTIFICATIONS, ANALYTICS & ADMINISTRATION

---

# 38. Customer Management System

## 38.1 Objective

The Customer Management System shall provide a complete customer history without requiring customer registration or login.

The objective is to:

* Track customer behavior
* Track spending
* Track no-shows
* Improve customer service
* Enable future loyalty programs

---

## 38.2 Customer Identification

### Primary Identifier

Customers shall be identified using:

```text
Phone Number
```

---

### Secondary Information

Stored customer information:

* Name
* WhatsApp Number
* Notes
* Visit History

---

## 38.3 Customer Login Policy

Phase 1 shall not include customer accounts.

Reasons:

* Reduce booking friction
* Improve booking conversion rates
* Simplify operations

Customer authentication is reserved for Phase 3.

---

# 39. Customer Profile Management

## 39.1 Customer Profile

Each customer shall have a dedicated profile.

---

## 39.2 Profile Information

Display:

```text
Customer Name

Phone Number

WhatsApp Number

Total Visits

Completed Visits

Cancelled Visits

No Shows

Total Spend

Average Spend

First Visit

Last Visit

Reliability Score
```

---

## 39.3 Customer Statistics

Statistics shall be automatically maintained.

Managers shall not manually update metrics.

---

## 39.4 Customer History

The platform shall maintain a complete booking history.

History shall include:

* Booking Reference
* Date
* Time
* Duration
* Amount
* Status
* Console Used
* Booking Source

---

# 40. Customer Notes

## 40.1 Objective

Allow staff to maintain operational notes.

---

## 40.2 Examples

```text
Regular Customer
```

```text
Prefers FIFA
```

```text
Weekend Visitor
```

```text
No Show Warning Issued
```

---

## 40.3 Permissions

Owner:

* Create Notes
* Edit Notes
* Delete Notes

Manager:

* Create Notes
* Edit Notes

---

# 41. Customer Reliability System

## 41.1 Objective

Provide operational visibility into customer behavior.

---

## 41.2 Reliability Inputs

The system shall consider:

* Completed Visits
* Cancelled Visits
* No Shows

---

## 41.3 Reliability Ratings

### Excellent

```text
No Shows = 0
```

---

### Good

```text
Low No Show Rate
```

---

### Warning

```text
Moderate No Show Rate
```

---

### High Risk

```text
Frequent No Shows
```

---

## 41.4 Future Expansion

Reliability scoring must support future weighting algorithms.

---

# 42. Notification System

## 42.1 Objective

Provide real-time operational and customer notifications.

---

## 42.2 Supported Channels

### Telegram

Purpose:

* Admin notifications

---

### Email

Provider:

```text
Resend
```

Purpose:

* Customer communication
* Admin communication

---

### SMS

Provider:

```text
Fast2SMS
```

Purpose:

* Customer communication

---

## 42.3 Notification Configuration

All channels must be configurable.

Owner shall be able to:

* Enable
* Disable
* Configure credentials

without deployment.

---

# 43. Admin Notifications

## 43.1 Booking Created

Trigger:

```text
New Reservation Created
```

---

## 43.2 Deposit Submitted

Trigger:

```text
UTR Submitted
```

---

## 43.3 Session Events

Trigger:

```text
Session Extension
```

---

## 43.4 Operational Alerts

Trigger:

```text
No Show Recorded
```

---

# 44. Customer Notifications

## 44.1 Booking Confirmed

Trigger:

```text
Booking Confirmed
```

---

## 44.2 Booking Rejected

Trigger:

```text
Booking Rejected
```

---

## 44.3 Booking Cancelled

Trigger:

```text
Booking Cancelled
```

---

## 44.4 Future Notifications

Reserved for:

* Session reminders
* Promotional campaigns
* Membership notifications

---

# 45. Analytics System

## 45.1 Objective

Provide business intelligence and operational visibility.

---

## 45.2 Analytics Categories

### Revenue Analytics

### Customer Analytics

### Booking Analytics

### Console Analytics

### Operational Analytics

---

# 46. Revenue Analytics

## Metrics

Display:

* Daily Revenue
* Weekly Revenue
* Monthly Revenue
* Annual Revenue

---

## Trends

Display:

* Revenue Growth
* Revenue Decline
* Peak Revenue Days

---

# 47. Booking Analytics

## Metrics

Display:

* Total Bookings
* Website Bookings
* Walk-In Bookings
* Phone Reservations

---

## Conversion Metrics

Display:

* Confirmed Bookings
* Cancelled Bookings
* No Shows

---

# 48. Customer Analytics

## Metrics

Display:

* Total Customers
* New Customers
* Returning Customers

---

## Spending Analytics

Display:

* Average Spend
* Highest Spending Customers
* Most Active Customers

---

# 49. Console Analytics

## Metrics

Display:

* Console Utilization
* Revenue Per Console
* Bookings Per Console

---

## Availability Metrics

Display:

* Active Time
* Idle Time
* Maintenance Time

---

# 50. Operational Analytics

## Metrics

Display:

* No Show Rate
* Cancellation Rate
* Extension Rate

---

## Operational Health

Display:

* Peak Hours
* Busy Days
* Most Requested Time Slots

---

# 51. Reporting System

## 51.1 Objective

Generate operational reports.

---

## 51.2 Report Types

### Daily Report

### Weekly Report

### Monthly Report

### Custom Report

---

# 52. Daily Report

Display:

```text
Revenue

Bookings

Completed Sessions

No Shows

Active Customers
```

---

# 53. Monthly Report

Display:

```text
Revenue

Booking Sources

Customer Growth

Console Utilization
```

---

# 54. Data Export

## Supported Formats

Phase 1:

```text
CSV
```

---

Future:

```text
Excel
PDF
```

---

# 55. Admin Dashboard

## 55.1 Objective

Provide a centralized operational interface.

---

## 55.2 Modules

```text
Dashboard
│
├── Overview
├── Bookings
├── Customers
├── Consoles
├── Reports
├── Settings
└── User Management
```

---

# 56. Overview Module

Display:

* Today's Revenue
* Active Sessions
* Pending Verifications
* No Shows
* Console Utilization

---

# 57. Bookings Module

Features:

* Search
* Filter
* Confirm
* Reject
* Cancel
* Reschedule
* Check In
* Complete
* Extend Session

---

## Search Criteria

* Booking Reference
* Customer Name
* Phone Number

---

# 58. Customers Module

Features:

* Search Customers
* View Profiles
* View History
* Add Notes
* View Reliability

---

# 59. Consoles Module

Features:

* Add Console
* Edit Console
* Disable Console
* Enable Console
* Maintenance Mode

---

# 60. Reports Module

Features:

* Daily Reports
* Monthly Reports
* Export Reports

---

# 61. Settings Module

Features:

* Business Settings
* Pricing Settings
* Deposit Settings
* Operating Hours
* Notification Settings
* UPI Settings

---

# 62. User Management Module

Owner Only.

Features:

* Create Users
* Edit Users
* Disable Users
* Reset Passwords

---

# 63. Audit Logging System

## 63.1 Objective

Provide accountability and traceability.

---

## 63.2 Audit Events

The system shall log:

### Booking Events

* Booking Created
* Booking Confirmed
* Booking Cancelled
* Booking Extended

---

### Payment Events

* Payment Verified
* Payment Rejected

---

### Customer Events

* Customer Created
* Customer Updated

---

### Settings Events

* Pricing Changed
* Deposit Rules Changed
* Operating Hours Changed

---

### User Events

* User Created
* User Updated
* User Disabled

---

# 64. Audit Log Structure

Example:

```javascript
{
  action: "BOOKING_CONFIRMED",

  bookingReference: "POV-20260715-0042",

  performedBy: {
    userId,
    name,
    role
  },

  createdAt
}
```

---

# 65. User Management

## 65.1 Supported Roles

### Owner

### Manager

---

# 66. Owner Permissions

Owner has unrestricted access.

May:

* Manage Users
* Manage Pricing
* Manage Deposits
* Manage Notifications
* View Audit Logs
* Access All Reports

---

# 67. Manager Permissions

Managers have operational access only.

May:

* Manage Bookings
* Manage Customers
* Verify Deposits
* Check In Sessions
* Complete Sessions

---

Managers may not:

* Manage Users
* Modify Pricing
* Modify Deposit Rules
* Modify Security Settings

---

# 68. Functional Acceptance Criteria

### FR-024

Customer profiles shall be automatically maintained.

---

### FR-025

Customer history shall be retained indefinitely.

---

### FR-026

Reliability ratings shall be calculated automatically.

---

### FR-027

Telegram notifications shall be supported.

---

### FR-028

Email notifications shall be supported.

---

### FR-029

SMS notifications shall be supported.

---

### FR-030

Revenue analytics shall be available.

---

### FR-031

Customer analytics shall be available.

---

### FR-032

Console analytics shall be available.

---

### FR-033

Reports shall be exportable.

---

### FR-034

Audit logs shall record critical actions.

---

### FR-035

Owners shall manage users.

---

### FR-036

Managers shall have restricted access.

---

### FR-037

Dashboard modules shall be role-aware.

# PART 5 — NON-FUNCTIONAL REQUIREMENTS, INFRASTRUCTURE, SECURITY & PROJECT GOVERNANCE

---

# 69. Non-Functional Requirements

## 69.1 Objective

Non-functional requirements define how the system shall operate rather than what functionality it provides.

These requirements are mandatory for production deployment.

---

# 70. Performance Requirements

## 70.1 Booking Availability Checks

The availability engine shall return results within:

```text
< 2 Seconds
```

under normal operating conditions.

---

## 70.2 Booking Creation

Booking creation shall complete within:

```text
< 3 Seconds
```

excluding third-party notification delivery times.

---

## 70.3 Dashboard Loading

Dashboard pages shall load within:

```text
< 5 Seconds
```

under normal internet conditions.

---

## 70.4 Search Operations

Customer searches and booking searches shall return results within:

```text
< 2 Seconds
```

for datasets up to 100,000 records.

---

# 71. Availability Requirements

## 71.1 Service Availability

Target availability:

```text
99.5%
```

excluding scheduled maintenance.

---

## 71.2 Planned Maintenance

Maintenance windows shall preferably occur:

```text
Outside Business Hours
```

---

## 71.3 Failure Recovery

The system shall recover gracefully from:

* Application crashes
* Hosting outages
* Database reconnections
* Notification provider failures

---

# 72. Scalability Requirements

## 72.1 Console Scalability

The system shall support expansion from:

```text
2 Consoles
```

to:

```text
50+ Consoles
```

without redesign.

---

## 72.2 Customer Scalability

The system shall support:

```text
100,000+ Customer Records
```

without schema redesign.

---

## 72.3 Booking Scalability

The system shall support:

```text
1,000,000+ Historical Bookings
```

without structural changes.

---

## 72.4 Multi-Branch Readiness

Although multi-branch functionality is out of scope, all architecture decisions shall support future expansion.

---

# 73. Security Requirements

## 73.1 Authentication

Authentication shall use:

```text
JWT
```

tokens.

---

## 73.2 Password Storage

Passwords shall never be stored in plain text.

Passwords shall be hashed using:

```text
bcrypt
```

---

## 73.3 Authorization

Access control shall be role-based.

Supported roles:

* Owner
* Manager

---

## 73.4 Route Protection

Administrative routes shall require authentication.

Examples:

```text
/admin
/api/bookings
/api/customers
/api/settings
```

---

## 73.5 Session Security

The system shall:

* Expire invalid sessions
* Reject expired tokens
* Prevent unauthorized access

---

# 74. Input Validation

## 74.1 Server-Side Validation

All critical validation shall occur on the backend.

Frontend validation shall never be considered sufficient.

---

## 74.2 Required Validation Areas

Validate:

* Phone Numbers
* UTR Numbers
* Booking Dates
* Booking Times
* Pricing Inputs
* Settings Updates

---

## 74.3 Data Sanitization

All user input shall be sanitized before persistence.

---

# 75. Audit Logging Requirements

## 75.1 Objective

Provide traceability and accountability.

---

## 75.2 Mandatory Audit Events

The system shall log:

### Booking Events

* Create
* Update
* Cancel
* Confirm
* Extend
* Complete

---

### Payment Events

* Verify
* Reject

---

### Customer Events

* Create
* Update
* Merge

---

### User Events

* Create
* Disable
* Password Reset

---

### Settings Events

* Pricing Changes
* Deposit Changes
* Notification Changes
* Operating Hours Changes

---

## 75.3 Audit Log Protection

Only Owners may view audit logs.

Audit logs shall not be editable.

---

# 76. Database Requirements

## 76.1 Database Platform

The platform shall use:

```text
MongoDB Atlas
```

---

## 76.2 Collections

Required collections:

```text
users
customers
bookings
consoles
settings
auditLogs
```

---

## 76.3 Settings Collection

The application shall maintain:

```text
Exactly One Settings Document
```

at all times.

---

## 76.4 Soft Deletes

Critical business records shall use:

```text
Soft Delete Strategy
```

instead of physical deletion.

---

# 77. Data Retention Policy

## 77.1 Booking Data

Booking history shall be retained indefinitely.

---

## 77.2 Customer Data

Customer profiles shall be retained indefinitely.

---

## 77.3 Audit Logs

Audit logs shall be retained indefinitely.

---

## 77.4 Analytics Data

Analytics data may be regenerated from source data.

---

# 78. Backup & Recovery

## 78.1 Objective

Protect business continuity.

---

## 78.2 Database Backups

MongoDB Atlas automated backups shall be enabled.

---

## 78.3 Backup Frequency

Minimum:

```text
Daily
```

---

## 78.4 Recovery Objective

Target recovery:

```text
< 24 Hours
```

---

# 79. Notification Reliability

## 79.1 Failure Handling

Notification failures shall not block booking creation.

---

## 79.2 Logging

Failed notifications shall be logged.

---

## 79.3 Retry Strategy

Future enhancement.

Notification retries are outside Phase 1 scope.

---

# 80. Infrastructure Architecture

## 80.1 Frontend

Platform:

```text
Vercel
```

Responsibilities:

* Public Website
* Admin Dashboard

---

## 80.2 Backend

Platform:

```text
Railway
```

Responsibilities:

* APIs
* Business Logic
* Authentication
* Notifications

---

## 80.3 Database

Platform:

```text
MongoDB Atlas
```

Responsibilities:

* Data Persistence
* Backups
* Replication

---

# 81. Third-Party Services

## 81.1 Telegram

Purpose:

```text
Admin Notifications
```

---

## 81.2 Resend

Purpose:

```text
Email Notifications
```

---

## 81.3 Fast2SMS

Purpose:

```text
SMS Notifications
```

---

## 81.4 UPI

Purpose:

```text
Customer Payments
```

---

# 82. Environment Variables

Sensitive values shall never be stored in source code.

Examples:

```text
JWT_SECRET

MONGODB_URI

RESEND_API_KEY

FAST2SMS_API_KEY

TELEGRAM_BOT_TOKEN
```

---

# 83. Monitoring Requirements

## 83.1 Application Monitoring

Production errors shall be logged.

---

## 83.2 Critical Failure Alerts

Examples:

* Database Connection Failure
* Booking Engine Failure
* Authentication Failure

---

## 83.3 Future Monitoring

Future integrations may include:

* Sentry
* Datadog
* LogRocket

---

# 84. Deployment Requirements

## 84.1 Environment Separation

Required environments:

```text
Development

Staging

Production
```

---

## 84.2 Production Deployments

Production deployments shall:

* Preserve database integrity
* Preserve booking history
* Preserve settings

---

## 84.3 Rollback Capability

Deployments should support rollback.

---

# 85. Compliance & Privacy

## 85.1 Customer Data

Customer data shall be collected only for operational purposes.

---

## 85.2 Data Access

Only authenticated staff may access customer information.

---

## 85.3 Sensitive Data

The system shall not store:

* UPI PINs
* Bank Passwords
* Payment Credentials

---

# 86. Assumptions & Dependencies

## Assumptions

* UPI remains available.
* Internet connectivity exists.
* Managers receive operational training.

---

## Dependencies

* MongoDB Atlas
* Railway
* Vercel
* Telegram
* Resend
* Fast2SMS

---

# 87. Phase 1 Deliverables

The following modules shall be delivered.

### Public Website

* Home Page
* Booking Flow
* Payment Flow
* Confirmation Page

---

### Admin Dashboard

* Dashboard
* Bookings
* Customers
* Consoles
* Reports
* Settings
* User Management

---

### Backend APIs

* Authentication
* Booking Management
* Customer Management
* Console Management
* Settings Management
* Reporting

---

### Database

* MongoDB Atlas
* Automated Backups

---

# 88. Future Roadmap

## Phase 2

### Payment Automation

* Razorpay
* Cashfree
* Automatic Verification

---

### Refund Management

* Automated Refunds
* Refund Tracking

---

# 89. Future Roadmap — Phase 3

### Customer Accounts

* Registration
* Login
* Customer Portal

---

### Loyalty System

* Points
* Rewards
* Membership Tiers

---

### Promotions

* Referral Programs
* Coupon Codes

---

# 90. Future Roadmap — Phase 4

### Food & Beverage Operations

* Ordering
* Inventory Tracking
* Sales Analytics

---

# 91. Future Roadmap — Phase 5

### Multi-Branch Operations

* Branch Management
* Branch Pricing
* Centralized Reporting

---

# 92. Consolidated Business Rules

1. Customers cannot select consoles.
2. Console assignment is automatic.
3. Double bookings are prohibited.
4. Pricing must never be hardcoded.
5. Deposits are configurable.
6. Deposits are non-refundable by default.
7. Every booking must have a booking source.
8. Every booking must have a booking reference.
9. Phone number is the primary customer identifier.
10. Customer login is not included in Phase 1.
11. Booking buffers must be enforced.
12. Operating hours must be enforced.
13. Session extensions require availability validation.
14. No-show rules must be enforced.
15. Settings must be configurable without deployment.
16. Exactly one settings document must exist.
17. Historical bookings must retain pricing snapshots.
18. Audit logs must be immutable.
19. Walk-in bookings bypass deposit workflows.
20. Notification failures must not block bookings.
21. Managers have operational access only.
22. Owners have unrestricted system access.
23. Customer data shall be retained indefinitely.
24. Booking history shall be retained indefinitely.
25. Audit logs shall be retained indefinitely.

---

# 93. System Acceptance Criteria

The project shall be considered complete when:

### Functional

All acceptance criteria FR-001 through FR-037 are satisfied.

---

### Operational

Managers can operate the cafe entirely through the dashboard.

---

### Business

The platform successfully manages:

* Website Bookings
* Walk-In Bookings
* Phone Reservations

without manual spreadsheets.

---

### Technical

The platform is deployed and operational on:

* Vercel
* Railway
* MongoDB Atlas

with all integrations functioning.

---

# 94. Document Authority

This document constitutes the authoritative requirements specification for the POV Gaming Cafe Booking & Operations Platform.

All future technical documentation shall derive from this specification.

Any future requirement changes must be formally approved and versioned.

END OF MASTER_SRS_v4.0


# PART 5 — NON-FUNCTIONAL REQUIREMENTS, INFRASTRUCTURE, SECURITY & PROJECT GOVERNANCE

---

# 69. Non-Functional Requirements

## 69.1 Objective

Non-functional requirements define how the system shall operate rather than what functionality it provides.

These requirements are mandatory for production deployment.

---

# 70. Performance Requirements

## 70.1 Booking Availability Checks

The availability engine shall return results within:

```text
< 2 Seconds
```

under normal operating conditions.

---

## 70.2 Booking Creation

Booking creation shall complete within:

```text
< 3 Seconds
```

excluding third-party notification delivery times.

---

## 70.3 Dashboard Loading

Dashboard pages shall load within:

```text
< 5 Seconds
```

under normal internet conditions.

---

## 70.4 Search Operations

Customer searches and booking searches shall return results within:

```text
< 2 Seconds
```

for datasets up to 100,000 records.

---

# 71. Availability Requirements

## 71.1 Service Availability

Target availability:

```text
99.5%
```

excluding scheduled maintenance.

---

## 71.2 Planned Maintenance

Maintenance windows shall preferably occur:

```text
Outside Business Hours
```

---

## 71.3 Failure Recovery

The system shall recover gracefully from:

* Application crashes
* Hosting outages
* Database reconnections
* Notification provider failures

---

# 72. Scalability Requirements

## 72.1 Console Scalability

The system shall support expansion from:

```text
2 Consoles
```

to:

```text
50+ Consoles
```

without redesign.

---

## 72.2 Customer Scalability

The system shall support:

```text
100,000+ Customer Records
```

without schema redesign.

---

## 72.3 Booking Scalability

The system shall support:

```text
1,000,000+ Historical Bookings
```

without structural changes.

---

## 72.4 Multi-Branch Readiness

Although multi-branch functionality is out of scope, all architecture decisions shall support future expansion.

---

# 73. Security Requirements

## 73.1 Authentication

Authentication shall use:

```text
JWT
```

tokens.

---

## 73.2 Password Storage

Passwords shall never be stored in plain text.

Passwords shall be hashed using:

```text
bcrypt
```

---

## 73.3 Authorization

Access control shall be role-based.

Supported roles:

* Owner
* Manager

---

## 73.4 Route Protection

Administrative routes shall require authentication.

Examples:

```text
/admin
/api/bookings
/api/customers
/api/settings
```

---

## 73.5 Session Security

The system shall:

* Expire invalid sessions
* Reject expired tokens
* Prevent unauthorized access

---

# 74. Input Validation

## 74.1 Server-Side Validation

All critical validation shall occur on the backend.

Frontend validation shall never be considered sufficient.

---

## 74.2 Required Validation Areas

Validate:

* Phone Numbers
* UTR Numbers
* Booking Dates
* Booking Times
* Pricing Inputs
* Settings Updates

---

## 74.3 Data Sanitization

All user input shall be sanitized before persistence.

---

# 75. Audit Logging Requirements

## 75.1 Objective

Provide traceability and accountability.

---

## 75.2 Mandatory Audit Events

The system shall log:

### Booking Events

* Create
* Update
* Cancel
* Confirm
* Extend
* Complete

---

### Payment Events

* Verify
* Reject

---

### Customer Events

* Create
* Update
* Merge

---

### User Events

* Create
* Disable
* Password Reset

---

### Settings Events

* Pricing Changes
* Deposit Changes
* Notification Changes
* Operating Hours Changes

---

## 75.3 Audit Log Protection

Only Owners may view audit logs.

Audit logs shall not be editable.

---

# 76. Database Requirements

## 76.1 Database Platform

The platform shall use:

```text
MongoDB Atlas
```

---

## 76.2 Collections

Required collections:

```text
users
customers
bookings
consoles
settings
auditLogs
```

---

## 76.3 Settings Collection

The application shall maintain:

```text
Exactly One Settings Document
```

at all times.

---

## 76.4 Soft Deletes

Critical business records shall use:

```text
Soft Delete Strategy
```

instead of physical deletion.

---

# 77. Data Retention Policy

## 77.1 Booking Data

Booking history shall be retained indefinitely.

---

## 77.2 Customer Data

Customer profiles shall be retained indefinitely.

---

## 77.3 Audit Logs

Audit logs shall be retained indefinitely.

---

## 77.4 Analytics Data

Analytics data may be regenerated from source data.

---

# 78. Backup & Recovery

## 78.1 Objective

Protect business continuity.

---

## 78.2 Database Backups

MongoDB Atlas automated backups shall be enabled.

---

## 78.3 Backup Frequency

Minimum:

```text
Daily
```

---

## 78.4 Recovery Objective

Target recovery:

```text
< 24 Hours
```

---

# 79. Notification Reliability

## 79.1 Failure Handling

Notification failures shall not block booking creation.

---

## 79.2 Logging

Failed notifications shall be logged.

---

## 79.3 Retry Strategy

Future enhancement.

Notification retries are outside Phase 1 scope.

---

# 80. Infrastructure Architecture

## 80.1 Frontend

Platform:

```text
Vercel
```

Responsibilities:

* Public Website
* Admin Dashboard

---

## 80.2 Backend

Platform:

```text
Railway
```

Responsibilities:

* APIs
* Business Logic
* Authentication
* Notifications

---

## 80.3 Database

Platform:

```text
MongoDB Atlas
```

Responsibilities:

* Data Persistence
* Backups
* Replication

---

# 81. Third-Party Services

## 81.1 Telegram

Purpose:

```text
Admin Notifications
```

---

## 81.2 Resend

Purpose:

```text
Email Notifications
```

---

## 81.3 Fast2SMS

Purpose:

```text
SMS Notifications
```

---

## 81.4 UPI

Purpose:

```text
Customer Payments
```

---

# 82. Environment Variables

Sensitive values shall never be stored in source code.

Examples:

```text
JWT_SECRET

MONGODB_URI

RESEND_API_KEY

FAST2SMS_API_KEY

TELEGRAM_BOT_TOKEN
```

---

# 83. Monitoring Requirements

## 83.1 Application Monitoring

Production errors shall be logged.

---

## 83.2 Critical Failure Alerts

Examples:

* Database Connection Failure
* Booking Engine Failure
* Authentication Failure

---

## 83.3 Future Monitoring

Future integrations may include:

* Sentry
* Datadog
* LogRocket

---

# 84. Deployment Requirements

## 84.1 Environment Separation

Required environments:

```text
Development

Staging

Production
```

---

## 84.2 Production Deployments

Production deployments shall:

* Preserve database integrity
* Preserve booking history
* Preserve settings

---

## 84.3 Rollback Capability

Deployments should support rollback.

---

# 85. Compliance & Privacy

## 85.1 Customer Data

Customer data shall be collected only for operational purposes.

---

## 85.2 Data Access

Only authenticated staff may access customer information.

---

## 85.3 Sensitive Data

The system shall not store:

* UPI PINs
* Bank Passwords
* Payment Credentials

---

# 86. Assumptions & Dependencies

## Assumptions

* UPI remains available.
* Internet connectivity exists.
* Managers receive operational training.

---

## Dependencies

* MongoDB Atlas
* Railway
* Vercel
* Telegram
* Resend
* Fast2SMS

---

# 87. Phase 1 Deliverables

The following modules shall be delivered.

### Public Website

* Home Page
* Booking Flow
* Payment Flow
* Confirmation Page

---

### Admin Dashboard

* Dashboard
* Bookings
* Customers
* Consoles
* Reports
* Settings
* User Management

---

### Backend APIs

* Authentication
* Booking Management
* Customer Management
* Console Management
* Settings Management
* Reporting

---

### Database

* MongoDB Atlas
* Automated Backups

---

# 88. Future Roadmap

## Phase 2

### Payment Automation

* Razorpay
* Cashfree
* Automatic Verification

---

### Refund Management

* Automated Refunds
* Refund Tracking

---

# 89. Future Roadmap — Phase 3

### Customer Accounts

* Registration
* Login
* Customer Portal

---

### Loyalty System

* Points
* Rewards
* Membership Tiers

---

### Promotions

* Referral Programs
* Coupon Codes

---

# 90. Future Roadmap — Phase 4

### Food & Beverage Operations

* Ordering
* Inventory Tracking
* Sales Analytics

---

# 91. Future Roadmap — Phase 5

### Multi-Branch Operations

* Branch Management
* Branch Pricing
* Centralized Reporting

---

# 92. Consolidated Business Rules

1. Customers cannot select consoles.
2. Console assignment is automatic.
3. Double bookings are prohibited.
4. Pricing must never be hardcoded.
5. Deposits are configurable.
6. Deposits are non-refundable by default.
7. Every booking must have a booking source.
8. Every booking must have a booking reference.
9. Phone number is the primary customer identifier.
10. Customer login is not included in Phase 1.
11. Booking buffers must be enforced.
12. Operating hours must be enforced.
13. Session extensions require availability validation.
14. No-show rules must be enforced.
15. Settings must be configurable without deployment.
16. Exactly one settings document must exist.
17. Historical bookings must retain pricing snapshots.
18. Audit logs must be immutable.
19. Walk-in bookings bypass deposit workflows.
20. Notification failures must not block bookings.
21. Managers have operational access only.
22. Owners have unrestricted system access.
23. Customer data shall be retained indefinitely.
24. Booking history shall be retained indefinitely.
25. Audit logs shall be retained indefinitely.

---

# 93. System Acceptance Criteria

The project shall be considered complete when:

### Functional

All acceptance criteria FR-001 through FR-037 are satisfied.

---

### Operational

Managers can operate the cafe entirely through the dashboard.

---

### Business

The platform successfully manages:

* Website Bookings
* Walk-In Bookings
* Phone Reservations

without manual spreadsheets.

---

### Technical

The platform is deployed and operational on:

* Vercel
* Railway
* MongoDB Atlas

with all integrations functioning.

---

# 94. Document Authority

This document constitutes the authoritative requirements specification for the POV Gaming Cafe Booking & Operations Platform.

All future technical documentation shall derive from this specification.

Any future requirement changes must be formally approved and versioned.

END OF MASTER_SRS_v4.0

# SRS Amendment — Payment History Module

## Objective

Provide complete financial visibility for all money entering and leaving the business.

The Payment History Module shall provide a centralized ledger of all payment transactions.

---

# Payment History Dashboard

Add new module:

```text
Dashboard
│
├── Overview
├── Bookings
├── Customers
├── Consoles
├── Payments
├── Reports
├── Settings
└── User Management
```

---

# Payment History View

Display:

* Transaction Date
* Transaction Type
* Booking Reference
* Customer Name
* Customer Phone
* Amount
* Payment Method
* UTR
* Status
* Created By

---

# Supported Transaction Types

### Deposit Payment

Example:

```text
₹120 Deposit
```

---

### Remaining Balance Payment

Example:

```text
₹360 Balance
```

---

### Credit Issued

Example:

```text
₹100 Customer Credit
```

---

### Credit Redeemed

Example:

```text
₹100 Credit Applied
```

---

### Refund

Future Support

Example:

```text
₹120 Refunded
```

---

# Payment Statuses

```text
Pending

Verified

Rejected

Refunded
```

---

# Search & Filters

Search by:

* Booking Reference
* Customer Name
* Phone Number
* UTR

Filters:

* Date Range
* Transaction Type
* Payment Status
* Payment Method

---

# Financial Metrics

Display:

* Today's Revenue
* Monthly Revenue
* Total Deposits
* Outstanding Balances
* Credits Issued
* Credits Redeemed

---

# Permissions

Owner:

* Full Access

Manager:

* View
* Verify Payments

Managers may not:

* Delete Transactions

---

# Audit Requirements

Every payment action must generate an audit log entry.

---

# Acceptance Criteria

FR-038

Payment transactions shall be searchable.

---

FR-039

Payment transactions shall be filterable.

---

FR-040

Payment history shall display complete financial records.

---

FR-041

Payment verification actions shall be auditable.

---

# API SPECIFICATION AMENDMENT

# API-AMD-001 — REMOVAL OF CUSTOMER AUTHENTICATION & ADDITION OF PUBLIC AVAILABILITY APIs

Version: 1.0

Status: APPROVED

Document Type: API Specification Amendment

Parent Document:

```text
03_API_SPECIFICATION.md
```

Applies To:

```text
Part 3
Part 4A
Part 4B
Part 7
```

---

# 1. Purpose

This amendment simplifies the Phase 1 customer experience by:

```text
Removing Customer Authentication

Removing Customer Account APIs

Removing Customer Dashboard APIs

Adding Booking Lookup APIs

Adding Public Availability APIs
```

The administrative authentication system remains unchanged.

---

# 2. Customer Authentication Removal

The following customer-facing functionality is removed from Phase 1:

```text
Customer Registration

Customer Login

Customer Logout

Customer Password Reset

Customer Session Management

Customer Dashboard

Customer Booking History
```

---

# 3. Administrative Authentication Unchanged

Part 7 remains fully valid for:

```text
OWNER

MANAGER
```

users.

No changes shall be made to:

```text
JWT

RBAC

Session Management

Security Policies
```

for administrative users.

---

# 4. Customer Identity Model

## Phase 1 Customer Identity

Customers shall be identified using:

```text
Mobile Number
```

as the primary identifier.

---

## Customer Record Creation

During booking creation:

```text
If Mobile Exists
    Link Existing Customer

If Mobile Does Not Exist
    Create Customer
```

---

## Duplicate Prevention Rule

Customer matching shall be based on:

```text
Normalized Mobile Number
```

only.

---

# 5. Booking Lookup API

## Purpose

Allow customers to retrieve booking information without authentication.

---

## Endpoint

```http
POST /api/v1/public/bookings/lookup
```

---

## Authentication

Public

---

## Request

```json
{
  "bookingCode": "POV-101",
  "mobileNumber": "9876543210"
}
```

---

## Validation

Both values must match the booking.

---

## Success Response

```json
{
  "success": true,
  "data": {
    "bookingCode": "POV-101",

    "bookingStatus": "CONFIRMED",

    "paymentStatus": "VERIFIED",

    "visitDate": "2026-06-19",

    "startTime": "11:00",

    "durationMinutes": 120,

    "playerCount": 2
  }
}
```

---

# 6. Booking Lookup Security Rules

Lookup response shall never expose:

```text
Internal Notes

Audit Records

Payment Proofs

UTR Numbers

Administrative Metadata

Customer Credits

Refund Information
```

---

# 7. Public Availability API

## Purpose

Provide real-time availability data for homepage display.

---

## Endpoint

```http
GET /api/v1/public/availability
```

---

## Authentication

Public

---

## Response

```json
{
  "success": true,
  "data": [
    {
      "startTime": "11:00",
      "endTime": "12:00",
      "availableSlots": 2
    },
    {
      "startTime": "12:00",
      "endTime": "14:00",
      "availableSlots": 1
    },
    {
      "startTime": "18:00",
      "endTime": "20:00",
      "availableSlots": 0
    }
  ]
}
```

---

# 8. Availability Calculation Rules

Availability shall be calculated using:

```text
Total Active Consoles

Minus

Capacity Occupied By Active Bookings
```

---

## Capacity Consuming States

```text
PENDING_PAYMENT_VERIFICATION

CONFIRMED

CHECKED_IN
```

---

## Non-Capacity States

```text
CANCELLED

REJECTED

EXPIRED

NO_SHOW

COMPLETED
```

---

# 9. Console Privacy Rules

Public APIs shall never expose:

```text
Console Names

Console IDs

Console Assignment

Console Internal Metadata
```

---

## Example

Allowed:

```text
2 Slots Available
```

Not Allowed:

```text
Console A Available
Console B Busy
```

---

# 10. Public Availability Summary API

## Endpoint

```http
GET /api/v1/public/availability/summary
```

---

## Purpose

Homepage availability widget.

---

## Response

```json
{
  "success": true,
  "data": {
    "availableNow": 2,

    "nextBusyPeriod": {
      "startTime": "12:00",
      "endTime": "14:00"
    },

    "remainingCapacityToday": 12
  }
}
```

---

# 11. Shared Availability Engine

The following components shall use the same availability service:

```text
Booking Creation

Availability Validation

Public Availability Widget

Admin Timeline

Booking Conflict Detection
```

---

## Single Source Of Truth

Availability calculations shall exist in one domain service.

Duplicate implementations are prohibited.

---

# 12. Public Website API Scope

Phase 1 public website APIs shall consist of:

```text
Public Settings

Availability

Availability Summary

Booking Creation

Booking Lookup

Payment Instructions
```

Only.

---

# 13. Removed Future APIs

The following APIs are removed from Phase 1 implementation:

```text
POST /customer/register

POST /customer/login

POST /customer/logout

POST /customer/password/reset

GET /customer/bookings

GET /customer/profile

PATCH /customer/profile
```

---

# 14. Error Catalog Additions

New Errors:

```text
BOOKING_NOT_FOUND

INVALID_BOOKING_LOOKUP

BOOKING_LOOKUP_DENIED

AVAILABILITY_UNAVAILABLE
```

---

# 15. Design Principles

1. Customers shall not require accounts in Phase 1.
2. Public booking flow shall remain frictionless.
3. Mobile number is the customer identifier.
4. Booking lookup replaces customer dashboard functionality.
5. Availability shall be visible before booking.
6. Public availability shall never expose internal console information.
7. Admin timeline and public availability shall share the same availability engine.
8. Authentication remains mandatory for administrative users.
9. Public APIs shall expose minimum necessary information.
10. Phase 1 shall optimize for simplicity and conversion rate.

---

# Amendment Status

```text
APPROVED
```

This amendment supersedes all previous API requirements relating to customer authentication, customer dashboard functionality, and customer account management for Phase 1.

