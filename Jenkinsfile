pipeline {
  agent any

  stages {
    stage('Clone Repo') {
      steps {
        git branch: 'main', url: 'https://github.com/Rajneesh-svelte/simple-feedback-app.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          docker.build('feedback-api', './server')
        }
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
