# Hospital Admin Panel - Developer Quick Reference

## 🚀 Quick Commands

```bash
# Setup
npm install
npm run dev          # Start dev server on http://localhost:5173

# Production
npm run build        # Create optimized build
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## 📍 Routes at a Glance

```
/login                    → Login page
/register                 → Registration page
/dashboard                → Main dashboard (protected)
/services/beds            → Beds management (protected)
/services/oxygen          → Oxygen management (protected)
/services/equipment       → Equipment management (protected)
/services/ambulance       → Ambulance management (protected)
```

## 🎨 CSS Utilities Quick Reference

```css
/* Grids */
.grid-2   /* 2+ columns, auto-fit, min 300px */
.grid-3   /* 3+ columns, auto-fit, min 250px */
.grid-4   /* 4+ columns, auto-fit, min 220px */

/* Flexbox */
.flex           /* display: flex, gap: 20px */
.flex-between   /* space-between alignment */
.flex-center    /* center alignment */
.flex-column    /* flex-direction: column */
.flex-wrap      /* flex-wrap: wrap */

/* Spacing */
.mt-10, .mt-20, .mt-30
.mb-10, .mb-20, .mb-30
.p-10, .p-20, .p-30

/* Text */
.text-center
.text-muted
.text-bold
.text-success, .text-danger, .text-warning

/* Badges */
.badge-success
.badge-danger
.badge-warning
.badge-info
```

## 🔐 Authentication Check

```javascript
// Check if user is logged in
const auth = localStorage.getItem('hospitalAuth')
const isAuthenticated = !!auth

// Store on login
localStorage.setItem('hospitalAuth', JSON.stringify(userData))

// Clear on logout
localStorage.removeItem('hospitalAuth')
```

## 📊 Service Configuration Template

```javascript
// In ServiceManagement.jsx
const configs = {
  newservice: {
    icon: assets.icon_name,
    color: '#hexcolor',
    bgColor: '#hexbgcolor',
    headers: [
      { key: 'fieldName', label: 'Display Name', type: 'text', required: true },
      { key: 'selectField', label: 'Select Option', type: 'select', 
        options: ['Option1', 'Option2'], required: true },
      { key: 'dateField', label: 'Date', type: 'date', required: true },
      { key: 'statusField', label: 'Status', type: 'select', 
        options: ['Available', 'In Use', 'Maintenance'] }
    ]
  }
}
```

## 🎯 Common Component Patterns

### Form Handling
```javascript
const [formData, setFormData] = useState({
  field1: '',
  field2: '',
})

const handleChange = (e) => {
  const { name, value } = e.target
  setFormData(prev => ({ ...prev, [name]: value }))
}

const handleSubmit = (e) => {
  e.preventDefault()
  // Process formData
  setFormData(getEmptyFormData(serviceType))
}
```

### List Management
```javascript
const [items, setItems] = useState([])

// Add
setItems([...items, newItem])

// Update
setItems(items.map(item => 
  item.id === editId ? updatedItem : item
))

// Delete
setItems(items.filter(item => item.id !== idToDelete))

// Filter
const filtered = items.filter(item => item.status === filterValue)
```

## 🎨 Color Reference

```javascript
const colors = {
  primary: '#2c3e50',
  secondary: '#667eea',
  success: '#27ae60',
  warning: '#f39c12',
  danger: '#e74c3c',
  
  // Service colors
  beds: '#e74c3c',
  oxygen: '#3498db',
  blood: '#c0392b',
  equipment: '#27ae60',
  ambulance: '#f39c12'
}
```

## 📱 Responsive Breakpoints

```css
/* Mobile First (320px and up) */
/* All base styles apply here */

/* Tablet (768px and up) */
@media (max-width: 768px) { }

/* Desktop (1024px and up) */
@media (max-width: 1024px) { }

/* Large Desktop (1440px and up) */
/* Cascade from above, no specific media query */
```

## ⚡ Performance Tips

```javascript
// ✅ Good - Responsive grid
gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))'

// ✅ Good - Responsive font
fontSize: 'clamp(0.875rem, 2vw, 1rem)'

