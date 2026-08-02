# Деплой і інфраструктура (`apps/landing`)

Цей документ описує, як розгорнутий Next.js застосунок `apps/landing`: GitHub Actions → GHCR → Portainer → Traefik → Cloudflare Tunnel.
Реальні IP-адреси, домени та секрети тут навмисно **не вказані** (репозиторій публічний) — вони задокументовані окремо в приватному сховищі `uniia-infra` (поза цим репо). Інфраструктура (VM, Traefik, Portainer, Cloudflare Tunnel) — та сама, що й для `strapi-cms`.

## Чому build-per-environment, а не один образ на всі середовища

Next.js статично пре-рендерить сторінки (`generateStaticParams`, SSG) **під час `next build`**, а не в рантаймі — на цьому етапі код звертається до Strapi, щоб отримати контент і згенерувати HTML. Staging і production використовують різні інстанси Strapi з різним контентом, тож, на відміну від `strapi-cms` (де один образ однаково працює в обох середовищах), тут потрібно **два окремих білди** — кожен запечений під конкретний `STRAPI_URL`.

Це віддзеркалено у двох окремих workflow:

- **`release.yml`** — на кожен git-тег автоматично білдить і деплоїть **staging**-образ (`STRAPI_URL` вказує на staging Strapi).
- **`promote-prod.yml`** — ручний `workflow_dispatch`, що бере вже перевірений на staging тег, перебілджує його з **production**-конфігурацією (`STRAPI_URL` вказує на prod Strapi) і деплоїть на prod.

## Архітектура

```
Інтернет ─▶ Cloudflare (DNS + Tunnel) ─▶ cloudflared (systemd, на VM)
                                              │
                                              ▼
                                     Traefik (порт 80, Docker-провайдер)
                                        │                  │
                                        ▼                  ▼
                              staging: landing          prod: landing
                              (образ ...:X.Y.Z-staging)  (образ ...:X.Y.Z)
                                        │                  │
                                        ▼                  ▼
                              staging: Strapi            prod: Strapi
```

## CI/CD

### `.github/workflows/release.yml` — при пуші тега `vX.Y.Z`

1. Створює GitHub Release з автозгенерованим changelog (як у `strapi-cms`).
2. Білдить Docker-образ `apps/landing` (`turbo prune` + pnpm, `output: standalone`) з `STRAPI_URL`/`NEXT_PUBLIC_SITE_URL`, що вказують на **staging** Strapi, і пушить його в `ghcr.io/<org>/monorepo:X.Y.Z-staging`.
3. Job `deploy-staging` (на self-hosted runner) оновлює `LANDING_TAG` у Portainer-стеку `landing-staging` і перезапускає стек з re-pull образу.

Тобто для оновлення staging достатньо:

```bash
git tag vX.Y.Z
git push --tags
```

і за кілька хвилин нова версія вже на staging-домені.

### `.github/workflows/promote-prod.yml` — ручний `workflow_dispatch`

Коли тег вже перевірений на staging і готовий до production:

1. Запустити workflow вручну (Actions → Promote to Production → Run workflow), вказавши тег (наприклад `v0.1.0`).
2. Workflow чекаутить саме цей тег, перебілджує образ із **production**-конфігурацією (`STRAPI_URL` на prod Strapi) і пушить `ghcr.io/<org>/monorepo:X.Y.Z` (+ `latest`).
3. Job `deploy-prod` оновлює `LANDING_TAG` у Portainer-стеку `landing-prod` і перезапускає стек.

### Чому self-hosted runner

Обидва деплой-джоби виконуються на **self-hosted GitHub Actions runner**, що працює як окремий контейнер прямо на тій самій VM, а не на хмарних GitHub-раннерах — Portainer API доступний лише в приватній локальній мережі. Job звертається до нього через `localhost` і програмно оновлює `LANDING_TAG` + тригерить redeploy.

## Turborepo: чому env-змінні треба явно оголошувати в `turbo.json`

Turborepo 2.x за замовчуванням працює в `envMode: strict` — будь-яка змінна оточення, не оголошена явно у `tasks.build.env` в `turbo.json`, **не потрапляє** у дочірній процес (`next build`), навіть якщо вона встановлена в оточенні Docker-контейнера. Тому в `turbo.json` явно оголошено:

```json
"build": {
  "env": [
    "STRAPI_URL",
    "STRAPI_API_TOKEN",
    "CF_ACCESS_CLIENT_ID",
    "CF_ACCESS_CLIENT_SECRET",
    "NEXT_PUBLIC_SITE_URL"
  ]
}
```

Без цього білд падає з `Error: Missing STRAPI_URL environment variable`, навіть якщо `--build-arg STRAPI_URL=...` переданий у `docker build` правильно.

## Конфігурація застосунку (env-змінні)

Частина змінних потрібна **і під час білду** (бо вони "запікаються" в статично згенеровані сторінки), і в рантаймі (для динамічних роутів на кшталт `/api/cms-media/[...segments]`, `/api/revalidate`):

| Змінна | Потрібна при білді | Призначення |
|---|---|---|
| `STRAPI_URL` | так | адреса Strapi API для цього середовища |
| `STRAPI_API_TOKEN` | так (опційно) | read-only токен Strapi, якщо публічний Content API закрито від анонімного читання |
| `NEXT_PUBLIC_SITE_URL` | так | канонічний домен для метаданих/SEO (`metadataBase`) |
| `CF_ACCESS_CLIENT_ID` / `CF_ACCESS_CLIENT_SECRET` | так (опційно) | Cloudflare Access service token, якщо Strapi колись сховають за Cloudflare Access |
| `REVALIDATION_SECRET` | ні (лише рантайм) | секрет для `/api/revalidate` webhook зі Strapi |

## Відомі обмеження / що ще не зроблено

- Публічні права Strapi (Public role → find/findOne) для контент-тайпів, які читає фронтенд, ще не налаштовані — до цього білд і рантайм показують fallback-контент (`FALLBACK_GLOBAL` тощо) замість реального.
- `landing-prod` Portainer-стек ще не створено — з'явиться після першого реального прогону `promote-prod.yml`.
