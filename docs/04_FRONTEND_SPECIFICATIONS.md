# 04_FRONTEND_SPECIFICATION.md

# PART 1 — INFORMATION ARCHITECTURE & NAVIGATION SPECIFICATION

Version: 1.0

Status: APPROVED

Document Type: Frontend Specification

Parent Documents:

* MASTER_SRS_v4.0
* DATABASE_DESIGN.md
* API_SPECIFICATION.md
* API_AMENDMENTS.md

---

# 1. Purpose

This document defines:

* Frontend Application Structure
* Route Architecture
* Navigation Hierarchy
* Screen Relationships
* Permission Boundaries
* Public Website Structure
* Administrative Portal Structure

This document serves as the authoritative navigation blueprint for all frontend development.

---

# 2. Frontend Architecture Overview

The platform shall consist of two independent frontend experiences:

```text
Public Website

Administrative Portal
```

Both experiences shall be served from the same application.

---

# 3. Public Website

Purpose:

Provide a frictionless booking experience for customers.

Authentication:

```text
Not Required
```

Customer accounts are not part of Phase 1.

---

# 4. Public Website Route Structure

```text
/

/booking-success

/booking-lookup

/admin/login
```

No additional public routes shall exist in Phase 1.

---

# 5. Public Website Navigation Model

The public website shall operate as a:

```text
Single Page Application Landing Page
```

Navigation shall scroll users to sections on the homepage.

---

# 6. Homepage Sections

The homepage shall contain the following sections in order:

```text
Hero Section

Pricing Section

Gaming Stations Section

Games Library Section

Availability Widget

Booking Form

Location Section

Operating Hours Section

Contact Section

Footer
```

---

# 7. Homepage Navigation

Top navigation shall provide anchors to:

```text
Home

Pricing

Games

Availability

Book Now

Contact
```

---

# 8. Homepage Call To Action

Primary CTA:

```text
Book Now
```

---

## CTA Behaviour

Clicking the CTA shall scroll users directly to:

```text
Booking Form Section
```

---

# 9. Booking Success Page

Route:

```text
/booking-success
```

---

## Purpose

Display:

```text
Booking Code

Booking Summary

Payment Instructions

Payment Expiry Information

Booking Lookup Link
```

---

## Available Actions

```text
Copy Booking Code

View Booking

Return Home
```

---

# 10. Booking Lookup Page

Route:

```text
/booking-lookup
```

---

## Purpose

Allow customers to view booking information without creating an account.

---

## Required Inputs

```text
Booking Code

Mobile Number
```

---

## Displayed Information

```text
Booking Status

Payment Status

Booking Date

Booking Time

Duration

Number Of Players
```

---

# 11. Administrative Portal

Purpose:

Provide operational management of the business.

Authentication:

```text
Required
```

Administrative authentication is governed by the API Security Specification.

---

# 12. Administrative Portal Layout

Desktop Layout Structure:

```text
Sidebar

Header

Main Content Area
```

---

## Sidebar

Persistent.

Collapsible.

Role-aware.

---

## Header

Displays:

```text
Current User

Role

Notifications

Quick Actions
```

---

# 13. Role-Based Navigation

Navigation shall be generated according to permissions.

Unauthorized modules shall not be displayed.

---

# 14. Owner Navigation

```text
Dashboard

Bookings

Customers

Payments

Reports

Notifications

Settings

Users

Audit Logs

Operations
```

---

# 15. Manager Navigation

```text
Dashboard

Bookings

Customers

Payments
```

Managers shall not have access to administrative modules.

---

# 16. Dashboard Route

```text
/admin/dashboard
```

---

## Purpose

Operational overview of the business.

---

## Primary Component

```text
Console Availability Timeline
```

---

## Supporting Components

```text
Pending Actions

Current Sessions

Upcoming Bookings

Daily KPIs

Recent Activity
```

---

# 17. Booking Module Routes

```text
/admin/bookings

/admin/bookings/new

/admin/bookings/:bookingId
```

---

## Booking List

Search and manage bookings.

---

## Create Booking

Create walk-in bookings.

---

## Booking Details

Manage an individual booking.

---

# 18. Customer Module Routes

```text
/admin/customers

/admin/customers/:customerId
```

---

## Customer List

View and search customers.

---

## Customer Details

Display:

```text
Profile

Booking History

Payment History

Credits

No Show History
```

---

# 19. Payment Module Routes

```text
/admin/payments

/admin/payments/:paymentId
```

---

## Purpose

Payment verification and payment history management.

---

# 20. Reports Module Routes

Owner Only.

```text
/admin/reports

/admin/reports/revenue

/admin/reports/occupancy

/admin/reports/customers

/admin/reports/reconciliation
```

---

# 21. Notification Module Routes

Owner Only.

```text
/admin/notifications

/admin/notification-templates
```

---

# 22. Settings Module Routes

Owner Only.

```text
/admin/settings/business

/admin/settings/pricing

/admin/settings/deposits

/admin/settings/booking-rules

/admin/settings/consoles

/admin/settings/notifications

/admin/settings/upi

/admin/settings/features
```

---

# 23. User Management Routes

Owner Only.

```text
/admin/users

/admin/users/new

/admin/users/:userId
```

---

# 24. Audit Routes

Owner Only.

```text
/admin/audit

/admin/audit/:auditId
```

---

# 25. Operations Routes

Owner Only.

```text
/admin/operations/jobs

/admin/operations/errors

/admin/operations/queues

/admin/operations/health

/admin/operations/integrity
```

---

# 26. Navigation Principles

## Principle 1

Every major feature shall be reachable within:

```text
Maximum Two Clicks
```

---

## Principle 2

Navigation shall be role-aware.

---

## Principle 3

Navigation shall prioritize operational workflows.

---

## Principle 4

Unauthorized features shall not be displayed.

---

## Principle 5

Frequently used workflows shall be accessible directly from the dashboard.

---

# 27. Dashboard Priority Order

The dashboard shall prioritize information in the following order:

```text
1. Console Timeline

2. Pending Actions

3. Current Sessions

4. Upcoming Bookings

5. KPIs

6. Recent Activity
```

---

# 28. Timeline Architecture

The Console Timeline shall be the primary operational interface.

Purpose:

```text
Monitor Availability

Monitor Occupancy

Monitor Upcoming Sessions

Monitor Booking Status
```

---

## Future Compatibility

Timeline architecture shall support:

```text
Additional Consoles

Additional Locations

Drag And Drop Reassignment
```

without requiring redesign.

---

# 29. Permission Boundaries

All screens shall be permission-driven.

The frontend shall:

```text
Hide Unauthorized Routes

Hide Unauthorized Navigation

Hide Unauthorized Actions
```

---

# 30. Future Expansion

Reserved for:

```text
Customer Portal

Mobile Application

Multi-Location Support

Loyalty Program
```

---

# 31. Part 1 Completion Statement

Information Architecture & Navigation Specification Status:

```text
FROZEN
```

Changes require formal change requests.

---

# Next Section

Part 2 — Design System & UI Standards

Will define:

* Design Language
* Color System
* Typography
* Layout Rules
* Component Standards
* Timeline Standards
* Form Standards
* Table Standards
* Responsive Behaviour
* Accessibility Requirements

# 04_FRONTEND_SPECIFICATION.md

# PART 2 — DESIGN SYSTEM & UI STANDARDS

Version: 2.0

Status: APPROVED

Document Type: Frontend Specification

Parent Document:

04_FRONTEND_SPECIFICATION.md

Depends On:

* Part 1 — Information Architecture & Navigation
* MASTER_SRS_v4.0
* API Specification

---

# 1. Purpose

This document defines the visual language, interaction patterns, responsive behavior, accessibility standards, and component design rules for all frontend development.

This document is the authoritative source of truth for:

* UI Design
* UX Behavior
* Design System
* Responsive Design
* Component Standards

All frontend screens shall comply with this specification.

---

# 2. Design Philosophy

The platform shall prioritize:

```text
Operational Efficiency

Fast Booking Flow

Low Cognitive Load

High Readability

Touch Friendly Interactions

Consistent User Experience
```

---

## Design Characteristics

```text
Modern

Minimal

Professional

Gaming Oriented

Dark Theme Focused

Performance Focused
```

---

# 3. Theme Strategy

## Primary Theme

```text
Dark Theme
```

Mandatory.

All Phase 1 screens shall be designed and implemented using the dark theme.

The dark theme shall be considered the reference implementation.

---

## Dark Theme Objectives

```text
Gaming Atmosphere

Reduced Eye Strain

High Contrast

Modern Appearance
```

---

## Light Theme

```text
Optional
```

Not required for Phase 1.

Future implementation shall not alter approved dark-theme design standards.

---

## Theme Priority

```text
Dark Theme

↓

Light Theme (Future)
```

---

# 4. Responsive Design Strategy

The platform shall use different responsive strategies for the Public Website and Administrative Portal.

---

# 5. Public Website Responsive Strategy

The public website shall be designed using a:

```text
Mobile First
```

approach.

---

## Design Order

```text
1. Mobile

2. Tablet

3. Desktop
```

---

## Reference Experience

The mobile experience shall be considered the primary customer experience.

All public website screens shall be designed for mobile first and expanded for larger devices.

---

## Business Justification

Most customer traffic is expected from:

```text
Mobile Browsers

Instagram

WhatsApp

Google Maps

QR Codes

Direct Links
```

---

# 6. Administrative Portal Responsive Strategy

The administrative portal shall be designed using a:

```text
Desktop First
```

approach.

---

## Design Order

```text
1. Desktop

2. Tablet

3. Mobile
```

---

## Reference Experience

The desktop experience shall be considered the primary administrative experience.

---

## Business Justification

Administrative workflows involve:

```text
Timeline Management

Booking Management

Customer Management

Payment Verification

Reporting
```

which are significantly more efficient on larger displays.

---

# 7. Touch Interaction Requirements

Public website interactions shall be optimized for touch devices.

---

## Minimum Touch Target

```text
44px × 44px
```

---

## Applies To

```text
Buttons

Links

Navigation Items

Booking Actions

Date Pickers

Time Selectors

Availability Widgets
```

---

# 8. Technology Standards

## Frontend Framework

```text
React
```

---

## Styling Framework

```text
TailwindCSS
```

---

## Component Library

```text
shadcn/ui
```

---

## Icons

```text
lucide-react
```

---

## Forms

```text
React Hook Form
```

---

## Validation

```text
Zod
```

---

## Charts

```text
Recharts
```

---

# 9. Color System

## Primary Brand Color

```text
Cyan
```

Used for:

```text
Primary Actions

Highlights

Links

Active States
```

---

## Secondary Accent

```text
Blue
```

Used for:

```text
Secondary Highlights

Informational Components
```

---

## Success

```text
Green
```

---

## Warning

```text
Amber
```

---

## Danger

```text
Red
```

---

## Neutral Palette

```text
Slate
```

Used throughout the application.

---

# 10. Booking Status Color Standards

## Pending Payment

```text
Amber
```

---

## Pending Verification

```text
Amber
```

---

## Confirmed

```text
Green
```

---

## Checked In

```text
Blue
```

---

## Completed

```text
Slate
```

---

## Cancelled

```text
Red
```

---

## No Show

```text
Red
```

---

## Expired

```text
Slate
```

---

# 11. Typography Standards

## Primary Font Family

```text
Inter
```

---

## Heading Hierarchy

### H1

Page Titles

---

### H2

Major Sections

---

### H3

Cards

---

### H4

Widgets

---

