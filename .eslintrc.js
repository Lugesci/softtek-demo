module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["perfectionist", "unused-imports", "@typescript-eslint/eslint-plugin"],
  extends: ["plugin:@typescript-eslint/recommended"],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "perfectionist/sort-named-imports": [
      1,
      {
        order: "asc",
        type: "line-length",
      },
    ],
    "perfectionist/sort-named-exports": [
      1,
      {
        order: "asc",
        type: "line-length",
      },
    ],
    "perfectionist/sort-exports": [
      1,
      {
        order: "asc",
        type: "line-length",
      },
    ],
    "perfectionist/sort-imports": [
      1,
      {
        order: "asc",
        type: "line-length",
        "newlines-between": "always",
        groups: [
          ["builtin", "external"],
          "custom-mui",
          "custom-routes",
          "custom-hooks",
          "custom-utils",
          "internal",
          "custom-components",
          "custom-sections",
          "custom-types",
          ["parent", "sibling", "index"],
          "object",
          "unknown",
        ],
        "custom-groups": {
          value: {
            "custom-mui": "@mui/**",
            "custom-routes": "src/routes/**",
            "custom-hooks": "src/hooks/**",
            "custom-utils": "src/utils/**",
            "custom-components": "src/components/**",
            "custom-sections": "src/sections/**",
            "custom-types": "src/types/**",
          },
        },
        "internal-pattern": ["src/**"],
      },
    ],
  },
};
