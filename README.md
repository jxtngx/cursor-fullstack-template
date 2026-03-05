# Cursor Fullstack Template

> [!NOTE]
> This project is under active development

This repository serves as a fullstack development template optimized for use with Cursor IDE, featuring a modern Next.js frontend and Python backend architecture. The project is designed with containerization in mind, providing Docker configurations for both services to ensure consistent development and deployment environments. A Make-based build system orchestrates common development tasks, streamlining workflows for building, testing, and running both the frontend and backend components in isolation or as a unified stack.


## Creator's Intent 

Fullstack AI applications inclusive of data engineering, model training, agentic workflows, interactive UIs, and more.

## Goal

Enable the fullstack development with AI for AI.

## Opinionated Choices

- Python and Typescript
- Next.js and Shadcn UI
- FastAPI and PostgreSQL | Cassandra
- HuggingFace and LangChain
- Docker and Make
- AWS for Cloud Services
- LocalStack for AWS emulation
- SigNoz and Phoenix for Monitoring and Observability

## Required Accounts & Services

Based on the opinionated technology choices, you'll need accounts for the following services:

### Core Development

| Service | Purpose | Free Tier | Required |
|---------|---------|-----------|----------|
| [GitHub](https://github.com) | Code hosting, version control, CI/CD | ✅ Yes | ✅ Required |
| [Docker Hub](https://hub.docker.com) | Container registry | ✅ Yes (public) | ✅ Required |

### Cloud & Infrastructure

| Service | Purpose | Free Tier | Required |
|---------|---------|-----------|----------|
| [AWS](https://aws.amazon.com) | Cloud services (Bedrock, S3, RDS, etc.) | ✅ Yes (12 months) | ✅ Required for production |

### AI & ML Services

| Service | Purpose | Free Tier | Required |
|---------|---------|-----------|----------|
| [AWS Bedrock](https://aws.amazon.com/bedrock/) | Fine-tuned model hosting | ❌ Pay per use | ✅ Required for AI features |
| [AWS EC2](https://aws.amazon.com/ec2/) | Model training and tuning | ❌ Pay per use | ✅ Required for AI development |
| [HuggingFace](https://huggingface.co) | Model hub, datasets, inference | ✅ Yes | ✅ Required |
| [LangChain](https://www.langchain.com) | Agent framework (open source) | ✅ Yes | ✅ Required |

### Work Tracking & Communication (MCP Integrations)

| Service | Purpose | Free Tier | Required |
|---------|---------|-----------|----------|
| [Notion](https://www.notion.so) | Documentation, sprint planning, knowledge base | ✅ Yes (personal) | ✅ Recommended |
| [Linear](https://linear.app) | Issue tracking, project management | ✅ Yes (up to 10 users) | ✅ Recommended |
| [Discord](https://discord.com) | Team communication, bot notifications | ✅ Yes | ✅ Recommended |

### Development Tools

| Service | Purpose | Free Tier | Required |
|---------|---------|-----------|----------|
| [Cursor](https://cursor.sh) | AI-powered IDE | ✅ Yes | ✅ Required |
| [GitHub Copilot](https://github.com/features/copilot) | AI code completion | ✅ Yes | ⚪ Optional |
