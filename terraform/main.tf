
module "vpc" {
  source = "./modules/vpc"

  vpc_cidr             = var.vpc_cidr
  availability_zones   = var.availability_zones
  private_subnet_cidrs = var.private_subnet_cidrs
  public_subnet_cidrs  = var.public_subnet_cidrs
  cluster_name         = var.cluster_name

}

module "acm" {
  source = "./modules/ACM"

  domain_name = var.domain_name

}


module "alb" {
  source = "./modules/alb"
  alb_name       = var.alb_name
  alb_sg_name    = var.alb_sg_name
  vpc_id         = module.vpc.vpc_id
  subnets        = module.vpc.public_subnet_ids
  certificate_arn = module.acm.certificate_arn
  target_group_name = var.target_group_name

}


module "ecs" {
  source = "./modules/ecs"
  
  cluster_name = var.cluster_name
  task_family   = var.task_family
  service_name = var.service_name
  ecs_sg_name = var.ecs_sg_name
  image        = var.image
  vpc_id       = module.vpc.vpc_id
  private_subnets   = module.vpc.private_subnet_ids
  alb_sg_id    = module.alb.alb_sg_id
  target_group_arn = module.alb.target_group_arn
  cpu = var.cpu
  memory = var.memory
  desired_count = var.desired_count
  log_retention_days = var.log_retention_days
  aws_region = var.aws_region
  container_port = var.container_port
}

module "route53" {
  source = "./modules/Route53"

  domain_name = var.domain_name
  alb_dns_name = module.alb.alb_dns_name
  alb_zone_id = module.alb.alb_zone_id

  
}

