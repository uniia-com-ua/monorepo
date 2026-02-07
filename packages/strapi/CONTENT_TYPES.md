# Strapi Content Types — Setup Guide

Цей документ описує структуру контент-типів, які потрібно створити в адмін-панелі Strapi (`cms.uniia.com.ua`).

---

## 1. Components (Shared)

Створіть ці компоненти у розділі **Content-Type Builder → Components**.

### Category: `shared`

#### `shared.seo`
| Field         | Type         | Required | Notes                    |
|---------------|--------------|----------|--------------------------|
| title         | Short text   | Yes      | SEO заголовок            |
| description   | Long text    | Yes      | Meta description         |
| ogImage       | Media (image)| No       | Open Graph зображення    |
| keywords      | Short text   | No       | Через кому               |

#### `shared.link`
| Field | Type       | Required | Notes |
|-------|------------|----------|-------|
| label | Short text | Yes      |       |
| href  | Short text | Yes      |       |

#### `shared.nav-item`
| Field    | Type       | Required | Notes                              |
|----------|------------|----------|------------------------------------|
| label    | Short text | Yes      | Текст пункту меню                  |
| href     | Short text | No       | URL (для зовнішніх посилань)       |
| scrollTo | Short text | No       | ID секції для scroll (напр. "about")|

#### `shared.cta-button`
| Field    | Type       | Required | Notes                       |
|----------|------------|----------|-----------------------------|
| text     | Short text | Yes      | Текст кнопки                |
| href     | Short text | No       | URL                         |
| scrollTo | Short text | No       | ID секції для scroll        |
| variant  | Short text | No       | Варіант стилю (default, glass, white, secondary) |

### Category: `footer`

#### `footer.column`
| Field | Type                        | Required | Notes           |
|-------|-----------------------------|----------|-----------------|
| title | Short text                  | Yes      | Заголовок колонки|
| links | Repeatable `shared.link`    | No       |                 |

#### `footer.social-link`
| Field    | Type       | Required | Notes                   |
|----------|------------|----------|-------------------------|
| platform | Short text | Yes      | Назва (Instagram, etc.) |
| url      | Short text | Yes      | URL профілю             |
| icon     | Short text | No       | Назва іконки (lucide)   |

---

## 2. Block Components (Dynamic Zone)

Створіть ці компоненти в категорії `blocks`.

### `blocks.hero`
| Field           | Type                                | Required | Notes                         |
|-----------------|-------------------------------------|----------|-------------------------------|
| title           | Short text                          | Yes      | Головний заголовок            |
| subtitle        | Long text                           | No       | Підзаголовок                  |
| backgroundImage | Media (image)                       | No       | Фонове зображення             |
| ctaButtons      | Repeatable `shared.cta-button`      | No       | Кнопки дій                    |

### `blocks.about-cards`
| Field      | Type                                    | Required | Notes                     |
|------------|-----------------------------------------|----------|---------------------------|
| heading    | Short text                              | No       | Заголовок секції          |
| subheading | Long text                               | No       | Підзаголовок секції       |
| cards      | Repeatable `blocks.about-card-item`     | Yes      | Картки (див. нижче)       |

#### `blocks.about-card-item` (nested component)
| Field        | Type                  | Required | Notes                    |
|--------------|-----------------------|----------|--------------------------|
| title        | Short text            | Yes      |                          |
| description  | Long text             | Yes      |                          |
| variant      | Enum: light, dark     | Yes      | Стиль картки             |
| cta          | Short text            | No       | Текст кнопки             |
| scrollTarget | Short text            | No       | ID секції для scroll     |

### `blocks.team`
| Field          | Type                              | Required | Notes                       |
|----------------|-----------------------------------|----------|-----------------------------|
| heading        | Short text                        | No       | Заголовок секції            |
| subheading     | Long text                         | No       | Підзаголовок секції         |
| image          | Media (image)                     | No       | Зображення команди          |
| infoTitle      | Short text                        | No       | Заголовок info-картки       |
| infoDescription| Long text                         | No       | Опис info-картки            |
| stats          | Repeatable `blocks.stat-item`     | No       | Статистика                  |
| ctaTitle       | Short text                        | No       | Заголовок CTA блоку         |
| ctaDescription | Long text                         | No       | Опис CTA блоку              |
| ctaButtonText  | Short text                        | No       | Текст кнопки CTA            |

