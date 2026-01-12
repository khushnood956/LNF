# 🎒 University Lost & Found – Backend (Spring Boot)

A personal backend project built with **Spring Boot** for managing a university **Lost & Found system**.  
This project focuses on clean REST APIs, proper layering, and real-world backend practices.

---

## 🚀 Project Status
**In Progress**  
Backend APIs implemented for creating, viewing, updating, and deleting lost & found items.  
Authentication, image uploads, and frontend are planned for later stages.

---

## 🛠 Tech Stack
- **Java**
- **Spring Boot**
- **Spring Web (REST APIs)**
- **Spring Data JPA**
- **Hibernate**
- **MySQL**
- **Maven**
- **Postman (API testing)**

---

## 📦 Features Implemented (Current)

### ✅ Item Management APIs
- Add a new lost/found item
- View all items
- View item by ID
- Delete item by ID
- Mark item as **found**
- Partially update item details (PATCH)

---

## 🧱 Architecture
Standard layered architecture:

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
- Admin authentication panel
- Image upload support (external storage)
- Frontend (full-stack integration)
- Validation & error response standardization

---

## 👨‍💻 Author
**Khushnood Ahmed**  
Personal learning & practice project

---

## 📌 Note
This project is not intended as an FYP or production system.  
It is a learning-focused project to understand real-world backend development.

