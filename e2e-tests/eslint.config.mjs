import typescriptEslint from "@typescript-eslint/eslint-plugin";
import _import from "eslint-plugin-import";
import { fixupPluginRules } from "@eslint/compat";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    ...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended"),
    {
        plugins: {
            "@typescript-eslint": typescriptEslint,
            import: fixupPluginRules(_import),
        },

        languageOptions: {
            parser: tsParser,
            ecmaVersion: 2020,
            sourceType: "script",

            parserOptions: {
                project: "./tsconfig.json",
            },
        },

        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/naming-convention": "error",
            "@typescript-eslint/adjacent-overload-signatures": "error",

            "@typescript-eslint/array-type": ["error", {
                default: "array-simple",
            }],

            "@typescript-eslint/await-thenable": "error",
            "@typescript-eslint/class-literal-property-style": "error",
            "class-methods-use-this": "off",
            "@typescript-eslint/class-methods-use-this": "error",
            "@typescript-eslint/consistent-type-assertions": "error",
            "@typescript-eslint/consistent-type-exports": "error",
            "@typescript-eslint/consistent-type-definitions": "error",
            "@typescript-eslint/no-array-delete": "error",
            "@typescript-eslint/no-base-to-string": "error",
            "@typescript-eslint/no-extra-non-null-assertion": "error",
            "@typescript-eslint/no-empty-interface": "error",
            "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/prefer-readonly": "error",
            "@typescript-eslint/no-misused-promises": "error",
            "@typescript-eslint/no-unnecessary-type-assertion": "error",
            "@typescript-eslint/consistent-indexed-object-style": ["error", "record"],
            semi: ["error", "always"],
            quotes: ["error", "single"],
            "import/order": ["error", {
                groups: [["builtin", "external", "internal"]],
                "newlines-between": "never",
            }],
        },
    },
];