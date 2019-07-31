// see https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb

module.exports = {
    parser: '@typescript-eslint/parser', // ppecifies the ESLint parser
    extends: [
        'plugin:@typescript-eslint/recommended', // uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier/@typescript-eslint', // uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:react/recommended', // uses the recommended rules from @eslint-plugin-react
        'plugin:prettier/recommended', // enables eslint-plugin-prettier and displays prettier errors as ESLint errors; make sure this is always the last configuration in the extends array
    ],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        "@typescript-eslint/no-use-before-define": "off", // goes against Clean Code Step Down Rule https://dzone.com/articles/the-stepdown-rule
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
};
