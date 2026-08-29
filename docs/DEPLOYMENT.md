# Деплой і інфраструктура

Цей документ описує, як з монорепо розгортаються **Strapi** (`apps/strapi`) і **landing** (`apps/landing`): GitHub Actions → GHCR → Portainer → Traefik → Cloudflare Tunnel.
Реальні IP-адреси, домени та секрети тут навмисно **не вказані** (репозиторій публічний) — вони задокументовані окремо в приватному сховищі `uniia-infra` (поза цим репо).

## Чому Strapi і landing деплояться в різному порядку

**Strapi** читає БД і секрети з runtime env. Один і той самий образ `X.Y.Z` працює і на staging, і на prod — перебілд для prod не потрібен.

**Landing** статично пре-рендерить сторінки (`generateStaticParams`, SSG) **під час `next build`**. На цьому етапі код звертається до Strapi, щоб отримати контент і згенерувати HTML. Staging і production мають різні інстанси CMS з різним контентом, тому landing збирається **окремо під кожне середовище**, і **після** того, як відповідний Strapi вже оновлений і здоровий.

Це lockstep-реліз на спільний git-тег `vX.Y.Z`:

- **`release.yml`** — тег → GitHub Release → образ Strapi → деплой Strapi на staging + wait `/_health` → образ landing (staging) → деплой landing на staging.
- **`promote-prod.yml`** — ручний `workflow_dispatch` того ж тега → деплой **того самого** образу Strapi на prod + wait `/_health` → перебілд landing проти prod Strapi → деплой landing на prod.

## Імена образів у GHCR

| Застосунок | Тег | Коли з'являється |
|---|---|---|
| `ghcr.io/<org>/monorepo/strapi:X.Y.Z` | env-агностичний | автоматично на git-тег |
| `ghcr.io/<org>/monorepo/landing:X.Y.Z-staging` | запечений проти staging Strapi | автоматично на git-тег, **після** деплою Strapi на staging |
| `ghcr.io/<org>/monorepo/landing:X.Y.Z` (+ `:latest`) | запечений проти prod Strapi | ручний promote |

Обидва пакети мають бути **public** (VM тягне без docker login).

## Архітектура

```
Інтернет ─▶ Cloudflare (DNS + Tunnel) ─▶ cloudflared (systemd, на VM)
                                              │
                                              ▼
                                     Traefik (порт 80, Docker-провайдер)
                          ┌───────────────────┴───────────────────┐
                          ▼                                       ▼
                 staging: strapi + landing              prod: strapi + landing
                 cms-test.* / test.*                    cms.* / uniia.com.ua
```

## CI/CD

### `.github/workflows/release.yml` — при пуші тега `vX.Y.Z`

1. Створює GitHub Release з автозгенерованим changelog.
2. Білдить і пушить `monorepo/strapi:X.Y.Z`.
3. Self-hosted runner оновлює `STRAPI_TAG` у Portainer-стеку `strapi-staging` і чекає `https://cms-test.../_health` (204).
4. Білдить `monorepo/landing:X.Y.Z-staging` з `STRAPI_URL` на staging CMS.
5. Оновлює `LANDING_TAG` у стеку `landing-staging`.

```bash
git tag vX.Y.Z
git push --tags
```

### `.github/workflows/promote-prod.yml` — ручний `workflow_dispatch`

Коли тег перевірений на staging:

1. Actions → Promote to Production → тег (наприклад `v0.1.0`).
2. Той самий образ Strapi котиться на `strapi-prod` (без перебілду), wait `/_health` на prod CMS.
3. Landing перебілджується з `STRAPI_URL` на prod CMS і пушиться як `monorepo/landing:X.Y.Z` + `:latest`.
4. Оновлюється `LANDING_TAG` у стеку `landing-prod`.

### `.github/workflows/ci.yml` — PR у `main`

Паралельно збирає обидва Docker-образи без пушу, щоб ламання Dockerfile/типів ловилось до мержу.

### Чому self-hosted runner

Деплой-джоби йдуть на **self-hosted GitHub Actions runner** на тій самій VM, що й Portainer. Job звертається до Portainer API через `localhost` і програмно оновлює тег + тригерить redeploy. Логіка деплою винесена в `.github/actions/portainer-deploy`, очікування здоров'я — у `.github/actions/wait-health`.

## Turborepo: landing env під час білду

Turborepo 2.x за замовчуванням працює в `envMode: strict` — змінна, не оголошена в `tasks.build.env`, **не потрапляє** у `next build`. Тому в `turbo.json` явно оголошено:

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

Образ Strapi збирається через `pnpm --filter strapi build` **без** turbo саме через цей strict mode.

## Конфігурація landing (env-змінні)

| Змінна | Потрібна при білді | Призначення |
|---|---|---|
| `STRAPI_URL` | так | адреса Strapi API для цього середовища |
| `STRAPI_API_TOKEN` | так (опційно) | read-only токен Strapi, якщо публічний Content API закрито |
| `NEXT_PUBLIC_SITE_URL` | так | канонічний домен для метаданих/SEO |
| `CF_ACCESS_CLIENT_ID` / `CF_ACCESS_CLIENT_SECRET` | так (опційно) | Cloudflare Access service token |
| `REVALIDATION_SECRET` | ні (лише рантайм) | секрет для `/api/revalidate` webhook зі Strapi |

## Конфігурація Strapi (runtime env)

Strapi не запікає секрети в образ. Обов'язкові змінні стеку: `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, `ENCRYPTION_KEY`, `DATABASE_*`, `PUBLIC_URL`, `IS_PROXIED`, `CORS_ORIGINS`.

## Відомі обмеження

- Публічні права Strapi (Public role → find/findOne) для контент-тайпів, які читає фронтенд, треба налаштувати після першого адмін-логіну — інакше білд/рантайм landing показують fallback або 403.
- `landing-prod` Portainer-стек створюється після першого образу `monorepo/landing:X.Y.Z` (без `-staging`).
- Старі образи `ghcr.io/<org>/strapi-cms` і `ghcr.io/<org>/monorepo:X.Y.Z-staging` більше не оновлюються цим флоу.
- Landing-клієнт у `src/lib/strapi-api` читає `STRAPI_REST_READONLY_API_KEY`, тоді як Docker/CI передають `STRAPI_API_TOKEN`.
- `packages/strapi` ходить у `/api/blog-posts`, а контент-тайп у монорепівському Strapi називається `article`.
