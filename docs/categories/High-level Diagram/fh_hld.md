# Foodhub Ecosystem

## 1. Overview
This document provides a high-level overview of the Foodhub Platform Architecture, covering all major AWS components, data flows, integrations, user touchpoints, and backend systems.

The architecture supports websites, mobile apps, EPOS devices, real-time analytics, and backend services. It ensures high availability, scalability, global access, and secure communication.

---

## 2. Architecture Diagram

![Foodhub HLD](fh_hld.jpg)

The system architecture consists of the following major logical layers:

- Frontend & User Access
- Edge & CDN Layer
- API & Application Layer
- Compute Layer inside VPC
- Data Layer inside VPC
- Messaging & Notifications
- Streaming & Analytics
- Storage & Migration

---

## 3. System Components

### 3.1 Frontend & User Access
| Component | Purpose |
|----------|---------|
| **Business Users** | Access reporting dashboards via QuickSight. |
| **FH Websites / FH Apps** | Customer-facing web and mobile applications. |
| **Tablets / Mobiles** | Used by restaurant owners, drivers, and operational teams. |
| **EPOS Devices** | Sends orders and operational transactions into the system. |

---

## 4. AWS Edge & Content Delivery

### 4.1 Cloudflare
- Global CDN shielding FH websites.
- Provides caching and DDoS protection.

### 4.2 CloudFront
- Delivers static and dynamic web content.
- Works with Lambda@Edge for request transformation.
- Connected to WAF and S3.

### 4.3 WAF
- Filters malicious traffic.
- Includes rate-limiting & rule-based protections.

---

## 5. Application Entry Points

### 5.1 Amplify
- Hosts frontend applications.
- Provides CI/CD for UI deployments.
- Integrates with AppSync.

### 5.2 AppSync
- GraphQL interface for mobile/tablet apps.
- Connects to Lambda and VPC DB services.

### 5.3 API Gateway
- REST interface for EPOS and legacy devices.
- Handles auth, throttling, and routing.

---

## 6. Compute Layer (Inside VPC)

### 6.1 AWS Lambda
- Stateless serverless compute.
- Accesses DynamoDB, Aurora, Redshift, and ElastiCache.

### 6.2 EC2 Auto Scaling Group
- For backend microservices needing persistent compute.

### 6.3 ECS / EKS
- Container-based microservices.
- Handles scaling of backend services.
- Works with ALB for load balancing.

---

## 7. Data Layer (Inside VPC)

| Service | Purpose |
|---------|---------|
| **Amazon Aurora** | Core relational database for transactions. |
| **Amazon DynamoDB** | NoSQL datastore for high-speed metadata and low-latency reads. |
| **Amazon Redshift** | Data warehouse for business analytics. |
| **Amazon ElastiCache** | Caching engine for reducing DB load. |

---

## 8. Messaging, Notifications & Eventing

| Service | Use Case |
|---------|----------|
| **SNS** | Pub/Sub, alerts, fan-out notifications. |
| **SQS** | Queueing for async workflows & microservice decoupling. |
| **EventBridge** | Event routing between AWS services and custom microservices. |

---

## 9. Email & Communication Services

### SES
- Handles outbound transactional emails.
- Used for receipts, notifications, and system communication.

---

## 10. Data Streaming, Observability & Search

### 10.1 Kinesis Streams
- Ingests real-time application logs and events.
- Sends data to OpenSearch, CloudWatch, Athena, S3.

### 10.2 OpenSearch
- Log indexing and search.
- Real-time operational dashboards.

### 10.3 CloudWatch
- Metrics, logs, alarms, and tracing.

### 10.4 Athena
- SQL-based analytics on S3 data.

### 10.5 Logstash
- Log processing pipeline before indexing into OpenSearch.

---

## 11. Storage

### Amazon S3
- Stores static web assets, event logs, and processed data.
- Integrated with CloudFront and Kinesis pipeline.

---

## 12. Data Migration

### AWS DMS
- Replicates data between RDS, Redshift, and other stores.
- Used for incremental migration without downtime.

---

## 13. End-to-End High-Level Flow

```text
Business Users → QuickSight → Redshift / DynamoDB

FH Websites / Apps → Cloudflare → CloudFront → WAF → ALB → ECS / EKS

Mobile/Tablet → Amplify → AppSync → Lambda → Aurora / DynamoDB / ElastiCache

EPOS Device → API Gateway → Lambda → DB Layer

S3 → Kinesis → OpenSearch / CloudWatch / Athena

EventBridge / SNS / SQS → Async background workflows

DMS → Migration and replication to analytics stores
```

---

## 14. Key Features
- Multi-channel (Web, App, EPOS) integration.
- Serverless + container hybrid compute.
- Real-time log streaming and analytics.
- Highly scalable backend through ECS/EKS/EC2/Lambda.
- Secure global delivery with Cloudflare, WAF & CloudFront.
- Distributed DB architecture with Aurora & DynamoDB.
- Event-driven communication using SNS, SQS, EventBridge.

---

## 15. Authors
**Author:** Mohammed Asadullah  
**Team:** Architecture  

---

## 16. ChangeLog
| Version | Date | Author | Changes |
|---------|-------|--------|---------|
| 1.0 | 2025-11-28 | Mohammed Asadullah | Initial architecture documentation. |



