############### ECS Cluster ##############
resource "aws_ecs_cluster" "chainface" {
    name                = "chainface"
    capacity_providers  = [ "FARGATE" ]

    default_capacity_provider_strategy {
      capacity_provider = "FARGATE"
    }
}

############### ECS Service ##############
resource "aws_ecs_service" "chainface" {
    name                = "chainface"
    cluster             = aws_ecs_cluster.chainface.id
    task_definition     = aws_ecs_task_definition.chainface.arn
    desired_count       = 1
    launch_type         = "FARGATE"
    depends_on          = [ aws_lb_listener.https_redirect, aws_lb_listener.https, aws_alb_target_group.http ]

    network_configuration {
      subnets = var.subnets
      security_groups = [aws_security_group.http.id, aws_security_group.https.id]
      assign_public_ip = true
    }

    load_balancer {
      target_group_arn      = aws_alb_target_group.http.arn
      container_name        = "chainface"
      container_port        = 80
    }
}


############### ECS Task Definition ##############
resource "aws_ecs_task_definition" "chainface" {
    family                      = "chainface"
    network_mode                = "awsvpc"
    requires_compatibilities    = [ "FARGATE" ]
    cpu                         = 256
    memory                      = 512
    execution_role_arn          = "arn:aws:iam::410628466457:role/ecsTaskExecutionRole"
    container_definitions       = file("tasks/task_def.json")
}