pipeline {
  agent any

  stages {
    stage('Clonar código') {
      steps {
        git url: 'https://github.com/Llubi/ASIR.git', branch: 'main'
      }
    }

    stage('Construir y desplegar') {
      steps {
        sh '''
          docker compose down
          docker compose up --build -d
        '''
      }
    }
  }
}