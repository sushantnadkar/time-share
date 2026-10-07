# 05_DEPLOYMENT_AND_INFRASTRUCTURE_SPECIFICATION.md

# PART 1 — INFRASTRUCTURE ARCHITECTURE & ENVIRONMENT STRATEGY

Version: 2.0

Status: APPROVED

Document Type: Deployment & Infrastructure Specification

Parent Documents:

* MASTER_SRS_v4.0
* Database Design Specification
* API Specification
* Frontend Specification

---

# 1. Purpose

This document defines the infrastructure architecture, hosting strategy, deployment model, and environment standards for the Gaming Café Booking Platform.

The primary objective is to:

* Minimize Operational Costs
* Minimize Infrastructure Complexity
* Maximize Deployment Simplicity
* Support Rapid Business Validation
* Maintain Future Scalability

---

# 2. Infrastructure Philosophy

The platform shall adopt a:

```text
Free-Tier First
Managed Services First
Serverless First
Low Maintenance First
```

strategy.

---

## Business Objective

Phase 1 infrastructure costs should remain as close to:

```text
₹0/month
```

as practically possible.

---

## Infrastructure Principles

1. Avoid self-hosted servers.
2. Prefer managed services.
3. Avoid operational overhead.
4. Avoid unnecessary infrastructure components.
5. Pay only when business growth requires scaling.
6. Optimize for simplicity rather than theoretical scalability.

---

# 3. Phase 1 Infrastructure Architecture

## Logical Architecture

```text
Customer Browser
        │
        ▼
Vercel Frontend
        │
        ▼
Backend API
(Vercel Functions)
        │
        ├──────────────┐
        ▼              ▼

MongoDB Atlas     Cloudinary
   Database       File Storage

        │
        ▼

Notification Providers
(WhatsApp / Email)
```

---

# 4. Approved Technology Stack

## Frontend Hosting

```text
Vercel
```

---

## Backend Hosting

```text
Vercel Functions
```

---

## Database

```text
MongoDB Atlas M0
```

Free Tier.

---

## File Storage

```text
Cloudinary Free Tier
```

---

## Source Control

```text
GitHub
```

---

## CI/CD

```text
GitHub → Vercel
```

Automatic deployment pipeline.

---

## Email Service

Approved providers:

```text
Resend

or

Brevo
```

---

## Monitoring

```text
Vercel Analytics
```

Free Tier.

---

# 5. Environment Strategy

The platform shall support:

```text
Development

Preview

Production
```

environments.

---

# 6. Development Environment

Purpose:

Local development.

---

## Components

```text
React Development Server

Node.js API

MongoDB Atlas Development Database

Cloudinary Development Folder
```

---

## Characteristics

```text
Developer Machine

Local Execution

Fast Iteration
```

---

# 7. Preview Environment

Purpose:

Pre-production testing.

---

## Deployment Method

Automatically created from:

```text
Git Branches

Pull Requests
```

---

## Hosting

```text
Vercel Preview Deployments
```

---

## Purpose

Validate:

```text
Features

Bug Fixes

UI Changes

API Changes
```

before production release.

---

# 8. Production Environment

Purpose:

Serve live customers.

---

## Hosting

```text
Vercel Production Deployment
```

---

## Characteristics

```text
HTTPS Enabled

Custom Domain

Production Database

Production Storage
```

---

# 9. Frontend Architecture

## Hosting Platform

```text
Vercel
```

---

## Responsibilities

```text
Public Website

Booking Flow

Admin Portal

Static Assets

Client-Side Rendering
```

---

## Deployment Model

```text
Automatic Git Deployments
```

---

# 10. Backend Architecture

## Hosting Platform

```text
Vercel Functions
```

---

## Responsibilities

```text
REST API

Authentication

Booking Management

Payment Management

Customer Management

Notification Processing
```

---

## Deployment Model

```text
Serverless
```

---

# 11. Database Architecture

## Platform

```text
MongoDB Atlas M0
```

---

## Responsibilities

```text
Bookings

Customers

Payments

Users

Reports

Audit Logs

System Configuration
```

---

## Database Access

```text
Private Application Access Only
```

---

## Public Access

```text
Prohibited
```

