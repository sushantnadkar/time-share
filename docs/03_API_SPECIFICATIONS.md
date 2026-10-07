# 03_API_SPECIFICATION.md

# PART 1 — API ARCHITECTURE & STANDARDS

Version: 1.0

Status: Approved

Document Type: Authoritative API Contract

---

# 1. Purpose

## 1.1 Objective

This document defines the API architecture, standards, conventions, and rules governing all platform APIs.

All services must comply with these standards.

This document serves as the implementation contract between:

* Frontend Applications
* Backend Services
* Mobile Applications
* Third-Party Integrations
* Future Platform Extensions

---

## 1.2 Scope

This specification applies to:

```text
Authentication APIs
User APIs
Customer APIs
Booking APIs
Payment APIs
Credit APIs
Settings APIs
Reporting APIs
System APIs
```

---

# 2. Architectural Standards

## 2.1 API Style

The platform shall use:

```text
REST Architecture
```

All communication shall occur through HTTP APIs.

---

## 2.2 Design Principles

The API must be:

1. RESTful
2. Stateless
3. Versioned
4. Secure
5. Auditable
6. Consistent
7. Backward Compatible

---

## 2.3 Supported Consumers

The API shall support:

```text
React Web Application
Administrative Dashboard
Future Mobile Application
Background Services
Third Party Integrations
```

---

# 3. API Versioning Strategy

## 3.1 Version Format

All endpoints shall use URL versioning.

Format:

```text
/api/v1/*
```

Examples:

```text
/api/v1/bookings
/api/v1/customers
/api/v1/payments
/api/v1/settings
```

---

## 3.2 Breaking Changes

Breaking changes require a new version.

Example:

```text
/api/v2/*
```

---

## 3.3 Non-Breaking Changes

The following may be introduced without version changes:

* New optional fields
* New response fields
* New endpoints
* Performance improvements

---

# 4. Environment URLs

## 4.1 Development

```text
http://localhost:3000/api/v1
```

---

## 4.2 Staging

```text
https://staging-api.povgaming.com/api/v1
```

---

## 4.3 Production

```text
https://api.povgaming.com/api/v1
```

---

# 5. Resource Naming Standards

## 5.1 Resource Naming Rules

Resources must:

* Use plural nouns
* Use lowercase
* Use kebab-case where required

Examples:

```text
customers
bookings
payments
credits
settings
users
reports
```

---

## 5.2 Prohibited Patterns

The following are prohibited:

```text
/createBooking
/getBookings
/updateCustomer
/deleteUser
```

---

## 5.3 Approved REST Patterns

```http
POST   /bookings
GET    /bookings
GET    /bookings/:id
PATCH  /bookings/:id
DELETE /customers/:id
```

---

# 6. HTTP Method Standards

## 6.1 GET

Purpose:

```text
Retrieve Resources
```

Example:

```http
GET /api/v1/customers
```

---

## 6.2 POST

Purpose:

```text
Create Resources
```

Example:

```http
POST /api/v1/bookings
```

---

## 6.3 PATCH

Purpose:

```text
Partial Update
```

Example:

```http
PATCH /api/v1/bookings/:id
```

---

## 6.4 PUT

Purpose:

```text
Full Replacement
```

Reserved for future use.

---

## 6.5 DELETE

Purpose:

```text
Soft Delete
```

Example:

```http
DELETE /api/v1/customers/:id
```

---

# 7. Request Correlation Standard

## 7.1 Purpose

Every request must be traceable across:

* API Logs
* Audit Logs
* Notification Logs
* Error Logs
* Background Jobs

---

## 7.2 Header

```http
X-Request-ID: 550e8400-e29b-41d4-a716-446655440000
```

---

## 7.3 Server Behavior

If the client supplies:

```http
X-Request-ID
```

the server shall preserve it.

If absent:

the server shall generate a UUID.

---

## 7.4 Logging Requirement

Every log entry shall include:

```text
requestId
```

---

## 7.5 Error Response Requirement

All error responses shall include:

```json
{
  "requestId": "550e8400-e29b-41d4-a716-446655440000"
}
```

---

# 8. Authentication Standards

## 8.1 Authentication Model

The platform shall use:

```text
JWT Authentication
```

---

## 8.2 Token Types

```text
Access Token
Refresh Token
```

---

## 8.3 Storage Method

Tokens shall be stored in:

```text
HTTP-Only Cookies
```

---

## 8.4 Prohibited Storage

Tokens shall never be stored in:

```text
localStorage
sessionStorage
```

---

## 8.5 Session Lifetime

Access Token:

```text
8 Hours
```

Refresh Token:

```text
30 Days
```

---

# 9. Authorization Standards

## 9.1 Authorization Model

The platform shall use:

```text
RBAC + Permission Based Authorization
```

---

## 9.2 Authorization Flow

```text
Authenticate User
↓
Load Permissions
↓
Validate Permission
↓
Execute Request
```

---

## 9.3 Permission Naming Convention

Format:

```text
resource.action
```

Examples:

```text
bookings.create
bookings.update
bookings.cancel

payments.verify

customers.update

settings.update
```

---

# 10. Request Standards

## 10.1 Content Type

```http
Content-Type: application/json
```

---

## 10.2 Accepted Content Types

```text
application/json
multipart/form-data
```

---

## 10.3 Date Format

```text
YYYY-MM-DD
```

Example:

```text
2026-07-15
```

---

## 10.4 Time Format

```text
HH:mm
```

Example:

```text
18:30
```

---

## 10.5 DateTime Format

```text
ISO-8601 UTC
```

Example:

```text
2026-07-15T18:30:00.000Z
```

---

# 11. Response Standards

## 11.1 Success Response

All successful responses shall follow:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {},
  "meta": {}
}
```

---

## 11.2 Error Response

All failed responses shall follow:

```json
{
  "success": false,
  "error": {
    "code": "BOOKING_CONFLICT",
    "message": "Selected slot is unavailable"
  },
  "requestId": "550e8400-e29b-41d4-a716-446655440000"
}
```

---

# 12. Pagination Standards

## 12.1 Request Format

```http
GET /customers?page=1&limit=25
```

---

## 12.2 Defaults

```text
page = 1
limit = 25
```

---

## 12.3 Maximum Limit

```text
100
```

---

## 12.4 Response Format

```json
{
  "success": true,
  "data": [],
  "meta": {
    "page": 1,
    "limit": 25,
    "totalRecords": 250,
    "totalPages": 10
  }
}
```

---

# 13. Filtering Standards

## 13.1 Single Filter

```http
GET /bookings?status=confirmed
```

---

## 13.2 Multiple Filters

```http
GET /bookings?status=confirmed&visitDate=2026-07-15
```

---

## 13.3 Date Range Filters

```http
GET /payments?fromDate=2026-07-01&toDate=2026-07-31
```

---

# 14. Sorting Standards

## 14.1 Request Format

```http
GET /bookings?sortBy=createdAt&sortOrder=desc
```

---

## 14.2 Allowed Values

```text
asc
desc
```

---

## 14.3 Default Sort

```text
createdAt desc
```

---

# 15. Validation Standards

## 15.1 Validation Location

All validation must occur:

```text
Server Side
```

Client-side validation is supplementary.

---

## 15.2 Validation Failure Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "fields": [
      {
        "field": "phone",
        "message": "Phone number is required"
      }
    ]
  }
}
```

---

# 16. HTTP Status Standards

| Status | Description             |
| ------ | ----------------------- |
| 200    | Success                 |
| 201    | Resource Created        |
| 400    | Validation Error        |
| 401    | Authentication Required |
| 403    | Permission Denied       |
| 404    | Resource Not Found      |
| 409    | Business Conflict       |
| 422    | Business Rule Violation |
| 429    | Rate Limit Exceeded     |
| 500    | Internal Server Error   |

---

# 17. Rate Limiting Standards

## Public APIs

```text
100 Requests / 15 Minutes
```

Per IP.

---

## Authentication APIs

```text
10 Requests / 15 Minutes
```

Per IP.

---

## Administrative APIs

```text
500 Requests / 15 Minutes
```

Per Authenticated User.

---

# 18. Audit Requirements

The following actions shall generate audit records:

```text
Booking Creation
Booking Update
Booking Cancellation

Payment Verification
Payment Rejection
Payment Refund

Credit Issue
Credit Redemption

Customer Update

Settings Update

User Creation
User Update
User Disable
```

---

# 19. Idempotency Standards

## 19.1 Purpose

Prevent duplicate operations.

Critical for:

```text
Payments
Bookings
Credits
```

---

## 19.2 Header

```http
Idempotency-Key: 4f9f6d85-f0ef-4d11-9e3e-ccaf90e2d123
```

---

## 19.3 Applicable Operations

```text
POST /bookings

POST /payments

POST /credits
```

---

# 20. API Design Principles

1. APIs shall be RESTful.
2. APIs shall be versioned.
3. APIs shall be stateless.
4. Authentication shall use JWT.
5. Authorization shall use permissions.
6. Soft delete shall be preferred over hard delete.
7. Validation shall always occur server-side.
8. Responses shall follow standard formats.
9. Errors shall use standard codes.
10. Critical operations shall be idempotent.
11. Every request shall be traceable using request IDs.
12. All critical actions shall be auditable.

---

# 21. Next Section

Part 2 will define:

```text
Authentication APIs
Session APIs
User APIs
Role APIs
Permission APIs
```

including:

* Endpoint Definitions
* Request Schemas
* Response Schemas
* Validation Rules
* Authorization Requirements
* Business Rules
* Error Scenarios

# 03_API_SPECIFICATION.md

# PART 2 — AUTHENTICATION, SESSION, USER, ROLE & PERMISSION APIS

Version: 1.0

Status: Approved

Document Type: Authoritative API Contract

---

# 22. Module Overview

## 22.1 Purpose

This module manages:

* Authentication
* Session Management
* User Management
* Role Management
* Permission Management
* Password Management

---

## 22.2 Supported Roles

```text
owner

manager
```

---

## 22.3 Authorization Model

Phase 1 shall use:

```text
Role-Based Access Control (RBAC)
```

with permissions inherited from roles.

Custom user permissions are not supported in Phase 1.

---

# 23. Authentication Flow

```text
Login
↓
Validate Credentials
↓
Load User
↓
Load Role
↓
Load Permissions
↓
Generate Access Token
↓
Generate Refresh Token
↓
Set HTTP Only Cookies
↓
Authenticated Session
```

---

# 24. Login API

## Endpoint

```http
POST /api/v1/auth/login
```

---

## Authentication

Public

---

## Request Body

```json
{
  "email": "owner@povgaming.com",
  "password": "Password@123"
}
```

---

## Validation Rules

### Email

Required

Valid email format

---

### Password

Required

Minimum 12 characters

---

## Business Rules

### User Must Exist

Failure:

```text
INVALID_CREDENTIALS
```

---

### User Must Be Active

Failure:

```text
ACCOUNT_DISABLED
```

---

### Account Must Not Be Locked

Failure:

```text
ACCOUNT_LOCKED
```

---

## Success Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "64abc123",
      "userCode": "USR-000001",
      "name": "POV Owner",
      "email": "owner@povgaming.com",
      "role": "owner"
    }
  }
}
```

---

## Side Effects

Create:

```text
Access Token Cookie

Refresh Token Cookie
```

---

## Audit Event

```text
USER_LOGIN
```

---

# 25. Logout API

## Endpoint

```http
POST /api/v1/auth/logout
```

---

## Authentication

Required

---

## Request Body

```json
{}
```

---

## Success Response

```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## Actions

```text
Clear Access Token

Clear Refresh Token

Invalidate Session
```

---

## Audit Event

```text
USER_LOGOUT
```

---

# 26. Refresh Token API

## Endpoint

```http
POST /api/v1/auth/refresh-token
```

---

## Authentication

Refresh Token Cookie

---

## Request Body

```json
{}
```

---

## Success Response

```json
{
  "success": true,
  "message": "Token refreshed"
}
```

---

## Error Codes

```text
INVALID_REFRESH_TOKEN

REFRESH_TOKEN_EXPIRED

SESSION_REVOKED
```

---

# 27. Current User API

## Endpoint

```http
GET /api/v1/auth/me
```

---

## Authentication

Required

---

## Success Response

```json
{
  "success": true,
  "data": {
    "id": "64abc123",
    "userCode": "USR-000001",
    "name": "POV Owner",
    "email": "owner@povgaming.com",
    "role": "owner",
    "permissions": ["*"]
  }
}
```

---

# 28. Change Password API

## Endpoint

```http
POST /api/v1/auth/change-password
```

---

## Authentication

Required

---

## Request Body

```json
{
  "currentPassword": "OldPassword@123",
  "newPassword": "NewPassword@123",
  "confirmPassword": "NewPassword@123"
}
```

---

## Validation Rules

### currentPassword

Required

---

### newPassword

Required

Minimum:

```text
12 characters
```

Must contain:

```text
1 uppercase
1 lowercase
1 number
1 special character
```

---

### confirmPassword

Must match:

```text
newPassword
```

---

## Business Rules

Current password must match.

New password must not equal current password.

---

## Success Response

```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

---

## Audit Event

```text
PASSWORD_CHANGED
```

---

# 29. User Management Module

## Purpose

Manage administrative users.

---

## Supported Roles

```text
owner
manager
```

---

# 30. Create User API

## Endpoint

```http
POST /api/v1/users
```

---

## Permission Required

```text
users.create
```

---

## Allowed Roles

```text
owner
```

Only.

---

## Request Body

```json
{
  "name": "John Manager",
  "email": "john@povgaming.com",
  "role": "manager"
}
```

---

## Validation Rules

### name

Required

Maximum:

```text
100 characters
```

---

### email

Required

Unique

---

### role

Allowed values:

```text
owner
manager
```

---

## Business Rules

Only Owners may create users.

Temporary password generated automatically.

User must change password after first login.

---

## Success Response

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "userId": "64abc123",
    "userCode": "USR-000007"
  }
}
```

---

## Audit Event

```text
USER_CREATED
```

---

# 31. List Users API

## Endpoint

```http
GET /api/v1/users
```

---

## Permission

```text
users.view
```

---

## Query Parameters

```http
?page=1
&limit=25
&role=manager
&isActive=true
```

---

## Success Response

```json
{
  "success": true,
  "data": [],
  "meta": {}
}
```

---

# 32. Get User Details API

## Endpoint

```http
GET /api/v1/users/:userId
```

---

## Permission

```text
users.view
```

---

## Success Response

```json
{
  "success": true,
  "data": {
    "id": "64abc123",
    "userCode": "USR-000007",
    "name": "John Manager",
    "email": "john@povgaming.com",
    "role": "manager",
    "isActive": true
  }
}
```

---

# 33. Update User API

## Endpoint

```http
PATCH /api/v1/users/:userId
```

---

## Permission

```text
users.update
```

---

## Allowed Roles

```text
owner
```

Only.

---

## Request Body

```json
{
  "name": "Updated Name",
  "role": "manager",
  "version": 3
}
```

---

## Allowed Updates

```text
name

role

isActive
```

---

## Prohibited Updates