#### `blocks.stat-item` (nested component)
| Field | Type       | Required | Notes           |
|-------|------------|----------|-----------------|
| value | Short text | Yes      | Напр. "450+"    |
| label | Short text | Yes      | Напр. "Учасники"|

### `blocks.feedback-form`
| Field           | Type                                    | Required | Notes                     |
|-----------------|-----------------------------------------|----------|---------------------------|
| title           | Short text                              | Yes      | Заголовок секції          |
| subtitle        | Long text                               | No       | Підзаголовок              |
| benefitsHeading | Short text                              | No       | Заголовок "Що отримаєш"  |
| benefits        | Repeatable `blocks.benefit-item`        | No       | Список переваг            |

#### `blocks.benefit-item` (nested component)
| Field | Type       | Required | Notes           |
|-------|------------|----------|-----------------|
| text  | Short text | Yes      | Текст переваги  |

---

## 3. Single Type: `Global`

Створіть Single Type з API ID `global`.

| Field      | Type                       | Notes                                  |
|------------|----------------------------|----------------------------------------|
| header     | Component `global.header`  | Хедер сайту (див. нижче)               |
| footer     | Component `global.footer`  | Футер сайту (див. нижче)               |
| defaultSeo | Component `shared.seo`     | SEO за замовчуванням для всіх сторінок |

### `global.header` (component)
| Field     | Type                                | Notes              |
|-----------|-------------------------------------|--------------------|
| logo      | Media (image)                       | Логотип            |
| navItems  | Repeatable `shared.nav-item`        | Пункти навігації   |
| ctaButton | Component `shared.cta-button`       | CTA кнопка хедера  |

### `global.footer` (component)
| Field       | Type                                | Notes              |
|-------------|-------------------------------------|--------------------|
| columns     | Repeatable `footer.column`          | Колонки з посиланнями |
| socialLinks | Repeatable `footer.social-link`     | Соцмережі          |
| copyright   | Short text                          | Текст копірайту    |

---

## 4. Collection Type: `Page`

API ID: `page` (plural: `pages`).

| Field  | Type                  | Required | Notes                                    |
|--------|-----------------------|----------|------------------------------------------|
| slug   | UID                   | Yes      | URL slug (напр. "/" для головної)        |
| seo    | Component `shared.seo`| No       | Переозначає Global defaultSeo            |
| blocks | **Dynamic Zone**      | No       | Включає всі `blocks.*` компоненти       |

Dynamic Zone `blocks` має включати:
- `blocks.hero`
- `blocks.about-cards`
- `blocks.team`
- `blocks.feedback-form`

---

## 5. Collection Type: `Blog-Post`

API ID: `blog-post` (plural: `blog-posts`).

| Field       | Type           | Required | Notes                      |
|-------------|----------------|----------|----------------------------|
| title       | Short text     | Yes      | Заголовок статті           |
| slug        | UID (from title)| Yes     | URL slug                   |
| excerpt     | Long text      | No       | Короткий опис              |
| content     | Rich text (Blocks) | Yes  | Контент статті             |
| cover       | Media (image)  | No       | Обкладинка                 |
| author      | Short text     | No       | Автор                      |
| publishedAt | Datetime       | No       | Дата публікації            |
| category    | Relation (→ Blog-Category) | No | Категорія           |

---

## 6. Collection Type: `Blog-Category`

API ID: `blog-category` (plural: `blog-categories`).

| Field | Type       | Required | Notes      |
|-------|------------|----------|------------|
| name  | Short text | Yes      | Назва      |
| slug  | UID (from name) | Yes | URL slug  |

---

## Permissions

В розділі **Settings → Users & Permissions → Roles → Public**:
- `global`: find
- `page`: find, findOne
- `blog-post`: find, findOne
- `blog-category`: find, findOne

Або створіть API Token (Settings → API Tokens) з доступом `read-only` до цих контент-типів.

---

## Webhook (On-demand Revalidation)

В розділі **Settings → Webhooks** створіть webhook:
- **URL**: `https://your-domain.com/api/revalidate`
- **Headers**: `x-revalidate-secret: YOUR_SECRET`
- **Events**: Entry create, update, delete, publish, unpublish
- **Content Types**: Global, Page, Blog-Post

Webhook надсилає POST із `{ tag: "global" | "page-{slug}" | "blog" }` для правильної ревалідації кешу.
