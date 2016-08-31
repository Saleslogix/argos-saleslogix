#!groovy

stage 'Building argos-sdk & argos-saleslogix'
parallel slx: {
  node('windows && nodejs') {
    try {
      checkout scm
    } catch (err) {
      slack.failure('Failed getting argos-saleslogix')
      throw err
    }

    dir('deploy') {
      deleteDir()
    }

    bat 'npm install'
    bat 'build\\release.cmd'
    stash includes: 'deploy/**/*.*', name: 'slx'
  }
}, sdk: {
  node('windows && nodejs') {
    try {
      git branch: "$env.BRANCH_NAME", url: 'http://git.infor.com/scm/inforcrm/argos-sdk.git'
    } catch(err) {
      try {
        git branch: 'develop', url: 'http://git.infor.com/scm/inforcrm/argos-sdk.git'
      } catch(er) {
        slack.failure('Failed getting argos-sdk')
        throw er
      }
    }

    dir('deploy') {
      deleteDir()
    }

    bat 'npm install'
    bat 'build\\release.cmd'
    stash includes: 'deploy/**/*.*', name: 'sdk'
  }
}, failFast: true

stage 'Copy to IIS'
parallel slx80: {
  node('slx80') {
    //iis-copy(env.BRANCH_NAME, env.BUILD_NUMBER)
  }
}, slx81: {
  node('slx81') {
    //iis-copy(env.BRANCH_NAME, env.BUILD_NUMBER)
  }
}, slx82: {
  node('slx82') {
    iis-copy(env.BRANCH_NAME, env.BUILD_NUMBER)
  }
}, failFast: true

void iis-copy(branch, build) {
  dir("C:\\inetpub\\wwwroot\\mobile-builds\\$branch\\$build") {
    unstash 'slx'
    unstash 'sdk'
  }
}
