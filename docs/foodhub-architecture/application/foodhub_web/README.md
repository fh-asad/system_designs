# Foodhub Web Architecture

This document explains the end-to-end flow of the **Foodhub Web Architecture** as illustrated in the architecture diagram.

---

## 1. Overview
The system is designed to serve Foodhub’s web and API traffic securely, efficiently, and at scale.  
It leverages **Cloudflare** for global DNS, security, and traffic management, while **AWS** handles content delivery, application hosting, and data persistence.

### Architecture Diagram
![Foodhub Web Architecture](architecture.drawio)

---

## 2. Request Flow

### 2.1 Client & Cloudflare Layer
1. A client (web browser) resolves `abc.com`.
2. DNS resolution is handled by **Cloudflare DNS**.
3. The request passes through **Cloudflare Edge**, where:
   - TLS/SSL termination occurs.
   - Web traffic is inspected by **Cloudflare WAF** and **Bot Control**.
4. Cloudflare Load Balancer selects a healthy pool from **Cloudflare Pools** and forwards the request.

---

### 2.2 AWS – Content Delivery Network
1. Cloudflare forwards the HTTP request to **Amazon CloudFront**.
2. **AWS WAF** filters the request at the CDN edge.
3. CloudFront routes the request based on behaviours:
   - **Default behaviour** → handles static content.
   - **`/api` behaviour** → forwards to backend APIs.
4. Cached objects are served directly when available.

---

### 2.3 Static Content Delivery
- Static assets (HTML, CSS, JS, images) are stored in **AWS S3 (UI Block)**.
- An **Origin Request Lambda** fetches content from S3 when not cached.

---

### 2.4 API Backend
1. API calls are routed to **AWS WAF** for additional protection.
2. The traffic reaches an **Application Load Balancer (ALB)** on ports 80/443.
3. ALB forwards requests to EC2 instances in private subnets.
4. Application servers interact with:
   - **ElastiCache (Redis)** for caching.
   - **Amazon RDS Aurora (MySQL)** for database operations.

---

### 2.5 Networking Components
- The backend is hosted inside a **VPC** in `eu-west-1` across AZs `eu-west-1a`, `1b`, and `1c`.
- **Private subnets** host:
  - EC2 application servers.
  - Redis.
  - RDS Aurora.
- **Public subnets** contain:
  - NAT Gateway (internet egress for private resources).
  - Bastion host (SSH access to private EC2s).
- An **Internet Gateway (IGW)** provides external connectivity.

---

## 3. Security Layers
- **Cloudflare WAF** & **Bot Control** block malicious traffic at the edge.
- **AWS WAF** secures CloudFront and the ALB.
- Private subnets isolate application components.
- Bastion host + security groups manage admin access.

---

## 4. Key AWS Services
| Service             | Purpose                                  |
|--------------------|------------------------------------------|
| CloudFront         | CDN for caching and delivering content   |
| AWS WAF            | Web application firewall at CDN & ALB    |
| Lambda (Origin)    | Handles origin requests for S3 content   |
| S3                 | Static site hosting (UI Block)           |
| ALB                | Routes API traffic to EC2 targets        |
| EC2                | Application hosting                      |
| ElastiCache (Redis)| Session/cache management                 |
| RDS Aurora (MySQL) | Relational database                      |
| NAT Gateway        | Outbound internet for private resources  |
| Bastion Host       | Secure SSH into private instances        |

---

## 5. High-Level Flow

```text
Browser → Cloudflare DNS → Cloudflare Edge (WAF/Bot Control) → Cloudflare LB → CloudFront (WAF, Cache)
→ [Static: Lambda → S3] OR [API: WAF → ALB → EC2 → Redis/RDS]
```