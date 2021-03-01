######### Security Groups #############
resource "aws_security_group" "http" {
    name                = "chainface_http"
    description         = "http security group"
    vpc_id              = var.vpc_id

    ingress {
        from_port       = 80
        to_port         = 80
        protocol        = "tcp"
        cidr_blocks     = ["0.0.0.0/0"]
    }

    egress {
        from_port       = 0
        to_port         = 0
        protocol        = -1
        cidr_blocks     = ["0.0.0.0/0"]
    }
}

resource "aws_security_group" "https" {
    name                = "chainface_https"
    description         = "https security group"
    vpc_id              = var.vpc_id

    ingress {
        from_port       = 443
        to_port         = 443
        protocol        = "tcp"
        cidr_blocks     = ["0.0.0.0/0"]
    }

    egress {
        from_port       = 0
        to_port         = 0
        protocol        = -1
        cidr_blocks     = ["0.0.0.0/0"]
    }
}

############ Load Balancers #############
resource "aws_alb" "http" {
  name                      = "chainface-http"
  internal                  = false
  security_groups           = [ "${aws_security_group.http.id}" ]
  subnets                   = var.subnets

  enable_deletion_protection = false
}

resource "aws_alb" "https" {
  name                      = "chainface-https"
  internal                  = false
  security_groups           = [ "${aws_security_group.https.id}" ]
  subnets                   = var.subnets

  enable_deletion_protection = false
}

############## Target Groups ##########
resource "aws_alb_target_group" "http" {
  name          = "chainface-http"
  port          = 80
  protocol      = "HTTP"
  vpc_id        = var.vpc_id
  target_type   = "ip"
  
  health_check {
    interval            = 30
    port                = 80
    protocol            = "HTTP"
    path                = "/"
    timeout             = 5
    healthy_threshold   = 5
    unhealthy_threshold = 3
  } 
  
}

######### Listeners #########
resource "aws_lb_listener" "https_redirect" {
  load_balancer_arn     = aws_alb.https.arn
  port                  = "80"
  protocol              = "HTTP"

  default_action {
    type = "redirect"
    
    redirect {
      port          = 443
      protocol      = "HTTPS"
      status_code   = "HTTP_301"
    }
  }
}

resource "aws_lb_listener" "https" {
  load_balancer_arn     = aws_alb.https.arn
  port                  = "443"
  protocol              = "HTTPS"
  ssl_policy            = "ELBSecurityPolicy-2016-08"
  certificate_arn       = aws_acm_certificate.chainface.arn

  default_action {
    type = "forward"
    target_group_arn = aws_alb_target_group.http.arn
  }
}