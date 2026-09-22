# Компоненти Strapi для Page Builder

Опис процессу створення компонентів, які працюють з CMS.

## Створення компонентів

Більшість компонентів, які використовуються, знаходяться в папці `components` (підпапки використовуються для організації компонентів). Кожен компонент повинен мати свій власний файл, який експортує React-компонент та його fallback-дані. Компонент повинен бути лише серверним компонентом, який отримує дані з Strapi та відображає їх (для SSR).

Для створення нового компонента, використовуйте функцію `PageBuilder.new()`, яка реєструє компонент у системі Page Builder. Наприклад:

```tsx
import { PageBuilder } from "@/components/page-builder/dev-preview";

const MyComponent = PageBuilder.new("my-component-uid", ({ component }) => {
  return (
    <div>
      <h1>{component.title}</h1>
      <p>{component.description}</p>
    </div>
  );
});

MyComponent.fallback = {
  // Фаллбек інформація для компонента, яка використовується у випадку відсутності даних з Strapi (лише для dev preview)
  title: "Default Title",
  description: "Default Description",
};
```

Більше інформації про те що передається у компонент можна знайти [тут](./../layouts/StrapiPageView.tsx#L58-63).

Після створення компоненту, знайти його превью можна за посиланням: [http://localhost:3000/dev/components/my-component-uid](http://localhost:3000/dev/components/my-component-uid) (де `my-component-uid` - це UID вашого компонента), або обрати його у списку компонентів на сторінці [http://localhost:3000/dev/components](http://localhost:3000/dev/components).

> [!WARNING]
> Якщо компонента немає у списку, перевірте чи він був доданий у `PageBuilder.new()`, якщо був доданий вірно, перезапустіть сервер Next.js.

### Компоненти, якіх ще немає у Strapi

Якщо компонент ще не доданий у Strapi, але ви хочете його протестувати, ви можете створити його у папці `components` та додати fallback-дані. Це дозволить вам переглядати компонент у dev preview режимі, навіть якщо він ще не існує у Strapi. Як UID компонента можна використовувати будь-який string, який не конфліктує з існуючими компонентами у Strapi.

Fallback в такому випадку не буде типізований, тому що Strapi ще не знає про цей компонент. Ви можете використовувати будь-які дані у fallback, які вам потрібні для тестування.
