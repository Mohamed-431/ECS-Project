# SSL Certificate Checker

A Node.js web app that inspects SSL certificates for any domain — expiry date, issuer, protocol, cipher suite, SANs and more.

Deployed on AWS ECS Fargate behind an Application Load Balancer, provisioned with modular Terraform.

## Running locally

```bash
npm install
npm start
# visit http://localhost:80
```

## Running with Docker

```bash
docker build -t ssl-checker .
docker run -p 80:80 ssl-checker
# visit http://localhost
```

## Pushing to ECR

```bash
aws ecr get-login-password --region eu-west-2 | \
  docker login --username AWS \
  --password-stdin <account_id>.dkr.ecr.eu-west-2.amazonaws.com

docker build -t ssl-checker .
docker tag ssl-checker:latest <account_id>.dkr.ecr.eu-west-2.amazonaws.com/ssl-checker:latest
docker push <account_id>.dkr.ecr.eu-west-2.amazonaws.com/ssl-checker:latest
```

## Tech Stack

- **Backend**: Node.js + Express
- **SSL Parsing**: Node.js built-in `tls` module
- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Infrastructure**: AWS ECS Fargate, ALB, VPC — provisioned with Terraform
