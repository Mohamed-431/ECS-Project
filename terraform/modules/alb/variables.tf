
variable "alb_name" {
  description = "Name of the Application Load Balancer"
  type        = string
}

variable "alb_sg_name" {
  description = "Name of the security group for the ALB"
  type        = string
}

variable "vpc_id" {
  description = "ID of the VPC"
  type        = string
}

variable "subnets" {
  description = "List of public subnet IDs for the ALB"
  type        = list(string)
}

 variable "certificate_arn" {
   description = "ARN of the ACM certificate for HTTPS"
   type        = string
 }

variable "target_group_name" {
  description = "Name of the ALB target group"
  type        = string
}