```text
userCode

createdAt

createdBy
```

---

## Concurrency Requirement

Version must match current version.

Failure:

```text
VERSION_CONFLICT
```

---

## Audit Event

```text
USER_UPDATED
```

---

# 34. Disable User API

## Endpoint

```http
DELETE /api/v1/users/:userId
```

---

## Permission

```text
users.disable
```

---

## Allowed Roles

```text
owner
```

Only.

---

## Soft Delete Action

```json
{
  "isDeleted": true,
  "deletedAt": "2026-07-15T10:00:00.000Z",
  "deletedBy": "64abc123"
}
```

---

## Business Rules

### Self Disable Prohibited

Users cannot disable themselves.

---

### Last Owner Protection

The final active owner cannot be disabled.

---

## Audit Event

```text
USER_DISABLED
```

---

# 35. Role APIs

## Purpose

Retrieve system role definitions.

---

# 36. Get Roles API

## Endpoint

```http
GET /api/v1/roles
```

---

## Permission

```text
users.view
```

---

## Success Response

```json
{
  "success": true,
  "data": [
    {
      "role": "owner",
      "permissions": ["*"]
    },
    {
      "role": "manager",
      "permissions": [
        "customers.create",
        "customers.update",
        "customers.view",

        "bookings.create",
        "bookings.update",
        "bookings.cancel",
        "bookings.checkin",
        "bookings.complete",

        "payments.view",
        "payments.verify",

        "credits.create",
        "credits.redeem",
        "credits.view",

        "reports.view"
      ]
    }
  ]
}
```

---

# 37. Permission APIs

## Purpose

Expose available permissions.

---

# 38. Get Permissions API

## Endpoint

```http
GET /api/v1/permissions
```

---

## Permission

```text
users.view
```

---

## Success Response

```json
{
  "success": true,
  "data": [
    "users.create",
    "users.update",
    "users.disable",

    "customers.create",
    "customers.update",
    "customers.view",

    "bookings.create",
    "bookings.update",
    "bookings.cancel",

    "payments.verify",

    "credits.create",
    "credits.redeem",

    "settings.update"
  ]
}
```

---

# 39. Account Lockout Standards

## Failed Login Threshold

```text
5 attempts
```

---

## Lockout Duration

```text
15 minutes
```

---

## Audit Event

```text
ACCOUNT_LOCKED
```

---

# 40. Session Management Standards

## Phase 1

JWT-based sessions only.

---

## Phase 2

Introduce:

```text
userSessions
```

collection.

---

## Session Metadata

```javascript
{
  userId,
  device,
  browser,
  ipAddress,
  loginAt,
  lastActivityAt
}
```

---

# 41. Authentication Error Catalog

```text
INVALID_CREDENTIALS

ACCOUNT_DISABLED

ACCOUNT_LOCKED

UNAUTHORIZED

FORBIDDEN

INVALID_REFRESH_TOKEN

REFRESH_TOKEN_EXPIRED

SESSION_REVOKED

USER_NOT_FOUND

EMAIL_ALREADY_EXISTS

VERSION_CONFLICT
```

---

# 42. Authentication & Authorization Principles

1. Authentication and authorization are separate concerns.
2. Roles own permissions.
3. Users inherit permissions from roles.
4. Custom user permissions are not supported in Phase 1.
5. User records are never physically deleted.
6. Administrative actions are auditable.
7. Sessions are revocable.
8. Passwords are never stored in plaintext.
9. At least one active Owner must always exist.
10. Concurrency conflicts must be detected before updates are applied.

---

# 43. Next Section

Part 3 will define:

```text
Customer APIs
Customer Search APIs
Customer Profile APIs
Customer Notes APIs
Customer Tags APIs
Customer Metrics APIs
Customer History APIs
```

including:

* Endpoint Definitions
* Request Schemas
* Response Schemas
* Validation Rules
* Business Rules
* Permissions
* Audit Requirements

# 03_API_SPECIFICATION.md

# PART 3 — CUSTOMER APIS

Version: 1.0

Status: Approved

Document Type: Authoritative API Contract

---

# 44. Customer Module Overview

## 44.1 Purpose

The Customer Module manages:

* Customer Profiles
* Customer Search
* Customer History
* Customer Notes
* Customer Tags
* Customer Metrics
* Customer Status
* Customer Relationships To Bookings, Payments & Credits

---

## 44.2 Business Importance

Customers are first-class business entities.

The Customer Module serves as the foundation for:

```text
Bookings
Payments
Credits
Customer Analytics
Customer Lifetime Value
No Show Tracking
Future Loyalty Programs
Future Marketing Campaigns
```

---

## 44.3 Customer Identification

### Primary Identifier

```text
customerId
```

---

### Human Readable Identifier

```text
customerCode
```

Example:

```text
CUST-000001
```

---

### Primary Matching Key

```text
mobile
```

---

### Secondary Matching Keys

```text
whatsappNumber

customerAccountId (Future)
```

---

## 44.4 Customer Creation Strategy

### Manager Created

Customers may be created manually.

---

### Booking Created

If a booking is submitted using a mobile number that does not exist:

```text
Automatically Create Customer
```

---

### Customer Self Registration

Future Phase.

---

# 45. Create Customer API

## Endpoint

```http
POST /api/v1/customers
```

---

## Permission Required

```text
customers.create
```

---

## Request Body

```json
{
  "name": "Rahul Sharma",
  "mobile": "9876543210",
  "whatsappNumber": "9876543210"
}
```

---

## Validation Rules

### name

Required

Minimum:

```text
2 characters
```

Maximum:

```text
100 characters
```

---

### mobile

Required

Valid Indian mobile number

Must be unique among active customers

---

### whatsappNumber

Optional

Must be valid mobile number if supplied

---

## Business Rules

### Mobile Uniqueness

Only one active customer per mobile number.

---

### Customer Code Generation

Automatically generated.

Example:

```text
CUST-000001
```

---

### Search Name Generation

Automatically generate:

```text
customerSearchName
```

Example:

```text
rahulsharma
```

Used for search optimization.

---

## Success Response

```json
{
  "success": true,
  "message": "Customer created successfully",
  "data": {
    "customerId": "64abc123",
    "customerCode": "CUST-000001"
  }
}
```

---

## Audit Event

```text
CUSTOMER_CREATED
```

---

# 46. List Customers API

## Endpoint

```http
GET /api/v1/customers
```

---

## Permission

```text
customers.view
```

---

## Query Parameters

```http
?page=1
&limit=25
&search=rahul
&status=active
&tag=VIP
```

---

## Search Fields

```text
customerCode
name
customerSearchName
mobile
whatsappNumber
```

---

## Sort Fields

```text
createdAt
updatedAt
lastVisitDate
lifetimeValue
```

---

## Success Response

```json
{
  "success": true,
  "data": [],
  "meta": {}
}
```

---

# 47. Customer Search API

## Endpoint

```http
GET /api/v1/customers/search
```

---

## Permission

```text
customers.view
```

---

## Query Parameters

```http
?q=9876543210
```

---

## Search Scope

```text
customerCode
name
customerSearchName
mobile
whatsappNumber
```

---

## Maximum Results

```text
20
```

---

## Intended Usage

Optimized for:

```text
Booking Form
Payment Form
Customer Lookup
Walk-In Booking Flow
```

---

# 48. Get Customer Details API

## Endpoint

```http
GET /api/v1/customers/:customerId
```

---

## Permission

```text
customers.view
```

---

## Success Response

```json
{
  "success": true,
  "data": {
    "customerId": "64abc123",
    "customerCode": "CUST-000001",
    "name": "Rahul Sharma",
    "mobile": "9876543210",
    "whatsappNumber": "9876543210",
    "status": "active",
    "tags": [],
    "metrics": {}
  }
}
```

---

# 49. Update Customer API

## Endpoint

```http
PATCH /api/v1/customers/:customerId
```

---

## Permission

```text
customers.update
```

---

## Request Body

```json
{
  "name": "Rahul S Sharma",
  "whatsappNumber": "9876543210",
  "version": 2
}
```

---

## Allowed Updates

```text
name
whatsappNumber
status
```

---

## Prohibited Updates

```text
customerCode
createdAt
createdBy
```

---

## Concurrency Control

Version must match.

Failure:

```text
VERSION_CONFLICT
```

---

## Audit Event

```text
CUSTOMER_UPDATED
```

---

# 50. Disable Customer API

## Endpoint

```http
DELETE /api/v1/customers/:customerId
```

---

## Permission

```text
customers.update
```

---

## Action

Soft delete only.

```json
{
  "isDeleted": true,
  "deletedAt": "2026-07-15T10:00:00.000Z",
  "deletedBy": "64abc123"
}
```

---

## Business Rules

Historical data remains intact.

The following remain untouched:

```text
Bookings
Payments
Credits
Audit Logs
```

---

## Audit Event

```text
CUSTOMER_DISABLED
```

---

# 51. Customer Notes Module

## Purpose

Store internal staff notes.

Notes are never visible to customers.

---

# 52. Add Customer Note API

## Endpoint

```http
POST /api/v1/customers/:customerId/notes
```

---

## Permission

```text
customers.update
```

---

## Request Body

```json
{
  "note": "Frequent FIFA player."
}
```

---

## Validation Rules

Maximum:

```text
1000 characters
```

---

## Audit Event

```text
CUSTOMER_NOTE_ADDED
```

---

# 53. List Customer Notes API

## Endpoint

```http
GET /api/v1/customers/:customerId/notes
```

---

## Permission

```text
customers.view
```

---

# 54. Customer Tag Module

## Purpose

Categorize customers.

---

## Design Decision

Customer tags shall be dynamic.

Tags shall NOT be hardcoded.

Tags are managed through:

```text
customerTags Collection
```

---

## Default Seed Tags

System creates:

```text
VIP

REGULAR

HIGH_SPENDER

NO_SHOW_RISK

STAFF_REFERENCE
```

during installation.

---

# 55. List Customer Tags API

## Endpoint

```http
GET /api/v1/customer-tags
```

---

## Permission

```text
customers.view
```

---

# 56. Create Customer Tag API

## Endpoint

```http
POST /api/v1/customer-tags
```

---

## Permission

```text
settings.update
```

Owner only.

---

## Request Body

```json
{
  "name": "TOURNAMENT_PLAYER"
}
```

---

## Business Rules

Tag names must be unique.

---

## Audit Event

```text
CUSTOMER_TAG_CREATED
```

---

# 57. Update Customer Tag API

## Endpoint

```http
PATCH /api/v1/customer-tags/:tagId
```

---

## Permission

```text
settings.update
```

Owner only.

---

# 58. Disable Customer Tag API

## Endpoint

```http
DELETE /api/v1/customer-tags/:tagId
```

---

## Permission

```text
settings.update
```

Owner only.

---

## Business Rules

Existing customer tag assignments remain untouched.

Tag becomes unavailable for future assignment.

---

# 59. Assign Customer Tag API

## Endpoint

```http
POST /api/v1/customers/:customerId/tags
```

---

## Permission

```text
customers.update
```

---

## Request Body

```json
{
  "tagId": "64abc123"
}
```

---

## Audit Event

```text
CUSTOMER_TAG_ASSIGNED
```

---

# 60. Remove Customer Tag API

## Endpoint

```http
DELETE /api/v1/customers/:customerId/tags/:tagId
```

---

## Permission

```text
customers.update
```

---

## Audit Event

```text
CUSTOMER_TAG_REMOVED
```

---

# 61. Customer Metrics API

## Endpoint

```http
GET /api/v1/customers/:customerId/metrics
```

---

## Permission

```text
customers.view
```

---

## Metrics Returned

```json
{
  "totalBookings": 42,
  "completedBookings": 39,
  "cancelledBookings": 2,
  "noShows": 1,
  "lifetimeValue": 12450,
  "averageSpend": 296,
  "totalCreditsIssued": 500,
  "totalCreditsRedeemed": 300,
  "lastVisitDate": "2026-07-15"
}
```

---

## Calculation Source

Metrics shall be calculated from:

```text
Bookings
Payments
Credits
```

---

# 62. Customer Booking History API

## Endpoint

```http
GET /api/v1/customers/:customerId/bookings
```

---

## Permission

```text
customers.view
```

---

## Pagination

Standard pagination rules apply.

---

# 63. Customer Payment History API

## Endpoint

```http
GET /api/v1/customers/:customerId/payments
```

---

## Permission

```text
customers.view
```

---

# 64. Customer Credit History API

## Endpoint

```http
GET /api/v1/customers/:customerId/credits
```

---

## Permission

```text
customers.view
```

---

# 65. Future Customer Account APIs

## Phase 2

Introduce:

```http
POST /api/v1/customer-auth/register

POST /api/v1/customer-auth/login

POST /api/v1/customer-auth/logout

GET /api/v1/customer-auth/me
```

---

## Purpose

Support:

```text
Self-Service Bookings
Booking History
Credit Balance Viewing
Loyalty Programs
Marketing Preferences
```

---

# 66. Customer Error Catalog

```text
CUSTOMER_NOT_FOUND

CUSTOMER_ALREADY_EXISTS

INVALID_MOBILE_NUMBER

INVALID_WHATSAPP_NUMBER

INVALID_TAG

VERSION_CONFLICT

CUSTOMER_DISABLED
```

---

# 67. Customer Module Design Principles

1. Customers are first-class business entities.
2. Mobile number is the primary customer identifier.
3. Customer history is never deleted.
4. Customer metrics are derived from transactional data.
5. Customer notes are internal-only.
6. Tags are dynamic and configurable.
7. Customer accounts are optional in Phase 1.
8. Customer data must remain auditable.
9. Soft deletion is mandatory.
10. Customer lifetime value is a core business metric.

---

# 68. Next Section

Part 4 will define:

```text
Booking APIs
Availability APIs
Console Assignment APIs
Walk-In Booking APIs
Booking Lifecycle APIs
Check-In APIs
Completion APIs
Cancellation APIs
No Show APIs
```

including:

* Automatic Console Assignment
* Dynamic Pricing Resolution
* Deposit Calculation
* Walk-In Booking Rules
* Online Booking Rules
* Buffer Time Enforcement
* No Show Handling
* Booking State Machine
* Availability Calculation Rules
* Console Utilization Logic

# 03_API_SPECIFICATION.md

# PART 4A — BOOKING DOMAIN MODEL, LIFECYCLE & AUDIT SPECIFICATION

Version: 1.0

Status: APPROVED

Document Type: AUTHORITATIVE API CONTRACT

Parent Module: Booking Management

---

# 69. Purpose

This document defines the authoritative booking domain model used throughout the platform.

This specification governs:

* Booking Entity Structure
* Booking Lifecycle
* Booking Status Management
* Booking Metadata
* Booking Snapshots
* Audit Requirements
* Historical Data Preservation
* Booking Locking Rules
* Soft Delete Rules
* Booking Versioning Rules
* Booking Activity Tracking

This document does not define API endpoints.

Endpoints are defined in Part 4B.

---

# 70. Booking Domain Principles

## 70.1 Customer Never Chooses Console

Console assignment shall be fully automatic.

Customers shall never select:

* Console Number
* Console ID
* Console Location

System shall determine assignment.

---

## 70.2 Mobile Number Is Primary Identity

Customer identity shall be determined using:

```text
mobile
```

Customer name shall never be used for identity matching.

---

## 70.3 Unified Booking Engine

The same booking engine shall be used for:

```text
ONLINE

WALK_IN
```

No separate booking logic shall exist.

---

## 70.4 Immutable Historical Records

Historical bookings must remain unchanged even if:

* Pricing changes
* Deposit rules change
* Booking buffers change
* Operating hours change
* Console counts change
* Payment expiry rules change

---

## 70.5 Snapshot-Based Architecture

Historical calculations shall always use booking snapshots.

System settings must never be used to recalculate historical bookings.

---

# 71. Booking Sources

## 71.1 Supported Sources

```text
ONLINE

WALK_IN
```

---

## 71.2 Source Definitions

### ONLINE

Created through public booking website.

### WALK_IN

Created by authenticated staff.

---

# 72. Booking Status Model

## 72.1 Supported Statuses

```text
PENDING_PAYMENT

PENDING_VERIFICATION

CONFIRMED

CHECKED_IN

COMPLETED

CANCELLED

NO_SHOW

PAYMENT_EXPIRED
```

---

## 72.2 Status Definitions

### PENDING_PAYMENT

Booking exists.

Payment not yet submitted.

---

### PENDING_VERIFICATION

Payment proof submitted.

Awaiting verification.

---

### CONFIRMED

Payment verified.

Console reserved.

---

### CHECKED_IN

Customer has arrived.

Session has started.

---

### COMPLETED

Session completed successfully.

---

### CANCELLED

Booking manually cancelled.

---

### NO_SHOW

Customer failed to arrive within configured grace period.

---

### PAYMENT_EXPIRED

Customer failed to complete deposit payment within configured payment window.

Reservation automatically released.

---

# 73. Booking Lifecycle

## 73.1 Primary Flow

```text
PENDING_PAYMENT
        ↓
PENDING_VERIFICATION
        ↓
CONFIRMED
        ↓
CHECKED_IN
        ↓
COMPLETED
```

---

## 73.2 Payment Expiry Flow

```text
PENDING_PAYMENT
        ↓
PAYMENT_EXPIRED
```

---

## 73.3 Cancellation Flow

```text
CONFIRMED
        ↓
CANCELLED
```

---

## 73.4 No Show Flow

```text
CONFIRMED
        ↓
NO_SHOW
```

---

# 74. Booking Entity

## 74.1 Core Fields

```json
{
  "_id": "ObjectId",

  "bookingCode": "BOOK-000001",

  "customerId": "ObjectId",

  "consoleId": "ObjectId",

  "status": "CONFIRMED",

  "source": "ONLINE"
}
```

---

## 74.2 Timeline Fields

```json
{
  "visitDate": "2026-08-15",

  "startTime": "18:00",

  "endTime": "19:00",

  "startDateTime": "2026-08-15T18:00:00Z",

  "endDateTime": "2026-08-15T19:00:00Z",

  "durationMinutes": 60
}
```

These fields shall be stored explicitly.

System shall not calculate them dynamically during reporting.

---

## 74.3 Player Information

```json
{
  "numberOfPlayers": 3
}
```

---

# 75. Booking Source Metadata

## 75.1 Purpose

Track how the booking was created.

Support:

* Reporting
* Audit
* Staff Accountability

---

## 75.2 Structure

```json
{
  "bookingSourceMetadata": {
    "source": "ONLINE",

    "createdBy": null,

    "deviceType": "mobile"
  }
}
```

---

## 75.3 Walk-In Example

```json
{
  "bookingSourceMetadata": {
    "source": "WALK_IN",

    "createdBy": "managerId"
  }
}
```

---

# 76. Pricing Snapshot

## 76.1 Purpose

Preserve historical pricing.

---

## 76.2 Structure

```json
{
  "pricingSnapshot": {
    "pricePerPerson": 60,

    "depositType": "PERCENTAGE",

    "depositValue": 25,

    "bookingBufferMinutes": 15,

    "paymentExpiryMinutes": 30
  }
}
```

---

## 76.3 Immutability Rule

Pricing Snapshot shall never be modified after booking creation.

---

# 77. Financial Snapshot

## 77.1 Purpose

Preserve historical financial calculations.

---

## 77.2 Structure

```json
{
  "bookingFinancials": {
    "subtotal": 180,

    "depositAmount": 45,

    "remainingAmount": 135
  }
}
```

---

## 77.3 Immutability Rule

Financial Snapshot shall never be modified after booking creation.

---

# 78. Deposit Status Model

## 78.1 Purpose

Payment state must be independent from booking state.

---

## 78.2 Supported Values

```text
UNPAID

SUBMITTED

VERIFIED

REJECTED

REFUNDED
```

---

## 78.3 Example

```json
{
  "depositStatus": "VERIFIED"
}
```

---

# 79. Console Snapshot

## 79.1 Purpose

Preserve historical console assignment.

---

## 79.2 Structure

```json
{
  "assignedConsoleNumber": 2
}
```

---

## 79.3 Rule

Historical console numbers shall not change even if console records change later.

---

# 80. Booking Versioning

## 80.1 Purpose

Support optimistic locking.

Prevent concurrent update conflicts.

---

## 80.2 Structure

```json
{
  "version": 1
}
```

---

## 80.3 Version Increment Rule

Version shall increment on every update.

---

## 80.4 Conflict Response

System shall return:

```text
VERSION_CONFLICT
```

when stale data is submitted.

---

# 81. Booking Notes

## 81.1 Staff Notes

```json
{
  "staffNotes": [
    {
      "note": "Customer requested extra controller",
      "createdBy": "managerId",
      "createdAt": "timestamp"
    }
  ]
}
```

---

## 81.2 System Notes

```json
{
  "systemNotes": [
    {
      "note": "Payment Verified",
      "createdAt": "timestamp"
    }
  ]
}
```

---

## 81.3 Separation Rule

Staff Notes and System Notes shall be stored separately.

---

# 82. Booking Activity Timeline

## 82.1 Purpose

Maintain complete lifecycle history.

---

## 82.2 Structure

```json
{
  "activities": [
    {
      "event": "BOOKING_CREATED",
      "timestamp": "..."
    }
  ]
}
```

---

## 82.3 Supported Events

```text
BOOKING_CREATED

PAYMENT_SUBMITTED

PAYMENT_VERIFIED

PAYMENT_REJECTED

CHECKED_IN

COMPLETED

CANCELLED

NO_SHOW

PAYMENT_EXPIRED
```

---

# 83. Operational Metadata

## 83.1 Check-In Metadata

```json
{
  "checkedInAt": null
}
```

---

## 83.2 Completion Metadata

```json
{
  "completedAt": null
}
```

---

## 83.3 Cancellation Metadata

```json
{
  "cancelledAt": null,

  "cancelledBy": null,

  "cancellationReason": null
}
```

---

## 83.4 No Show Metadata

```json
{
  "noShowAt": null,

  "noShowMarkedBy": null
}
```

---

# 84. Staff Override Support

## 84.1 Purpose

Allow authorized staff to bypass specific business validations.

---

## 84.2 Structure

```json
{
  "staffOverride": false
}
```

---

## 84.3 Audit Requirement

Every override action must generate:

```text
STAFF_OVERRIDE_USED
```

audit event.

---

# 85. Booking Modification Tracking

## 85.1 Structure

```json
{
  "lastModifiedAt": "timestamp",

  "lastModifiedBy": "userId"
}
```

---

## 85.2 Update Rule

Every booking modification shall update these fields.

---

# 86. Booking Locking

## 86.1 Structure

```json
{
  "isLocked": false
}
```

---

## 86.2 Lock Conditions

Bookings shall automatically lock when status becomes:

```text
COMPLETED

CANCELLED

NO_SHOW
```

---

## 86.3 Locked Booking Rule

Locked bookings cannot be edited.

---

# 87. Soft Delete Model

## 87.1 Structure

```json
{
  "isDeleted": false,

  "deletedAt": null
}
```

---

## 87.2 Rule

Bookings shall never be physically deleted.

---

## 87.3 Query Rule

Standard queries must exclude deleted records.

---

# 88. Payment Expiry Tracking

## 88.1 Structure

```json
{
  "paymentExpiresAt": "2026-08-15T17:30:00Z"
}
```

---

## 88.2 Purpose

Avoid recalculating payment expiry.

---

## 88.3 Expiry Rule

Generated at booking creation time.

---

# 89. Audit Requirements

## 89.1 Mandatory Audit Events

```text
BOOKING_CREATED

BOOKING_UPDATED

BOOKING_CANCELLED

BOOKING_COMPLETED

BOOKING_CHECKED_IN

BOOKING_NO_SHOW

PAYMENT_SUBMITTED

PAYMENT_VERIFIED

PAYMENT_REJECTED

PAYMENT_EXPIRED

STAFF_OVERRIDE_USED
```

---

## 89.2 Audit Retention

Audit records shall never be deleted.

---

# 90. Permission Dependencies

The Booking Module depends on the Permissions Matrix.

Example permissions:

```text
bookings.create

bookings.view

bookings.update

bookings.cancel

bookings.checkin

bookings.complete

payments.verify
```

---

# 91. Design Principles

1. Mobile number is the primary customer identifier.
2. Customers never choose consoles.
3. Console assignment is automatic.
4. Historical bookings are immutable.
5. Pricing snapshots are mandatory.
6. Financial snapshots are mandatory.
7. Deposit status is independent from booking status.
8. Auditability is mandatory.
9. Versioning is mandatory.
10. Soft deletes are mandatory.
11. Booking history shall never be lost.
12. Financial data shall never be recalculated from current settings.

---

# 92. Next Section

Part 4B defines:

* Availability APIs
* Booking Creation APIs
* Walk-In Booking APIs
* Booking Management APIs
* Check-In APIs
* Completion APIs
* Cancellation APIs
* No Show APIs
* Payment Expiry APIs
* Timeline APIs
* Booking Metrics APIs
* Booking Error Catalog

# 03_API_SPECIFICATION.md

# PART 4B — BOOKING API ENDPOINT SPECIFICATION

Version: 1.0

Status: APPROVED

Document Type: AUTHORITATIVE API CONTRACT

Parent Module: Booking Management

Depends On:

* Part 4A — Booking Domain Model
* Permissions Matrix
* Audit Framework
* Settings Module

---

# 93. API Design Standards

## Base Route

```http
/api/v1/bookings
```

---

## Authentication Types

### Public

No authentication required.

### Authenticated

Requires valid JWT access token.

---

## Standard Success Response

```json
{
  "success": true,
  "data": {}
}
```

---

## Standard Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message"
  }
}
```

---

# 94. Availability API

## Endpoint

```http
GET /api/v1/bookings/availability
```

---

## Authentication

Public

---

## Purpose

Determine whether a booking slot is available.

---

## Query Parameters

```http
?visitDate=2026-08-15
&startTime=18:00
&durationMinutes=60
```

---

## Validation Rules

### visitDate

Required

Format:

```text
YYYY-MM-DD
```

---

### startTime

Required

Format:

```text
HH:mm
```

---

### durationMinutes

Required

Allowed:

```text
30
60
90
120
```

---

## Business Workflow

System shall:

1. Load active consoles
2. Load booking buffer
3. Calculate booking window
4. Apply booking buffer
5. Detect overlaps
6. Count available consoles

---

## Success Response

```json
{
  "success": true,
  "data": {
    "available": true,
    "availableConsoles": 2
  }
}
```

---

# 95. Create Online Booking API

## Endpoint

```http
POST /api/v1/bookings
```

---

## Authentication

Public

---

## Idempotency

Required

Header:

```http
Idempotency-Key: UUID
```

---

## Request Body

```json
{
  "mobile": "9876543210",
  "customerName": "Rahul Sharma",
  "whatsappNumber": "9876543210",

  "visitDate": "2026-08-15",
  "startTime": "18:00",

  "durationMinutes": 60,
  "numberOfPlayers": 3
}
```

---

## Validation Rules

### Mobile

Required

Must be valid Indian mobile number.

---

### Customer Name

Required

Minimum:

```text
2 characters
```

Maximum:

```text
100 characters
```

---

### Number Of Players

Allowed:

```text
1
2
3
4
```

---

### Duration

Allowed:

```text
30
60
90
120
```

---

## Business Workflow

### Step 1

Resolve customer using mobile number.

---

### Step 2

Validate customer status.

Blocked statuses:

```text
BLOCKED
BLACKLISTED
```

---

### Step 3

Check availability.

---

### Step 4

Assign console automatically.

Assignment strategy:

```text
Lowest Available Console
```

---

### Step 5

Load settings.

Retrieve:

```text
Pricing
Deposit Rules
Booking Buffer
Payment Expiry
```

---

### Step 6

Generate:

```text
Pricing Snapshot
Financial Snapshot
Payment Expiry Timestamp
```

---

### Step 7

Create booking.

Initial status:

```text
PENDING_PAYMENT
```

Deposit status:

```text
UNPAID
```

---

### Step 8

Create audit event.

---

## Success Response

```json
{
  "success": true,
  "data": {
    "bookingId": "BOOK_ID",
    "bookingCode": "BOOK-000001",

    "status": "PENDING_PAYMENT",

    "depositStatus": "UNPAID",

    "paymentExpiresAt": "2026-08-15T17:30:00Z"
  }
}
```

---

# 96. Create Walk-In Booking API

## Endpoint

```http
POST /api/v1/bookings/walk-in
```

---

## Authentication

Required

---

## Permission

```text
bookings.create
```

---

## Request Body

```json
{
  "mobile": "9876543210",

  "customerName": "Rahul Sharma",

  "visitDate": "2026-08-15",

  "startTime": "18:00",

  "durationMinutes": 60,

  "numberOfPlayers": 2
}
```

---

## Business Workflow

Uses same booking engine as online booking.

Differences:

```text
Deposit Not Required

Initial Status = CONFIRMED

Deposit Status = VERIFIED
```

---

## Audit Event

```text
WALKIN_BOOKING_CREATED
```

---

# 97. Get Booking Details API

## Endpoint

```http
GET /api/v1/bookings/:bookingId
```

---

## Authentication

Required

---

## Permission

```text
bookings.view
```

---

## Success Response

Returns complete booking document.

Including:

```text
Snapshots

Activities

Notes

Metadata
```

---

# 98. Booking List API

## Endpoint

```http
GET /api/v1/bookings
```

---

## Authentication

Required

---

## Permission

```text
bookings.view
```

---

## Filters

```http
?status=CONFIRMED

?customerId=...

?consoleId=...

?visitDate=...

?source=ONLINE

?source=WALK_IN
```

---

## Sorting

```http
?sortBy=startDateTime

?sortOrder=asc
```

---

## Pagination

```http
?page=1

