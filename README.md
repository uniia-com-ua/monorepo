Вимоги: Node >= 20, pnpm (вказано у `packageManager`), встановити залежності в корені.

```bash
pnpm i

# Запустити лише застосунок landing
pnpm dev -F landing

# Або запустити всі застосунки через turbo
pnpm dev

# Білд/старт для конкретного застосунку
pnpm build -F landing
pnpm --filter landing start
```

# shadcn/ui monorepo template

This template is for creating a monorepo with shadcn/ui.

## Usage

```bash
pnpm dlx shadcn@latest init
```

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Tailwind

Your `tailwind.config.ts` and `globals.css` are already set up to use the components from the `ui` package.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@workspace/ui/components/button"
```
