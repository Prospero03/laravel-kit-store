
# Работа с маршрутами в laravel-kit 

#### Проверка маршрутов 
`php artisan route:list`

#### Laravel Wayfinder
Официальный новый пакет Laravel, который обеспечивает связь маршрутов между фронтендом и бэкендом

- Добавляем маршрут в routers
- Автоматическое обновление маршрутов
    `php artisan wayfinder:generate`


#### Ziggy
Ziggy предоставляет функцию JavaScript route(), работающую аналогично функции Laravel, что значительно упрощает использование именованных маршрутов Laravel в JavaScript.

- Установка:
    `composer require tightenco/ziggy`

- Добавление @routes:
    В blade шаблоне`app.blade.php` добавляем `@routes` перед `@viteReactRefresh`.

- Обновление маршрутов:
    `php artisan ziggy:generate`

- Документация пакета:
    https://www.npmjs.com/package/ziggy-js?activeTab=readme