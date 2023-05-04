module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "ecmaFeatures": {
            "tsx": true
        }
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "settings": {
        'import/resolver': {
          "node": {
            "paths": ['src'],
           "extensions": ['.js', '.jsx', '.ts', '.tsx'],
          },
        },
      },
    "rules": {
        "no-console": 1,
        "no-var": 2,
        "react/display-name": 0,
        "semi": ["error", "never", {"beforeStatementContinuationChars": "never"}],
        "semi-spacing": ["error", {"after": true, "before": false}],
        "semi-style": ["error", "first"],
        "no-extra-semi": "error",
        "no-unexpected-multiline": "error",
        "no-unreachable": "error"
    }
}
