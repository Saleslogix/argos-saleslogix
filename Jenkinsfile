#!groovy
node('windows && nodejs') {
  dir('argos-sdk') {
    stage('Building argos-sdk') {
      clonesdk(env.BRANCH_NAME)

      dir('deploy') {
        deleteDir()
      }

      dir('.grunt') {
        deleteDir()
      }

      try {
        bat 'yarn'
        bat 'yarn run lint'
        bat 'build\\release.cmd'
        bat 'yarn run test'
      } catch (err) {
        teams_failure('Failed building argos-sdk')
        throw err
      }
      dir('deploy') {
        stash includes: '**/*.*', name: 'sdk'
      }
    }

  }

  dir('products/argos-saleslogix') {
    stage ('Building argos-saleslogix') {
      try {
        checkout scm
      } catch (err) {
        teams_failure('Failed getting argos-saleslogix')
        throw err
      }

      dir('deploy') {
        deleteDir()
      }

      dir('.grunt') {
        deleteDir()
      }

      try {
        bat 'yarn'
        bat 'yarn run lint'
        bat 'build\\release.cmd'
        bat 'yarn run test'
      } catch (err) {
        teams_failure('Failed building argos-saleslogix')
        throw err
      }

      dir('deploy') {
        stash includes: '**/*.*', name: 'slx'
      }

      stage 'Creating bundles'
      try {
        bat 'grunt bundle'
        bat 'grunt lang-pack'

        dir('deploy') {
          stage 'Copying bundles'
          bat """robocopy . \\\\usdavwtldata.testlogix.com\\devbuilds\\builds\\mobile\\bundles\\%BRANCH_NAME%\\%BUILD_NUMBER%\\ *.zip /r:3 /w:5
              IF %ERRORLEVEL% LEQ 1 EXIT /B 0"""
        }
      } catch (err) {
        teams_failure('Failed building bundles.')
        throw err
      }
    }
  }
}

stage('Copying to IIS') {
  node('slx82') {
    iiscopy(env.BRANCH_NAME, env.BUILD_NUMBER)
  }
}

stage('Sending Teams notification') {
  node {
    teams_success('Mobile built successfully')
  }
}

void iiscopy(branch, build) {
  dir("C:\\inetpub\\wwwroot\\mobile-builds\\$branch\\$build") {
    unstash 'slx'
    unstash 'sdk'
  }
  bat """%windir%\\System32\\WindowsPowerShell\\v1.0\\PowerShell.exe -NoProfile -NoLogo -ExecutionPolicy unrestricted -Command "C:\\inetpub\\wwwroot\\mobile-builds\\$branch\\$build\\scripts\\iis.ps1 -branch $branch -build $build" """
}

void clonesdk(branch, fallback='develop') {
  try {
    git branch: "$branch", url: 'https://github.com/Saleslogix/argos-sdk.git'
  } catch(err) {
    try {
      git branch: "$fallback", url: 'https://github.com/Saleslogix/argos-sdk.git'
    } catch(er) {
      teams_failure('Failed getting argos-sdk')
      throw er
    }
  }
}

void teams_success(message) {
  withCredentials([string(credentialsId: 'teams-notification-url', variable: 'TEAMS_URL')]) {
    def url = env.TEAMS_URL
    office365ConnectorSend(
        webhookUrl: "${url}",
        color: '#93d374',
        message: message,
        status: 'SUCCESS'
    )
  }
}

void teams_failure(message) {
  withCredentials([string(credentialsId: 'teams-notification-url', variable: 'TEAMS_URL')]) {
    def url = env.TEAMS_URL
    office365ConnectorSend(
        webhookUrl: "${url}",
        color: '#e57260',
        message: message,
        status: 'FAILURE'
    )
  }
}
