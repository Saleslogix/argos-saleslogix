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
