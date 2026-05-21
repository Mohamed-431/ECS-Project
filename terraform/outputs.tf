output "vpc_id" {
  description = "ID of the VPC"
  value       = module.vpc.vpc_id

}
output "cluster_name" {
  description = "Name of the ECS cluster"
  value       = var.cluster_name
}

output "alb_sg_id" {
  description = "Security group ID of the ALB"
  value       = module.alb.alb_sg_id
}

output "alb_dns_name" {
  description = "DNS name of the ALB"
  value       = module.alb.alb_dns_name
}

output "target_group_arn" {
  description = "ARN of the ALB target group"
  value       = module.alb.target_group_arn
}