## Body Text

Standard application content.

---

## Caption Text

Metadata and supporting information.

---

# 12. Spacing System

Approved spacing scale:

```text
4

8

12

16

24

32

48

64

96
```

Pixels.

---

## Rule

Custom spacing values are prohibited unless explicitly approved.

---

# 13. Border Radius System

## Small

```text
8px
```

---

## Medium

```text
12px
```

---

## Large

```text
16px
```

---

## Extra Large

```text
24px
```

---

# 14. Layout Standards

## Public Website

Maximum content width:

```text
1280px
```

---

## Administrative Portal

Maximum content width:

```text
1440px
```

---

## Minimum Page Padding

```text
24px
```

Desktop.

---

## Mobile Padding

```text
16px
```

---

# 15. Responsive Breakpoints

## Mobile

```text
0px - 767px
```

---

## Tablet

```text
768px - 1023px
```

---

## Desktop

```text
1024px+
```

---

# 16. Card Standards

Cards shall be used for:

```text
Statistics

Bookings

Customers

Reports

Dashboard Widgets
```

---

## Card Structure

```text
Header

Content

Optional Footer
```

---

# 17. Button Standards

## Primary Buttons

Used for:

```text
Create

Save

Confirm

Submit

Book Now
```

---

## Secondary Buttons

Used for:

```text
Cancel

Back

Close
```

---

## Danger Buttons

Used for:

```text
Delete

Refund

Reject

Deactivate
```

---

# 18. Form Standards

## Validation Strategy

```text
Inline Validation
```

Mandatory.

---

## Error Placement

Directly below the affected field.

---

## Required Fields

Must display:

```text
*
```

indicator.

---

## Label Requirements

Every field must have a visible label.

Placeholders shall never replace labels.

---

# 19. Table Standards

Every administrative table shall support:

```text
Search

Filters

Sorting

Pagination
```

---

## Optional Features

```text
Export

Column Visibility
```

where permitted.

---

# 20. Search Standards

## Position

```text
Top Left
```

above tables.

---

## Debounce

```text
300ms
```

---

# 21. Drawer Standards

## Position

```text
Right Side
```

---

## Usage

```text
Booking Details

Customer Details

Payment Details

Quick Actions
```

---

## Desktop Width

```text
40%
```

Maximum.

---

## Mobile Width

```text
100%
```

---

# 22. Modal Standards

Use modals only for:

```text
Confirmation Dialogs

Destructive Actions

Simple Forms
```

---

## Avoid

```text
Complex Workflows

Large Editing Interfaces
```

---

# 23. Timeline Standards

The Console Timeline is the primary operational component of the platform.

---

## Timeline Type

```text
Horizontal Time Grid
```

---

## Rows

```text
Console 1

Console 2

Console 3

...
```

---

## Columns

```text
30 Minute Time Slots
```

---

## Current Time Marker

Mandatory.

Updates automatically.

---

## Refresh Interval

```text
30 Seconds
```

---

# 24. Timeline Booking Blocks

Display:

```text
Customer Name

Booking Code

Player Count

Status
```

---

## Hover Information

Display:

```text
Duration

Booking Time

Payment Status
```

---

## Click Action

Open Booking Drawer.

Never navigate away from dashboard.

---

# 25. Loading Standards

Use:

```text
Skeleton Loaders
```

throughout the application.

---

## Avoid

```text
Full Page Spinners
```

except during initial application startup.

---

# 26. Empty State Standards

Every screen shall support:

```text
No Data

No Results

No Bookings

No Customers
```

states.

---

# 27. Toast Standards

## Position

```text
Top Right
```

Desktop.

---

## Duration

```text
5 Seconds
```

---

## Types

```text
Success

Warning

Error

Information
```

---

# 28. Accessibility Standards

## Keyboard Navigation

Mandatory.

---

## Focus Indicators

Mandatory.

---

## Screen Reader Support

Required for:

```text
Forms

Buttons

Navigation

Dialogs
```

---

## Contrast Requirements

```text
WCAG AA
```

minimum.

---

# 29. Permission Driven UI

Unauthorized functionality shall:

```text
Not Render
```

---

## Examples

Managers shall not see:

```text
Reports

Users

Settings

Audit

Operations
```

---

# 30. Animation Standards

## Duration

```text
150ms – 250ms
```

---

## Allowed

```text
Hover

Dropdown

Drawer

Modal

Tooltip
```

---

## Avoid

```text
Heavy Motion

Large Page Transitions

Decorative Animations
```

---

# 31. Error Pages

Dedicated pages shall exist for:

```text
401 Unauthorized

403 Forbidden

404 Not Found

500 Internal Server Error
```

---

# 32. Design Principles

1. Dark Theme First.
2. Mobile First Public Website.
3. Desktop First Admin Portal.
4. Timeline Is The Primary Operational Interface.
5. Touch Friendly Interactions.
6. Consistency Over Creativity.
7. Fast Booking Experience.
8. Minimize Clicks.
9. Accessibility Matters.
10. Every Interaction Must Feel Predictable.

---

# 33. Part 2 Completion Statement

Design System & UI Standards Status:

```text
FROZEN
```

All future frontend screens shall comply with this specification.

---

# Next Section

Part 3 — Public Website Screen Specifications

Will define:

* Homepage Layout
* Hero Section
* Pricing Section
* Games Section
* Availability Widget
* Booking Form
* Booking Success Page
* Booking Lookup Page
* Mobile Layout
* Validation Rules
* Public User Flows

# 04_FRONTEND_SPECIFICATION.md

# PART 3 — PUBLIC WEBSITE SCREEN SPECIFICATIONS

Version: 1.0

Status: APPROVED

Document Type: Frontend Specification

Parent Document:

04_FRONTEND_SPECIFICATION.md

Depends On:

* Part 1 — Information Architecture & Navigation
* Part 2 — Design System & UI Standards
* MASTER_SRS_v4.0
* API Specification
* API Amendments

---

# 1. Purpose

This document defines all customer-facing screens for Phase 1.

The public website shall provide:

* Gaming Café Information
* Real-Time Availability
* Booking Creation
* Booking Lookup
* Booking Confirmation

Customer authentication is not part of Phase 1.

---

# 2. Public Website Architecture

The public website shall consist of:

```text
Home Page

Booking Success Page

Booking Lookup Page

Admin Login Page
```

---

# 3. Design Priority

The public website shall be:

```text
Dark Theme First

Mobile First

Touch Optimized
```

---

# 4. Primary Customer Journey

```text
Homepage
    ↓
Availability Review
    ↓
Booking Form
    ↓
Deposit Payment
    ↓
Booking Submission
    ↓
Booking Success
```

---

# 5. Homepage Overview

Route:

```text
/
```

---

## Purpose

Provide:

```text
Business Information

Availability Visibility

Booking Capability
```

without requiring navigation away from the homepage.

---

# 6. Homepage Section Order

The homepage shall contain the following sections in order:

```text
Hero Section

Pricing Section

Gaming Stations Section

Games Section

Availability Section

Booking Section

Location Section

Operating Hours Section

Contact Section

Footer
```

---

# 7. Header Navigation

## Mobile

Hamburger Menu.

---

## Desktop

Navigation Links:

```text
Home

Pricing

Games

Availability

Book Now

Contact
```

---

## CTA

Primary CTA:

```text
Book Now
```

---

## CTA Behavior

Scroll to:

```text
Booking Section
```

---

# 8. Hero Section

## Purpose

Immediately communicate:

```text
Gaming Experience

Pricing

Booking CTA
```

---

## Content

### Headline

Example:

```text
Play PS5 Games With Friends
```

---

### Supporting Text

Business description.

---

### CTA

```text
Book Now
```

---

### Secondary CTA

```text
View Availability
```

---

# 9. Pricing Section

## Purpose

Display pricing transparency.

---

## Content

```text
Price Per Person

Price Per Hour

Deposit Requirements

Operating Rules
```

---

## Display Format

Pricing Cards.

---

# 10. Gaming Stations Section

## Purpose

Show available gaming equipment.

---

## Content

```text
Console Images

Console Features

Player Capacity
```

---

## Display Format

Responsive Cards.

---

# 11. Games Section

## Purpose

Show supported games.

---

## Content

```text
Game Artwork

Game Name

Supported Players
```

---

## Mobile Layout

Horizontal Scroll.

---

## Desktop Layout

Grid Layout.

---

# 12. Availability Section

## Purpose

Provide real-time booking visibility before customers begin the booking process.

---

# 13. Availability Widget

Availability shall be displayed using:

```text
Timeline / Calendar View
```

not simple availability badges.

---

## Reason

Customers must understand:

```text
When Slots Are Available

When Slots Are Fully Booked

Future Availability
```

before completing the booking form.

---

# 14. Availability Data Source

Source:

```text
GET /api/v1/public/booking-calendar
```

---

## Refresh Interval

```text
60 Seconds
```

---

# 15. Availability Widget Structure

Display:

```text
Date

Operating Hours

Availability Timeline
```

---

## Example

```text
Today

10:00 - 10:30
2 Slots Available

10:30 - 11:00
1 Slot Available

11:00 - 11:30
Fully Booked
```

---

# 16. Availability Colors

## Available

```text
Green
```

---

## Limited Availability

```text
Amber
```

---

## Fully Booked

```text
Red
```

---

# 17. Availability Privacy Rules

Must never display:

```text
Customer Names

Booking Codes

Phone Numbers

Console Names

Internal Information
```

---

# 18. Booking Section

## Purpose

Allow customers to create reservations.

---

# 19. Booking Form

Fields:

```text
Customer Name

Mobile Number

Booking Date

Start Time

Duration

Number Of Players

Special Notes (Optional)
```

---

## Required Fields

```text
Customer Name

Mobile Number

Booking Date

Start Time

Duration

Number Of Players
```

---

# 20. Mobile Number Validation

Rules:

```text
10 Digits

Numbers Only

Required
```

---

# 21. Date Validation

Booking date:

```text
Today

Through

Configured Future Window
```

---

## Past Dates

Not Allowed.

---

# 22. Time Selection

Time selector shall only display:

```text
Available Time Slots
```

for the selected date.

---

# 23. Availability Integration

Changing:

```text
Date

Duration

Player Count
```

shall refresh availability information.

---

# 24. Booking Summary Card

Displayed before submission.

---

## Information

```text
Booking Date

Start Time

Duration

Players

Booking Amount

Deposit Amount
```

---

# 25. Deposit Information Panel

Must display:

```text
Deposit Required

Deposit Type

Deposit Amount
```

---

## Example

```text
Deposit Required: ₹100
```

---

# 26. Booking Submission

Primary Button:

```text
Reserve Slot
```

---

## Workflow

```text
Validate Form
    ↓
Check Availability
    ↓
Create Booking
    ↓
Navigate To Success Page
```

---

# 27. Booking Success Page

Route:

```text
/booking-success
```

---

## Purpose

Provide booking confirmation.

---

## Information Displayed

```text
Booking Code

Booking Date

Start Time

Duration

Players

Payment Instructions

Payment Deadline
```

---

# 28. Booking Code

Must be visually emphasized.

---

## Actions

```text
Copy Booking Code

Share Booking Code
```

---

# 29. Payment Instructions

Display:

```text
UPI ID

UPI QR Code

Amount To Pay

Instructions
```

---

## Warning Message

Display:

```text
Booking Will Expire If Deposit Is Not Verified
```

---

# 30. Booking Lookup Page

Route:

```text
/booking-lookup
```

---

## Purpose

