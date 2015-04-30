module.exports = function (grunt) {
    grunt.config('typescript', {
		base: {
			src: ['src/**/*.ts'],
			dest: './src-out/',
			options: {
				target: 'es5',
				sourceMap: false,
				declaration: false,
				basePath: 'src',
				references: [
					'declarations/**/*.d.ts'
				]
			}
		}
    });

    grunt.loadNpmTasks('grunt-typescript');
};

