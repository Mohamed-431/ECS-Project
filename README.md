# ECS-Project

## Project Overview

In this project I will be deploying a containerised Node.js SSL Certificate Checker application on AWS ECS.This end-to-end DevOps implementation includes a secure CI/CD pipeline using GitHub Actions, ensuring every change is scanned and validated by modern security tools. The web application allows users to instantly inspect the SSL certificate of any domain, returning key details such as expiry date, issuer and health status.

---

## Project Architecture

![Project Architecture](https://snipboard.io/ejNY0J.jpg)

---

## Tools

- AWS (Cloud Resources & CLI)
- Terraform (Infrastructure As Code)
- GitHub Actions (CI/CD)
- Docker (Containerisation)
- Trivy (Image Scanning)
- SonarQube (Static Code Analysis)


---

## Functioning Project

### GitHub Actions:
#### Workflow 1
![GitHub Actions:1](https://snipboard.io/QP9qRr.jpg)
#### Workflow 2
![GitHub Actions:2](https://snipboard.io/SrUbYp.jpg)
#### Workflow 3
![GitHub Actions:3](https://snipboard.io/myMK57.jpg)

### Working Application:
#### Application Homepage
![Working Application](https://snipboard.io/02MpOd.jpg)
#### SSL Certificate Check Result : github.com
![Working Application 2](https://snipboard.io/VaJ0Or.jpg)
#### SSL Certificate Check Result : mohamedecsproject.com
![Working Application 3](https://snipboard.io/Bfbmks.jpg)
### SonarQube — Static Code Analysis
![SonarQube](https://snipboard.io/BPDEum.jpg)

### Trivy:
![Trivy](https://snipboard.io/dWiLbr.jpg)

![Trivy](https://snipboard.io/uoBJXc.jpg)

### Elastic Container Registry:
![ECR](https://snipboard.io/RlZcLn.jpg)

---

## Technical Implementation

### Infrastructure as Code & Cloud Platform

Configured Terraform to provision and manage the AWS cloud infrastructure following Infrastructure as Code best practices. A modular design approach was implemented to improve reusability, simplify infrastructure management, and support easier scaling of cloud resources, while Terraform remote state management with Amazon S3 and DynamoDB state locking ensured secure and reliable collaborative deployments.

---
### CI/CD

Built and orchestrated a CI/CD pipeline using GitHub Actions across three dedicated workflows. Static code analysis, container image scanning, and pushing the image to Amazon ECR are handled within a single automated workflow triggered on every push to the main branch. Two additional manual workflows manage infrastructure provisioning and destruction, requiring explicit confirmation before any changes are applied to the cloud environment to ensure controlled and secure infrastructure operations.

---
### Security 

Implemented industry-standard security measures using Trivy and SonarCloud to guarantee the security of any changes that reach the container registry. By identifying and preventing security threats at both the code and container level, these tools ensure every deployment is safe from code commit to container push.

---	
### Containerisation & Container Orchestration

Utilised Docker to containerise the Node.js application into a lightweight, portable container, ensuring consistent and reproducible behaviour across all environments. Amazon ECS then handled container orchestration, eliminating the need to manage the underlying infrastructure and automatically executing health checks, task restarts, and load balancer integration to maintain high availability.

---

## Project Evaluation

This project demonstrates a strong practical understanding of modern DevOps, covering everything from domain registration and DNS configuration to automated security scanning and container orchestration. The combination of tools and practices used throughout reflects industry standards and showcases my ability to independently design, build and deliver a complete end-to-end secure, containerised application on AWS from the ground up.

