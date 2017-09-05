#!groovy
node('windows && nodejs') {
  dir('argos-sdk') {
    stage('Building argos-sdk') {
      clonesdk(env.BRANCH_NAME)

      dir('deploy') {
        deleteDir()
      }

      try {
        bat 'yarn'
        bat 'yarn run lint'
        bat 'build\\release.cmd'
        bat 'yarn run testbasic'
      } catch (err) {
        slack.failure('Failed building argos-sdk')
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
        slack.failure('Failed getting argos-saleslogix')
        throw err
      }

      dir('deploy') {
        deleteDir()
      }

      try {
        bat 'yarn'
        bat 'yarn run lint'
        bat 'build\\release.cmd'
        //bat 'yarn run testbasic'
      } catch (err) {
        slack.failure('Failed building argos-saleslogix')
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
        slack.failure('Failed building bundles.')
        throw err
      }
    }
  }
}

stage('Copying to IIS') {
  node('slx82') {
    iiscopy(env.BRANCH_NAME, env.BUILD_NUMBER)
    bat """PowerShell -NoProfile -NoLogo -ExecutionPolicy unrestricted -Command " & '%~dp0build\\iis.ps1 -branch $env.BRANCH_NAME -build $build' %*; exit $LASTEXITCODE"""
  }
}

stage('Sending Slack notification') {
  node {
    slack.success('Mobile built successfully')
  }
}

void iiscopy(branch, build) {
  dir("C:\\inetpub\\wwwroot\\mobile-builds\\$branch\\$build") {
    unstash 'slx'
    unstash 'sdk'
  }
}

void clonesdk(branch, fallback='develop') {
  try {
    git branch: "$branch", url: 'http://git.infor.com/scm/inforcrm/argos-sdk.git'
  } catch(err) {
    try {
      git branch: "$fallback", url: 'http://git.infor.com/scm/inforcrm/argos-sdk.git'
    } catch(er) {
      slack.failure('Failed getting argos-sdk')
      throw er
    }
  }
}
