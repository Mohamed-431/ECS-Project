output "route53_zone_id" {
  description = "The ID of the hosted zone"
  value       = data.aws_route53_zone.dns_zone.zone_id
}

output "domain_name" {
  description = "The domain name for the Route53 hosted zone"
  value       = var.domain_name
}

output "root_record_name" {
  description = "The name of the root domain record"
  value       = aws_route53_record.root.name
}

output "www_record_name" {
  description = "The name of the www subdomain record"
  value       = aws_route53_record.www.name
}
