####### Record #########
resource "aws_route53_record" "chainface" {
  zone_id = "Z04562081YH5Y9J5LDPDM"
  name = "chainfaces"
  type = "A"
  
  alias {
      name = aws_alb.https.dns_name
      zone_id = aws_alb.https.zone_id
      evaluate_target_health = true
  }
}


####### Certificate ####
resource "aws_acm_certificate" "chainface" {
  domain_name = aws_route53_record.chainface.fqdn
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}