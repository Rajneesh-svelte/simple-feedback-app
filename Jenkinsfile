pipeline {
  agent any

  stages {
    stage('Build Docker Image') {
      steps {
        sh 'docker build -t feedback-api ./server'
      }
    }

    stage('Run Docker Container') {
      steps {
        sh 'docker stop feedback-api || true && docker rm feedback-api || true'
        sh 'docker run -d -p 3000:3000 --env-file server/.env --name feedback-api feedback-api'
      }
    }
  }
}
