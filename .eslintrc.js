module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard-with-typescript"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/await-thenable": "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "@typescript-eslint/prefer-reduce-type-parameter": "off",
    "@typescript-eslint/consistent-type-assertions": "off",
  },
};
