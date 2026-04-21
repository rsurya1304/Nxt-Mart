# 🛒 Nxt Mart – Modern E-Commerce Web App

A fully responsive **E-Commerce Grocery Application** built using React.js.  
This project demonstrates real-world frontend development skills including authentication, routing, state management, API integration, and responsive UI design.

---

## 🚀 Live Demo
👉 https://suryanxtmart.ccbp.tech/

---
## 🔐 Demo Credentials 
Username: rahul
Password: rahul@2021

Use these credentials to test the application:

```json
Username: rahul
Password: rahul@2021
## 📌 Features

### 🔐 Authentication
- Secure login using JWT Token
- Protected Routes (Home & Cart)
- Auto redirect for authenticated users
- Show/Hide password functionality

---

### 🏠 Home Page
- Fetch products from API
- Category-wise product display
- Horizontal scrolling for categories
- Add to Cart functionality
- Increment / Decrement product quantity
- Dynamic UI updates

---

### 🛒 Cart Page
- View selected products
- Update product quantity
- Remove individual items
- Clear entire cart
- Dynamic total price calculation
- Checkout success view
- Persistent cart using **Local Storage**

---

### ❌ Error Handling
- API failure view with retry option
- Not Found page for invalid routes

---

### 📱 Responsive Design
- Mobile-first approach
- Tablet & Desktop optimized
- Sticky navigation & smooth scrolling

---

## 🛠️ Tech Stack

| Technology | Usage |
|-----------|------|
| React.js | Frontend Framework |
| React Router | Routing |
| Context API | State Management |
| JavaScript (ES6+) | Logic |
| CSS3 | Styling & Responsiveness |
| REST API | Data Fetching |
| Local Storage | Cart Persistence |

---

## 📂 Project Structure
src/
├── components/
│ ├── Header
│ ├── Footer
│ ├── Home
│ ├── Cart
│ ├── CartItem
│ ├── Product
│ ├── CategorySidebar
│ ├── CategoryTopBar
│ ├── Login
│ ├── NotFound
│
├── context/
│ └── CartContext.js
│
├── App.js
├── index.js
