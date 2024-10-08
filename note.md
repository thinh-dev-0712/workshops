# Buổi 12

## Phần 1:

-   Bước 1: Tạo file db.json ở root folder với nội dung sau:

```json
{
    "products": [
        {
            "id": 1,
            "name": "Product 1",
            "price": 100
        },
        {
            "id": 2,
            "name": "Product 2",
            "price": 200
        }
    ]
}
```

> Trong trường hợp máy chưa cài json-server thì gõ câu lệnh sau để cài:

```bash
npm i json-server@0.17.4 json-server-auth -D
```

-   Bước 2: chỉnh sửa file package.json:

```json
"scripts": {
    "server": "json-server-auth --watch db.json"
  },
```

-   Bước 3: Chạy lệnh `npm run server` để chạy server
-   Bước 4: Truy cập file App.js, kết hợp với useEffect và useState để lấy dữ liệu từ server

```jsx
useEffect(() => {
    fetch(`http://localhost:3000/products`)
        .then((response) => response.json())
        .then((data) => setProducts(data));
}, []);
```

## Phần 2: Sử dụng Antd

Antd là một thư viện UI được sử dụng phổ biến trong React, giúp chúng ta tạo ra giao diện đẹp mắt và dễ sử dụng.

-   Bước 1: Cài đặt Antd:

```bash
    npm i antd
```

-   Bước 2: Sử dụng component

## Phần 3: Cài đặt tailwindcss

-   Bước 1: Truy cập đường link : https://tailwindcss.com/docs/guides/vite
-   Bước 2: Cài đặt tailwindcss thông qua câu lệnh sau

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

```

-   Bước 3: Cấu hình đường dẫn để đọc file css trong file vite.config.js

```jsx
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
};
```

-   Bước 4: Thêm các class của tailwindcss vào file index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

-   Bước 5: Chạy project

```json
npm run dev
```

-   Bước 5: Sử dụng class của tailwindcss trong file App.js

```jsx
export default function App() {
    return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}
```
