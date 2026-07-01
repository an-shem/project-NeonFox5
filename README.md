# project-NeonFox5

Командний навчальний проєкт, створений на основі шаблону Vite.

Репозиторій уже містить підготовлену структуру файлів для основних компонентів сайту. Кожен учасник команди працює у власній гілці та реалізує компонент у вже створених HTML, CSS і JavaScript-файлах.

## Як запустити проєкт локально

### 1. Клонувати репозиторій

```bash
git clone https://github.com/an-shem/project-NeonFox5.git
```

### 2. Перейти до папки проєкту

```bash
cd project-NeonFox5
```

### 3. Встановити залежності

```bash
npm install
```

### 4. Запустити локальний сервер

```bash
npm run dev
```

Після запуску Vite покаже локальну адресу, наприклад:

```text
http://localhost:5173/
```

Сторінка Favorites:

```text
http://localhost:5173/favorites.html
```

## Структура проєкту

```text
src/
├── index.html
├── favorites.html
│
├── partials/
│   └── HTML-частини окремих компонентів
│
├── css/
│   ├── variables.css
│   ├── reset.css
│   ├── base.css
│   ├── styles.css
│   └── окремі CSS-файли компонентів
│
├── js/
│   ├── index.js
│   ├── favorites.js
│   ├── api/
│   ├── components/
│   ├── storage/
│   ├── templates/
│   └── utils/
│
└── img/
    ├── placeholders/
    └── sprite.svg
```

### `src/partials`

Містить HTML-розмітку окремих компонентів:

```text
header.html
mobile-menu.html
hero.html
quote.html
exercises.html
favorites-content.html
footer.html
exercise-modal.html
rating-modal.html
loader.html
scroll-up.html
```

### `src/css`

Містить усі стилі проєкту.

Базові файли:

- `variables.css` — кольори, шрифти, переходи та інші CSS-змінні;
- `reset.css` — скидання стандартних стилів браузера;
- `base.css` — базові стилі сторінки, контейнер і допоміжні класи;
- `styles.css` — головний файл, у який імпортуються всі CSS-файли.

Для кожного основного компонента вже створено окремий CSS-файл.

### `src/js`

Основні точки входу:

- `index.js` — JavaScript головної сторінки;
- `favorites.js` — JavaScript сторінки Favorites.

Додаткові папки:

- `api/` — Axios instance, API-методи та обробка помилок;
- `components/` — JavaScript-логіка окремих компонентів;
- `storage/` — робота з `localStorage`;
- `templates/` — функції генерації HTML-розмітки;
- `utils/` — допоміжні функції.

### `src/img`

- `placeholders/` — тимчасові зображення-заглушки;
- `sprite.svg` — SVG-спрайт іконок.

Заглушки потрібно поступово замінювати зображеннями з Figma.

## Як працювати над своєю задачею

1. Оберіть завдання у Trello.
2. Оновіть локальну гілку `main`.
3. Створіть окрему гілку для своєї задачі.
4. Знайдіть підготовлені файли свого компонента.
5. Реалізуйте HTML, CSS і JavaScript для цього компонента.
6. Перевірте сторінку локально.
7. Перед Pull Request переконайтеся, що проєкт запускається без помилок. За потреби виконайте:

```bash
npm run build
```

8. Створіть Pull Request у `main`.

Приклад створення гілки:

```bash
git switch main
git pull origin main
git switch -c header
```

Приклад завершення роботи:

```bash
git add .
git commit -m "Add header"
git push -u origin header
```

Після цього створіть Pull Request:

```text
header → main
```

## Приклади назв гілок

```text
header
hero
footer
favorites
pagination
mobile-menu
exercise-modal
```

## Приклади повідомлень комітів

```text
Add header
Add footer
Fix mobile menu
Update pagination
Add exercise modal
```

## Важливі правила

- Не працюйте безпосередньо у `main`.
- Одна гілка повинна відповідати одній задачі.
- Не створюйте дублікати вже підготовлених файлів.
- Не перейменовуйте файли без погодження з Team Lead.
- Не використовуйте Axios безпосередньо у компонентах — готові API-методи знаходяться у `src/js/api/`.
- Не додавайте до Git папки `node_modules` і `dist`.
- Перед Pull Request перевіряйте, що сторінка працює без помилок у Console.

Після завершення розробки README буде оновлено та доповнено описом готового функціоналу, використаних технологій і результатів командної роботи.
