# 📦 Lost & Found - Frontend

A modern, responsive React application for managing lost and found items.

## 🚀 Features

- **Browse Items**: View all lost and found items with filter tabs (All/Found/Lost)
- **Add Items**: Report lost or found items with detailed information
- **Item Details**: View complete item information with action buttons
- **Edit Items**: Update item details (PATCH - only changed fields sent)
- **Delete Items**: Remove items with confirmation modal
- **Status Toggle**: Mark items as found or lost
- **Responsive Design**: Mobile-first, fully responsive UI
- **Smooth Interactions**: Loading states, toast notifications, and transitions

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **@tailwindcss/vite** - Tailwind integration

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Navbar.jsx
│   ├── ItemCard.jsx
│   ├── ItemForm.jsx
│   ├── LoadingSpinner.jsx
│   ├── Toast.jsx
│   └── ConfirmModal.jsx
├── pages/           # Page components
│   ├── Home.jsx
│   ├── AddItem.jsx
│   ├── ItemDetail.jsx
│   └── EditItem.jsx
├── services/        # API services
│   └── itemApi.js
├── styles/          # Global styles
│   └── globals.css
├── App.jsx          # Root component with routing
└── main.jsx         # App entry point
```

## 🔌 Backend API

This frontend consumes a Spring Boot REST API:

**Base URL**: `http://localhost:8080/api/items`

**Endpoints**:
- `GET /api/items` - Get all items
- `GET /api/items/{id}` - Get item by ID
- `POST /api/items` - Create new item
- `PATCH /api/items/{id}` - Partial update (only changed fields)
- `DELETE /api/items/{id}` - Delete item

**Response Format**:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* item or array */ }
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:8080`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will run on `http://localhost:3000`

## 📱 Features Breakdown

### Home/Dashboard
- Filter tabs (All, Found, Lost)
- Responsive grid layout
- Empty states with helpful messages
- Mobile sticky "Add" button

### Add Item
- Form validation (client-side)
- Required fields: Item Name, Description, Owner, Contact
- Contact number validation (03XXXXXXXXX format)
- Status toggle (Lost/Found)
- Loading states during submission

### Item Detail
- Full item information display
- Action buttons:
  - Mark as Found/Lost
  - Edit (navigates to edit page)
  - Delete (with confirmation modal)
- Responsive layout

### Edit Item
- Pre-filled form with current values
- **PATCH logic**: Only sends changed fields
- Validation on editable fields
- Shows non-editable fields (Owner, Contact)
- Note explaining PATCH behavior

## 🎨 Design Principles

- **Clean & Minimal**: Neutral color palette, clear spacing
- **Mobile-First**: Responsive design optimized for all screens
- **Smooth UX**: Hover states, transitions, loading spinners
- **User Feedback**: Toast notifications for all actions
- **Accessibility**: Semantic HTML, clear labels

## 🔧 Configuration

### API Base URL

Update in `src/services/itemApi.js`:
```javascript
const API_BASE_URL = 'http://localhost:8080/api/items';
```

### Tailwind Config

Customize in `tailwind.config.js`

## 📝 Notes

- **No Authentication**: System is open for demonstration
- **No Pagination**: All items loaded at once
- **Client-Side Validation**: Contact number must start with 03 and be 11 digits
- **PATCH Implementation**: Edit page only sends modified fields to backend

## 🎯 Use Cases

This project demonstrates:
- Modern React development practices
- RESTful API integration
- Form handling and validation
- State management
- Responsive UI design
- User experience patterns

Perfect for portfolios, interviews, and demonstrations.

## 📄 License

MIT License - Free for personal and commercial use.
