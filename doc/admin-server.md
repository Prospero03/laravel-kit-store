
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

[`AdminStoreRequest.php`](/app/Http/Requests/Admin/AdminStoreRequest.php) :
Валидация `roles()`: 

    ```php
    public function rules(): array
    {
        return [
            'name' => 'required|min:3|max:50',
            'email' => 'required|email|unique:admins,email',
            'phone' => 'required|min:10|max:10',
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'password' => 'required|min:6|max:20',
            'password_confirmation' => 'required|same:password',
        ];
    }
    ```


[`AdminUpdateRequest.php`](/app/Http/Requests/Admin/AdminUpdateRequest.php) : 
Валидация `roles()`: 

    ```php
        public function rules(): array
        {
            return [
                'name' => 'required|min:3|max:50',
                'email' => 'required|email|unique:admins,email' . $this->route('admin')->id,
                'phone' => 'required|min:10|max:10',
                'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ];
        }
    ```