&pageSize=20
```

---

# 99. Submit Payment Proof API

## Endpoint

```http
PATCH /api/v1/bookings/:bookingId/payment-proof
```

---

## Authentication

Public

---

## Allowed Booking Status

```text
PENDING_PAYMENT
```

---

## Request Body

```json
{
  "utrNumber": "123456789012",

  "paymentScreenshotUrl": "optional"
}
```

---

## Business Workflow

### Update Deposit Status

```text
SUBMITTED
```

---

### Update Booking Status

```text
PENDING_VERIFICATION
```

---

### Create Activity

```text
PAYMENT_SUBMITTED
```

---

### Notify Staff

Enabled channels:

```text
Telegram

Email
```

---

# 100. Verify Payment API

## Endpoint

```http
PATCH /api/v1/bookings/:bookingId/verify-payment
```

---

## Authentication

Required

---

## Permission

```text
payments.verify
```

---

## Allowed Status

```text
PENDING_VERIFICATION
```

---

## Business Workflow

### Update Deposit Status

```text
VERIFIED
```

---

### Update Booking Status

```text
CONFIRMED
```

---

### Create Ledger Entry

```text
DEPOSIT_RECEIVED
```

---

### Create Audit Event

```text
PAYMENT_VERIFIED
```

---

### Notify Customer

Enabled providers:

```text
SMS

WhatsApp

Email
```

---

# 101. Reject Payment API

## Endpoint

```http
PATCH /api/v1/bookings/:bookingId/reject-payment
```

---

## Permission

```text
payments.verify
```

---

## Business Workflow

### Deposit Status

```text
REJECTED
```

---

### Booking Status

```text
PENDING_PAYMENT
```

---

### Audit Event

```text
PAYMENT_REJECTED
```

---

# 102. Check-In API

## Endpoint

```http
PATCH /api/v1/bookings/:bookingId/check-in
```

---

## Permission

```text
bookings.checkin
```

---

## Allowed Status

```text
CONFIRMED
```

---

## Business Workflow

Update:

```text
Status

checkedInAt
```

---

## Result

```text
CHECKED_IN
```

---

# 103. Complete Booking API

## Endpoint

```http
PATCH /api/v1/bookings/:bookingId/complete
```

---

## Permission

```text
bookings.complete
```

---

## Allowed Status

```text
CHECKED_IN
```

---

## Business Workflow

Update:

```text
completedAt
```

---

## Result

```text
COMPLETED
```

---

## Lock Booking

```text
isLocked = true
```

---

# 104. Cancel Booking API

## Endpoint

```http
PATCH /api/v1/bookings/:bookingId/cancel
```

---

## Permission

```text
bookings.cancel
```

---

## Request Body

```json
{
  "reason": "Customer requested cancellation"
}
```

---

## Business Workflow

Populate:

```text
cancelledAt

cancelledBy

cancellationReason
```

---

## Result

```text
CANCELLED
```

---

## Lock Booking

```text
isLocked = true
```

---

# 105. Mark No Show API

## Endpoint

```http
PATCH /api/v1/bookings/:bookingId/no-show
```

---

## Permission

```text
bookings.update
```

---

## Business Workflow

Populate:

```text
noShowAt

noShowMarkedBy
```

---

### Increment

```text
customer.noShowCount
```

---

## Result

```text
NO_SHOW
```

---

## Lock Booking

```text
isLocked = true
```

---

# 106. Payment Expiry Job

## Internal Endpoint

```http
PATCH /internal/bookings/expire-payment
```

---

## Authentication

Internal System Only

---

## Purpose

Release abandoned reservations.

---

## Selection Criteria

```text
Status = PENDING_PAYMENT

Current Time > paymentExpiresAt
```

---

## Actions

Update:

```text
Status = PAYMENT_EXPIRED

Deposit Status = UNPAID
```

---

## Audit Event

```text
PAYMENT_EXPIRED
```

---

# 107. Booking Timeline API

## Endpoint

```http
GET /api/v1/bookings/timeline
```

---

## Permission

```text
bookings.view
```

---

## Query Parameters

```http
?visitDate=2026-08-15
```

---

## Purpose

Provide timeline visualization data.

---

# 108. Booking Metrics API

## Endpoint

```http
GET /api/v1/bookings/metrics
```

---

## Permission

```text
reports.view
```

---

## Response

```json
{
  "totalBookings": 500,

  "confirmedBookings": 120,

  "completedBookings": 340,

  "cancelledBookings": 20,

  "noShows": 15,

  "paymentExpired": 5,

  "occupancyRate": 78.5
}
```

---

# 109. Staff Override API

## Endpoint

```http
PATCH /api/v1/bookings/:bookingId/staff-override
```

---

## Permission

```text
bookings.override
```

---

## Request Body

```json
{
  "reason": "Owner approved manual override"
}
```

---

## Result

```text
staffOverride = true
```

---

## Audit Event

```text
STAFF_OVERRIDE_USED
```

---

# 110. Error Catalog

```text
BOOKING_NOT_FOUND

NO_CONSOLE_AVAILABLE

INVALID_BOOKING_STATUS

CUSTOMER_BLOCKED

CUSTOMER_BLACKLISTED

PAYMENT_NOT_SUBMITTED

PAYMENT_ALREADY_VERIFIED

PAYMENT_ALREADY_REJECTED

PAYMENT_EXPIRED

BOOKING_LOCKED

VERSION_CONFLICT

UNAUTHORIZED

FORBIDDEN

VALIDATION_ERROR
```

---

# 111. Permission Dependencies

## Owner

```text
bookings.*

payments.*

reports.*

settings.*
```

---

## Manager

```text
bookings.create

bookings.view

bookings.update

bookings.checkin

bookings.complete

bookings.cancel

payments.verify
```

Manager shall not have access to:

```text
Financial Reports

Settings Management

User Management
```

---

# 112. Design Constraints

1. Mobile number is the primary customer identity key.
2. Customers never choose consoles.
3. Availability calculations must be deterministic.
4. Historical bookings are immutable.
5. Pricing snapshots are mandatory.
6. Financial snapshots are mandatory.
7. Booking edits require version validation.
8. Financial calculations must not depend on current settings.
9. Audit logging is mandatory.
10. Soft deletes are mandatory.

---

# 113. Part 4 Completion Statement

Part 4A and Part 4B together constitute the complete Booking API Specification.

Booking Domain Status:

```text
FROZEN
```

Future changes require formal change requests.

---

# Next Section

Part 5 — Payments & Financial APIs

Will define:

* Payment Domain Model
* Payment Ledger
* UPI Integration
* Deposit Workflows
* Refund Workflows
* Credit Ledger
* Financial Reporting APIs
* Financial Audit Requirements
* Revenue Reconciliation

# 03_API_SPECIFICATION.md

# PART 5A — PAYMENT DOMAIN MODEL & FINANCIAL ARCHITECTURE

Version: 1.0

Status: APPROVED

Document Type: AUTHORITATIVE API CONTRACT

Parent Module: Financial Management

Depends On:

* Booking Module
* Customer Module
* User Management Module
* Settings Module
* Audit Framework

---

# 114. Purpose

The Payment Module governs:

* Deposits
* Booking Payments
* Remaining Balance Collection
* Refund Processing
* Credit Management
* Financial Ledger Management
* Revenue Tracking
* Reconciliation Support
* Financial Auditing

The financial domain is designed around:

```text
Immutability

Auditability

Traceability

Reconciliation
```

---

# 115. Financial Design Principles

## 115.1 Ledger First Architecture

Revenue shall never be calculated directly from bookings.

All financial reporting shall originate from ledger entries.

---

## 115.2 Immutable Financial Records

Verified financial transactions shall never be edited.

Corrections shall be performed using:

```text
Reversal Entries
```

---

## 115.3 Auditability

Every financial action shall generate:

```text
Audit Event

Ledger Entry
```

---

## 115.4 Double Source Verification

A booking may contain financial snapshots.

However:

```text
Ledger = Source Of Truth
```

for accounting and reporting.

---

## 115.5 Separation Of Concerns

Booking Status:

```text
CONFIRMED
CHECKED_IN
COMPLETED
```

must remain independent from:

```text
Payment Status
Deposit Status
```

---

# 116. Payment Methods

## Phase 1 Supported Methods

```text
UPI
CASH
```

---

## Future Supported Methods

```text
CARD
NET_BANKING
WALLET
```

---

# 117. Payment Status Model

## Supported Values

```text
PENDING

SUBMITTED

VERIFIED

REJECTED

REFUNDED
```

---

## Definitions

### PENDING

Payment not submitted.

---

### SUBMITTED

Customer submitted payment proof.

---

### VERIFIED

Staff verified payment.

---

### REJECTED

Payment proof rejected.

---

### REFUNDED

Payment refunded.

---

# 118. Payment Entity

## Core Structure

```json
{
  "_id": "ObjectId",

  "bookingId": "ObjectId",

  "customerId": "ObjectId",

  "paymentMethod": "UPI",

  "paymentStatus": "VERIFIED",

  "amount": 45,

  "currency": "INR"
}
```

---

# 119. Payment Snapshot

## Purpose

Preserve payment details at verification time.

---

## Structure

```json
{
  "paymentSnapshot": {
    "utrNumber": "123456789012",

    "amount": 45,

    "paymentMethod": "UPI",

    "verifiedAt": "timestamp",

    "verifiedBy": "userId"
  }
}
```

---

## Immutability Rule

Payment Snapshot shall never be edited after verification.

---

# 120. Payment Types

## Supported Types

```text
DEPOSIT

BALANCE

REFUND

CREDIT_REDEMPTION

ADJUSTMENT
```

---

## Definitions

### DEPOSIT

Advance booking payment.

---

### BALANCE

Remaining amount collected after customer arrives.

---

### REFUND

Money returned to customer.

---

### CREDIT_REDEMPTION

Customer credits applied.

---

### ADJUSTMENT

Manual accounting correction.

Owner only.

---

# 121. Financial Ledger

## Purpose

Maintain complete financial history.

---

## Ledger Principles

### Immutable

Ledger entries cannot be edited.

---

### Append Only

New entries may be added.

Existing entries may not change.

---

### Auditable

Every ledger entry must have:

```text
Created By

Created At

Reference Source
```

---

# 122. Ledger Entry Types

## Supported Values

```text
DEPOSIT_RECEIVED

BALANCE_RECEIVED

REFUND_ISSUED

CREDIT_ISSUED

CREDIT_REDEEMED

ADJUSTMENT

REVERSAL
```

---

# 123. Ledger Entry Structure

```json
{
  "_id": "ObjectId",

  "bookingId": "ObjectId",

  "customerId": "ObjectId",

  "paymentId": "ObjectId",

  "entryType": "DEPOSIT_RECEIVED",

  "amount": 45,

  "currency": "INR",

  "createdAt": "timestamp"
}
```

---

# 124. Financial Immutability Rules

## Prohibited Actions

The following fields cannot be edited after verification:

```text
Amount

UTR Number

Payment Method

Booking Link
```

---

## Correction Process

Incorrect transactions require:

```text
REVERSAL Entry
```

followed by:

```text
New Correct Entry
```

---

# 125. Refund Architecture

## Design Goal

Refunds are supported from day one.

Even if currently disabled by business policy.

---

## Refund Statuses

```text
REQUESTED

APPROVED

REJECTED

PROCESSED
```

---

## Refund Record

```json
{
  "amount": 45,

  "reason": "Manual refund",

  "processedBy": "userId"
}
```

---

# 126. Customer Credit System

## Purpose

Store value owed to customer.

---

## Credit Sources

```text
Manual Credits

Promotional Credits

Refund Credits
```

---

## Credit Usage

Credits may be applied to:

```text
Deposit Payments

Balance Payments
```

---

# 127. Customer Credit Ledger

## Credit Ledger Types

```text
CREDIT_ISSUED

CREDIT_REDEEMED

CREDIT_EXPIRED
```

---

## Structure

```json
{
  "customerId": "ObjectId",

  "entryType": "CREDIT_ISSUED",

  "amount": 100
}
```

---

# 128. Revenue Recognition Rules

## Deposit

Recognized when:

```text
Payment Verified
```

---

## Balance

Recognized when:

```text
Balance Payment Verified
```

---

## Refund

Recognized as:

```text
Negative Revenue
```

---

# 129. Financial Audit Requirements

## Mandatory Audit Events

```text
PAYMENT_SUBMITTED

PAYMENT_VERIFIED

PAYMENT_REJECTED

PAYMENT_REFUNDED

CREDIT_ISSUED

CREDIT_REDEEMED

LEDGER_ENTRY_CREATED

REVERSAL_CREATED
```

---

## Audit Retention

Audit records shall never be deleted.

---

# 130. Financial Permissions

## Owner

Allowed:

```text
View Financial Reports

Issue Credits

Approve Refunds

Process Refunds

Configure Financial Settings

Create Adjustments
```

---

## Manager

Allowed:

```text
Verify Payments

View Payments

View Booking Financials
```

---

## Manager Restrictions

Managers shall not:

```text
Issue Credits

Approve Refunds

Create Adjustments

Modify Financial Settings
```

---

# 131. Daily Reconciliation Requirements

System shall calculate:

```text
Expected Revenue

Collected Revenue

Outstanding Revenue

Refunds

Credits Issued

Credits Redeemed
```

---

## Reconciliation Source

All calculations must use:

```text
Financial Ledger
```

Not bookings.

---

# 132. Financial Data Retention

The following records shall never be deleted:

```text
Payments

Ledger Entries

Refund Records

Credit Records

Audit Records
```

---

# 133. Soft Delete Rules

Financial records shall not support soft delete.

Financial records are permanent.

---

# 134. Design Principles

1. Ledger is the source of truth.
2. Financial records are immutable.
3. All corrections use reversal entries.
4. Every financial action generates audit events.
5. Revenue is calculated from ledger entries.
6. Refund support exists from day one.
7. Credit support exists from day one.
8. Managers cannot alter financial settings.
9. Owner controls financial governance.
10. Financial history shall never be lost.

---

# 135. Next Section

Part 5B defines:

* Submit Payment APIs
* Verify Payment APIs
* Reject Payment APIs
* Balance Collection APIs
* Refund APIs
* Credit APIs
* Ledger APIs
* Financial Error Catalog
* Financial Validation Rules
* Financial Workflow State Machines

# 03_API_SPECIFICATION.md

# PART 5B — PAYMENT, LEDGER, CREDIT & REFUND API SPECIFICATION

Version: 1.0

Status: APPROVED

Document Type: AUTHORITATIVE API CONTRACT

Parent Module: Financial Management

Depends On:

* Part 4A — Booking Domain Model
* Part 4B — Booking APIs
* Part 5A — Payment Domain Model & Financial Architecture

---

# 136. API Design Standards

## Base Route

```http
/api/v1/payments
```

---

## Authentication Types

### Public

No authentication required.

---

### Authenticated

Valid JWT required.

---

## Standard Success Response

```json
{
  "success": true,
  "data": {}
}
```

---

## Standard Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message"
  }
}
```

---

# 137. Generate Payment Instructions API

## Endpoint

```http
GET /api/v1/payments/booking/:bookingId/instructions
```

---

## Authentication

Public

---

## Purpose

Provide payment details for booking deposit.

---

## Business Workflow

Load:

```text
Booking

Financial Snapshot

UPI Settings
```

Generate:

