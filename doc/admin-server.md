
# Подробная документация - Admin | Server

### Описание Routers
[`/admin.php`](/routes/admin.php)

### Описание AdminController

[`AdminController.ph`](/app/Http/Controllers/Admin/AdminController.php)

### Описание Request
- Чтобы создать запрос: 
    `php artisan make:request AdminUpdateRequest`
- Активирование `authorize()`: 
    `function authorize()` => `return true`

---

[`AdminStoreRequest.php`](/app/Http/Requests/Admin/AdminStoreRequest.php) :
- Прописать валидация `roles()`: 
- Активировать `authorize()` -> `true`

[`AdminUpdateRequest.php`](/app/Http/Requests/Admin/AdminUpdateRequest.php) : 
- Прописать валидация `roles()`: 
- Активировать `authorize()` -> `true`
