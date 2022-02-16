module.exports = {
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        browser: true,
        node: true,
        es6: true,
        jest: true,
    },
    settings: {
        react: {
            version: "detect",
        },
        "import/resolver": {
            node: {
                extensions: [".ts", ".tsx"],
            },
        },
    },
    plugins: ["@typescript-eslint"],
    extends: [
        "next/core-web-vitals",
        "plugin:@typescript-eslint/recommended",
        "airbnb",
        "prettier",
        "plugin:jsx-a11y/recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended",
        "plugin:sonarjs/recommended",
        "plugin:security/recommended",
        "plugin:react-hooks/recommended",
    ],
    rules: {
        // I suggest you add those two rules:
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-explicit-any": "error",
        "react/react-in-jsx-scope": "off",
        // allow jsx syntax in js files (for next.js project)
        "react/jsx-filename-extension": [
            1,
            {
                extensions: [".ts", ".tsx", ".js", ".jsx"],
            },
        ],
        // should add ".ts" if typescript project
        "react/jsx-props-no-spreading": "off",
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["error"],
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                js: "never",
                jsx: "never",
                ts: "never",
                tsx: "never",
            },
        ],
        "import/prefer-default-export": "off",
        // consider changing this one
        "no-nested-ternary": "off",
        "import/no-unresolved": [2, { caseSensitive: false }],
    },
};
