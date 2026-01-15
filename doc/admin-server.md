
# Подробная документация - Admin | Server

### Описание Routers
[`/admin.php`](/routes/admin.php)

### Описание AdminController

[`AdminController.ph`](/app/Http/Controllers/Admin/AdminController.php)

---

### Описание Request
- CLI команда: `php artisan make:request AdminUpdateRequest`

[`AdminStoreRequest.php`](/app/Http/Requests/Admin/AdminStoreRequest.php) :
- Прописать валидация `roles()`: 
- Активировать `authorize()` -> `true`

[`AdminUpdateRequest.php`](/app/Http/Requests/Admin/AdminUpdateRequest.php) : 
- Прописать валидация `roles()`: 
- Активировать `authorize()` -> `true`
