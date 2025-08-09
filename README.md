# 🚀 Web App Deployment on AWS (ECR + ECS Fargate + CodeBuild + CodePipeline)

This project demonstrates how to **automatically deploy** a web application on AWS using **ECS (Fargate launch type)** with a fully managed **CI/CD pipeline** powered by **CodePipeline** and **CodeBuild**.  
The app is containerized with Docker, stored in Amazon ECR, and deployed to ECS Fargate without managing any EC2 instances.

---

## 🧰 Tech Stack

- **Containerization**: Docker
- **Image Registry**: Amazon ECR
- **Deployment**: AWS ECS (Fargate launch type)
- **CI/CD Pipeline**: AWS CodePipeline + CodeBuild
- **Infrastructure Management**: AWS Console + CLI

---

## 🌐 Live Architecture
```bash
GitHub Push → CodePipeline → CodeBuild (Docker Build + ECR Push) → ECS Fargate → Live App
```


---

Steps

## Step 1 — Launch EC2 instance, install AWS CLI & Docker

- Launch EC2 (Amazon Linux 2 / Ubuntu).
- Install Docker and AWS CLI v2.
- SSH into EC2 and confirm docker --version and aws --version.

## Step 2 — Clone repo on EC2

- git clone <GITHUB_REPO_URL>
- cd <repo-folder> (cd folder)

## Step 3 — Build Docker image (local/EC2)

- docker build -t fullstack-app .
- docker run -p 4000:4000 fullstack-app to smoke-test.

## Step 4 — Create AWS CLI User (CI user)

- Create IAM user & attach role ``AmazonEC2ContainerRegistryFullAccess``.
- Save AccessKeyId & SecretAccessKey for AWS CLI config (or use roles).

## Step 5 — Create ECR repository

## Step 6 — Create Security Groups

- EC2 SG: allow SSH from your IP.
- ALB/ECS SG: allow HTTP(80) inbound.
- ECS task SG: allow inbound rule 3000.

## Step 7 — Create ECS Cluster (Fargate)

- ECS → Create cluster → Networking only (Fargate).
- Choose VPC & subnets (prefer 2+ subnets across AZs).

## Step 8 — Create Task Definition

- Launch type: FARGATE, network mode awsvpc.
- Container: image = ECR URI, container port = 3000.
- Set task execution role ecsTaskExecutionRole and log config (awslogs).

## Step 9 — Create Service in Cluster

- Create ECS Service (Fargate), desired count (e.g., 1).
- Attach Target Group / ALB (type: ip) and health check path.
- Assign VPC, subnets, and ECS task SG.

## Step 10 — Create CodeBuild

- Create CodeBuild project: source = GitHub.
- Give CodeBuild role ECR push & ECS update permissions.

## Step 11 — Create CodePipeline

- Stages: Source (GitHub) → Build (CodeBuild) → Deploy (ECS).
- Configure Deploy action to use the artifact (imagedefinitions.json).
- Skip Test stage (omit test stage per your flow).

## Step 12 — Final: Trigger & Verify Deployment

- Push to GitHub → pipeline runs.
- Verify CodePipeline stages pass, CodeBuild logs show Docker push.
- Confirm ECR has new image tag, ECS service updates tasks to RUNNING, ALB health checks pass.
- Open app via ALB DNS or frontend S3 URL.

---


📘 **Read the full step-by-step blog here:**  
[Deploy Web App to ECS Fargate using CodeBuild and CodePipeline](https://visheshblog.hashnode.dev/project-5-deploy-web-app-to-ecs-fargate-using-codebuild-and-codepipeline)




