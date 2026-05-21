terraform {
  backend "s3" {
    bucket         = "mohamed-ecsproject-terraform-state"
    key            = "ecs-project/terraform.tfstate"
    region         = "eu-west-2"
    dynamodb_table = "mohamed-ecsproject-terraform-locks"
    encrypt        = true
  }
}