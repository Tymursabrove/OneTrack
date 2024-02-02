terraform {
  backend "s3" {}
  required_version = "~> 1.5.0"
}

provider "aws" {
  profile = terraform.workspace == "prod" ? "one-track-production" : "one-track-developer"
  region  = "eu-central-1"
}


data "aws_ecr_repository" "this" {
  name = var.docker_repository_name
}

locals {
  hosted_zone_name = terraform.workspace == "prod" ? "one-track.io" : "dev.one-track.io"
  fqdn             = terraform.workspace == "prod" ? "app.${local.hosted_zone_name}" : "${terraform.workspace}.app.${local.hosted_zone_name}"
  profile          = terraform.workspace == "prod" ? "one-track-production" : "one-track-developer"
  docker_image_tag = terraform.workspace
}

data "aws_region" "this" {}

# build and push the docker image
resource "null_resource" "docker_build_and_push" {
  provisioner "local-exec" {
    command = <<-EOT
      cd ..
      docker build -t ${data.aws_ecr_repository.this.repository_url}:${local.docker_image_tag} .
      aws ecr get-login-password --region ${data.aws_region.this.name} --profile ${local.profile} | docker login --username AWS --password-stdin ${data.aws_ecr_repository.this.repository_url}
      docker push ${data.aws_ecr_repository.this.repository_url}:${local.docker_image_tag}
    EOT
  }

  triggers = {
    always_run = "${timestamp()}"
  }
}

data "aws_ecr_image" "frontend_webapp" {
  repository_name = "frontend-webapp"
  image_tag       = local.docker_image_tag

  depends_on = [null_resource.docker_build_and_push]
}