---

# 12. File Storage Architecture

## Platform

```text
Cloudinary
```

---

## Responsibilities

```text
Payment Screenshots

Website Images

Marketing Assets

Future Uploads
```

---

## Storage Principle

Application servers shall not be used as file storage.

---

# 13. Notification Infrastructure

## Email

Supported Providers:

```text
Resend

Brevo
```

---

## WhatsApp

Supported Provider:

```text
Meta WhatsApp Business API
```

or approved equivalent provider.

---

## Future Channels

```text
SMS

Push Notifications

Telegram
```

---

# 14. Infrastructure Components Explicitly Excluded From Phase 1

The following technologies shall not be implemented during Phase 1:

```text
Kubernetes

Docker Swarm

Nomad

Dedicated Servers

Load Balancers

Multi-Region Deployments

Service Meshes

Microservice Architectures
```

---

## Reason

Unnecessary complexity relative to business requirements.

---

# 15. Redis Strategy

Redis shall not be implemented during Phase 1.

---

## Future Use Cases

```text
Caching

Background Jobs

Notification Queues

Rate Limiting
```

---

## Current Status

```text
Deferred
```

---

# 16. Environment Variables

All configuration shall be stored using:

```text
Environment Variables
```

---

## Examples

```text
Database URI

JWT Secrets

Cloudinary Credentials

Email Credentials

WhatsApp Credentials

Application URLs
```

---

# 17. Secrets Management

Secrets shall never be:

```text
Committed To Git

Stored In Source Code

Exposed To Frontend Applications
```

---

## Storage Location

```text
Vercel Environment Variables
```

---

# 18. Domain Strategy

Production shall use:

```text
Custom Domain
```

---

## Examples

```text
www.businessname.com

admin.businessname.com
```

or equivalent routing structure.

---

# 19. HTTPS Requirements

All public traffic shall use:

```text
HTTPS
```

---

## HTTP Access

Automatically redirected.

---

# 20. Logging Strategy

Application shall generate:

```text
Application Logs

Error Logs

Audit Logs

Notification Logs
```

---

## Log Retention

Subject to hosting platform limitations.

---

# 21. Monitoring Strategy

Phase 1 monitoring shall prioritize:

```text
Application Availability

API Errors

Failed Notifications

Payment Verification Failures
```

---

## Tooling

```text
Vercel Analytics

Application Logs
```

---

# 22. Resource Strategy

Infrastructure shall be designed for:

```text
Single Location Gaming Café
```

operations.

---

## Initial Capacity Target

Support:

```text
100 Concurrent Users
```

minimum.

---

# 23. Scalability Strategy

Scaling shall occur only when justified by actual usage.

---

## Expected Upgrade Path

```text
Vercel Free
        ↓
Vercel Pro
        ↓
Dedicated Backend
        ↓
Containerized Infrastructure
```

---

# 24. Disaster Recovery Philosophy

The platform shall prioritize:

```text
Fast Recovery

Simple Recovery

Managed Recovery
```

over complex high-availability architectures.

---

# 25. Infrastructure Security Principles

1. HTTPS Everywhere.
2. Managed Services Preferred.
3. Secrets Never Stored In Code.
4. No Public Database Access.
5. Principle Of Least Privilege.
6. Infrastructure Must Be Recoverable.
7. Auditability Is Mandatory.
8. Simplicity Over Complexity.
9. Minimize Operational Burden.
10. Scale Only When Necessary.

---

# 26. Future Compatibility

Reserved for:

```text
Dedicated Backend Servers

Redis

Background Workers

Object Storage Migration

Containerized Deployments

Nomad

Multi-Location Infrastructure
```

---

# 27. Part 1 Completion Statement

Infrastructure Architecture & Environment Strategy Status:

```text
FROZEN
```

Changes require formal change requests.

---

# Next Section

Part 2 — Hosting Platform Architecture & Service Design

Will define:

* Vercel Architecture
* Serverless Function Strategy
* MongoDB Atlas Configuration
* Cloudinary Configuration
* Environment Separation
* Domain Architecture
* Resource Limits
* Service Boundaries
* Growth & Migration Strategy
* Cost Management Strategy
