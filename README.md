# 🚀 Simple Feedback API – CI/CD with Jenkins & Docker

This project demonstrates a full DevOps workflow for a Node.js + MongoDB feedback API. The API is Dockerized and deployed using a Jenkins CI/CD pipeline triggered by GitHub commits.

---

## 📘 Overview

A simple Express-based API where users can submit feedback. The app saves data to MongoDB and is designed for seamless CI/CD automation using Jenkins and Docker.

---

## ⚙️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Containerization**: Docker
- **CI/CD**: Jenkins (Declarative Pipeline)
- **Version Control**: Git & GitHub

---

## ✅ Features

- `POST /feedback` – Accepts feedback with `name` and `message`.
- Saves feedback to MongoDB using Mongoose.
- Dockerized Node.js app.
- Jenkins pipeline to:
  - Clone code from GitHub
  - Build Docker image
  - Run Docker container
  - Inject environment variables

---

## 🔁 Jenkins Pipeline Workflow

### Pipeline Stages:
1. **Checkout** – Pulls latest code from GitHub.
2. **Build Docker Image** – Builds the image from `./server`.
3. **Stop Existing Container** – Cleans up any running containers.
4. **Run New Container** – Deploys app with environment variables.

### Jenkinsfile Sample:
```groovy
pipeline {
  agent any

  environment {
    PORT = '3000'
    MONGODB_URL = 'your-mongo-url'
  }

  stages {
    stage('Build Docker Image') {
      steps {
        sh 'docker build -t feedback-api ./server'
      }
    }

    stage('Run Docker Container') {
      steps {
        sh '''
          docker stop feedback-api || true
          docker rm feedback-api || true
          docker run -d -p 5000:3000 \
            -e PORT=$PORT \
            -e MONGODB_URL=$MONGODB_URL \
            --name feedback-api feedback-api
        '''
      }
    }
  }
}
