module.exports = {
    env: {
        es6: true,
        browser: true
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            modules: true
        }
    },
    extends: 'eslint:recommended',
    "globals": {
        "Sage": false,
        "App": false,
        "argos": false,
        "crm": false,
        "icboe": false,
        "Mobile": false,
        "Simplate": false,
        "Chart": false,
        "ReUI": false,
        "module": false,
        "Base64": false,
        "define": false,
        "require": false,
        "Rx": false,
        "moment": false,
        "PouchDB": false
    },
    rules: {
        "max-len": 0,
        "prefer-rest-params": 0,
        "no-param-reassign": 0,
        // ES6

        // enforces no braces where they can be omitted
        // http://eslint.org/docs/rules/arrow-body-style
        // TODO: enable requireReturnForObjectLiteral?
        'arrow-body-style': ['error', 'as-needed', {
            requireReturnForObjectLiteral: false,
        }],

        // require parens in arrow function arguments
        // http://eslint.org/docs/rules/arrow-parens
        'arrow-parens': ['error', 'as-needed', {
            requireForBlockBody: true,
        }],

        // require space before/after arrow function's arrow
        // http://eslint.org/docs/rules/arrow-spacing
        'arrow-spacing': ['error', {
            before: true,
            after: true
        }],

        // verify super() callings in constructors
        'constructor-super': 'error',

        // enforce the spacing around the * in generator functions
        // http://eslint.org/docs/rules/generator-star-spacing
        'generator-star-spacing': ['error', {
            before: false,
            after: true
        }],

        // disallow modifying variables of class declarations
        // http://eslint.org/docs/rules/no-class-assign
        'no-class-assign': 'error',

        // disallow arrow functions where they could be confused with comparisons
        // http://eslint.org/docs/rules/no-confusing-arrow
        'no-confusing-arrow': ['error', {
            allowParens: true,
        }],

        // disallow modifying variables that are declared using const
        'no-const-assign': 'error',

        // disallow duplicate class members
        // http://eslint.org/docs/rules/no-dupe-class-members
        'no-dupe-class-members': 'error',

        // disallow importing from the same path more than once
        // http://eslint.org/docs/rules/no-duplicate-imports
        'no-duplicate-imports': 'error',

        // disallow symbol constructor
        // http://eslint.org/docs/rules/no-new-symbol
        'no-new-symbol': 'error',

        // disallow specific imports
        // http://eslint.org/docs/rules/no-restricted-imports
        'no-restricted-imports': 'off',

        // disallow to use this/super before super() calling in constructors.
        // http://eslint.org/docs/rules/no-this-before-super
        'no-this-before-super': 'error',

        // disallow useless computed property keys
        // http://eslint.org/docs/rules/no-useless-computed-key
        'no-useless-computed-key': 'error',

        // disallow unnecessary constructor
        // http://eslint.org/docs/rules/no-useless-constructor
        'no-useless-constructor': 'error',

        // disallow renaming import, export, and destructured assignments to the same name
        // http://eslint.org/docs/rules/no-useless-rename
        'no-useless-rename': ['error', {
            ignoreDestructuring: false,
            ignoreImport: false,
            ignoreExport: false,
        }],

        // require let or const instead of var
        'no-var': 'error',

        // require method and property shorthand syntax for object literals
        // http://eslint.org/docs/rules/object-shorthand
        'object-shorthand': ['error', 'always', {
            ignoreConstructors: false,
            avoidQuotes: true,
        }],

        // suggest using arrow functions as callbacks
        /*'prefer-arrow-callback': ['error', {
            allowNamedFunctions: false,
            allowUnboundThis: true,
        }],*/

        // suggest using of const declaration for variables that are never modified after declared
        'prefer-const': ['error', {
            destructuring: 'any',
            ignoreReadBeforeAssign: true,
        }],

        // disallow parseInt() in favor of binary, octal, and hexadecimal literals
        // http://eslint.org/docs/rules/prefer-numeric-literals
        // TODO: enable, semver-major
        'prefer-numeric-literals': 'off',

        // suggest using Reflect methods where applicable
        // http://eslint.org/docs/rules/prefer-reflect
        // TODO: enable?
        'prefer-reflect': 'off',

        // use rest parameters instead of arguments
        // http://eslint.org/docs/rules/prefer-rest-params
        'prefer-rest-params': 'error',

        // suggest using the spread operator instead of .apply()
        // http://eslint.org/docs/rules/prefer-spread
        'prefer-spread': 'error',

        // suggest using template literals instead of string concatenation
        // http://eslint.org/docs/rules/prefer-template
        'prefer-template': 'error',

        // disallow generator functions that do not have yield
        // http://eslint.org/docs/rules/require-yield
        'require-yield': 'error',

        // enforce spacing between object rest-spread
        // http://eslint.org/docs/rules/rest-spread-spacing
        'rest-spread-spacing': ['error', 'never'],

        // import sorting
        // http://eslint.org/docs/rules/sort-imports
        'sort-imports': ['off', {
            ignoreCase: false,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        }],

        // require a Symbol description
        // http://eslint.org/docs/rules/symbol-description
        'symbol-description': 'error',

        // enforce usage of spacing in template strings
        // http://eslint.org/docs/rules/template-curly-spacing
        'template-curly-spacing': 'error',

        // enforce spacing around the * in yield* expressions
        // http://eslint.org/docs/rules/yield-star-spacing
        'yield-star-spacing': ['error', 'after'],
        // enforce or disallow variable initializations at definition
        'init-declarations': 'off',

        // disallow the catch clause parameter name being the same as a variable in the outer scope
        'no-catch-shadow': 'off',

        // disallow deletion of variables
        'no-delete-var': 'error',

        // disallow labels that share a name with a variable
        // http://eslint.org/docs/rules/no-label-var
        'no-label-var': 'error',

        // disallow specific globals
        'no-restricted-globals': 'off',

        // disallow declaration of variables already declared in the outer scope
        'no-shadow': 'error',

        // disallow shadowing of names such as arguments
        'no-shadow-restricted-names': 'error',

        // disallow use of undeclared variables unless mentioned in a /*global */ block
        'no-undef': 'error',

        // disallow use of undefined when initializing variables
        'no-undef-init': 'error',

        // disallow use of undefined variable
        // http://eslint.org/docs/rules/no-undefined
        // TODO: enable?
        'no-undefined': 'off',

        // disallow declaration of variables that are not used in the code
        'no-unused-vars': ['error', {
            vars: 'local',
            args: 'after-used'
        }],

        // disallow use of variables before they are defined
        'no-use-before-define': 'error',
        // enforces getter/setter pairs in objects
        'accessor-pairs': 'off',

        // enforces return statements in callbacks of array's methods
        // http://eslint.org/docs/rules/array-callback-return
        'array-callback-return': 'error',

        // treat var statements as if they were block scoped
        'block-scoped-var': 'error',

        // specify the maximum cyclomatic complexity allowed in a program
        complexity: ['off', 11],

        // enforce that class methods use "this"
        // http://eslint.org/docs/rules/class-methods-use-this
        'class-methods-use-this': 'error',

        // require return statements to either always or never specify values
        'consistent-return': 'error',

        // specify curly brace conventions for all control statements
        curly: ['error', 'multi-line'],

        // require default case in switch statements
        'default-case': ['error', {
            commentPattern: '^no default$'
        }],

        // encourages use of dot notation whenever possible
        'dot-notation': ['error', {
            allowKeywords: true
        }],

        // enforces consistent newlines before or after dots
        // http://eslint.org/docs/rules/dot-location
        'dot-location': ['error', 'property'],

        // require the use of === and !==
        // http://eslint.org/docs/rules/eqeqeq
        eqeqeq: ['error', 'allow-null'],

        // make sure for-in loops have an if statement
        'guard-for-in': 'error',

        // disallow the use of alert, confirm, and prompt
        'no-alert': 'warn',

        // disallow use of arguments.caller or arguments.callee
        'no-caller': 'error',

        // disallow lexical declarations in case/default clauses
        // http://eslint.org/docs/rules/no-case-declarations.html
        'no-case-declarations': 'error',

        // disallow division operators explicitly at beginning of regular expression
        // http://eslint.org/docs/rules/no-div-regex
        'no-div-regex': 'off',

        // disallow else after a return in an if
        'no-else-return': 'error',

        // disallow empty functions, except for standalone funcs/arrows
        // http://eslint.org/docs/rules/no-empty-function
        'no-empty-function': ['error', {
            allow: [
                'arrowFunctions',
                'functions',
                'methods',
            ]
        }],

        // disallow empty destructuring patterns
        // http://eslint.org/docs/rules/no-empty-pattern
        'no-empty-pattern': 'error',

        // disallow comparisons to null without a type-checking operator
        'no-eq-null': 'off',

        // disallow use of eval()
        'no-eval': 'error',

        // disallow adding to native types
        'no-extend-native': 'error',

        // disallow unnecessary function binding
        'no-extra-bind': 'error',

        // disallow Unnecessary Labels
        // http://eslint.org/docs/rules/no-extra-label
        'no-extra-label': 'error',

        // disallow fallthrough of case statements
        'no-fallthrough': 'error',

        // disallow the use of leading or trailing decimal points in numeric literals
        'no-floating-decimal': 'error',

        // disallow reassignments of native objects or read-only globals
        // http://eslint.org/docs/rules/no-global-assign
        'no-global-assign': ['error', {
            exceptions: []
        }],
        // deprecated in favor of no-global-assign
        'no-native-reassign': 'off',

        // disallow implicit type conversions
        // http://eslint.org/docs/rules/no-implicit-coercion
        'no-implicit-coercion': ['off', {
            boolean: false,
            number: true,
            string: true,
            allow: [],
        }],

        // disallow var and named functions in global scope
        // http://eslint.org/docs/rules/no-implicit-globals
        'no-implicit-globals': 'off',

        // disallow use of eval()-like methods
        'no-implied-eval': 'error',

        // disallow this keywords outside of classes or class-like objects
        'no-invalid-this': 'off',

        // disallow usage of __iterator__ property
        'no-iterator': 'error',

        // disallow use of labels for anything other then loops and switches
        'no-labels': ['error', {
            allowLoop: false,
            allowSwitch: false
        }],

        // disallow unnecessary nested blocks
        'no-lone-blocks': 'error',

        // disallow creation of functions within loops
        'no-loop-func': 'error',

        // disallow magic numbers
        // http://eslint.org/docs/rules/no-magic-numbers
        'no-magic-numbers': ['off', {
            ignore: [],
            ignoreArrayIndexes: true,
            enforceConst: true,
            detectObjects: false,
        }],

        // disallow use of multiple spaces
        'no-multi-spaces': 'error',

        // disallow use of multiline strings
        'no-multi-str': 'error',

        // disallow use of new operator when not part of the assignment or comparison
        'no-new': 'error',

        // disallow use of new operator for Function object
        'no-new-func': 'error',

        // disallows creating new instances of String, Number, and Boolean
        'no-new-wrappers': 'error',

        // disallow use of (old style) octal literals
        'no-octal': 'error',

        // disallow use of octal escape sequences in string literals, such as
        // var foo = 'Copyright \251';
        'no-octal-escape': 'error',

        // disallow reassignment of function parameters
        // disallow parameter object manipulation
        // rule: http://eslint.org/docs/rules/no-param-reassign.html
        'no-param-reassign': ['error', {
            props: true
        }],

        // disallow usage of __proto__ property
        'no-proto': 'error',

        // disallow declaring the same variable more then once
        'no-redeclare': 'error',

        // disallow certain object properties
        // http://eslint.org/docs/rules/no-restricted-properties
        // TODO: enable, semver-major
        'no-restricted-properties': ['off', {
            object: 'arguments',
            property: 'callee',
            message: 'arguments.callee is deprecated,'
        }],

        // disallow use of assignment in return statement
        'no-return-assign': 'error',

        // disallow use of `javascript:` urls.
        'no-script-url': 'error',

        // disallow self assignment
        // http://eslint.org/docs/rules/no-self-assign
        'no-self-assign': 'error',

        // disallow comparisons where both sides are exactly the same
        'no-self-compare': 'error',

        // disallow use of comma operator
        'no-sequences': 'error',

        // restrict what can be thrown as an exception
        'no-throw-literal': 'error',

        // disallow unmodified conditions of loops
        // http://eslint.org/docs/rules/no-unmodified-loop-condition
        'no-unmodified-loop-condition': 'off',

        // disallow usage of expressions in statement position
        'no-unused-expressions': ['error', {
            allowShortCircuit: false,
            allowTernary: false,
        }],

        // disallow unused labels
        // http://eslint.org/docs/rules/no-unused-labels
        'no-unused-labels': 'error',

        // disallow unnecessary .call() and .apply()
        'no-useless-call': 'off',

        // disallow useless string concatenation
        // http://eslint.org/docs/rules/no-useless-concat
        'no-useless-concat': 'error',

        // disallow unnecessary string escaping
        // http://eslint.org/docs/rules/no-useless-escape
        'no-useless-escape': 'error',

        // disallow use of void operator
        // http://eslint.org/docs/rules/no-void
        'no-void': 'error',

        // disallow usage of configurable warning terms in comments: e.g. todo
        'no-warning-comments': ['off', {
            terms: ['todo', 'fixme', 'xxx'],
            location: 'start'
        }],

        // disallow use of the with statement
        'no-with': 'error',

        // require use of the second argument for parseInt()
        radix: 'error',

        // requires to declare all vars on top of their containing scope
        'vars-on-top': 'error',

        // require immediate function invocation to be wrapped in parentheses
        // http://eslint.org/docs/rules/wrap-iife.html
        'wrap-iife': ['error', 'outside'],

        // require or disallow Yoda conditions
        yoda: 'error'
    }
};