Allow customers to retrieve booking information without creating an account.

---

# 31. Lookup Form

Fields:

```text
Booking Code

Mobile Number
```

---

## Submit Button

```text
Lookup Booking
```

---

# 32. Lookup Results

Display:

```text
Booking Status

Payment Status

Booking Date

Booking Time

Duration

Player Count
```

---

# 33. Booking Status Display

Supported States:

```text
Pending Payment

Pending Verification

Confirmed

Checked In

Completed

Cancelled

No Show

Expired
```

---

# 34. Location Section

## Purpose

Help customers reach the venue.

---

## Content

```text
Address

Embedded Map

Directions Link
```

---

## Mobile

Open native maps application when possible.

---

# 35. Operating Hours Section

Display:

```text
Day

Opening Time

Closing Time
```

---

# 36. Contact Section

Display:

```text
Phone Number

WhatsApp Link

Instagram Link

Email Address
```

---

## Actions

One-Tap Contact.

---

# 37. Footer

Display:

```text
Business Name

Copyright

Contact Links

Admin Login
```

---

# 38. Loading States

Use:

```text
Skeleton Loading
```

throughout public pages.

---

# 39. Error Handling

Provide clear messages for:

```text
Booking Unavailable

Booking Lookup Failed

Network Failure

Invalid Input
```

---

# 40. Mobile Optimization Requirements

The homepage shall be fully usable using one hand on a mobile device.

---

## Mobile Priorities

```text
Fast Load Time

Large Touch Targets

Minimal Typing

Simple Navigation
```

---

# 41. Performance Requirements

Homepage First Contentful Paint target:

```text
< 2 Seconds
```

on modern mobile networks.

---

# 42. Accessibility Requirements

Comply with Part 2 standards.

---

# 43. Design Principles

1. Mobile First.
2. Dark Theme First.
3. Booking Within Minutes.
4. Minimal Friction.
5. Availability Visible Before Booking.
6. No Customer Accounts.
7. Touch Optimized.
8. Fast Loading.
9. Transparent Pricing.
10. Clear Booking Status Visibility.

---

# 44. Part 3 Completion Statement

Public Website Screen Specification Status:

```text
FROZEN
```

All public-facing screens shall comply with this document.

---

# Next Section

Part 4 — Administrative Dashboard Screen Specifications

Will define:

* Dashboard Layout
* Console Timeline
* KPI Widgets
* Pending Actions
* Current Sessions
* Upcoming Bookings
* Quick Actions
* Dashboard Permissions
* Mobile Dashboard Behavior
* Real-Time Refresh Requirements

# 04_FRONTEND_SPECIFICATION.md

# PART 4 — ADMINISTRATIVE DASHBOARD SCREEN SPECIFICATIONS

Version: 1.0

Status: APPROVED

Document Type: Frontend Specification

Parent Document:

04_FRONTEND_SPECIFICATION.md

Depends On:

* Part 1 — Information Architecture & Navigation
* Part 2 — Design System & UI Standards
* Part 3 — Public Website Screens
* MASTER_SRS_v4.0
* API Specification

---

# 1. Purpose

The Administrative Dashboard shall serve as the primary operational control center for the gaming café.

The dashboard shall provide immediate visibility into:

* Console Availability
* Current Occupancy
* Active Sessions
* Upcoming Bookings
* Pending Actions
* Daily Business Metrics

---

# 2. Route

```text
/admin/dashboard
```

---

# 3. Dashboard Design Principles

The dashboard shall prioritize:

```text
Operational Visibility

Fast Decision Making

Minimal Navigation

Real-Time Status Monitoring

Single Screen Management
```

---

# 4. Dashboard User Roles

## Owner

Full dashboard access.

---

## Manager

Operational dashboard access.

No access to:

```text
Reports

Users

Audit

Operations

System Administration
```

---

# 5. Dashboard Layout Structure

Desktop layout:

```text
Dashboard Header

KPI Row

Pending Actions

Console Timeline

Current Sessions

Upcoming Bookings

Recent Activity
```

---

# 6. Dashboard Priority Order

The dashboard shall prioritize information in the following order:

```text
1. Console Timeline

2. Pending Actions

3. Current Sessions

4. Upcoming Bookings

5. Daily KPIs

6. Recent Activity
```

---

# 7. Dashboard Refresh Strategy

The dashboard shall update automatically.

---

## Refresh Interval

```text
30 Seconds
```

---

## Manual Refresh

Provide:

```text
Refresh Button
```

---

# 8. Dashboard Header

Display:

```text
Current Date

Current Time

Logged In User

User Role
```

---

## Quick Actions

Provide:

```text
Create Walk-In Booking

Refresh Dashboard
```

---

# 9. KPI Section

Purpose:

Provide a quick business summary.

---

# 10. KPI Widgets

Display:

```text
Today's Revenue

Today's Bookings

Current Occupancy

Pending Payments

Upcoming Sessions

Available Consoles
```

---

## KPI Layout

### Desktop

Single row.

---

### Tablet

Two rows.

---

### Mobile

Stacked cards.

---

# 11. Pending Actions Section

Purpose:

Highlight tasks requiring immediate attention.

---

## Display Priority

```text
Payment Verifications

Bookings Awaiting Approval

Expiring Reservations

Failed Notifications
```

---

## Sorting

Highest priority first.

---

# 12. Pending Action Card

Display:

```text
Action Type

Booking Code

Customer Name

Action Age

Primary Action Button
```

---

# 13. Console Timeline

The Console Timeline is the primary operational component of the platform.

---

## Purpose

Provide real-time visibility into:

```text
Console Availability

Current Sessions

Upcoming Sessions

Booking Allocation

Booking Status
```

---

# 14. Timeline Layout

Timeline type:

```text
Horizontal Time Grid
```

---

## Rows

One row per console.

Example:

```text
Console 1

Console 2

Console 3

Console 4
```

---

## Columns

Time-based columns.

---

## Time Resolution

```text
30 Minutes
```

---

# 15. Timeline Time Range

Display operating hours.

Example:

```text
10:00 AM

↓

10:00 PM
```

---

## Dynamic Configuration

Timeline hours shall be derived from business settings.

---

# 16. Timeline Current Time Marker

Mandatory.

---

## Purpose

Allow staff to immediately determine:

```text
Current Sessions

Upcoming Sessions

Available Capacity
```

---

## Behavior

Move automatically with time.

---

## Refresh Interval

```text
30 Seconds
```

---

# 17. Timeline Booking Blocks

Each booking shall render as a timeline block.

---

## Display Information

```text
Customer Name

Booking Code

Player Count

Booking Status
```

---

## Compact Mode

If space is limited:

```text
Booking Code

Status
```

---

# 18. Timeline Status Colors

## Pending Payment

Amber

---

## Pending Verification

Amber

---

## Confirmed

Green

---

## Checked In

Blue

---

## Completed

Slate

---

## Cancelled

Red

---

## No Show

Red

---

## Expired

Slate

---

# 19. Timeline Hover State

Hovering over a booking shall display:

```text
Customer Name

Mobile Number

Booking Time

Duration

Player Count

Payment Status

Booking Status
```

---

# 20. Timeline Click Behavior

Clicking a booking shall open:

```text
Booking Details Drawer
```

---

## Navigation Rule

Do not navigate away from dashboard.

---

# 21. Timeline Empty Slots

Available periods shall display:

```text
Available
```

indicator.

---

## Color

Low emphasis.

---

# 22. Timeline Scrolling

Horizontal scrolling shall be supported.

---

## Sticky Elements

The following shall remain visible:

```text
Console Names

Timeline Header
```

---

# 23. Future Timeline Compatibility

Timeline architecture shall support:

```text
Additional Consoles

Additional Locations

Drag-And-Drop Assignment
```

without redesign.

---

# 24. Current Sessions Section

Purpose:

Display active gaming sessions.

---

## Display Information

```text
Customer Name

Console

Session Start

Session End

Time Remaining
```

---

## Sort Order

Soonest ending first.

---

# 25. Session Status Indicators

Display:

```text
Active

Ending Soon

Overdue
```

---

# 26. Upcoming Bookings Section

Purpose:

Display near-future reservations.

---

## Time Window

```text
Next 4 Hours
```

---

## Display Information

```text
Booking Code

Customer Name

Start Time

Players

Status
```

---

# 27. Recent Activity Section

Purpose:

Display recent operational events.

---

## Supported Events

```text
Booking Created

Booking Confirmed

Booking Cancelled

Payment Verified

Customer Checked In

Refund Issued
```

---

## Display Count

```text
Last 20 Events
```

---

# 28. Dashboard Filters

Provide:

```text
Date Selector
```

for historical viewing.

---

## Default

```text
Today
```

---

# 29. Walk-In Booking Shortcut

Provide a prominent action button:

```text
Create Walk-In Booking
```

---

## Placement

Dashboard Header.

---

# 30. Booking Details Drawer

Opened from:

```text
Timeline

Current Sessions

Upcoming Bookings
```

---

## Display Tabs

```text
Overview

Payments

Activity Timeline

Notes
```

---

# 31. Dashboard Empty States

Provide empty states for:

```text
No Active Sessions

No Upcoming Bookings

No Pending Actions
```

---

# 32. Dashboard Loading States

Use:

```text
Skeleton Loaders
```

for all dashboard widgets.

---

# 33. Dashboard Error States

Provide clear messages for:

```text
Timeline Load Failure

Booking Load Failure

Metrics Load Failure

Network Failure
```

---

## Recovery Action

```text
Retry Button
```

mandatory.

---

# 34. Mobile Dashboard Behavior

The dashboard is desktop optimized.

---

## Mobile Layout Order

```text
Pending Actions

Current Sessions

Timeline

Upcoming Bookings

KPIs

Recent Activity
```

---

## Timeline Behavior

May switch to:

```text
Vertical Timeline
```

for usability.

---

# 35. Tablet Dashboard Behavior

Maintain timeline-first design.

Reduce visible columns when necessary.

---

# 36. Accessibility Requirements

Comply with Part 2 standards.

---

# 37. Performance Requirements

Dashboard initial load target:

```text
< 3 Seconds
```

---

## Timeline Render Target

```text
< 1 Second
```

for normal business volume.

---

# 38. Operational Design Principles

1. Timeline First.
2. Operations Before Analytics.
3. Immediate Visibility Of Capacity.
4. Minimal Navigation.
5. Real-Time Awareness.
6. Fast Booking Management.
7. Fast Payment Verification.
8. Single Screen Operations.
9. Responsive But Desktop Focused.
10. Dashboard Is The Operational Heart Of The System.

---

# 39. Part 4 Completion Statement

Administrative Dashboard Screen Specification Status:

```text
FROZEN
```

Changes require formal change requests.

---

# Next Section

Part 5 — Booking Management Screen Specifications

Will define:

* Booking List Screen
* Booking Filters
* Booking Search
* Create Walk-In Booking Screen
* Booking Details Screen
* Booking Timeline Integration
* Booking Status Workflows
* Check-In Workflow
* Cancellation Workflow
* Refund Workflow
* Booking Activity Timeline

# 04_FRONTEND_SPECIFICATION.md

# PART 5 — BOOKING MANAGEMENT SCREEN SPECIFICATIONS

Version: 1.0

Status: APPROVED

Document Type: Frontend Specification

Parent Document:

04_FRONTEND_SPECIFICATION.md

Depends On:

* Part 1 — Information Architecture & Navigation
* Part 2 — Design System & UI Standards
* Part 4 — Administrative Dashboard
* MASTER_SRS_v4.0
* API Specification

