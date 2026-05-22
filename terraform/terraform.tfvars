#VPC

cluster_name = "ecs-project-cluster"
vpc_cidr = "10.0.0.0/16"
public_subnet_cidrs = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
private_subnet_cidrs = ["10.0.4.0/24", "10.0.5.0/24", "10.0.6.0/24"]
availability_zones = ["eu-west-2a", "eu-west-2b", "eu-west-2c"]


#ALB
alb_name = "ecs-project-alb"
alb_sg_name = "ecs-project-alb-sg"
target_group_name = "ecs-project-tg"


#ECS    

service_name = "ecs-project-service"
task_family = "ecs-project-task"
ecs_sg_name = "ecs-project-ecs-sg"
image = "904053120036.dkr.ecr.eu-west-2.amazonaws.com/ssl-checker"
cpu = 256
memory = 512
desired_count = 1
container_port = 3000
log_retention_days = 7
aws_region = "eu-west-2"


#ACM and Route53
domain_name = "mohamedecsproject.com"
