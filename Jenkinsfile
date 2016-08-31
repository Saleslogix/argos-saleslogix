#!groovy

stage 'Building argos-sdk & argos-saleslogix'
parallel slx: {
  node('windows && nodejs') {
    dir('argos-sdk') {
      clonesdk(env.BRANCH_NAME)
    }

    dir('products/argos-saleslogix') {
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
        bat 'npm install'
        bat 'build\\release.cmd'
      } catch (err) {
        slack.failure('Failed biulding argos-saleslogix')
        throw err
      }

      dir('deploy') {
        stash includes: '**/*.*', name: 'slx'
      }
    }
  }
}, sdk: {
  node('windows && nodejs') {
    clonesdk(env.BRANCH_NAME)

    dir('deploy') {
      deleteDir()
    }

    try {
      bat 'npm install'
      bat 'build\\release.cmd'
    } catch (err) {
      slack.failure('Failed building argos-sdk')
      throw err
    }

    dir('deploy') {
      stash includes: '**/*.*', name: 'sdk'
    }
  }
}, failFast: false

stage 'Copy to IIS'
parallel slx80: {
  node('slx80') {
    iiscopy(env.BRANCH_NAME, env.BUILD_NUMBER)
  }
}, slx81: {
  node('slx81') {
    iiscopy(env.BRANCH_NAME, env.BUILD_NUMBER)
  }
}, slx82: {
  node('slx82') {
    iiscopy(env.BRANCH_NAME, env.BUILD_NUMBER)
  }
}, failFast: true

stage 'Notification'
node {
  slack.success('Mobile CI built successfully')
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
