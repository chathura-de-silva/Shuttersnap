## Tailwind fix for VsCode

If you are using vscode and see some warnings with the tailwinds css directives,try adding this to your `.vscode` folder.

#### `settings.json`

```JSON
{
  "css.customData": [".vscode/tailwind.json"]
}
```

#### `tailwind.json`

```JSON
{
  "version": 1.2,
  "atDirectives": [
    {
      "name": "@theme",
      "description": "Use the `@theme` directive to define your project's custom design tokens, like fonts, colors, and breakpoints.",
      "references": [
        {
          "name": "Tailwind Documentation",
          "url": "https://tailwindcss.com/docs/functions-and-directives#theme-directive"
        }
      ]
    },
    {
      "name": "@source",
      "description": "Use the `@source` directive to explicitly specify source files that aren't picked up by Tailwind's automatic content detection.",
      "references": [
        {
          "name": "Tailwind Documentation",
          "url": "https://tailwindcss.com/docs/functions-and-directives#source-directive"
        }
      ]
    },
    {
      "name": "@utility",
      "description": "Use the `@utility` directive to add custom utilities to your project that work with variants like `hover`, `focus` and `lg`.",
      "references": [
        {
          "name": "Tailwind Documentation",
          "url": "https://tailwindcss.com/docs/functions-and-directives#utility-directive"
        }
      ]
    },
    {
      "name": "@variant",
      "description": "Use the `@variant` directive to apply a Tailwind variant to styles in your CSS.",
      "references": [
        {
          "name": "Tailwind Documentation",
          "url": "https://tailwindcss.com/docs/functions-and-directives#variant-directive"
        }
      ]
    },
    {
      "name": "@custom-variant",
      "description": "Use the `@custom-variant` directive to add a custom variant in your project.",
      "references": [
        {
          "name": "Tailwind Documentation",
          "url": "https://tailwindcss.com/docs/functions-and-directives#custom-variant-directive"
        }
      ]
    },
    {
      "name": "@apply",
      "description": "Use the `@apply` directive to inline any existing utility classes into your own custom CSS.",
      "references": [
        {
          "name": "Tailwind Documentation",
          "url": "https://tailwindcss.com/docs/functions-and-directives#apply-directive"
        }
      ]
    },
    {
      "name": "@reference",
      "description": "If you want to use `@apply` or `@variant` in the `<style>` block of a Vue or Svelte component, or within CSS modules, you will need to import your theme variables, custom utilities, and custom variants to make those values available in that context.\n\nTo do this without duplicating any CSS in your output, use the `@reference` directive to import your main stylesheet for reference without actually including the styles.",
      "references": [
        {
          "name": "Tailwind Documentation",
          "url": "https://tailwindcss.com/docs/functions-and-directives#reference-directive"
        }
      ]
    },
    {
      "name": "@config",
      "description": "Use the `@config` directive to load a legacy JavaScript-based configuration file.",
      "references": [
        {
          "name": "Tailwind Documentation",
          "url": "https://tailwindcss.com/docs/functions-and-directives#config-directive"
        }
      ]
    },
    {
      "name": "@plugin",
      "description": "Use the `@plugin` directive to load a legacy JavaScript-based plugin.",
      "references": [
        {
          "name": "Tailwind Documentation",
          "url": "https://tailwindcss.com/docs/functions-and-directives#plugin-directive"
        }
      ]
    }
  ]
}
```
