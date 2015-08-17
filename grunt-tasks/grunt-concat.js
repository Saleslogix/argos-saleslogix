module.exports = function gruntHelp(grunt) {
  grunt.config('concat', {
    help: {
      files: {                                   // Dictionary of files
        'help/help.html': ['help/en/*.html'],     // 'destination': 'source'
        'help/help_en.html': ['help/en/*.html'],
        'help/help_de.html': ['help/de/*.html'],
        'help/help_fr.html': ['help/fr/*.html'],
        'help/help_it.html': ['help/it/*.html'],
        'help/help_ru.html': ['help/ru/*.html'],
        'help/help_zh-CN.html': ['help/zh-CN/*.html'],
        'help/help_zh-TW.html': ['help/zh-TW/*.html'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
};
