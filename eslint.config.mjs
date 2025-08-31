import js from "@eslint/js";
import ts from "typescript-eslint";

const files = ["services/**/*.{ts,tsx,js,jsx}"];
const ignores = [
  "**/dist/**",
  "**/node_modules/**",
  "**/coverage/**",
  "**/build/**",
  "eslint.config.*",
];

const scopedBase = [js.configs.recommended, ...ts.configs.recommendedTypeChecked].map(
  (cfg) => ({ ...cfg, files, ignores })
);

export default [
  ...scopedBase,
  {
    files,
    ignores,
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        process: "readonly",
        __dirname: "readonly",
        module: "readonly",
        require: "readonly",
      },
    },
    rules: {
      quotes: "off",
      semi: ["error", "always"],

      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
    },
  },
  {
    files: ["services/**/test/**/*.{ts,tsx,js,jsx}", "services/**/*/*.spec.{ts,tsx,js,jsx}"],
    rules: {
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
    },
  },
];