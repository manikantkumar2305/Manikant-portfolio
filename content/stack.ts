/* My Design Stack — tools shown in the spiral orbit.
   `src` uses a real logo from /public/images/logos when we have one;
   otherwise a brand-tinted monogram mark keeps the set visually uniform.
   To upgrade a monogram: drop an SVG/PNG in that folder and swap in `src`. */

export type Tool = {
  name: string;
  group: "Cloud" | "Containers" | "Automation" | "Observability";
  src?: string;
  mono?: string;
  color?: string;
};

export const TOOLS: Tool[] = [
  /* — Cloud — */
  { name: "AWS", group: "Cloud", src: "/images/logos/aws.svg" },
  { name: "EC2", group: "Cloud", src: "/images/logos/aws-ec2.svg" },
  { name: "S3", group: "Cloud", src: "/images/logos/amazon-s3.svg" },
  { name: "EKS", group: "Cloud", src: "/images/logos/amazon-eks.svg" },
  { name: "IAM", group: "Cloud", src: "/images/logos/aws-iam.svg" },
  { name: "VPC", group: "Cloud", src: "/images/logos/virtual-private-cloud.svg" },

  /* — Containers — */
  { name: "Docker", group: "Containers", src: "/images/logos/docker.svg" },
  { name: "Kubernetes", group: "Containers", src: "/images/logos/kubernetes.svg" },
  { name: "Helm", group: "Containers", src: "/images/logos/helm.svg" },
  { name: "ECR", group: "Containers", src: "/images/logos/ecr.svg" },
  { name: "ECS", group: "Containers", src: "/images/logos/amazon-ecs.svg" },
  { name: "Nginx", group: "Containers", src: "/images/logos/nginx.svg" },

  /* — Automation — */
  { name: "Terraform", group: "Automation", src: "/images/logos/terraform.svg" },
  { name: "Ansible", group: "Automation", src: "/images/logos/ansible.svg" },
  { name: "GitHub Actions", group: "Automation", src: "/images/logos/github-action.svg" },
  { name: "Git", group: "Automation", src: "/images/logos/git-merge.svg" },
  { name: "Bash", group: "Automation", src: "/images/logos/bash01.svg" },
  { name: "Python", group: "Automation", src: "/images/logos/python.svg" },

  /* — Observability — */
  { name: "Prometheus", group: "Observability", src: "/images/logos/prometheus.svg" },
  { name: "Grafana", group: "Observability", src: "/images/logos/grafana.svg" },
  { name: "CloudWatch", group: "Observability", src: "/images/logos/aws-cloudwatch.svg" },
  { name: "Alertmanager", group: "Observability", src: "/images/logos/prometheus.svg" },
  { name: "Metrics Server", group: "Observability", src: "/images/logos/prometheus.svg" },
  { name: "Logging", group: "Observability", src: "/images/logos/cloud-logging.svg" },
];
