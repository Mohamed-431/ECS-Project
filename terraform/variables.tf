variable "cluster_name" {
  description = "Name of the ECS cluster"
  type        = string
}



variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
}

variable "public_subnet_cidrs" {
  description = "List of CIDR blocks for public subnets"
  type        = list(string)
}

variable "private_subnet_cidrs" {
  description = "List of CIDR blocks for private subnets"
  type        = list(string)

}

variable "availability_zones" {
  description = "List of availability zones"
  type        = list(string)
}

variable "alb_name" {
  description = "Name of the Application Load Balancer"
  type        = string
}

variable "alb_sg_name" {
  description = "Name of the security group for the ALB"
  type        = string
}

variable "target_group_name" {
  description = "Name of the ALB target group"
  type        = string
}

variable "service_name" {
  description = "Name of the ECS service"
  type        = string
}

variable "task_family" {
  description = "Family name for the ECS task definition"
  type        = string
}

variable "ecs_sg_name" {
  description = "Name of the security group for the ECS service"
  type        = string
}

variable "image" {
  description = "Docker image for the ECS task"
  type        = string
}

variable "cpu" {
  description = "CPU units for the ECS task"
  type        = number
}

variable "memory" {
  description = "Memory in MiB for the ECS task"
  type        = number
}

variable "desired_count" {
  description = "Desired number of ECS tasks"
  type        = number
}

variable "log_retention_days" {
  description = "Number of days to retain logs in CloudWatch"
  type        = number
}

variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
}

variable "container_port" {
  description = "Port number the container listens on"
  type        = number
}

variable "domain_name" {
  description = "Domain name for Route53 record"
  type        = string
}