---

# 1. Purpose

The Booking Management Module shall provide complete lifecycle management for bookings.

Supported workflows:

* View Bookings
* Search Bookings
* Filter Bookings
* Create Walk-In Bookings
* Manage Booking Status
* Verify Payments
* Check-In Customers
* Mark No Shows
* Cancel Bookings
* View Booking History

---

# 2. Routes

```text
/admin/bookings

/admin/bookings/new

/admin/bookings/:bookingId
```

---

# 3. User Access

## Owner

Full access.

---

## Manager

Full booking management access.

---

# 4. Booking Module Layout

Structure:

```text
Page Header

Filters

Booking Table / List

Pagination
```

---

# 5. View Modes

The Booking List page shall support:

```text
Timeline View

List View
```

---

## Default View

```text
Timeline View
```

---

## Toggle Control

Display:

```text
[ Timeline View ] [ List View ]
```

---

# 6. Timeline View

Purpose:

Provide operational booking visibility.

---

## Timeline Source

Same component as dashboard timeline.

---

## Features

```text
Date Navigation

Booking Hover

Booking Drawer

Status Colors

Current Time Marker
```

---

# 7. List View

Purpose:

Provide searchable booking management.

---

## Table Columns

```text
Booking Code

Customer Name

Mobile Number

Booking Date

Start Time

Duration

Players

Amount

Status

Payment Status

Created By

Actions
```

---

# 8. Search

Position:

Top left.

---

## Searchable Fields

```text
Booking Code

Customer Name

Mobile Number
```

---

## Debounce

```text
300ms
```

---

# 9. Filters

Supported filters:

```text
Booking Status

Payment Status

Date Range

Booking Type

Created By
```

---

## Clear Filters

Mandatory.

---

# 10. Booking Status Filters

Supported values:

```text
Pending Payment

Pending Verification

Confirmed

Checked In

Completed

Cancelled

No Show

Expired
```

---

# 11. Payment Status Filters

Supported values:

```text
Pending

Submitted

Verified

Rejected

Refunded
```

---

# 12. Booking Type Filters

Supported values:

```text
Online Booking

Walk-In Booking
```

---

# 13. Sorting

Supported fields:

```text
Booking Date

Created Date

Customer Name

Amount
```

---

# 14. Bulk Actions

Phase 1:

```text
Not Supported
```

---

# 15. Create Walk-In Booking

Route:

```text
/admin/bookings/new
```

---

# 16. Purpose

Allow managers to create bookings directly at the venue.

---

# 17. Walk-In Booking Form

Fields:

```text
Customer Name

Mobile Number

Booking Date

Start Time

Duration

Player Count

Special Notes
```

---

# 18. Walk-In Availability Check

Availability validation shall occur:

```text
Before Save
```

---

## Conflict Handling

Display:

```text
Requested Time Unavailable
```

message.

---

# 19. Walk-In Payment Handling

Supported options:

```text
Paid Immediately

Payment Pending
```

---

# 20. Walk-In Booking Creation

Successful creation shall:

```text
Open Booking Drawer

Display Success Toast

Refresh Timeline
```

---

# 21. Booking Details Screen

Route:

```text
/admin/bookings/:bookingId
```

---

## Access Method

Direct route.

---

## Preferred Access

Booking Drawer.

---

# 22. Booking Details Layout

Structure:

```text
Header

Status Bar

Tabs

Action Panel
```

---

# 23. Header Information

Display:

```text
Booking Code

Customer Name

Booking Status

Payment Status
```

---

# 24. Status Bar

Display:

```text
Booking Status

Payment Status

Created Date

Last Updated
```

---

# 25. Booking Tabs

Display:

```text
Overview

Payments

Activity Timeline

Notes
```

---

# 26. Overview Tab

Display:

```text
Customer Details

Booking Details

Console Assignment

Duration

Player Count

Amount

Deposit Amount
```

---

# 27. Customer Information Card

Display:

```text
Name

Mobile Number

Customer ID
```

---

# 28. Booking Information Card

Display:

```text
Booking Date

Start Time

End Time

Duration

Booking Source
```

---

# 29. Payments Tab

Purpose:

Display all payment activity.

---

## Information

```text
Payment Status

Payment Amount

Verification Status

Verified By

Verification Time
```

---

# 30. Payment Proof

Display:

```text
Uploaded Screenshot
```

when available.

---

## Interaction

Click to enlarge.

---

# 31. Activity Timeline Tab

Purpose:

Provide audit visibility.

---

## Supported Events

```text
Booking Created

Payment Submitted

Payment Verified

Booking Confirmed

Checked In

Completed

Cancelled

Refund Issued
```

---

# 32. Activity Entry Structure

Display:

```text
Timestamp

User

Action

Details
```

---

# 33. Notes Tab

Purpose:

Store internal notes.

---

## Visibility

Owner

Manager

````

only.

---

# 34. Notes Features

Supported actions:

```text
Create Note

Edit Note

Delete Note
````

---

# 35. Booking Action Panel

Display context-sensitive actions.

---

# 36. Pending Payment Actions

Available:

```text
Verify Payment

Reject Payment

Cancel Booking
```

---

# 37. Confirmed Booking Actions

Available:

```text
Check In

Cancel Booking

Add Note
```

---

# 38. Checked-In Booking Actions

Available:

```text
Complete Session

Add Note
```

---

# 39. Completed Booking Actions

Available:

```text
View Only
```

---

# 40. Cancelled Booking Actions

Available:

```text
View Only
```

---

# 41. No Show Actions

Available:

```text
View Only
```

---

# 42. Payment Verification Workflow

Steps:

```text
Review Proof

Approve Or Reject

Confirm Action

Update Status
```

---

## Confirmation Dialog

Mandatory.

---

# 43. Check-In Workflow

Steps:

```text
Open Booking

Click Check-In

Confirm

Update Status
```

---

# 44. Complete Session Workflow

Steps:

```text
Open Booking

Complete Session

Confirm

Update Status
```

---

# 45. No Show Workflow

Purpose:

Handle customers who never arrive.

---

## Trigger

Manual.

---

## Action

```text
Mark As No Show
```

---

# 46. Cancellation Workflow

Initiated by:

```text
Owner

Manager
```

---

## Confirmation Required

Yes.

---

## Dialog Content

Display:

```text
Cancellation Warning

Refund Impact

Confirmation Action
```

---

# 47. Refund Workflow

Owner only.

---

## Access

From Payments Tab.

---

## Steps

```text
Initiate Refund

Review Amount

Confirm Refund

Record Refund
```

---

# 48. Booking Drawer

Opened from:

```text
Dashboard Timeline

Booking Timeline

Booking Table
```

---

## Drawer Tabs

```text
Overview

Payments

Activity

Notes
```

---

## Purpose

Quick management without navigation.

---

# 49. Mobile Behaviour

Timeline view may switch to:

```text
Vertical Timeline
```

---

## List View

Becomes default on mobile.

---

# 50. Tablet Behaviour

Timeline remains available.

Condense columns where necessary.

---

# 51. Loading States

Use skeleton loaders.

---

# 52. Empty States

Provide:

```text
No Bookings Found

No Search Results

No Activity
```

states.

---

# 53. Error States

Display:

```text
Failed To Load Bookings

Failed To Load Booking

Failed To Update Status

Failed To Verify Payment
```

---

## Recovery Action

```text
Retry
```

button mandatory.

---

# 54. Accessibility Requirements

Comply with Part 2 standards.

---

# 55. Performance Requirements

Booking list load target:

```text
< 2 Seconds
```

---

## Drawer Open Target

```text
< 300ms
```

---

# 56. Booking Management Design Principles

1. Timeline First.
2. Fast Booking Access.
3. Minimize Navigation.
4. Quick Status Updates.
5. Operational Visibility.
6. Immediate Payment Verification.
7. Context-Aware Actions.
8. Mobile Compatible.
9. Consistent Workflows.
10. Every Booking Action Must Be Auditable.

---

# 57. Part 5 Completion Statement

Booking Management Screen Specification Status:

```text
FROZEN
```

Changes require formal change requests.

---

# Next Section

Part 6 — Customer Management Screen Specifications

Will define:

* Customer List
* Customer Details
* Customer Profile
* Booking History
* Payment History
* Credit Management
* No Show Tracking
* Customer Notes
* Customer Activity Timeline
* Customer Search & Filters

# 04_FRONTEND_SPECIFICATION.md

# PART 6 — CUSTOMER MANAGEMENT SCREEN SPECIFICATIONS

Version: 1.0

Status: APPROVED

Document Type: Frontend Specification

Parent Document:

04_FRONTEND_SPECIFICATION.md

Depends On:

* Part 1 — Information Architecture & Navigation
* Part 2 — Design System & UI Standards
* Part 5 — Booking Management
* MASTER_SRS_v4.0
* API Specification

---

# 1. Purpose

The Customer Management Module shall provide:

* Customer Search
* Customer Profile Viewing
* Customer History
* Booking History
* Payment History
* Credit Management
* No Show Tracking
* Customer Notes
* Customer Activity Tracking

The module shall serve as the single source of truth for customer information.

---

# 2. Routes

```text
/admin/customers

/admin/customers/:customerId
```

---

# 3. User Access

## Owner

Full access.

---

## Manager

Customer viewing and note creation access.

---

## Restrictions

Managers shall not:

```text
Edit Customer Credits

Delete Notes

Edit Historical Notes
```

---

# 4. Customer List Screen

Route:

```text
/admin/customers
```

---

## Purpose

Provide searchable access to all customers.

---

# 5. Screen Layout

Structure:

```text
Page Header

Search

Filters

Customer Table

Pagination
```

---

# 6. Search

Position:

Top left.

---

## Searchable Fields

```text
Customer Name

Mobile Number

Customer ID
```

---

## Debounce

```text
300ms
```

---

# 7. Customer Filters

Supported filters:

```text
Active Customers

Credits Available

No Show Customers

VIP Customers

Date Range
```

---

## Clear Filters

Mandatory.

---

# 8. Customer Table

Columns:

```text
Customer ID

Customer Name

Mobile Number

Total Bookings

Credits Balance

No Show Count

Last Visit

Actions
```

---

# 9. Sorting

Supported fields:

```text
Customer Name

Total Bookings

Credits Balance

Last Visit
```

---

# 10. Row Interaction

Clicking a row shall open:

```text
Customer Details Screen
```

---

# 11. Customer Details Screen

Route:

```text
/admin/customers/:customerId
```

---

## Purpose

Provide a complete view of customer activity.

---

# 12. Screen Layout

Structure:

```text
Header

Summary Cards

Tabs

Action Panel
```

---

# 13. Customer Header

Display:

```text
Customer Name

Customer ID

Mobile Number

Customer Status
```

---

# 14. Customer Status Types

Supported values:

```text
Active

Inactive

VIP

Flagged
```

---

# 15. Summary Cards

Display:

```text
Total Bookings

Lifetime Spend

Credits Balance

No Show Count

Last Visit
```

---

# 16. Customer Tabs

Display:

```text
Profile

Bookings

Payments

Credits

Notes

Activity Timeline
```

---

# 17. Profile Tab

Purpose:

Display customer profile information.

---

## Information

```text
Customer ID

Customer Name

Mobile Number

Created Date

Last Visit Date

Preferred Notes
```

---

# 18. Customer Statistics

Display:

```text
Total Bookings

Completed Bookings

Cancelled Bookings

No Shows