// ❌ Avoid - Fixed widths
width: '100px'  // Use %, clamp(), or max-width instead

// ✅ Good - Touch-friendly
minHeight: '44px'
padding: '12px'

// ❌ Avoid - Too small
minHeight: '30px'  // Touch targets should be 44px+
```

## 🔗 API Integration Template

```javascript
// For Login
const response = await axios.post(`${BACKEND_URL}/api/auth/login`, {
  email: formData.email,
  password: formData.password
})

// For Getting Items
const response = await axios.get(`${BACKEND_URL}/api/beds`)

// For Creating Item
const response = await axios.post(`${BACKEND_URL}/api/beds`, itemData)

// For Updating Item
const response = await axios.put(`${BACKEND_URL}/api/beds/${id}`, itemData)

// For Deleting Item
const response = await axios.delete(`${BACKEND_URL}/api/beds/${id}`)

// Always check response
if (response.data.success) {
  // Handle success
  toast.success('Operation successful')
} else {
  toast.error(response.data.message)
}
```

## 🎯 Testing Breakpoints

```
375px  → iPhone SE
480px  → Mobile phones
768px  → Tablets (portrait)
1024px → Tablets (landscape) / Small laptops
1440px → Desktops
1920px → Large displays
```

Test with:
- Chrome DevTools (F12 → Toggle device toolbar)
- Responsively App
- Real devices

## 📝 File Locations

```
Pages:           Admin/src/Pages/
Components:      Admin/src/Components/
Assets:          Admin/src/assets/
Styles:          Admin/src/ (index.css, responsive.css)
Config:          Admin/constant.js
Context:         Admin/src/Context/
Entry Point:     Admin/src/main.jsx
App Routing:     Admin/src/App.jsx
```

## 🐛 Debugging Tips

```javascript
// Check responsive CSS loading
console.log(document.styleSheets)

// Test grid layout
document.querySelectorAll('[style*="grid"]').forEach(el => 
  console.log(getComputedStyle(el).gridTemplateColumns)
)

// Check authentication
console.log(localStorage.getItem('hospitalAuth'))

// Monitor component re-renders
console.log('Component rendered')
```

## 📚 Documentation Links

| Document | Use For |
|----------|---------|
| QUICK_START.md | Setup, debugging, deployment |
| RESPONSIVE_DESIGN_GUIDE.md | Design system, layouts |
| PROJECT_STRUCTURE.md | Architecture, file structure |
| README_ADMIN_PANEL.md | Features, customization |

## 🔄 Common Workflow

1. **Add New Service**
   - Update serviceManagement.jsx config
   - Add icon to assets
   - Add route to App.jsx
   - Update Dashboard services array
   - Test responsive

2. **Connect Backend**
   - Update constant.js BACKEND_URL
   - Replace mock data with API calls
   - Add error handling
   - Test authentication
   - Deploy

3. **Deploy**
   - Run `npm run build`
   - Check dist/ folder
   - Test production build locally
   - Deploy to server
   - Set environment variables

## ✨ Style Guide

```javascript
// Components follow this pattern
const ComponentName = () => {
  const [state, setState] = useState(initial)
  
  const handleEvent = (e) => { /* handler */ }
  
  return <div style={styles.container}>{/* JSX */}</div>
}

const styles = {
  container: { /* inline CSS */ },
  // more styles...
}

export default ComponentName
```

## 🎓 Learning Resources

- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Responsive Design](https://web.dev/responsive-web-design-basics/)
- [MDN Web Docs](https://developer.mozilla.org)

## 📞 Troubleshooting

| Issue | Solution |
|-------|----------|
| Styles not applying | Check responsive.css is imported in main.jsx |
| Grid not responsive | Ensure gridTemplateColumns uses auto-fit, minmax |
| Mobile zoom | Check font-size ≥ 16px on inputs |
| Auth redirect loop | Check localStorage key name matches |
| Button overflow | Add flex: 1 or width: 100% to button |
| Sidebar overlap | Add media query to hide on mobile |

---

**Quick Reference Card v1.0**
**Keep this handy while developing! 📌**