```text
UPI Deep Link

UPI QR Payload
```

---

## Response

```json
{
  "success": true,
  "data": {
    "bookingId": "BOOK_ID",

    "amount": 45,

    "upiId": "owner@upi",

    "upiDeepLink": "upi://pay?...",

    "qrPayload": "upi://pay?...",

    "paymentExpiresAt": "2026-08-15T17:30:00Z"
  }
}
```

---

# 138. Submit Deposit Payment API

## Endpoint

```http
POST /api/v1/payments/deposit
```

---

## Authentication

Public

---

## Request Body

```json
{
  "bookingId": "BOOK_ID",

  "utrNumber": "123456789012",

  "paymentScreenshotUrl": "optional"
}
```

---

## Validation Rules

### Booking Status

Must be:

```text
PENDING_PAYMENT
```

---

### Deposit Status

Must be:

```text
UNPAID
```

---

### UTR Number

Mandatory

---

### Screenshot

Optional

---

## Business Workflow

### Create Payment

```text
Type = DEPOSIT

Status = SUBMITTED
```

---

### Update Booking

```text
Deposit Status = SUBMITTED

Booking Status = PENDING_VERIFICATION
```

---

### Create Activity

```text
PAYMENT_SUBMITTED
```

---

### Create Audit Event

```text
PAYMENT_SUBMITTED
```

---

### Notify Staff

Enabled providers:

```text
Telegram

Email
```

---

# 139. Verify Deposit Payment API

## Endpoint

```http
PATCH /api/v1/payments/:paymentId/verify
```

---

## Authentication

Required

---

## Permission

```text
payments.verify
```

---

## Allowed Status

```text
SUBMITTED
```

---

## Business Workflow

### Verify Payment

```text
Status = VERIFIED
```

---

### Update Booking

```text
Deposit Status = VERIFIED

Booking Status = CONFIRMED
```

---

### Create Ledger Entry

```text
DEPOSIT_RECEIVED
```

---

### Create Activity

```text
PAYMENT_VERIFIED
```

---

### Notify Customer

Enabled providers:

```text
SMS

WhatsApp

Email
```

---

# 140. Reject Deposit Payment API

## Endpoint

```http
PATCH /api/v1/payments/:paymentId/reject
```

---

## Permission

```text
payments.verify
```

---

## Allowed Status

```text
SUBMITTED
```

---

## Business Workflow

Update:

```text
Payment Status = REJECTED

Booking Status = PENDING_PAYMENT

Deposit Status = REJECTED
```

---

## Audit Event

```text
PAYMENT_REJECTED
```

---

# 141. Collect Balance Payment API

## Endpoint

```http
POST /api/v1/payments/balance
```

---

## Authentication

Required

---

## Permission

```text
payments.collect
```

---

## Purpose

Collect remaining amount after deposit.

---

## Request Body

```json
{
  "bookingId": "BOOK_ID",

  "paymentMethod": "CASH",

  "amount": 135,

  "referenceNumber": null
}
```

---

## Validation

Remaining balance must exist.

---

## Business Workflow

### Create Payment

```text
Type = BALANCE

Status = VERIFIED
```

---

### Create Ledger Entry

```text
BALANCE_RECEIVED
```

---

### Update Booking

Outstanding balance becomes:

```text
0
```

---

# 142. Get Payment Details API

## Endpoint

```http
GET /api/v1/payments/:paymentId
```

---

## Permission

```text
payments.view
```

---

## Response

Return complete payment record.

Including:

```text
Snapshot

Ledger Links

Audit Metadata
```

---

# 143. List Payments API

## Endpoint

```http
GET /api/v1/payments
```

---

## Permission

```text
payments.view
```

---

## Filters

```http
?bookingId=

?customerId=

?paymentType=

?paymentStatus=

?startDate=

?endDate=
```

---

## Pagination

```http
?page=1

&pageSize=20
```

---

# 144. Ledger Entry List API

## Endpoint

```http
GET /api/v1/ledger
```

---

## Permission

```text
financial.view
```

---

## Filters

```http
?entryType=

?customerId=

?bookingId=

?startDate=

?endDate=
```

---

## Response

```json
{
  "success": true,
  "data": [
    {
      "entryType": "DEPOSIT_RECEIVED",

      "amount": 45
    }
  ]
}
```

---

# 145. Get Ledger Entry API

## Endpoint

```http
GET /api/v1/ledger/:ledgerId
```

---

## Permission

```text
financial.view
```

---

# 146. Create Reversal Entry API

## Endpoint

```http
POST /api/v1/ledger/reversal
```

---

## Permission

```text
financial.reversal
```

---

## Role Restriction

Owner Only

---

## Request Body

```json
{
  "ledgerEntryId": "LEDGER_ID",

  "reason": "Incorrect amount"
}
```

---

## Business Workflow

### Create Reversal

```text
Entry Type = REVERSAL
```

---

### Amount

Must equal original amount.

---

### Create Audit Event

```text
REVERSAL_CREATED
```

---

# 147. Create Credit API

## Endpoint

```http
POST /api/v1/credits
```

---

## Permission

```text
credits.issue
```

---

## Role Restriction

Owner Only

---

## Request Body

```json
{
  "customerId": "CUSTOMER_ID",

  "amount": 100,

  "reason": "Promotional credit"
}
```

---

## Business Workflow

### Create Credit

### Create Ledger Entry

```text
CREDIT_ISSUED
```

---

### Create Audit Event

```text
CREDIT_ISSUED
```

---

# 148. Redeem Credit API

## Endpoint

```http
POST /api/v1/credits/redeem
```

---

## Permission

```text
credits.redeem
```

---

## Request Body

```json
{
  "customerId": "CUSTOMER_ID",

  "bookingId": "BOOKING_ID",

  "amount": 50
}
```

---

## Validation

Customer must have sufficient credit balance.

---

## Business Workflow

### Create Ledger Entry

```text
CREDIT_REDEEMED
```

---

### Reduce Credit Balance

---

### Update Booking Financials

---

# 149. Credit Balance API

## Endpoint

```http
GET /api/v1/credits/customer/:customerId/balance
```

---

## Permission

```text
credits.view
```

---

## Response

```json
{
  "success": true,
  "data": {
    "balance": 150
  }
}
```

---

# 150. Create Refund Request API

## Endpoint

```http
POST /api/v1/refunds/request
```

---

## Authentication

Required

---

## Permission

```text
refunds.request
```

---

## Request Body

```json
{
  "bookingId": "BOOKING_ID",

  "amount": 45,

  "reason": "Manual refund request"
}
```

---

## Result

```text
Status = REQUESTED
```

---

# 151. Approve Refund API

## Endpoint

```http
PATCH /api/v1/refunds/:refundId/approve
```

---

## Permission

```text
refunds.approve
```

---

## Role Restriction

Owner Only

---

## Result

```text
Status = APPROVED
```

---

# 152. Reject Refund API

## Endpoint

```http
PATCH /api/v1/refunds/:refundId/reject
```

---

## Permission

```text
refunds.approve
```

---

## Role Restriction

Owner Only

---

## Result

```text
Status = REJECTED
```

---

# 153. Process Refund API

## Endpoint

```http
PATCH /api/v1/refunds/:refundId/process
```

---

## Permission

```text
refunds.process
```

---

## Role Restriction

Owner Only

---

## Business Workflow

### Create Ledger Entry

```text
REFUND_ISSUED
```

---

### Create Audit Event

```text
PAYMENT_REFUNDED
```

---

### Result

```text
Status = PROCESSED
```

---

# 154. Refund List API

## Endpoint

```http
GET /api/v1/refunds
```

---

## Permission

```text
refunds.view
```

---

# 155. Financial Validation Rules

## Rule 1

Verified payments cannot be edited.

---

## Rule 2

Ledger entries cannot be edited.

---

## Rule 3

Ledger entries cannot be deleted.

---

## Rule 4

Credits cannot become negative.

---

## Rule 5

Refund amount cannot exceed collected amount.

---

## Rule 6

Reversal entries require Owner permission.

---

# 156. Financial Error Catalog

```text
PAYMENT_NOT_FOUND

PAYMENT_ALREADY_VERIFIED

PAYMENT_ALREADY_REJECTED

INVALID_PAYMENT_STATUS

LEDGER_ENTRY_NOT_FOUND

REVERSAL_NOT_ALLOWED

INSUFFICIENT_CREDIT

REFUND_NOT_FOUND

REFUND_ALREADY_PROCESSED

INVALID_REFUND_AMOUNT

FINANCIAL_PERMISSION_DENIED
```

---

# 157. Financial Workflow State Machines

## Payment

```text
PENDING
    ↓
SUBMITTED
    ↓
VERIFIED
```

Alternative:

```text
SUBMITTED
    ↓
REJECTED
```

---

## Refund

```text
REQUESTED
    ↓
APPROVED
    ↓
PROCESSED
```

Alternative:

```text
REQUESTED
    ↓
REJECTED
```

---

# 158. Permission Dependencies

## Owner

```text
payments.*

ledger.*

credits.*

refunds.*

financial.*
```

---

## Manager

```text
payments.verify

payments.collect

payments.view
```

---

# 159. Design Principles

1. Ledger is the financial source of truth.
2. Financial records are immutable.
3. Reversal entries replace edits.
4. Refunds are fully auditable.
5. Credits are ledger-backed.
6. Revenue is ledger-driven.
7. Financial permissions are role-based.
8. Every financial action creates an audit event.
9. Verified payments cannot be altered.
10. Financial history shall never be lost.

---

# 160. Next Section

Part 5C defines:

* Daily Revenue Reports
* Collection Reports
* Refund Reports
* Credit Reports
* Outstanding Balance Reports
* Reconciliation Reports
* Financial Dashboard APIs
* Financial KPI APIs
* Export APIs

# 03_API_SPECIFICATION.md

# PART 5C — FINANCIAL REPORTING, RECONCILIATION & ANALYTICS API SPECIFICATION

Version: 1.0

Status: APPROVED

Document Type: AUTHORITATIVE API CONTRACT

Parent Module: Financial Reporting

Depends On:

* Part 5A — Payment Domain Model
* Part 5B — Payment APIs
* Financial Ledger
* Booking Module

---

# 161. Purpose

This module provides:

* Revenue Reporting
* Collection Reporting
* Outstanding Balance Reporting
* Deposit Reporting
* Refund Reporting
* Credit Reporting
* Reconciliation Reporting
* Dashboard KPIs
* Financial Exports

The reporting system shall use:

```text
Financial Ledger
```

as the sole source of truth.

---

# 162. Reporting Standards

## Reporting Timezone

```text
Asia/Kolkata
```

---

## Business Day

```text
00:00:00 IST
to
23:59:59 IST
```

---

## Currency

```text
INR
```

Phase 1 supports INR only.

---

## Revenue Basis

```text
Cash Basis Accounting
```

Revenue is recognized when payment is verified.

---

# 163. Financial Dashboard API

## Endpoint

```http
GET /api/v1/reports/dashboard
```

---

## Permission

```text
reports.financial
```

Owner Only

---

## Response

```json
{
  "success": true,
  "data": {
    "todayRevenue": 4500,
    "monthRevenue": 98000,

    "todayBookings": 32,
    "monthBookings": 640,

    "outstandingBalance": 8500,

    "refundAmount": 500,

    "creditsIssued": 1000,
    "creditsRedeemed": 400,

    "occupancyRate": 82.5
  }
}
```

---

# 164. Revenue Summary API

## Endpoint

```http
GET /api/v1/reports/revenue
```

---

## Permission

```text
reports.financial
```

Owner Only

---

## Query Parameters

```http
?startDate=2026-08-01
&endDate=2026-08-31
```

---

## Calculation Source

Ledger Entry Types:

```text
DEPOSIT_RECEIVED

BALANCE_RECEIVED
```

---

## Response

```json
{
  "success": true,
  "data": {
    "grossRevenue": 100000,
    "refunds": 500,
    "netRevenue": 99500
  }
}
```

---

# 165. Daily Revenue API

## Endpoint

```http
GET /api/v1/reports/revenue/daily
```

---

## Response

```json
{
  "success": true,
  "data": [
    {
      "date": "2026-08-01",
      "revenue": 4500
    }
  ]
}
```

---

# 166. Monthly Revenue API

## Endpoint

```http
GET /api/v1/reports/revenue/monthly
```

---

## Response

```json
{
  "success": true,
  "data": [
    {
      "month": "2026-08",
      "revenue": 98000
    }
  ]
}
```

---

# 167. Deposit Collection Report API

## Endpoint

```http
GET /api/v1/reports/deposits
```

---

## Purpose

Report all verified deposits.

---

## Source

```text
DEPOSIT_RECEIVED
```

Ledger entries.

---

## Response

```json
{
  "success": true,
  "data": {
    "depositCount": 320,
    "depositAmount": 15000
  }
}
```

---

# 168. Balance Collection Report API

## Endpoint

```http
GET /api/v1/reports/balances
```

---

## Purpose

Report remaining balances collected.

---

## Source

```text
BALANCE_RECEIVED
```

Ledger entries.

---

# 169. Outstanding Balance Report API

## Endpoint

```http
GET /api/v1/reports/outstanding-balances
```

---

## Purpose

Identify unpaid balances.

---

## Calculation

```text
Booking Financial Snapshot

minus

Verified Payments
```

---

## Response

```json
{
  "success": true,
  "data": [
    {
      "bookingCode": "BOOK-000001",
      "customerName": "Rahul",
      "outstandingAmount": 135
    }
  ]
}
```

---

# 170. Refund Report API

## Endpoint

```http
GET /api/v1/reports/refunds
```

---

## Source

```text
REFUND_ISSUED
```

Ledger entries.

---

## Response

```json
{
  "success": true,
  "data": {
    "refundCount": 12,
    "refundAmount": 500
  }
}
```

---

# 171. Credit Report API

## Endpoint

```http
GET /api/v1/reports/credits
```

---

## Source

```text
CREDIT_ISSUED

CREDIT_REDEEMED
```

Ledger entries.

---

## Response

```json
{
  "success": true,
  "data": {
    "creditsIssued": 1000,
    "creditsRedeemed": 400,
    "outstandingCredits": 600
  }
}
```

---

# 172. Customer Financial Summary API

## Endpoint

```http
GET /api/v1/reports/customers/:customerId/financial-summary
```

---

## Purpose

Customer financial history.

---

## Response

```json
{
  "success": true,
  "data": {
    "lifetimeRevenue": 5200,

    "depositPayments": 25,

    "balancePayments": 12,

    "creditsIssued": 300,

    "creditsRedeemed": 150,

    "refundsReceived": 0
  }
}
```

---

# 173. Reconciliation Report API

## Endpoint

```http
GET /api/v1/reports/reconciliation
```

---

## Permission

Owner Only

---

## Purpose

Verify financial consistency.

---

## Validation Checks

### Check 1

```text
Verified Payments

=

Ledger Revenue Entries
```

---

### Check 2

```text
Refund Records

=

Refund Ledger Entries
```

---

### Check 3

```text
Credits Issued

=

Credit Ledger Entries
```

---

## Response

