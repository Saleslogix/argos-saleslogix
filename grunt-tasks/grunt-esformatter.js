module.exports = function(grunt) {
    grunt.config('esformatter', {
            options: {
                indent: {
                    value: '    '
                },
                whiteSpace: {
                    before: {
                        FinallyKeyword: 1
                    },
                    after: {
                    }
                },
                lineBreak: {
                    after: {
                        IfStatementClosingBrace: '=2',
                        ElseIfStatementClosingBrace: '=2',
                        ElseStatementClosingBrace: '=2',
                        FinallyClosingBrace: '2',
                        CatchClosingBrace: '2',
                        ForStatementClosingBrace: '2',
                        DoWhileStatement: '2',
                        WhileStatement: '2',
                        SwitchClosingBrace: '2'
                    },
                    before: {
                        FunctionExpressionClosingBrace: '1',
                        FunctionDeclarationClosingBrace: '1',
                        FinallyKeyword: 0
                    }
                },
                plugins: [
                    'esformatter-braces',
                    'esformatter-parseint',
                    'esformatter-semicolons'
                ]
            },
            src: 'src/**/*.js'
    });

    grunt.loadNpmTasks('grunt-esformatter');
};