Average Spend
```

---

# 19. Bookings Tab

Purpose:

Display customer booking history.

---

## Table Columns

```text
Booking Code

Date

Duration

Players

Amount

Status
```

---

## Interaction

Click booking.

Open Booking Drawer.

---

# 20. Booking History Sorting

Default:

```text
Newest First
```

---

# 21. Payments Tab

Purpose:

Display payment history.

---

## Table Columns

```text
Payment Date

Booking Code

Amount

Payment Status

Verification Status
```

---

## Interaction

Open Payment Drawer.

---

# 22. Credits Tab

Purpose:

Manage customer credits.

---

## Display Information

```text
Current Balance

Credits Earned

Credits Redeemed

Credits Expired
```

---

# 23. Credit History Table

Columns:

```text
Date

Transaction Type

Amount

Balance After

Reference
```

---

# 24. Credit Management Permissions

## Owner

Full access.

---

## Manager

Read only.

---

# 25. Credit Actions

Owner only.

Supported actions:

```text
Add Credits

Deduct Credits

Adjust Balance
```

---

# 26. Notes Tab

Purpose:

Store customer-specific notes.

---

## Example Notes

```text
Frequent Customer

Preferred Games

Special Requests

Behavior Notes
```

---

# 27. Notes Permissions

## Owner

```text
Create

Edit

Delete
```

---

## Manager

```text
Create Only
```

---

# 28. Notes Structure

Display:

```text
Author

Role

Timestamp

Note Content
```

---

# 29. Activity Timeline Tab

Purpose:

Display customer activity history.

---

## Supported Events

```text
Customer Created

Booking Created

Booking Cancelled

Booking Completed

No Show Recorded

Credits Added

Credits Redeemed

Refund Issued
```

---

# 30. Activity Timeline Entry

Display:

```text
Timestamp

Event Type

User

Description
```

---

# 31. No Show Management

Purpose:

Track attendance reliability.

---

## Display

```text
No Show Count

Last No Show Date
```

---

## Visual Indicator

If no show count exceeds threshold:

```text
Flag Customer
```

---

# 32. Flagged Customer Badge

Display warning badge.

---

## Trigger Source

Business rules configuration.

---

# 33. VIP Customer Badge

Display VIP indicator.

---

## Purpose

Highlight valuable customers.

---

## Trigger

Owner configured.

---

# 34. Customer Action Panel

Display context-aware actions.

---

## Owner Actions

```text
Add Credits

Adjust Credits

Mark VIP

Flag Customer

Add Note
```

---

## Manager Actions

```text
Add Note
```

---

# 35. Customer Drawer Support

Customer information may also be displayed using:

```text
Customer Drawer
```

for quick access.

---

## Sources

```text
Booking Drawer

Dashboard

Customer List
```

---

# 36. Customer Drawer Tabs

Display:

```text
Profile

Bookings

Notes
```

---

# 37. Mobile Behaviour

Customer list shall convert to:

```text
Card Layout
```

on smaller devices.

---

## Details Screen

Tabs remain scrollable.

---

# 38. Tablet Behaviour

Maintain table layout where practical.

---

# 39. Empty States

Provide:

```text
No Customers

No Bookings

No Payments

No Notes

No Credits
```

states.

---

# 40. Loading States

Use:

```text
Skeleton Loaders
```

throughout the module.

---

# 41. Error States

Display:

```text
Failed To Load Customer

Failed To Load Credits

Failed To Load Payments

Failed To Save Note
```

---

## Recovery

```text
Retry
```

action mandatory.

---

# 42. Accessibility Requirements

Comply with Part 2 standards.

---

# 43. Performance Requirements

Customer list load target:

```text
< 2 Seconds
```

---

## Customer Details Load Target

```text
< 1 Second
```

for normal business volume.

---

# 44. Customer Management Design Principles

1. Customer-Centric View.
2. Complete History Visibility.
3. Fast Customer Lookup.
4. Notes Must Be Auditable.
5. Credits Require Strict Control.
6. No Show Tracking Is Important.
7. Minimize Navigation.
8. Context-Aware Actions.
9. Consistent Tab Structure.
10. Customer Data Must Support Future Loyalty Features.

---

# 45. Future Compatibility

Reserved for:

```text
Customer Accounts

Loyalty Program

Membership Tiers

Customer Portal

Mobile App
```

---

# 46. Part 6 Completion Statement

Customer Management Screen Specification Status:

```text
FROZEN
```

Changes require formal change requests.

---

# Next Section

Part 7 — Payment & Financial Management Screen Specifications

Will define:

* Payment History
* Payment Verification Queue
* Payment Details
* Refund Management
* Credit Transactions
* Financial Ledger
* Financial Reports Integration
* Export Workflows
* Owner vs Manager Permissions
* Financial Audit Visibility

# 04_FRONTEND_SPECIFICATION.md

# PART 7 — PAYMENT & FINANCIAL MANAGEMENT SCREEN SPECIFICATIONS

Version: 1.0

Status: APPROVED

Document Type: Frontend Specification

Parent Document:

04_FRONTEND_SPECIFICATION.md

Depends On:

* Part 2 — Design System & UI Standards
* Part 4 — Administrative Dashboard
* Part 5 — Booking Management
* Part 6 — Customer Management
* MASTER_SRS_v4.0
* API Specification

---

# 1. Purpose

The Payment & Financial Management Module shall provide:

* Payment Verification
* Payment History
* Payment Details
* Refund Management
* Customer Credit Management
* Financial Ledger Visibility
* Financial Exports
* Financial Audit Visibility

---

# 2. Routes

```text
/admin/payments

/admin/payments/:paymentId

/admin/refunds

/admin/credits

/admin/ledger
```

---

# 3. User Access

## Owner

Full access.

---

## Manager

Limited access.

---

## Manager Permissions

```text
View Payments

Verify Payments

Reject Payments

View Payment History
```

---

## Restricted To Owner

```text
Refund Processing

Credit Adjustments

Ledger Access

Financial Exports

Financial Configuration
```

---

# 4. Module Layout

Structure:

```text
Page Header

Financial Summary Cards

Filters

Table

Pagination
```

---

# 5. Payment Dashboard Widget

Dashboard shall include:

```text
Payments Awaiting Verification
```

---

## Purpose

Provide immediate visibility to pending payment actions.

---

## Interaction

Click widget.

Navigate to:

```text
/admin/payments
```

with filter applied.

---

# 6. Payment List Screen

Route:

```text
/admin/payments
```

---

## Purpose

Display all payment activity.

---

# 7. Payment Table

Columns:

```text
Payment ID

Booking Code

Customer Name

Amount

Payment Status

Verification Status

Submitted At

Verified By

Actions
```

---

# 8. Search

Searchable fields:

```text
Payment ID

Booking Code

Customer Name

Mobile Number
```

---

## Debounce

```text
300ms
```

---

# 9. Filters

Supported filters:

```text
Payment Status

Verification Status

Date Range

Booking Type

Payment Method
```

---

## Clear Filters

Mandatory.

---

# 10. Payment Status Values

```text
Pending

Submitted

Verified

Rejected

Refunded
```

---

# 11. Verification Queue

Purpose:

Display payments awaiting review.

---

## Default Sort

```text
Oldest First
```

---

## Reason

Prevent verification delays.

---

# 12. Payment Details Screen

Route:

```text
/admin/payments/:paymentId
```

---

## Access

Direct route.

---

## Preferred Access

Payment Drawer.

---

# 13. Payment Details Layout

Structure:

```text
Header

Payment Summary

Payment Proof

Verification Panel

Activity Timeline
```

---

# 14. Payment Summary

Display:

```text
Payment ID

Booking Code

Customer Name

Amount

Payment Status

Submission Date
```

---

# 15. Payment Proof Section

Display:

```text
Screenshot Preview

Upload Timestamp
```

---

## Interaction

Click image.

Open fullscreen viewer.

---

# 16. Verification Panel

Display:

```text
Verification Status

Verifier

Verification Date
```

---

# 17. Verification Actions

Manager and Owner:

```text
Verify Payment

Reject Payment
```

---

## Confirmation Required

Mandatory.

---

# 18. Verification Workflow

Steps:

```text
Review Proof

Select Action

Confirm Action

Update Status

Refresh Related Booking
```

---

# 19. Rejection Workflow

Steps:

```text
Reject Payment

Provide Reason

Confirm Action
```

---

## Rejection Reason

Mandatory.

---

# 20. Payment Activity Timeline

Display:

```text
Payment Submitted

Payment Reviewed

Payment Verified

Payment Rejected

Refund Issued
```

---

# 21. Refund Management Screen

Route:

```text
/admin/refunds
```

---

## Owner Only

Mandatory restriction.

---

# 22. Refund List

Columns:

```text
Refund ID

Booking Code

Customer Name

Refund Amount

Refund Status

Initiated By

Created Date
```

---

# 23. Refund Status Values

```text
Pending

Approved

Completed

Rejected
```

---

# 24. Refund Details

Display:

```text
Original Payment

Refund Amount

Refund Reason

Approval Information

Completion Information
```

---

# 25. Refund Workflow

Steps:

```text
Select Payment

Enter Refund Amount

Enter Refund Reason

Review

Confirm
```

---

## Confirmation Dialog

Mandatory.

---

# 26. Credit Management Screen

Route:

```text
/admin/credits
```

---

## Owner Only

Mandatory restriction.

---

# 27. Credit Dashboard

Display:

```text
Total Credits Issued

Active Credits

Expired Credits

Redeemed Credits
```

---

# 28. Credit Transactions Table

Columns:

```text
Customer

Transaction Type

Amount

Balance After

Reference

Created Date
```

---

# 29. Credit Transaction Types

```text
Credit Added

Credit Deducted

Credit Redeemed

Credit Expired

Credit Adjustment
```

---

# 30. Credit Adjustment Workflow

Steps:

```text
Select Customer

Enter Adjustment

Enter Reason

Review

Confirm
```

---

## Reason Required

Mandatory.

---

# 31. Financial Ledger Screen

Route:

```text
/admin/ledger
```

---

## Owner Only

Mandatory restriction.

---

# 32. Purpose

Provide immutable financial transaction visibility.

---

# 33. Ledger Table

Columns:

```text
Entry ID

Entry Type

Reference

Debit

Credit

Balance Impact

Created Date
```

---

# 34. Ledger Entry Types

```text
Booking Payment

Refund

Credit Issued

Credit Redeemed

Adjustment
```

---

# 35. Ledger Behavior

Ledger entries shall be:

```text
Read Only

Immutable

Auditable
```

---

# 36. Financial Summary Cards

Display:

```text
Today's Revenue

Weekly Revenue

Monthly Revenue

Pending Refunds

Pending Verifications
```

---

# 37. Financial Export Actions

Owner only.

---

## Supported Formats

```text
CSV

XLSX
```

---

# 38. Export Filters

Support:

```text
Date Range

Payment Status

Refund Status
```

---

# 39. Financial Audit Visibility

Every payment screen shall display:

```text
Created By

Verified By

Updated By

Timestamps
```

where applicable.

---

# 40. Customer Financial Links

From:

```text
Customer Screen
Booking Screen
```

staff shall be able to open:

```text
Payment Details

Refund Details
```

without additional search.

---

# 41. Mobile Behaviour

Payment tables shall convert to:

```text
Card Layout
```

on smaller screens.

---

## Payment Proof

Fullscreen image viewer required.

---

# 42. Tablet Behaviour

Maintain table layout where practical.

---

# 43. Empty States

Provide:

```text
No Payments

No Refunds

