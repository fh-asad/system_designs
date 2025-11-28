# Dynamic SiteMap Generator

This Architecture documents the **Dynamic Sitemap Generator** stack for the Foodhub platform.

---

## 1. Overview
The **Dynamic Sitemap Generator Lambda** automates the creation and update of sitemap XML files for multiple Foodhub websites across UK, Non-UK, and franchise domains.  
It helps improve **SEO visibility** and ensures that search engines always have access to the latest page URLs.  

The stack runs daily using **EventBridge** or can be triggered manually via **Lambda Function URL** (using tools like Postman).  
It operates within the **eu-west-1** AWS region and interacts with RDS, S3, and CloudFront services to generate and distribute sitemaps efficiently.

### Architecture Diagram
![Dynamic Sitemap Generator](dynamic_sitemap_generator.png)

---

## 2. Workflow Details

### 2.1 Triggering
- The Lambda function can be invoked by:
  - **AWS EventBridge Rule** — scheduled to trigger every day automatically.
  - **Postman (Function URL)** — for manual execution and testing.

---

### 2.2 Sitemap Generation
- The **Lambda function** connects to the **RDS (foxy_project56)** database to fetch store and domain information.
- It dynamically generates multiple sitemap XML files depending on the domain type:
  - **For Foodhub UK & Bigfoodie Sites:**  
    `location.xml`, `ordernow.xml`, `reviews.xml`, `info.xml`, `postcode.xml`, `cuisines.xml`, `offers.xml`, `cuisines-postcode.xml`, `brands.xml`
  - **For NON-UK Sites:**  
    `location.xml`, `ordernow.xml`, `reviews.xml`, `info.xml`
- Each file is stored in its respective **S3 bucket**.

---

### 2.3 S3 and CloudFront
- The generated sitemap files are uploaded to:
  - **FH UK S3 Bucket**
  - **FH NON UK S3 Bucket**
  - **Other Franchise S3 Bucket**
- After upload, the corresponding **CloudFront distributions** (UK, Non-UK, Other Franchise) are **invalidated** to ensure the updated sitemaps are served immediately to search engines.

---

### 2.4 Data Source
- **RDS Instance:** `foxy_project56`  
  Stores information related to store listings, domains, and related metadata required to build the sitemap structure.

---

## 3. Key Components
| Component               | Purpose |
|--------------------------|-------------------------------------------------------------|
| EventBridge Rule         | Triggers the Lambda daily for automatic sitemap updates |
| Lambda Function          | Generates sitemap XML files dynamically |
| RDS (foxy_project56)     | Source for store and site data |
| S3 Buckets               | Storage for generated sitemap files |
| CloudFront               | Serves sitemap files and is invalidated post-upload |
| Postman (Function URL)   | Manual trigger for testing or immediate updates |

---

## 4. High-Level Flow

```text
EventBridge (daily) / Postman (manual)
          ↓
Lambda (Sitemap Generator)
          ↓
Fetches store data from RDS (foxy_project56)
          ↓
Generates sitemap XML files
          ↓
Uploads to respective S3 buckets
          ↓
Invalidates CloudFront distributions
```

---

## 6. Author
- **Author**: Mohammed Asadullah
- **Team**: Architecture Team

---

## 7. ChangeLog
| Version | Date       | Author             | Changes                    |
|---------|------------|--------------------|----------------------------|
| 1.0     | 2025-11-10 | Mohammed Asadullah | Initial document creation. |