## Локальне розгортання

Щоб розпочати роботу з цим репозиторієм: клонувати його, встановити залежності та запустити застосунки.

1. Клонувати репозиторій:

```bash
git clone git@github.com:uniia-com-ua/monorepo.git
cd monorepo
```

2. Встановити залежності:

```bash
pnpm install
```

### Перший локальний запуск

Для запуску БД використовується Docker. Якщо у вас немає Docker або Docker Desktop, встановіть його з [офіційного сайту](https://www.docker.com/products/docker-desktop/). Перед запуском Strapi переконайтеся, що Docker запущено.

3. Створити `.env.local` файл у `apps/strapi` на основі `.env.local.example` та заповнити секрети (`APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`) у файлі.

4. Запустити Strapi:

```bash
# Запускає БД, pnpm db:stop щоб зупинити
pnpm db:start
# Запускає Strapi
pnpm dev:strapi
```

При першому запуску Strapi просить створити адміністративного користувача. Інтерфейс Strapi доступний за адресою [http://localhost:1337/admin](http://localhost:1337/admin) (якщо не змінювалась конфігурація).

5. Регенерувати Strapi API токен для використання у застосунку landing. Для цього перейдіть у [Strapi Admin → Settings → API Tokens](http://localhost:1337/admin/settings/api-tokens), відкрийте (або створіть) **Read Only** токен та натисніть **Regenerate**. Скопіюйте токен у буфер обміну.

6. Налаштування лендінгу. Створіть `.env.local` файл у `apps/landing` на основі `.env.local.example`, втановіть значення змінних оточення.

```bash
STRAPI_URL=http://localhost:1337
STRAPI_REST_READONLY_API_KEY=<вставте-скопійований-токен-тут>
```

7. Запустити лендінг:

```bash
pnpm dev:landing
```

### Поточні запуски

Після першого налаштування можна запускати застосунки за допомогою команд нижче. Вона запускає обидва застосунки (Strapi та Landing) одночасно. Landing залежить від Strapi, тому треба дочекатися поки Strapi буде повністю запущений перед початком роботи над лендінгом.

```bash
# Strapi запуститься, але завершить роботу з не 0 кодом якщо БД не запущена.
# Тому спочатку треба запустити БД. (команда перевіряє чи запущена БД, якщо ні - запускає її)
pnpm db:start
pnpm dev
```

## Встановлення додаткових компонентів в репозиторій

### Компоненти shadcn/ui

Інтерактивне встановлення компонентів (з меню вибору)

```
pnpm ui:add
```

### Додаткові пакети npm

```
pnpm install <package-name> --filter <app-name>
```

Наприклад, щоб встановити `react-hook-form` у застосунок landing:

```
pnpm install react-hook-form --filter landing
```

---

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
import { Button } from "@workspace/ui/components/button";
```