No Credits

No Ledger Entries
```

states.

---

# 44. Loading States

Use:

```text
Skeleton Loaders
```

throughout financial screens.

---

# 45. Error States

Display:

```text
Failed To Load Payments

Failed To Load Refunds

Failed To Load Ledger

Failed To Verify Payment

Failed To Process Refund
```

---

## Recovery

```text
Retry
```

action mandatory.

---

# 46. Accessibility Requirements

Comply with Part 2 standards.

---

# 47. Performance Requirements

Payment list load target:

```text
< 2 Seconds
```

---

## Payment Drawer Open

```text
< 300ms
```

---

# 48. Financial Design Principles

1. Financial Data Is Sensitive.
2. Verification Must Be Fast.
3. Refunds Require Control.
4. Credits Require Auditability.
5. Ledger Must Be Immutable.
6. Every Financial Action Must Be Traceable.
7. Minimize Financial Errors.
8. Restrict High-Risk Actions.
9. Support Exports.
10. Financial Data Must Be Transparent.

---

# 49. Future Compatibility

Reserved for:

```text
Online Payment Gateway

Automatic Verification

Loyalty Program

Membership Billing

Subscription Plans
```

---

# 50. Part 7 Completion Statement

Payment & Financial Management Screen Specification Status:

```text
FROZEN
```

Changes require formal change requests.

---

# Next Section

Part 8 — Reports & Analytics Screen Specifications

Will define:

* Revenue Reports
* Occupancy Reports
* Customer Reports
* Booking Reports
* Reconciliation Reports
* Export Center
* KPI Dashboards
* Chart Standards
* Date Filtering Standards
* Analytics Permissions

# 04_FRONTEND_SPECIFICATION.md

# PART 8 — REPORTS & ANALYTICS SCREEN SPECIFICATIONS

Version: 1.0

Status: APPROVED

Document Type: Frontend Specification

Parent Document:

04_FRONTEND_SPECIFICATION.md

Depends On:

* Part 2 — Design System & UI Standards
* Part 4 — Administrative Dashboard
* Part 7 — Payment & Financial Management
* MASTER_SRS_v4.0
* API Specification

---

# 1. Purpose

The Reports & Analytics Module shall provide business intelligence, operational insights, financial reporting, and export capabilities.

The module shall support:

* Revenue Analysis
* Occupancy Analysis
* Customer Analysis
* Booking Analysis
* No Show Analysis
* Payment Analysis
* Console Utilization Analysis
* Data Export

---

# 2. Routes

```text
/admin/reports

/admin/reports/revenue

/admin/reports/occupancy

/admin/reports/customers

/admin/reports/bookings

/admin/reports/payments

/admin/reports/no-shows

/admin/reports/consoles

/admin/reports/reconciliation

/admin/reports/export-center
```

---

# 3. User Access

## Owner

Full access.

---

## Manager

```text
No Access
```

Managers shall not access reporting screens.

---

# 4. Reports Dashboard

Route:

```text
/admin/reports
```

---

## Purpose

Provide a centralized analytics overview.

---

## Dashboard Cards

Display:

```text
Revenue

Occupancy

Bookings

Customers

Payments

No Shows

Console Utilization
```

---

# 5. Global Report Filters

All reports shall support:

```text
Date Range
```

---

## Default Date Range

```text
Last 30 Days
```

---

# 6. Revenue Reports

Route:

```text
/admin/reports/revenue
```

---

## KPI Cards

Display:

```text
Today's Revenue

Weekly Revenue

Monthly Revenue

Average Booking Value
```

---

# 7. Revenue Charts

Display:

```text
Revenue By Day

Revenue By Week

Revenue By Month
```

---

# 8. Revenue By Hour Report

Mandatory.

---

## Purpose

Identify peak earning periods.

---

## Display

```text
Hour

Revenue

Booking Count
```

---

# 9. Occupancy Reports

Route:

```text
/admin/reports/occupancy
```

---

## Metrics

Display:

```text
Average Occupancy

Peak Occupancy

Lowest Occupancy
```

---

# 10. Occupancy Charts

Display:

```text
Occupancy By Hour

Occupancy By Day

Occupancy Trend
```

---

# 11. Customer Reports

Route:

```text
/admin/reports/customers
```

---

## KPIs

Display:

```text
Total Customers

New Customers

Returning Customers

Average Spend
```

---

# 12. Top Customers Report

Display:

```text
Customer

Bookings

Lifetime Spend

Last Visit
```

---

# 13. Booking Reports

Route:

```text
/admin/reports/bookings
```

---

## Metrics

Display:

```text
Total Bookings

Completed

Cancelled

No Shows
```

---

# 14. Booking Source Report

Display:

```text
Online Bookings

Walk-In Bookings
```

---

# 15. Booking Trend Charts

Display:

```text
Bookings By Day

Bookings By Week

Bookings By Month
```

---

# 16. Payment Reports

Route:

```text
/admin/reports/payments
```

---

## KPIs

Display:

```text
Verified Payments

Rejected Payments

Refunded Payments

Pending Verification
```

---

# 17. Verification Performance

Display:

```text
Average Verification Time

Pending Count

Rejection Rate
```

---

# 18. No Show Reports

Route:

```text
/admin/reports/no-shows
```

---

## Metrics

Display:

```text
Total No Shows

No Show Rate

Repeat No Shows
```

---

# 19. Repeat No Show Customers

Display:

```text
Customer

No Show Count

Last No Show
```

---

# 20. Console Utilization Reports

Route:

```text
/admin/reports/consoles
```

---

## Purpose

Measure hardware utilization.

---

# 21. Utilization Metrics

Display:

```text
Console Name

Utilization %

Bookings

Hours Used
```

---

# 22. Console Charts

Display:

```text
Utilization By Console

Utilization Trend
```

---

# 23. Reconciliation Reports

Route:

```text
/admin/reports/reconciliation
```

---

## Purpose

Verify financial consistency.

---

## Display

```text
Payments

Refunds

Credits

Ledger Entries

Discrepancies
```

---

# 24. Export Center

Route:

```text
/admin/reports/export-center
```

---

## Purpose

Centralized export management.

---

# 25. Supported Export Types

```text
Revenue

Bookings

Customers

Payments

Refunds

Credits

Ledger

Occupancy
```

---

# 26. Export Formats

```text
CSV

XLSX
```

---

# 27. Export Filters

Support:

```text
Date Range

Status

Report Type
```

---

# 28. Report Caching

Large reports may use cached data.

---

## Display

```text
Generated At
```

timestamp.

---

# 29. Chart Standards

Use:

```text
Bar Charts

Line Charts

Area Charts

Pie Charts
```

---

## Avoid

```text
3D Charts

Animated Charts
```

---

# 30. Drill Down Support

Reports shall support:

```text
View Details
```

from summary metrics where practical.

---

# 31. Empty States

Provide:

```text
No Revenue Data

No Occupancy Data

No Customer Data
```

states.

---

# 32. Loading States

Use:

```text
Skeleton Loaders
```

throughout reports.

---

# 33. Error States

Display:

```text
Failed To Load Report

Failed To Export Data

Failed To Generate Report
```

---

## Recovery

```text
Retry
```

action mandatory.

---

# 34. Accessibility Requirements

Comply with Part 2 standards.

---

# 35. Performance Requirements

Report load target:

```text
< 3 Seconds
```

for standard date ranges.

---

## Export Generation

Display progress indicators where necessary.

---

# 36. Analytics Design Principles

1. Business Insights Over Raw Data.
2. Financial Accuracy Is Critical.
3. Reports Are Owner Focused.
4. Exports Must Be Easy.
5. Charts Must Be Readable.
6. Historical Trends Matter.
7. Utilization Drives Capacity Planning.
8. No Show Analysis Is Operationally Important.
9. Reporting Must Be Auditable.
10. Analytics Must Support Decision Making.

---

# 37. Future Compatibility

Reserved for:

```text
Scheduled Reports

Email Reports

Forecasting

Multi-Location Analytics

AI Insights
```

---

# 38. Part 8 Completion Statement

Reports & Analytics Screen Specification Status:

```text
FROZEN
```

Changes require formal change requests.

# 04_FRONTEND_SPECIFICATION.md

# PART 9 — NOTIFICATION MANAGEMENT SCREEN SPECIFICATIONS

Version: 1.0

Status: APPROVED

Document Type: Frontend Specification

Parent Document:

04_FRONTEND_SPECIFICATION.md

Depends On:

* Part 2 — Design System & UI Standards
* Part 5 — Booking Management
* Part 7 — Payment & Financial Management
* MASTER_SRS_v4.0
* API Specification

---

# 1. Purpose

The Notification Management Module shall provide:

* Notification Monitoring
* Notification History
* Delivery Tracking
* Template Management
* Notification Retry Operations
* Notification Audit Visibility

---

# 2. Routes

```text
/admin/notifications

/admin/notifications/:notificationId

/admin/notification-templates

/admin/notification-templates/:templateId
```

---

# 3. User Access

## Owner

Full access.

---

## Manager

View access only.

---

## Restricted To Owner

```text
Template Creation

Template Editing

Template Deletion

Notification Configuration
```

---

# 4. Supported Channels

## Phase 1

```text
WhatsApp

Email
```

---

## Future Channels

```text
SMS

Push Notifications

Telegram
```

---

# 5. Notification Dashboard Widget

Dashboard shall include:

```text
Failed Notifications
```

---

## Purpose

Highlight communication failures requiring attention.

---

## Interaction

Navigate to:

```text
/admin/notifications
```

with failed filter applied.

---

# 6. Notification List Screen

Route:

```text
/admin/notifications
```

---

## Purpose

Display notification delivery history.

---

# 7. Notification Table

Columns:

```text
Notification ID

Channel

Recipient

Template

Status

Triggered By

Created At

Actions
```

---

# 8. Search

Searchable fields:

```text
Notification ID

Recipient

Booking Code
```

---

## Debounce

```text
300ms
```

---

# 9. Filters

Supported filters:

```text
Channel

Status

Template

Date Range
```

---

## Clear Filters

Mandatory.

---

# 10. Notification Status Values

```text
Pending

Sent

Failed

Retried

Cancelled
```

---

# 11. Notification Details Screen

Route:

```text
/admin/notifications/:notificationId
```

---

## Purpose

Provide complete delivery visibility.

---

# 12. Notification Details Layout

Structure:

```text
Header

Delivery Summary

Message Preview

Delivery Timeline

Action Panel
```

---

# 13. Delivery Summary

Display:

```text
Notification ID

Channel

Recipient

Status

Created At

Delivered At
```

---

# 14. Message Preview

Display actual rendered message.

---

## Read Only

Mandatory.

---

# 15. Delivery Timeline

Display:

```text
Created

Queued

Sent

Delivered

Failed

Retried
```

where applicable.

---

# 16. Failed Notification Actions

Owner only.

Available actions:

```text
Retry

Cancel
```

---

# 17. Retry Workflow

Steps:

```text
Open Notification

Review Failure

Retry

Confirm Action
```

---

## Confirmation Dialog

Mandatory.

---

# 18. Template Management Screen

Route:

```text
/admin/notification-templates
```

---

## Purpose

Manage reusable notification templates.

---

# 19. Template Table

Columns:

```text
Template Name

Channel

Version

Status

Updated At

Actions
```

---

# 20. Template Types

Supported templates:

```text
Booking Confirmation

Payment Reminder

Payment Verified

Booking Reminder