```json
{
  "success": true,
  "data": {
    "status": "PASSED"
  }
}
```

---

# 174. Revenue By Payment Method API

## Endpoint

```http
GET /api/v1/reports/payment-methods
```

---

## Response

```json
{
  "success": true,
  "data": {
    "UPI": 85000,
    "CASH": 15000
  }
}
```

---

# 175. Revenue By Booking Source API

## Endpoint

```http
GET /api/v1/reports/booking-sources
```

---

## Source

```text
ONLINE

WALK_IN
```

---

## Response

```json
{
  "success": true,
  "data": {
    "ONLINE": 62000,
    "WALK_IN": 38000
  }
}
```

---

# 176. Occupancy Revenue Report API

## Endpoint

```http
GET /api/v1/reports/occupancy
```

---

## Response

```json
{
  "success": true,
  "data": {
    "occupancyRate": 82.5,
    "revenuePerHour": 1200
  }
}
```

---

# 177. No Show Financial Impact Report API

## Endpoint

```http
GET /api/v1/reports/no-show-impact
```

---

## Purpose

Measure lost revenue.

---

## Response

```json
{
  "success": true,
  "data": {
    "noShowCount": 15,
    "estimatedLostRevenue": 3500
  }
}
```

---

# 178. Export Report API

## Endpoint

```http
GET /api/v1/reports/export
```

---

## Supported Formats

```text
CSV

XLSX
```

---

## Query Parameters

```http
?reportType=revenue
&format=xlsx
```

---

## Response

```json
{
  "success": true,
  "data": {
    "downloadUrl": "..."
  }
}
```

---

# 179. Financial KPI API

## Endpoint

```http
GET /api/v1/reports/kpis
```

---

## Response

```json
{
  "success": true,
  "data": {
    "revenueToday": 4500,

    "revenueMonth": 98000,

    "depositsCollected": 15000,

    "outstandingBalances": 8500,

    "refundAmount": 500,

    "creditsIssued": 1000,

    "creditsRedeemed": 400,

    "occupancyRate": 82.5
  }
}
```

---

# 180. Report Caching Rules

## Cache Duration

```text
5 Minutes
```

for dashboard and KPI reports.

---

## Real-Time Reports

Never cached:

```text
Reconciliation

Outstanding Balances
```

---

# 181. Report Security Rules

## Owner Access

Allowed:

```text
All Financial Reports
```

---

## Manager Access

Allowed:

```text
Booking Financial Details
```

Only.

---

## Restricted Reports

Managers cannot access:

```text
Revenue

Refunds

Credits

Reconciliation

Exports
```

---

# 182. Report Audit Requirements

## Audit Events

```text
REPORT_VIEWED

REPORT_EXPORTED

RECONCILIATION_EXECUTED
```

---

## Stored Metadata

```json
{
  "reportName": "Revenue Report",

  "generatedBy": "userId",

  "generatedAt": "timestamp"
}
```

---

# 183. Financial Error Catalog

```text
REPORT_NOT_FOUND

INVALID_DATE_RANGE

EXPORT_FORMAT_NOT_SUPPORTED

FINANCIAL_REPORT_ACCESS_DENIED

RECONCILIATION_FAILED
```

---

# 184. Financial Reporting Design Principles

1. Ledger is the reporting source of truth.
2. Revenue uses cash-basis accounting.
3. Financial history is immutable.
4. Reconciliation must be deterministic.
5. Reports are timezone aware.
6. Reports are permission controlled.
7. Every export is audited.
8. Revenue must never be derived directly from bookings.
9. Reports must be reproducible.
10. Financial records are permanent.

---

# 185. Part 5 Completion Statement

Part 5A, Part 5B and Part 5C together constitute the complete Financial Domain Specification.

Financial Domain Status:

```text
FROZEN
```

Future changes require formal change requests.

---

# Next Section

Part 6 — Settings & System Configuration APIs

Will define:

* Business Settings
* Pricing Settings
* Deposit Settings
* Booking Rules
* Operating Hours
* Console Configuration
* Notification Settings
* UPI Configuration
* Feature Toggles
* Settings Audit History
* Settings Versioning
* Settings Permissions

# 03_API_SPECIFICATION.md

# PART 6 — SETTINGS & SYSTEM CONFIGURATION API SPECIFICATION

Version: 1.0

Status: APPROVED

Document Type: AUTHORITATIVE API CONTRACT

Parent Module: System Configuration

Depends On:

* Booking Module
* Financial Module
* Notification Module
* Audit Framework
* User Management Module

---

# 186. Purpose

The Settings Module provides centralized configuration for:

* Business Rules
* Pricing Rules
* Deposit Rules
* Booking Rules
* Operating Hours
* Console Management
* Notification Settings
* UPI Configuration
* Feature Toggles
* System Defaults

All runtime business behavior shall be controlled through Settings.

No code deployment shall be required to modify business rules.

---

# 187. Settings Architecture

## 187.1 Single Document Model

The system shall maintain a single settings document.

Collection:

```text
settings
```

---

## 187.2 Singleton Rule

Only one active settings document may exist.

---

## 187.3 Global Access

All modules shall load configuration from:

```text
settings
```

---

# 188. Settings Entity

## Structure

```json
{
  "_id": "ObjectId",

  "version": 1,

  "business": {},

  "pricing": {},

  "deposits": {},

  "bookingRules": {},

  "operatingHours": {},

  "consoles": {},

  "notifications": {},

  "upi": {},

  "features": {},

  "audit": {}
}
```

---

# 189. Settings Versioning

## Purpose

Prevent concurrent modification conflicts.

---

## Field

```json
{
  "version": 1
}
```

---

## Update Rule

Every successful settings update shall:

```text
Increment Version
```

---

## Conflict Rule

If version mismatch occurs:

```text
VERSION_CONFLICT
```

must be returned.

---

# 190. Business Settings

## Structure

```json
{
  "business": {
    "businessName": "Your POV",

    "tagline": "Place Of Virtuality",

    "address": "Shop No. 6, Vishwamitri CHS Ltd.",

    "city": "Kalyan",

    "state": "Maharashtra",

    "country": "India",

    "timezone": "Asia/Kolkata"
  }
}
```

---

# 191. Pricing Settings

## Purpose

Control booking pricing.

---

## Structure

```json
{
  "pricing": {
    "pricePerPersonPerHour": 60,

    "minimumBookingDuration": 30,

    "maximumBookingDuration": 120
  }
}
```

---

## Validation

### pricePerPersonPerHour

Minimum:

```text
1
```

---

### minimumBookingDuration

Allowed:

```text
30
60
90
120
```

---

### maximumBookingDuration

Must be greater than:

```text
minimumBookingDuration
```

---

# 192. Deposit Settings

## Purpose

Configure booking deposits.

---

## Structure

```json
{
  "deposits": {
    "enabled": true,

    "type": "PERCENTAGE",

    "value": 25
  }
}
```

---

## Supported Types

```text
PERCENTAGE

FIXED_AMOUNT
```

---

## Validation

### Percentage

```text
1 - 100
```

---

### Fixed Amount

Must be:

```text
> 0
```

---

# 193. Booking Rules

## Structure

```json
{
  "bookingRules": {
    "bookingBufferMinutes": 15,

    "paymentExpiryMinutes": 30,

    "noShowGracePeriodMinutes": 15
  }
}
```

---

## Purpose

### bookingBufferMinutes

Gap between sessions.

---

### paymentExpiryMinutes

Time allowed to submit payment.

---

### noShowGracePeriodMinutes

Late arrival tolerance.

---

# 194. Operating Hours Settings

## Structure

```json
{
  "operatingHours": {
    "monday": {
      "open": "11:00",
      "close": "22:00"
    },

    "tuesday": {},

    "wednesday": {},

    "thursday": {},

    "friday": {},

    "saturday": {
      "open": "11:00",
      "close": "23:00"
    },

    "sunday": {
      "open": "11:00",
      "close": "23:00"
    }
  }
}
```

---

## Validation

Close time must be greater than open time.

---

# 195. Console Configuration

## Structure

```json
{
  "consoles": {
    "activeConsoleCount": 2
  }
}
```

---

## Validation

Minimum:

```text
1
```

---

## Purpose

Allows adding consoles without code changes.

---

# 196. Notification Settings

## Structure

```json
{
  "notifications": {
    "email": {
      "enabled": true
    },

    "telegram": {
      "enabled": true
    },

    "whatsapp": {
      "enabled": false
    },

    "sms": {
      "enabled": false
    }
  }
}
```

---

## Supported Channels

```text
EMAIL

TELEGRAM

WHATSAPP

SMS
```

---

## Rule

Each channel shall be independently configurable.

---

# 197. Notification Provider Configuration

## Email

```json
{
  "provider": "RESEND",

  "apiKey": "encrypted"
}
```

---

## Telegram

```json
{
  "botToken": "encrypted",

  "chatId": "encrypted"
}
```

---

## SMS

```json
{
  "provider": "FAST2SMS",

  "apiKey": "encrypted"
}
```

---

## Security Rule

Secrets must never be returned through public APIs.

---

# 198. UPI Configuration

## Structure

```json
{
  "upi": {
    "upiId": "owner@upi",

    "payeeName": "Your POV"
  }
}
```

---

## Purpose

Generate:

```text
UPI Deep Links

UPI QR Codes
```

dynamically.

---

# 199. Feature Toggles

## Structure

```json
{
  "features": {
    "onlineBookings": true,

    "walkInBookings": true,

    "customerCredits": true,

    "refunds": false
  }
}
```

---

## Purpose

Enable or disable features without deployment.

---

# 200. Audit Configuration

## Structure

```json
{
  "audit": {
    "enabled": true
  }
}
```

---

# 201. Get Public Settings API

## Endpoint

```http
GET /api/v1/settings/public
```

---

## Authentication

Public

---

## Purpose

Provide safe settings required by booking website.

---

## Response

```json
{
  "success": true,
  "data": {
    "pricing": {
      "pricePerPersonPerHour": 60
    },

    "upi": {
      "upiId": "owner@upi",

      "payeeName": "Your POV"
    }
  }
}
```

---

## Security Rule

Must not expose:

```text
API Keys

Tokens

Secrets
```

---

# 202. Get Settings API

## Endpoint

```http
GET /api/v1/settings
```

---

## Authentication

Required

---

## Permission

```text
settings.view
```

---

## Response

Returns complete settings document.

---

# 203. Update Settings API

## Endpoint

```http
PATCH /api/v1/settings
```

---

## Authentication

Required

---

## Permission

```text
settings.update
```

---

## Role Restriction

Owner Only

---

## Request Body

Partial update supported.

Example:

```json
{
  "pricing": {
    "pricePerPersonPerHour": 80
  },

  "version": 5
}
```

---

## Business Workflow

### Step 1

Validate version.

---

### Step 2

Validate payload.

---

### Step 3

Store previous values.

---

### Step 4

Apply update.

---

### Step 5

Increment version.

---

### Step 6

Create audit record.

---

# 204. Settings History API

## Endpoint

```http
GET /api/v1/settings/history
```

---

## Permission

```text
settings.history
```

---

## Role Restriction

Owner Only

---

## Response

```json
{
  "success": true,
  "data": [
    {
      "changedBy": "ownerId",

      "changedAt": "timestamp",

      "before": {},

      "after": {}
    }
  ]
}
```

---

# 205. Settings Audit Requirements

## Mandatory Events

```text
SETTINGS_UPDATED

PRICING_UPDATED

DEPOSIT_SETTINGS_UPDATED

BOOKING_RULES_UPDATED

OPERATING_HOURS_UPDATED

CONSOLE_CONFIGURATION_UPDATED

NOTIFICATION_SETTINGS_UPDATED

UPI_SETTINGS_UPDATED

FEATURE_FLAGS_UPDATED
```

---

# 206. Security Rules

## Rule 1

Secrets must be encrypted at rest.

---

## Rule 2

Secrets must never appear in logs.

---

## Rule 3

Secrets must never be returned in API responses.

---

## Rule 4

Only Owners may modify settings.

---

# 207. Error Catalog

```text
SETTINGS_NOT_FOUND

VERSION_CONFLICT

INVALID_CONFIGURATION

INVALID_PRICE

INVALID_DEPOSIT_CONFIGURATION

INVALID_OPERATING_HOURS

INVALID_CONSOLE_COUNT

INVALID_NOTIFICATION_CONFIGURATION

SETTINGS_PERMISSION_DENIED
```

---

# 208. Design Principles

1. Single settings document architecture.
2. Runtime configurable business rules.
3. Version-controlled updates.
4. Complete auditability.
5. Secrets never exposed.
6. Owner-controlled configuration.
7. Dynamic pricing support.
8. Dynamic deposit support.
9. Dynamic console management.
10. Deployment-free business changes.

---

# 209. Part 6 Completion Statement

Settings Module Status:

```text
FROZEN
```

Future changes require formal change requests.

---

# Next Section

Part 7 — Authentication, Authorization & User Management APIs

Will define:

* Login
* Logout
* JWT Management
* Refresh Tokens
* User Management
* Owner Role
* Manager Role
* Permissions Matrix
* Password Policies
* Session Management
* Account Locking
* Security Auditing

# 03_API_SPECIFICATION.md

# PART 7 — AUTHENTICATION, AUTHORIZATION & USER MANAGEMENT API SPECIFICATION

Version: 1.0

Status: APPROVED

Document Type: AUTHORITATIVE API CONTRACT

Parent Module: Security & Access Control

Depends On:

* Audit Framework
* Settings Module
* Booking Module
* Financial Module

---

# 210. Purpose

The Security Module governs:

* Authentication
* Authorization
* User Management
* Session Management
* Password Management
* Access Control
* Security Auditing

The system shall implement Role Based Access Control (RBAC).

---

# 211. Authentication Architecture

## Authentication Method

Phase 1:

```text
Email + Password
```

---

## Future Authentication Methods

```text
Google Login

Microsoft Login

OTP Login
```

Phase 2+

---

# 212. User Roles

## Supported Roles

```text
OWNER

MANAGER
```

---

## Role Hierarchy

```text
OWNER
  ↓
MANAGER
```

OWNER inherits all permissions.

---

# 213. User Entity

## Structure

```json
{
  "_id": "ObjectId",

  "email": "owner@example.com",

  "firstName": "John",

  "lastName": "Doe",

  "role": "OWNER",

  "isActive": true,

  "isDeleted": false,

  "createdAt": "timestamp",

  "updatedAt": "timestamp"
}
```

---

# 214. Password Policy

## Minimum Length

```text
8 Characters
```

---

## Maximum Length

```text
128 Characters
```

---

## Hashing

Passwords shall never be stored in plain text.

Approved algorithm:

```text
bcrypt
```

Minimum:

```text
12 Rounds
```

---

# 215. Account Lockout Policy

## Failed Attempts

```text
5 Consecutive Failures
```

---

## Lock Duration

```text
15 Minutes
```

---

## Reset Condition

Successful login resets failure count.

---

# 216. JWT Architecture

## Access Token

Validity:

```text
15 Minutes
```

---

## Refresh Token

Validity:

```text
30 Days
```

---

