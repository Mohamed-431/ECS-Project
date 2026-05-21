variable "domain_name" {
  description = "The domain name for the Route53 hosted zone"
  type        = string
}

variable "alb_dns_name" {
  description = "The DNS name of the Application Load Balancer to point the Route53 records to"
  type        = string
}

variable "alb_zone_id" {
  description = "The hosted zone ID of the Application Load Balancer to point the Route53 records to"
  type        = string
}

