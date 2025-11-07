# Realworld Blog (React + Vite)

Учебный проект блога на React с реальным API (RealWorld).

## Live demo

Развёрнуто на Vercel:  
[https://realworld-blog-yourname.vercel.app](https://realworld-blog-d9u4.vercel.app/)

## Функциональность

- Список статей с пагинацией
- Просмотр одной статьи (Markdown)
- Регистрация / логин / логаут
- Хранение авторизации (token в localStorage)
- Редактирование профиля (username, email, password, avatar)
- Создание статьи
- Редактирование статьи
- Удаление статьи (с модальным подтверждением)
- Лайки (favorite/unfavorite) статей для авторизованных пользователей
- Валидация форм через React Hook Form
- ESLint + Prettier + Husky (проверки перед push)

## Локальный запуск

```bash
# установка зависимостей
npm install

# запуск в dev-режиме
npm run dev

# запуск линтера
npm run lint

# проверка форматирования
npm run format:check

# production-сборка
npm run build