## Token Storage

Refresh tokens shall be stored in database.

---

## Token Rotation

Every refresh operation shall issue:

```text
New Access Token

New Refresh Token
```

---

# 217. Session Management

## Active Sessions

Phase 1:

```text
Unlimited
```

---

## Session Entity

```json
{
  "_id": "ObjectId",

  "userId": "ObjectId",

  "refreshTokenHash": "hash",

  "deviceInfo": "optional",

  "ipAddress": "masked",

  "createdAt": "timestamp",

  "expiresAt": "timestamp"
}
```

---

# 218. Login API

## Endpoint

```http
POST /api/v1/auth/login
```

---

## Authentication

Public

---

## Request

```json
{
  "email": "owner@example.com",

  "password": "password"
}
```

---

## Business Workflow

### Step 1

Locate user.

---

### Step 2

Validate password.

---

### Step 3

Validate account status.

---

### Step 4

Check lockout status.

---

### Step 5

Generate tokens.

---

### Step 6

Create session.

---

### Step 7

Create audit event.

---

## Success Response

```json
{
  "success": true,
  "data": {
    "accessToken": "...",

    "refreshToken": "...",

    "expiresIn": 900
  }
}
```

---

# 219. Refresh Token API

## Endpoint

```http
POST /api/v1/auth/refresh
```

---

## Authentication

Public

---

## Request

```json
{
  "refreshToken": "..."
}
```

---

## Business Workflow

### Validate Refresh Token

### Rotate Refresh Token

### Generate New Access Token

### Generate New Refresh Token

---

# 220. Logout API

## Endpoint

```http
POST /api/v1/auth/logout
```

---

## Authentication

Required

---

## Business Workflow

### Revoke Current Session

### Remove Refresh Token

### Create Audit Event

---

## Success Response

```json
{
  "success": true
}
```

---

# 221. Logout All Sessions API

## Endpoint

```http
POST /api/v1/auth/logout-all
```

---

## Authentication

Required

---

## Business Workflow

### Revoke All Sessions

### Delete All Refresh Tokens

### Create Audit Event

---

# 222. Current User API

## Endpoint

```http
GET /api/v1/auth/me
```

---

## Authentication

Required

---

## Response

```json
{
  "success": true,
  "data": {
    "id": "...",

    "email": "owner@example.com",

    "role": "OWNER"
  }
}
```

---

# 223. Change Password API

## Endpoint

```http
PATCH /api/v1/auth/change-password
```

---

## Authentication

Required

---

## Request

```json
{
  "currentPassword": "...",

  "newPassword": "..."
}
```

---

## Business Workflow

### Validate Current Password

### Validate New Password

### Hash Password

### Update Password

### Revoke Other Sessions

### Create Audit Event

---

# 224. User List API

## Endpoint

```http
GET /api/v1/users
```

---

## Permission

```text
users.view
```

---

## Role Restriction

Owner Only

---

## Pagination

```http
?page=1

&pageSize=20
```

---

# 225. Get User API

## Endpoint

```http
GET /api/v1/users/:userId
```

---

## Permission

```text
users.view
```

---

## Role Restriction

Owner Only

---

# 226. Create Manager API

## Endpoint

```http
POST /api/v1/users
```

---

## Permission

```text
users.create
```

---

## Role Restriction

Owner Only

---

## Request

```json
{
  "email": "manager@example.com",

  "firstName": "Manager",

  "lastName": "One",

  "role": "MANAGER"
}
```

---

## Business Workflow

### Validate Email

### Create User

### Generate Temporary Password

### Send Welcome Email

### Create Audit Event

---

# 227. Update User API

## Endpoint

```http
PATCH /api/v1/users/:userId
```

---

## Permission

```text
users.update
```

---

## Role Restriction

Owner Only

---

# 228. Deactivate User API

## Endpoint

```http
PATCH /api/v1/users/:userId/deactivate
```

---

## Permission

```text
users.update
```

---

## Result

```text
isActive = false
```

---

# 229. Activate User API

## Endpoint

```http
PATCH /api/v1/users/:userId/activate
```

---

## Permission

```text
users.update
```

---

## Result

```text
isActive = true
```

---

# 230. Delete User API

## Endpoint

```http
DELETE /api/v1/users/:userId
```

---

## Permission

```text
users.delete
```

---

## Role Restriction

Owner Only

---

## Soft Delete Only

```json
{
  "isDeleted": true,

  "deletedAt": "timestamp"
}
```

---

# 231. Permissions Matrix

## Owner Permissions

```text
bookings.*

payments.*

credits.*

refunds.*

ledger.*

reports.*

settings.*

users.*
```

---

## Manager Permissions

```text
bookings.create

bookings.view

bookings.update

bookings.cancel

bookings.checkin

bookings.complete

payments.verify

payments.collect

payments.view
```

---

# 232. Authorization Middleware Rules

## Rule 1

JWT must be valid.

---

## Rule 2

User must be active.

---

## Rule 3

User must not be deleted.

---

## Rule 4

Permission must exist.

---

## Rule 5

Role must authorize action.

---

# 233. Session List API

## Endpoint

```http
GET /api/v1/auth/sessions
```

---

## Authentication

Required

---

## Response

```json
{
  "success": true,
  "data": [
    {
      "sessionId": "...",

      "createdAt": "...",

      "expiresAt": "..."
    }
  ]
}
```

---

# 234. Revoke Session API

## Endpoint

```http
DELETE /api/v1/auth/sessions/:sessionId
```

---

## Authentication

Required

---

## Business Workflow

### Delete Session

### Revoke Refresh Token

---

# 235. Security Audit Events

## Mandatory Events

```text
LOGIN_SUCCESS

LOGIN_FAILED

ACCOUNT_LOCKED

LOGOUT

LOGOUT_ALL

PASSWORD_CHANGED

USER_CREATED

USER_UPDATED

USER_DEACTIVATED

USER_ACTIVATED

USER_DELETED

SESSION_REVOKED
```

---

# 236. Security Error Catalog

```text
INVALID_CREDENTIALS

ACCOUNT_LOCKED

ACCOUNT_DISABLED

ACCOUNT_DELETED

INVALID_TOKEN

TOKEN_EXPIRED

REFRESH_TOKEN_EXPIRED

SESSION_NOT_FOUND

INSUFFICIENT_PERMISSIONS

USER_NOT_FOUND

EMAIL_ALREADY_EXISTS

INVALID_PASSWORD

SECURITY_POLICY_VIOLATION
```

---

# 237. Security Design Principles

1. Passwords are never stored in plain text.
2. Refresh tokens are stored hashed.
3. Access tokens are short-lived.
4. Token rotation is mandatory.
5. Sessions are revocable.
6. Soft delete is mandatory.
7. RBAC governs all access.
8. Security actions are audited.
9. Authentication and authorization are separated.
10. Security history shall never be lost.

---

# 238. Part 7 Completion Statement

Authentication & Authorization Module Status:

```text
FROZEN
```

Future changes require formal change requests.

---

# Next Section

Part 8 — Notification & Communication APIs

Will define:

* Email Notifications
* Telegram Notifications
* SMS Notifications
* WhatsApp Notifications
* Notification Templates
* Notification Queue
* Delivery Tracking
* Retry Policies
* Notification Preferences
* Notification Audit Logging

# 03_API_SPECIFICATION.md

# PART 8 — NOTIFICATION & COMMUNICATION API SPECIFICATION

Version: 1.0

Status: APPROVED

Document Type: AUTHORITATIVE API CONTRACT

Parent Module: Notification & Communication

Depends On:

* Booking Module
* Financial Module
* User Management Module
* Settings Module
* Audit Framework

---

# 239. Purpose

The Notification Module governs:

* Email Notifications
* Telegram Notifications
* SMS Notifications
* WhatsApp Notifications
* Notification Templates
* Notification Queue
* Delivery Tracking
* Retry Processing
* Reminder Scheduling
* Notification Auditing

The system shall use an asynchronous queue-based architecture.

Business APIs must never wait for notification delivery.

---

# 240. Notification Architecture

## Delivery Model

```text
Business Event
      ↓
Notification Queue
      ↓
Notification Worker
      ↓
Provider Delivery
      ↓
Delivery Tracking
```

---

## Supported Channels

```text
EMAIL

TELEGRAM

SMS

WHATSAPP
```

---

## Phase 1 Availability

```text
EMAIL      ENABLED
TELEGRAM   ENABLED
SMS        ENABLED
WHATSAPP   DISABLED
```

---

# 241. Notification Categories

## Supported Categories

```text
BOOKING_CREATED

PAYMENT_SUBMITTED

PAYMENT_VERIFIED

PAYMENT_REJECTED

BOOKING_CONFIRMED

BOOKING_CANCELLED

BOOKING_REMINDER

NO_SHOW

SYSTEM_ALERT

SECURITY_ALERT
```

---

# 242. Recipient Types

## Supported Recipients

```text
CUSTOMER

OWNER

MANAGER
```

---

## Examples

```text
BOOKING_CONFIRMED
→ CUSTOMER

PAYMENT_SUBMITTED
→ OWNER

SECURITY_ALERT
→ OWNER
```

---

# 243. Notification Status Model

## Supported Statuses

```text
PENDING

PROCESSING

SENT

DELIVERED

FAILED

DEAD_LETTER_QUEUE
```

---

# 244. Notification Priority

## Supported Priorities

```text
HIGH

NORMAL

LOW
```

---

## Default Mapping

```text
PAYMENT_SUBMITTED     HIGH

PAYMENT_VERIFIED      HIGH

BOOKING_CONFIRMED     NORMAL

BOOKING_REMINDER      NORMAL

MARKETING             LOW
```

---

# 245. Notification Entity

## Structure

```json
{
  "_id": "ObjectId",

  "category": "BOOKING_CONFIRMED",

  "channel": "EMAIL",

  "recipientType": "CUSTOMER",

  "recipient": "user@example.com",

  "status": "PENDING",

  "priority": "NORMAL",

  "attempts": 0,

  "scheduledFor": "timestamp",

  "createdAt": "timestamp"
}
```

---

# 246. Template Architecture

## Channel Specific Templates

Templates shall be stored separately per channel.

Examples:

```text
BOOKING_CONFIRMED_EMAIL

BOOKING_CONFIRMED_SMS

BOOKING_CONFIRMED_TELEGRAM

BOOKING_CONFIRMED_WHATSAPP
```

---

## Versioning

Every template shall contain:

```json
{
  "version": 1
}
```

---

## Update Rule

Every update increments:

```text
version
```

---

# 247. Template Variables

## Supported Variable Syntax

```text
{{customerName}}

{{bookingCode}}

{{visitDate}}

{{startTime}}

{{amount}}

{{businessName}}

{{consoleNumber}}
```

---

## Rendering Rule

Variables must be resolved before delivery.

---

# 248. Notification Preferences

## Category Channel Matrix

```json
{
  "BOOKING_CONFIRMED": {
    "EMAIL": true,
    "SMS": true,
    "TELEGRAM": false,
    "WHATSAPP": false
  }
}
```

---

## Purpose

Enable or disable channels without code changes.

---

# 249. Queue Processing Rules

## Processing Order

```text
HIGH
    ↓
NORMAL
    ↓
LOW
```

---

## Batch Size

Configurable via settings.

Default:

```text
50
```

---

# 250. Retry Policy

## Maximum Attempts

```text
3
```

---

## Backoff Strategy

```text
Exponential Backoff
```

---

## Example

```text
Attempt 1 → Immediate

Attempt 2 → 1 Minute

Attempt 3 → 5 Minutes
```

---

# 251. Dead Letter Queue

## Rule

After maximum retries:

```text
FAILED
        ↓
DEAD_LETTER_QUEUE
```

---

## Purpose

Prevent infinite retry loops.

---

# 252. Notification Scheduling

## Supported Modes

```text
IMMEDIATE

SCHEDULED
```

---

## Structure

```json
{
  "scheduledFor": "timestamp"
}
```

---

# 253. Reminder Architecture

## Supported Reminder Types

```text
24_HOUR_REMINDER

2_HOUR_REMINDER
```

---

## Trigger Source

Booking Confirmation.

---

## Future Expandability

Additional reminder types may be configured through settings.

---

# 254. Notification History

## Purpose

Maintain permanent delivery records.

---

## Stored Information

```json
{
  "providerResponse": "...",

  "failureReason": "...",

  "sentAt": "timestamp",

  "deliveredAt": "timestamp"
}
```

---

# 255. Notification Idempotency

## Purpose

Prevent duplicate notifications.

---

## Rule

Same notification event shall not be delivered multiple times.

Example:

```text
PAYMENT_VERIFIED
```

must only generate one successful notification.

---

## Idempotency Key

```json
{
  "eventId": "...",

  "recipient": "...",

  "channel": "EMAIL"
}
```

---

# 256. Notification Rate Limiting

## Purpose

Prevent spam.

---

## Default Rule

```text
Maximum 5 identical notifications

Per Recipient

Per Hour
```

---

## Violation Result

Notification suppressed.

Audit event created.

---

# 257. Provider Configuration

## Email

Provider:

```text
Resend
```

---

## Telegram

Provider:

```text
Telegram Bot API
```

---

## SMS

Provider:

```text
Fast2SMS
```

---

## WhatsApp

Phase 2 Provider:

```text
WhatsApp Business API
```

---

# 258. Send Test Notification API

## Endpoint

```http
POST /api/v1/notifications/test
```

---

## Permission

```text
notifications.test
```

---

## Role Restriction

Owner Only

---

## Request

```json
{
  "channel": "EMAIL",

  "recipient": "owner@example.com"
}
```

---

# 259. Notification List API

## Endpoint

```http
GET /api/v1/notifications
```

---

## Permission

```text
notifications.view
```

---

## Filters

```http
?status=SENT

?channel=EMAIL

?category=BOOKING_CONFIRMED

?startDate=...

?endDate=...
```

---

# 260. Notification Details API

## Endpoint

```http
GET /api/v1/notifications/:notificationId
```

---

## Permission

```text
notifications.view
```

---

# 261. Template List API

## Endpoint

```http
GET /api/v1/notification-templates
```

---

## Permission

```text
notificationTemplates.view
```

---

# 262. Template Details API

## Endpoint

```http
GET /api/v1/notification-templates/:templateId
```

---

## Permission

```text
notificationTemplates.view
```

---

# 263. Update Template API

## Endpoint

```http
PATCH /api/v1/notification-templates/:templateId
```

---

## Permission

```text
notificationTemplates.update
```

---

## Role Restriction

Owner Only

---

## Business Workflow

### Step 1

Validate variables.

---

### Step 2

Store previous version.

---

### Step 3

Increment template version.

---

### Step 4

Create audit record.

---

# 264. Notification Preferences API

## Endpoint

```http
PATCH /api/v1/notifications/preferences
```

---

## Permission

```text
notifications.manage
```

---

## Role Restriction

Owner Only

---

# 265. Retry Notification API

## Endpoint

```http
POST /api/v1/notifications/:notificationId/retry
```

---

## Permission

```text
notifications.retry
```

---

## Role Restriction

Owner Only

---

## Validation

