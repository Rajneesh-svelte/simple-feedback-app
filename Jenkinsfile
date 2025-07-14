pipeline {
  agent any

  environment {
    PORT = '3000'
    MONGODB_URL = 'mongodb+srv://rajneeshkumar6267:bC1T3upMX6eONeiS@cluster0.dwuye7x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
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

          # Run container mapping host port 5000 -> container port 3000
          docker run -d -p 5000:3000 \
            -e PORT=$PORT \
            -e MONGODB_URL=$MONGODB_URL \
            --name feedback-api feedback-api
        '''
      }
    }
  }
}
