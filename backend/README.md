# 🎒 University Lost & Found – Backend (Spring Boot)

A personal **full‑stack learning project** starting with a strong **Spring Boot backend** and gradually moving towards a complete system with a basic **HTML/CSS frontend** and later JavaScript integration.

This project focuses on clean REST APIs, proper layering, and real‑world backend practices while incrementally building frontend understanding.

---

## 🚀 Project Status
**In Progress**  
- ✅ Core backend APIs completed  
- ✅ Basic HTML/CSS frontend layout started (static UI, no JS logic yet)  
- ⏳ JavaScript integration planned  
- ⏳ Authentication & image uploads planned

---

## 🛠 Tech Stack

### Backend
- **Java**
- **Spring Boot**
- **Spring Web (REST APIs)**
- **Spring Data JPA**
- **Hibernate**
- **MySQL**
- **Maven**
- **Postman (API testing)**

### Frontend (Current)
- **HTML5**
- **CSS3**

> JavaScript and framework usage (React / Thymeleaf) will be decided later.

---

## 📦 Features Implemented (Backend)

### ✅ Item Management APIs
- Add a new lost/found item
- View all items
- View item by ID
- Delete item by ID
- Mark item as **found**
- Partially update item details (PATCH)

---

## 🎨 Frontend (Current Work)
- Static pages for:
  - Item listing layout
  - Add item form (UI only)
  - Basic responsive structure
- Clean, minimal design focused on clarity

> Frontend currently does **not** include JavaScript logic or API integration.

---

## 🧱 Architecture

Standard layered backend architecture:

```
Controller  →  Service  →  Repository  →  Database
```

- **Controller**: Handles HTTP requests
- **Service**: Business logic
- **Repository**: Database access using JPA
- **Entity**: Item model mapped to MySQL table

---

## 📄 Item Entity (Current Fields)
- `id` (auto-generated)
- `itemName`
- `description`
- `ownerName`
- `contactNo`
- `found` (boolean)

---

## 🔗 API Endpoints

### ➕ Add Item
```
POST /item/add
```

### 📋 Show All Items
```
GET /item/show
```

### 🔍 Show Item by ID
```
GET /item/show/{id}
```

### ❌ Delete Item
```
DELETE /item/delete/{id}
```

### ✅ Mark Item as Found
```
PATCH /item/found/{id}
```

### ✏️ Update Item (Partial Update)
```
PATCH /item/update/{id}
```

**Request Body Example:**
```json
{
  "description": "Found near cafeteria",
  "contactNo": "0301-1234567"
}
```

> Only allowed fields are updated. Invalid fields are ignored.

---

## 🧠 Key Concepts Learned
- Dependency Injection and Spring Beans
- RESTful API design
- Partial updates using `PATCH`
- DTO vs Map-based updates
- Hibernate entity lifecycle
- Error handling with `ResponseEntity`
- Debugging Spring Boot applications
- Reading Hibernate SQL logs
- Proper separation of concerns
- Backend–Frontend responsibility separation

---

## 🗃 Database
- **MySQL**
- Tables auto-managed via JPA/Hibernate
- ID generation using sequence strategy

---

## 🧪 Testing
- APIs tested using **Postman**
- Manual verification via database queries

---

## 🔮 Planned Features
- JavaScript-based interactivity
- REST API integration with frontend
- Admin authentication panel
- Image upload support (external storage)
- Validation & standardized error responses
- Optional frontend framework integration

---

## 👨‍💻 Author
**Khushnood Ahmed**  
Personal learning & practice project

---

## 📌 Note
This project is **learning-focused**, not a production system or FYP.  
The goal is to build strong backend fundamentals first and then grow confidently into frontend and full‑stack development.