Booking Cancelled
```

---

# 21. Template Versioning

Mandatory.

---

## Example

```text
Booking Confirmation v1

Booking Confirmation v2
```

---

# 22. Template Editor

Owner only.

---

## Supported Fields

```text
Template Name

Channel

Subject (Email)

Message Content

Variables
```

---

# 23. Template Variables

Examples:

```text
{{customerName}}

{{bookingCode}}

{{bookingDate}}

{{amount}}
```

---

## Validation

Unknown variables shall be rejected.

---

# 24. Template Preview

Mandatory.

---

## Purpose

Preview rendered output before activation.

---

# 25. Template Status Values

```text
Draft

Active

Archived
```

---

# 26. Activation Workflow

Steps:

```text
Review Template

Preview Output

Activate

Confirm Action
```

---

# 27. Notification Audit Information

Every notification shall display:

```text
Recipient

Channel

Template

Triggered By

Created At

Updated At
```

---

# 28. Booking Integration

From booking screens staff shall be able to:

```text
Resend Booking Confirmation

Resend Payment Reminder

Resend Booking Reminder
```

---

# 29. Customer Integration

Customer screens shall display:

```text
Recent Notifications
```

for operational visibility.

---

# 30. Notification Statistics

Display:

```text
Total Sent

Total Failed

Delivery Rate

Retry Count
```

---

# 31. Channel Statistics

Display:

```text
WhatsApp Deliveries

Email Deliveries

Failure Rate
```

---

# 32. Mobile Behaviour

Notification tables shall convert to:

```text
Card Layout
```

on smaller devices.

---

# 33. Tablet Behaviour

Maintain table layout where practical.

---

# 34. Empty States

Provide:

```text
No Notifications

No Templates

No Failures
```

states.

---

# 35. Loading States

Use:

```text
Skeleton Loaders
```

throughout notification screens.

---

# 36. Error States

Display:

```text
Failed To Load Notifications

Failed To Load Templates

Failed To Save Template

Failed To Retry Notification
```

---

## Recovery

```text
Retry
```

action mandatory.

---

# 37. Accessibility Requirements

Comply with Part 2 standards.

---

# 38. Performance Requirements

Notification list load target:

```text
< 2 Seconds
```

---

## Template Preview Target

```text
< 500ms
```

---

# 39. Notification Design Principles

1. Communication Must Be Traceable.
2. Failures Must Be Visible.
3. Templates Must Be Controlled.
4. Versioning Is Mandatory.
5. Retry Operations Must Be Simple.
6. Auditing Is Critical.
7. Message Content Must Be Consistent.
8. Delivery Status Must Be Transparent.
9. Owners Control Templates.
10. Notifications Must Support Business Operations.

---

# 40. Future Compatibility

Reserved for:

```text
SMS

Push Notifications

Telegram

Scheduled Campaigns

Marketing Messages
```

---

# 41. Part 9 Completion Statement

Notification Management Screen Specification Status:

```text
FROZEN
```

Changes require formal change requests.

# 04_FRONTEND_SPECIFICATION.md

# PART 10 — SETTINGS & CONFIGURATION SCREEN SPECIFICATIONS

Version: 1.0

Status: APPROVED

Document Type: Frontend Specification

Parent Document:

04_FRONTEND_SPECIFICATION.md

Depends On:

* Part 2 — Design System & UI Standards
* Part 9 — Notification Management
* MASTER_SRS_v4.0
* API Specification

---

# 1. Purpose

The Settings & Configuration Module shall provide centralized management of all configurable business behavior.

The module shall allow authorized users to manage:

* Business Information
* Pricing Rules
* Booking Rules
* Deposit Rules
* Console Configuration
* Notification Configuration
* UPI Configuration
* Feature Flags
* Operational Preferences

---

# 2. Routes

```text
/admin/settings/business

/admin/settings/pricing

/admin/settings/deposits

/admin/settings/booking-rules

/admin/settings/consoles

/admin/settings/notifications

/admin/settings/upi

/admin/settings/features
```

---

# 3. User Access

## Owner

Full access.

---

## Manager

```text
No Access
```

Managers shall not access settings screens.

---

# 4. Settings Navigation

Settings shall use a dedicated sidebar.

---

## Categories

```text
Business Settings

Pricing Settings

Deposit Rules

Booking Rules

Console Management

Notification Settings

UPI Settings

Feature Flags
```

---

# 5. Business Settings

Route:

```text
/admin/settings/business
```

---

## Purpose

Manage core business information.

---

# 6. Business Information Fields

```text
Business Name

Address

Phone Number

Email Address

Website URL

Instagram URL

WhatsApp Number
```

---

# 7. Operating Hours

Display:

```text
Day

Opening Time

Closing Time
```

---

## Actions

```text
Add Hours

Edit Hours

Delete Hours
```

---

# 8. Special Operating Dates

Purpose:

Support exceptions to normal operating hours.

---

## Types

```text
Holiday

Closed Day

Extended Hours
```

---

# 9. Pricing Settings

Route:

```text
/admin/settings/pricing
```

---

## Purpose

Configure pricing structure.

---

# 10. Pricing Fields

```text
Price Per Hour

Price Per Person

Tax Configuration

Discount Configuration
```

---

## Actions

```text
Create

Edit

Deactivate
```

---

# 11. Deposit Rules

Route:

```text
/admin/settings/deposits
```

---

## Purpose

Configure booking deposit requirements.

---

# 12. Deposit Fields

```text
Deposit Required

Deposit Amount

Deposit Percentage

Deposit Expiry Duration
```

---

# 13. Booking Rules

Route:

```text
/admin/settings/booking-rules
```

---

## Purpose

Configure booking behavior.

---

# 14. Booking Rule Fields

```text
Maximum Future Booking Window

Minimum Booking Duration

Maximum Booking Duration

Maximum Players

Cancellation Rules
```

---

# 15. Booking Rule Actions

```text
Save

Reset
```

---

# 16. Console Management

Route:

```text
/admin/settings/consoles
```

---

## Purpose

Manage gaming consoles.

---

# 17. Console Table

Columns:

```text
Console Name

Status

Capacity

Created Date

Actions
```

---

# 18. Console Status Values

```text
Active

Maintenance

Inactive
```

---

# 19. Console Actions

```text
Create Console

Edit Console

Deactivate Console
```

---

# 20. Notification Settings

Route:

```text
/admin/settings/notifications
```

---

## Purpose

Configure communication channels.

---

# 21. Channel Configuration

Supported channels:

```text
WhatsApp

Email
```

---

# 22. Notification Toggles

```text
Booking Confirmation

Payment Reminder

Booking Reminder

Payment Verification
```

---

# 23. Test Notification Tools

Provide:

```text
Send Test WhatsApp

Send Test Email
```

---

# 24. UPI Settings

Route:

```text
/admin/settings/upi
```

---

## Purpose

Configure payment collection information.

---

# 25. UPI Fields

```text
UPI ID

UPI Name

QR Code Image
```

---

# 26. Validation

UPI ID validation mandatory.

---

# 27. QR Code Preview

Display uploaded QR code.

---

# 28. Feature Flags

Route:

```text
/admin/settings/features
```

---

## Purpose

Enable or disable application functionality.

---

# 29. Supported Feature Flags

```text
Online Booking

Walk-In Booking

Credits System

WhatsApp Notifications

Email Notifications
```

---

# 30. Feature Flag Actions

```text
Enable

Disable
```

---

## Confirmation Required

Mandatory.

---

# 31. Settings Change Audit

Every settings change shall be recorded.

---

## Audit Information

Display:

```text
Changed By

Old Value

New Value

Timestamp
```

---

# 32. Settings History Panel

Each settings screen shall provide:

```text
Recent Changes
```

visibility.

---

# 33. Save Workflow

Steps:

```text
Modify Settings

Validate

Save

Confirm Success
```

---

# 34. Unsaved Changes Protection

Mandatory.

---

## Trigger

User attempts navigation with unsaved changes.

---

## Dialog

Display:

```text
Unsaved Changes Warning
```

---

# 35. Mobile Behaviour

Settings forms shall use:

```text
Single Column Layout
```

on mobile devices.

---

# 36. Tablet Behaviour

Use responsive two-column layouts where appropriate.

---

# 37. Empty States

Provide:

```text
No Consoles

No Special Dates

No Settings History
```

states.

---

# 38. Loading States

Use:

```text
Skeleton Loaders
```

throughout settings screens.

---

# 39. Error States

Display:

```text
Failed To Load Settings

Failed To Save Settings

Invalid Configuration
```

---

## Recovery

```text
Retry
```

action mandatory.

---

# 40. Accessibility Requirements

Comply with Part 2 standards.

---

# 41. Performance Requirements

Settings page load target:

```text
< 2 Seconds
```

---

## Save Operation Target

```text
< 1 Second
```

excluding network latency.

---

# 42. Settings Design Principles

1. Configuration Over Hardcoding.
2. Business Rules Must Be Visible.
3. Critical Changes Must Be Audited.
4. Owners Control Configuration.
5. Feature Flags Reduce Deployment Risk.
6. Payment Settings Must Be Clear.
7. Operational Changes Must Be Traceable.
8. Minimize Configuration Errors.
9. Immediate Feedback Is Required.
10. Settings Drive System Behavior.

---

# 43. Future Compatibility

Reserved for:

```text
Multi-Location Settings

Dynamic Pricing

Membership Configuration

Loyalty Rules

Advanced Notification Routing
```

---

# 44. Part 10 Completion Statement

Settings & Configuration Screen Specification Status:

```text
FROZEN
```

Changes require formal change requests.

# 04_FRONTEND_SPECIFICATION.md

# PART 11 — USER MANAGEMENT SCREEN SPECIFICATIONS

Version: 1.0

Status: APPROVED

Document Type: Frontend Specification

Parent Document:

04_FRONTEND_SPECIFICATION.md

Depends On:

* Part 2 — Design System & UI Standards
* Part 10 — Settings & Configuration
* MASTER_SRS_v4.0
* API Specification

---

# 1. Purpose

The User Management Module shall provide administration of platform users.

The module shall support:

* User Creation
* User Viewing
* User Updates
* User Deactivation
* Password Reset
* Session Visibility
* User Audit Visibility

---

# 2. Routes

```text
/admin/users

/admin/users/new

/admin/users/:userId
```

---

# 3. User Access

## Owner

Full access.

---

## Manager

```text
No Access
```

Managers shall not access user management screens.

---

# 4. Supported Roles

Phase 1 supports only:

```text
Owner

Manager
```

---

## Custom Roles

```text
Not Supported
```

---

# 5. User List Screen

Route:

```text
/admin/users
```

---

## Purpose

Provide visibility into all administrative users.

---

# 6. User Table

Columns:

```text
User ID

Full Name

Email

Role

Status

Last Login

Created Date

Actions
```

---

# 7. Search

Searchable fields:

```text
Full Name

Email
```

---

## Debounce

```text
300ms
```

---

# 8. Filters

Supported filters:

```text
Role

Status
```

---

## Clear Filters

Mandatory.

---

# 9. User Status Values

```text
Active

Inactive

Locked
```

---

# 10. User Creation Screen

Route:

```text
/admin/users/new
```

---

## Purpose

Allow owners to create manager accounts.

---

# 11. User Creation Form

Fields:

```text
Full Name

Email

Role

Temporary Password
```

---

## Supported Roles

```text
Manager
```

---

## Validation

Email uniqueness required.

---

# 12. User Creation Workflow

Steps:

```text
Enter Information

Validate

Create User

