module.exports = {
  "extends": "standard",
  rules: {
    semi: 0,
    quotes: ["error", "double", { "allowTemplateLiterals": true }],
    "no-multiple-empty-lines": ["error", { "max": 2, "maxEOF": 1 }],
    "space-before-function-paren": ["error", { "anonymous": "always", "named": "never", "asyncArrow": "always" }],
    "no-trailing-spaces": ["error", { "skipBlankLines": true }]
  }
};