Must not be:

```text
DELIVERED
```

---

# 266. Notification Audit Events

## Mandatory Events

```text
NOTIFICATION_QUEUED

NOTIFICATION_SENT

NOTIFICATION_DELIVERED

NOTIFICATION_FAILED

NOTIFICATION_RETRIED

NOTIFICATION_SUPPRESSED

TEMPLATE_UPDATED

TEST_NOTIFICATION_SENT
```

---

# 267. Notification Error Catalog

```text
NOTIFICATION_NOT_FOUND

TEMPLATE_NOT_FOUND

INVALID_TEMPLATE_VARIABLE

INVALID_CHANNEL

INVALID_RECIPIENT

DELIVERY_FAILED

RATE_LIMIT_EXCEEDED

DEAD_LETTER_QUEUE_ENTRY

NOTIFICATION_PERMISSION_DENIED
```

---

# 268. Permissions Matrix

## Owner

```text
notifications.*

notificationTemplates.*
```

---

## Manager

```text
notifications.view
```

---

## Manager Restrictions

Managers cannot:

```text
Modify Templates

Change Preferences

Retry Notifications

Send Test Notifications
```

---

# 269. Security Rules

## Rule 1

Provider credentials shall be encrypted.

---

## Rule 2

Provider credentials shall never appear in API responses.

---

## Rule 3

Provider credentials shall never appear in logs.

---

## Rule 4

Notification history shall be immutable.

---

# 270. Design Principles

1. Queue-first architecture.
2. Delivery failures must never block business workflows.
3. Templates are versioned.
4. Notifications are auditable.
5. Retries are automatic.
6. Notification history is permanent.
7. Idempotency is mandatory.
8. Rate limiting is mandatory.
9. Notification preferences are configurable.
10. Communication behavior must be configurable without deployment.

---

# 271. Part 8 Completion Statement

Notification & Communication Module Status:

```text
FROZEN
```

Future changes require formal change requests.

---

# Next Section

Part 9 — Audit Logging, Monitoring & System Operations APIs

Will define:

* Audit Log Framework
* Audit Storage
* Audit Search APIs
* System Monitoring
* Health Checks
* Background Jobs
* Scheduler APIs
* Operational Metrics
* Error Tracking
* Administrative Operations

# 03_API_SPECIFICATION.md

# PART 9 — AUDIT LOGGING, MONITORING & SYSTEM OPERATIONS API SPECIFICATION

Version: 1.0

Status: APPROVED

Document Type: AUTHORITATIVE API CONTRACT

Parent Module: Operations & Platform Management

Depends On:

* Authentication Module
* Booking Module
* Financial Module
* Notification Module
* Settings Module

---

# 272. Purpose

The Operations Module governs:

* Audit Logging
* Audit Search
* Audit Exports
* Background Jobs
* Job Monitoring
* Health Checks
* Error Tracking
* API Metrics
* Queue Monitoring
* Maintenance Mode
* Data Integrity Validation

This module provides operational visibility and traceability across the platform.

---

# 273. Audit Architecture

## Design Principles

Audit logs shall be:

```text
Permanent

Immutable

Searchable

Exportable
```

---

## Audit Retention

```text
Permanent
```

No deletion support.

---

## Audit Modification Rule

Audit records shall never be edited.

---

# 274. Audit Entity

## Structure

```json
{
  "_id": "ObjectId",

  "correlationId": "req_abc123",

  "actorType": "OWNER",

  "actorId": "userId",

  "action": "BOOKING_UPDATED",

  "entityType": "BOOKING",

  "entityId": "BOOK-000001",

  "entityVersion": 7,

  "before": {},

  "after": {},

  "createdAt": "timestamp"
}
```

---

# 275. Actor Types

## Supported Values

```text
OWNER

MANAGER

SYSTEM
```

---

## Purpose

Allow attribution of automated actions.

Example:

```text
PAYMENT_EXPIRED
```

Created By:

```text
SYSTEM
```

---

# 276. Correlation IDs

## Purpose

Trace a request across:

* API Logs
* Audit Logs
* Background Jobs
* Notification Queue

---

## Format

```text
req_xxxxxxxxx
```

---

## Rule

Every API request shall generate a correlation ID.

---

# 277. Before / After Snapshots

## Required For

```text
BOOKING

CUSTOMER

SETTINGS

USER

CONSOLE
```

Update operations only.

---

## Purpose

Enable complete change reconstruction.

---

# 278. Audit Search API

## Endpoint

```http
GET /api/v1/audit
```

---

## Permission

```text
audit.view
```

Owner Only.

---

## Filters

```http
?action=

?entityType=

?entityId=

?actorId=

?startDate=

?endDate=
```

---

## Pagination

```http
?page=1

&pageSize=50
```

---

# 279. Audit Details API

## Endpoint

```http
GET /api/v1/audit/:auditId
```

---

## Permission

```text
audit.view
```

Owner Only.

---

# 280. Audit Export API

## Endpoint

```http
GET /api/v1/audit/export
```

---

## Permission

```text
audit.export
```

Owner Only.

---

## Supported Formats

```text
CSV

XLSX
```

---

# 281. Background Job Registry

## Supported Jobs

```text
PAYMENT_EXPIRY

BOOKING_REMINDER

NOTIFICATION_RETRY

NO_SHOW_CHECK

DAILY_RECONCILIATION
```

---

# 282. Job Entity

## Structure

```json
{
  "_id": "ObjectId",

  "jobName": "PAYMENT_EXPIRY",

  "status": "SUCCESS",

  "startedAt": "timestamp",

  "completedAt": "timestamp",

  "attempts": 1
}
```

---

# 283. Job Status Model

## Supported Values

```text
PENDING

RUNNING

SUCCESS

FAILED

RETRYING
```

---

# 284. Job Retry Policy

## Maximum Attempts

```text
3
```

---

## Backoff Strategy

```text
Exponential Backoff
```

---

## Failure Rule

After maximum retries:

```text
FAILED
```

---

# 285. Job History API

## Endpoint

```http
GET /api/v1/jobs
```

---

## Permission

```text
jobs.view
```

Owner Only.

---

## Filters

```http
?jobName=

?status=

?startDate=

?endDate=
```

---

# 286. Job Details API

## Endpoint

```http
GET /api/v1/jobs/:jobId
```

---

## Permission

```text
jobs.view
```

Owner Only.

---

# 287. Health Status Model

## Supported Values

```text
HEALTHY

DEGRADED

UNHEALTHY
```

---

# 288. System Health API

## Endpoint

```http
GET /api/v1/system/health
```

---

## Authentication

Internal

---

## Response

```json
{
  "status": "HEALTHY",

  "checks": {
    "application": "HEALTHY",

    "mongodb": "HEALTHY",

    "redis": "HEALTHY",

    "notificationQueue": "HEALTHY"
  }
}
```

---

# 289. Application Health API

## Endpoint

```http
GET /api/v1/system/health/application
```

---

# 290. MongoDB Health API

## Endpoint

```http
GET /api/v1/system/health/mongodb
```

---

# 291. Redis Health API

## Endpoint

```http
GET /api/v1/system/health/redis
```

---

# 292. Queue Health API

## Endpoint

```http
GET /api/v1/system/health/queue
```

---

# 293. Queue Monitoring API

## Endpoint

```http
GET /api/v1/system/queues
```

---

## Permission

```text
system.monitor
```

Owner Only.

---

## Response

```json
{
  "notificationQueue": {
    "pending": 10,

    "processing": 2,

    "failed": 1,

    "deadLetter": 0
  }
}
```

---

# 294. Error Tracking Entity

## Structure

```json
{
  "_id": "ObjectId",

  "errorCode": "PAYMENT_FAILURE",

  "message": "...",

  "stack": "...",

  "correlationId": "...",

  "createdAt": "timestamp"
}
```

---

## Retention

```text
90 Days
```

---

# 295. Error Log API

## Endpoint

```http
GET /api/v1/system/errors
```

---

## Permission

```text
system.errors
```

Owner Only.

---

# 296. API Metrics Entity

## Stored Metrics

```text
Request Count

Average Response Time

Error Count

Endpoint Usage
```

---

# 297. API Metrics API

## Endpoint

```http
GET /api/v1/system/metrics/api
```

---

## Permission

```text
system.monitor
```

Owner Only.

---

# 298. Business Metrics API

## Endpoint

```http
GET /api/v1/system/metrics/business
```

---

## Response

```json
{
  "bookingsCreated": 500,

  "walkInBookings": 200,

  "onlineBookings": 300,

  "paymentsVerified": 450,

  "refundsIssued": 12,

  "notificationsSent": 3000
}
```

---

# 299. Maintenance Mode

## Purpose

Temporarily disable customer-facing functionality.

---

## Structure

```json
{
  "maintenanceMode": false
}
```

---

## Behavior

### Enabled

```text
Public APIs Disabled
```

---

### Allowed

```text
Admin APIs

Health APIs
```

---

# 300. Maintenance Mode API

## Endpoint

```http
PATCH /api/v1/system/maintenance
```

---

## Permission

```text
system.maintenance
```

Owner Only.

---

## Request

```json
{
  "maintenanceMode": true
}
```

---

# 301. Data Integrity Framework

## Purpose

Detect data inconsistencies.

---

## Daily Validation Checks

```text
Booking ↔ Customer

Payment ↔ Booking

Ledger ↔ Payment

Refund ↔ Ledger
```

---

# 302. Data Integrity Report API

## Endpoint

```http
GET /api/v1/system/integrity
```

---

## Permission

```text
system.integrity
```

Owner Only.

---

## Response

```json
{
  "status": "PASSED",

  "issues": []
}
```

---

# 303. Operational Audit Events

## Mandatory Events

```text
AUDIT_EXPORTED

JOB_STARTED

JOB_COMPLETED

JOB_FAILED

SYSTEM_HEALTH_CHECK

MAINTENANCE_ENABLED

MAINTENANCE_DISABLED

INTEGRITY_CHECK_EXECUTED
```

---

# 304. Operations Error Catalog

```text
AUDIT_NOT_FOUND

JOB_NOT_FOUND

INVALID_JOB_STATUS

SYSTEM_UNHEALTHY

QUEUE_UNAVAILABLE

INTEGRITY_CHECK_FAILED

EXPORT_FORMAT_NOT_SUPPORTED

MAINTENANCE_MODE_ACTIVE

SYSTEM_PERMISSION_DENIED
```

---

# 305. Permissions Matrix

## Owner

```text
audit.*

jobs.*

system.*

monitoring.*
```

---

## Manager

```text
No Operational Permissions
```

Managers shall not access:

```text
Audit Logs

Health Checks

Error Logs

Maintenance Mode

Data Integrity Reports
```

---

# 306. Security Rules

1. Audit logs are immutable.
2. Audit logs are permanent.
3. Correlation IDs are mandatory.
4. Background jobs are auditable.
5. Health endpoints are protected.
6. Error logs are restricted.
7. Operational controls are Owner-only.
8. Maintenance mode changes are audited.
9. Integrity checks are auditable.
10. Operational history shall never be lost.

---

# 307. Design Principles

1. Every action must be traceable.
2. Every system event must be attributable.
3. Every failure must be diagnosable.
4. Monitoring must be proactive.
5. Operational visibility is mandatory.
6. Data consistency is continuously verified.
7. Business operations must be measurable.
8. Platform health must be observable.
9. Administrative actions must be audited.
10. Platform history shall never be lost.

---

# 308. Part 9 Completion Statement

Operations & Platform Management Module Status:

```text
FROZEN
```

Future changes require formal change requests.

---

# API Specification Completion Status

```text
Part 1  ✓
Part 2  ✓
Part 3  ✓
Part 4A ✓
Part 4B ✓
Part 5A ✓
Part 5B ✓
Part 5C ✓
Part 6  ✓
Part 7  ✓
Part 8  ✓
Part 9  ✓
```
# API SPECIFICATION AMENDMENT

# API-AMD-001A — PUBLIC BOOKING CALENDAR API

Version: 1.0

Status: APPROVED

Document Type: API Specification Amendment

Parent Amendment:

```text
API-AMD-001
```

---

# 16. Public Booking Calendar API

## Purpose

Provide customer-safe timeline availability data for public website consumption.

The endpoint shall support:

```text
Homepage Availability Widget

Future Calendar Views

Future Date Pickers

Booking Availability Validation
```

---

# 17. Endpoint

```http
GET /api/v1/public/booking-calendar
```

---

## Authentication

Public

---

## Query Parameters

```http
?date=2026-06-19
```

---

## Validation

### Date Required

```text
Yes
```

---

### Date Format

```text
YYYY-MM-DD
```

---

### Maximum Future Window

```text
30 Days
```

configurable through settings.

---

# 18. Response Structure

```json
{
  "success": true,
  "data": {
    "date": "2026-06-19",
    "operatingHours": {
      "open": "10:00",
      "close": "22:00"
    },
    "slots": [
      {
        "startTime": "10:00",
        "endTime": "10:30",
        "availableSlots": 2
      },
      {
        "startTime": "10:30",
        "endTime": "11:00",
        "availableSlots": 1
      },
      {
        "startTime": "11:00",
        "endTime": "11:30",
        "availableSlots": 0
      }
    ]
  }
}
```

---

# 19. Time Slot Resolution

## Default Resolution

```text
30 Minutes
```

---

## Future Configuration

May become configurable through settings.

---

# 20. Availability Calculation Rules

Availability shall be calculated using:

```text
Active Console Count

Minus

Occupied Console Capacity
```

---

## Capacity Consuming Statuses

```text
PENDING_PAYMENT_VERIFICATION

CONFIRMED

CHECKED_IN
```

---

## Non-Capacity Statuses

```text
CANCELLED

REJECTED

EXPIRED

NO_SHOW

COMPLETED
```

---

# 21. Public Privacy Rules

The API shall never expose:

```text
Customer Names

Customer Phones

Booking Codes

Payment Information

Console Names

Console IDs

Administrative Data
```

---

# 22. Fully Booked Indicator

If no availability exists:

```json
{
  "startTime": "18:00",
  "endTime": "18:30",
  "availableSlots": 0
}
```

---

# 23. Frontend Usage

This endpoint shall become the primary source for:

```text
Homepage Availability Widget

Availability Summary Widget

Future Calendar Picker

Future Mobile Application
```

---

# 24. Relationship To Internal Timeline

Administrative Timeline:

```text
Console A
10:00–12:00 Ahsan

Console B
15:30–16:30 Aleena
```

Public Calendar:

```text
10:00–12:00
1 Slot Occupied

15:30–16:30
1 Slot Occupied
```

---

# 25. Shared Availability Service

The following components must use the same domain service:

```text
Booking Creation

Booking Validation

Public Availability API

Public Calendar API

Admin Timeline

Conflict Detection
```

---

# 26. Future Compatibility

This API is designed to support future features without breaking changes:

```text
Customer Portal

Mobile Application

Calendar Booking View

Multi-Location Support

Additional Consoles
```

---

# Amendment Status

```text
APPROVED
```

This amendment becomes part of the authoritative Phase 1 API specification and shall be implemented together with API-AMD-001.