Display Success
```

---

# 13. User Details Screen

Route:

```text
/admin/users/:userId
```

---

## Purpose

Provide complete visibility into a user account.

---

# 14. User Details Layout

Structure:

```text
Header

Summary Cards

Tabs

Action Panel
```

---

# 15. Header Information

Display:

```text
Full Name

Email

Role

Status
```

---

# 16. Summary Cards

Display:

```text
Last Login

Created Date

Active Sessions

Account Status
```

---

# 17. User Tabs

Display:

```text
Profile

Sessions

Audit History
```

---

# 18. Profile Tab

Display:

```text
User ID

Full Name

Email

Role

Status

Created By

Created At
```

---

# 19. Editable Fields

Owner may update:

```text
Full Name

Email
```

---

## Role Changes

```text
Not Supported
```

in Phase 1.

---

# 20. Sessions Tab

Purpose:

Provide session visibility.

---

## Display

```text
Session ID

Device

IP Address

Login Time

Last Activity
```

---

# 21. Active Session Indicator

Display active sessions separately.

---

# 22. Force Logout Action

Owner only.

---

## Workflow

Steps:

```text
Select Session

Force Logout

Confirm Action
```

---

## Confirmation Required

Mandatory.

---

# 23. Password Reset

Owner only.

---

## Purpose

Reset manager credentials.

---

# 24. Password Reset Workflow

Steps:

```text
Open User

Reset Password

Generate Temporary Password

Confirm Action
```

---

# 25. Temporary Password Display

Display once.

---

## Security Warning

Mandatory.

---

# 26. User Deactivation

Users shall not be deleted.

---

## Supported Action

```text
Deactivate User
```

---

## Result

Status becomes:

```text
Inactive
```

---

# 27. Reactivation Workflow

Owner only.

---

## Action

```text
Activate User
```

---

# 28. Account Locking

Purpose:

Protect against brute force attacks.

---

## Trigger

Configured failed login threshold.

---

## Result

Status becomes:

```text
Locked
```

---

# 29. Unlock Workflow

Owner only.

---

## Action

```text
Unlock User
```

---

# 30. Audit History Tab

Purpose:

Provide complete user activity visibility.

---

## Display Events

```text
User Created

Password Reset

Account Locked

Account Unlocked

User Activated

User Deactivated

Login Success

Login Failure
```

---

# 31. Audit Entry Structure

Display:

```text
Timestamp

Event

Performed By

Description
```

---

# 32. Action Panel

Display context-aware actions.

---

## Active User

Available actions:

```text
Reset Password

Deactivate User
```

---

## Inactive User

Available actions:

```text
Activate User
```

---

## Locked User

Available actions:

```text
Unlock User
```

---

# 33. User Audit Information

Every user shall display:

```text
Created By

Created At

Updated At

Last Login
```

---

# 34. Mobile Behaviour

User tables shall convert to:

```text
Card Layout
```

on smaller devices.

---

# 35. Tablet Behaviour

Maintain table layout where practical.

---

# 36. Empty States

Provide:

```text
No Users

No Sessions

No Audit History
```

states.

---

# 37. Loading States

Use:

```text
Skeleton Loaders
```

throughout user screens.

---

# 38. Error States

Display:

```text
Failed To Load User

Failed To Create User

Failed To Reset Password

Failed To Update User
```

---

## Recovery

```text
Retry
```

action mandatory.

---

# 39. Accessibility Requirements

Comply with Part 2 standards.

---

# 40. Performance Requirements

User list load target:

```text
< 2 Seconds
```

---

## User Details Load Target

```text
< 1 Second
```

---

# 41. User Management Design Principles

1. Keep Roles Simple.
2. Preserve Audit History.
3. Never Hard Delete Users.
4. Password Operations Must Be Secure.
5. Session Visibility Improves Security.
6. Owners Control Access.
7. User Actions Must Be Auditable.
8. Security Over Convenience.
9. Minimize Administrative Complexity.
10. Support Future Growth Without Role Explosion.

---

# 42. Future Compatibility

Reserved for:

```text
Additional Roles

Role-Based Permissions

SSO

Two-Factor Authentication

Identity Providers
```

---

# 43. Part 11 Completion Statement

User Management Screen Specification Status:

```text
FROZEN
```

Changes require formal change requests.

# 04_FRONTEND_SPECIFICATION.md

# PART 12 — OPERATIONS, AUDIT & SYSTEM MONITORING SCREEN SPECIFICATIONS

Version: 1.0

Status: APPROVED

Document Type: Frontend Specification

Parent Document:

04_FRONTEND_SPECIFICATION.md

Depends On:

* Part 2 — Design System & UI Standards
* Part 7 — Payment & Financial Management
* Part 9 — Notification Management
* Part 11 — User Management
* MASTER_SRS_v4.0
* API Specification

---

# 1. Purpose

The Operations, Audit & System Monitoring Module shall provide visibility into system operations, auditing, background processing, health monitoring, and integrity validation.

The module shall support:

* Audit Logs
* Background Job Monitoring
* Queue Monitoring
* Error Monitoring
* System Health Monitoring
* Data Integrity Monitoring

---

# 2. Routes

```text
/admin/audit

/admin/audit/:auditId

/admin/operations/jobs

/admin/operations/errors

/admin/operations/queues

/admin/operations/health

/admin/operations/integrity
```

---

# 3. User Access

## Owner

Full access.

---

## Manager

```text
No Access
```

Managers shall not access operational or diagnostic screens.

---

# 4. Operations Dashboard

Purpose:

Provide a centralized operational overview.

---

## Summary Cards

Display:

```text
System Health

Active Jobs

Failed Jobs

Queue Backlog

Integrity Alerts

Recent Errors
```

---

# 5. Audit Log Screen

Route:

```text
/admin/audit
```

---

## Purpose

Provide a complete audit trail of system activity.

---

# 6. Audit Log Table

Columns:

```text
Timestamp

User

Action

Entity Type

Entity ID

Description
```

---

# 7. Audit Filters

Supported filters:

```text
User

Entity Type

Action Type

Date Range
```

---

## Clear Filters

Mandatory.

---

# 8. Audit Actions

Examples:

```text
Booking Created

Booking Updated

Payment Verified

Refund Issued

Settings Changed

User Created
```

---

# 9. Audit Details Screen

Route:

```text
/admin/audit/:auditId
```

---

## Display

```text
Timestamp

User

Action

Entity

Previous Values

New Values
```

where applicable.

---

# 10. Background Jobs Screen

Route:

```text
/admin/operations/jobs
```

---

## Purpose

Monitor asynchronous processing.

---

# 11. Job Table

Columns:

```text
Job ID

Job Type

Status

Created At

Started At

Completed At
```

---

# 12. Job Status Values

```text
Pending

Running

Completed

Failed

Cancelled
```

---

# 13. Job Details

Display:

```text
Job Payload Summary

Execution Duration

Failure Reason
```

---

# 14. Queue Monitoring Screen

Route:

```text
/admin/operations/queues
```

---

## Purpose

Monitor application queues.

---

# 15. Queue Table

Columns:

```text
Queue Name

Pending

Processing

Failed

Last Activity
```

---

# 16. Queue Health Indicators

Display:

```text
Healthy

Warning

Critical
```

---

# 17. Error Monitoring Screen

Route:

```text
/admin/operations/errors
```

---

## Purpose

Provide visibility into application errors.

---

# 18. Error Table

Columns:

```text
Error ID

Error Code

Module

Severity

Timestamp

Status
```

---

# 19. Severity Levels

```text
Low

Medium

High

Critical
```

---

# 20. Error Details

Display:

```text
Error Code

User Friendly Description

Affected Module

Timestamp

Occurrence Count
```

---

## Security Rule

Raw stack traces shall not be displayed in the UI.

---

# 21. Error Status Values

```text
Open

Acknowledged

Resolved
```

---

# 22. System Health Screen

Route:

```text
/admin/operations/health
```

---

## Purpose

Provide infrastructure visibility.

---

# 23. Health Components

Display:

```text
Application

Database

Cache

Notification Services

Storage
```

---

# 24. Health Status Values

```text
Healthy

Warning

Critical
```

---

# 25. Health Dashboard

Display:

```text
Service

Status

Last Check

Response Time
```

---

# 26. Integrity Monitoring Screen

Route:

```text
/admin/operations/integrity
```

---

## Purpose

Detect data consistency issues.

---

# 27. Integrity Checks

Display:

```text
Orphaned Bookings

Orphaned Payments

Failed Notifications

Financial Mismatches

Missing References
```

---

# 28. Integrity Result Status

```text
Passed

Warning

Failed
```

---

# 29. Integrity Details

Display:

```text
Check Name

Status

Affected Records

Last Run
```

---

# 30. Manual Integrity Scan

Owner may trigger:

```text
Run Integrity Scan
```

---

## Confirmation Required

Mandatory.

---

# 31. Operational Alerts

Display:

```text
Critical Errors

Queue Failures

Integrity Failures

Service Outages
```

---

# 32. Alert Priority

Priority order:

```text
Critical

High

Medium

Low
```

---

# 33. Search

Supported screens shall provide:

```text
Search
```

where appropriate.

---

## Debounce

```text
300ms
```

---

# 34. Export Support

Supported modules:

```text
Audit Logs

Errors

Integrity Results
```

---

## Export Formats

```text
CSV

XLSX
```

---

# 35. Refresh Strategy

Operational screens shall support:

```text
Manual Refresh
```

---

## Auto Refresh

```text
30 Seconds
```

for monitoring screens.

---

# 36. Empty States

Provide:

```text
No Audit Entries

No Errors

No Failed Jobs

No Integrity Issues
```

states.

---

# 37. Loading States

Use:

```text
Skeleton Loaders
```

throughout the module.

---

# 38. Error States

Display:

```text
Failed To Load Audit Logs

Failed To Load Errors

Failed To Load Health Status

Failed To Run Integrity Scan
```

---

## Recovery

```text
Retry
```

action mandatory.

---

# 39. Mobile Behaviour

Operational tables shall convert to:

```text
Card Layout
```

on smaller devices.

---

# 40. Tablet Behaviour

Maintain table layout where practical.

---

# 41. Accessibility Requirements

Comply with Part 2 standards.

---

# 42. Performance Requirements

Monitoring screen load target:

```text
< 2 Seconds
```

---

## Auto Refresh Impact

Refresh operations shall not interrupt user interactions.

---

# 43. Operational Design Principles

1. Visibility Over Complexity.
2. Auditability Is Mandatory.
3. Diagnostics Must Be Actionable.
4. Protect Sensitive Information.
5. Monitoring Must Be Real Time.
6. Errors Must Be Discoverable.
7. Integrity Must Be Verifiable.
8. Owners Control Operations.
9. Operational Data Must Be Exportable.
10. Reliability Is A Core Feature.

---

# 44. Future Compatibility

Reserved for:

```text
Maintenance Mode

Multi-Location Monitoring

Centralized Log Aggregation

Advanced Alerting

External Monitoring Integrations
```

---

# 45. Part 12 Completion Statement

Operations, Audit & System Monitoring Screen Specification Status:

```text
FROZEN
```

Changes require formal change requests.

---

# Frontend Specification Completion Statement

Frontend Specification Status:

```text
COMPLETE
```

This document now defines:

* Information Architecture
* Design System
* Public Website
* Dashboard
* Booking Management
* Customer Management
* Payment Management
* Reports
* Notifications
* Settings
* User Management
* Operations & Monitoring

and serves as the authoritative frontend implementation specification for Phase 1.
