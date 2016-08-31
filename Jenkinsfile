#!groovy
node('windows && nodejs') {
  dir('argos-sdk') {
    stage 'Building argos-sdk'
    clonesdk(env.BRANCH_NAME)

    dir('deploy') {
      deleteDir()
    }

    bat 'npm install'
    bat 'build\\release.cmd'
    stash includes: 'deploy/**/*.*', name: 'sdk'
  }

  dir('products/argos-saleslogix') {
    stage 'Building argos-saleslogix'
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
}

stage 'Copy to IIS'
parallel slx81: {
  node('slx81') {
    iiscopy(env.BRANCH_NAME, env.BUILD_NUMBER)
  }
}, slx82: {
  node('slx82') {
    iiscopy(env.BRANCH_NAME, env.BUILD_NUMBER)
  }
}, failFast: true

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
