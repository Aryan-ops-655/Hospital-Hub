# Hospital Admin Panel - Quick Start Guide

## 🚀 Project Setup

### Prerequisites
```bash
Node.js v14+
npm v6+ or yarn v1.22+
Git
```

### Installation
```bash
# Clone the repository
cd Hospital-Hub/Admin

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Key Files Overview

### Core Files
- **App.jsx** - Main routing configuration with protected routes
- **main.jsx** - Entry point, imports responsive CSS
- **responsive.css** - Global responsive styles and utilities
- **index.css** - Base styles (can be empty or minimal)

### Pages
- **Pages/Login.jsx** - Hospital login interface
- **Pages/Register.jsx** - Hospital registration
- **Pages/Dashboard.jsx** - Main dashboard with sidebar
- **Pages/ServiceManagement.jsx** - Generic service CRUD operations
- **Pages/Home/** - Existing blood bank functionality
- **Pages/Add/** - Existing blood bank add interface
- **Pages/Orders/** - Existing blood bank orders

### Components
- **Components/Navbar/** - Navigation components
- **Components/Menu/** - Service overview cards
- **Components/Filter/** - Filter controls
- **Components/ItemDisplay/** - Item grid display
- **Components/UpdateForm/** - Item update forms

### Context & Utils
- **Context/adminContext.jsx** - Global state management
- **assets/assets.js** - Asset exports and mock data
- **constant.js** - API endpoints and constants

## 🎯 URL Routes

```
/login                 → Login page
/register              → Registration page
/dashboard             → Main dashboard (protected)
/services/beds         → Beds management (protected)
/services/oxygen       → Oxygen management (protected)
/services/equipment    → Equipment management (protected)
/services/ambulance    → Ambulance management (protected)
/home                  → Blood bank home (legacy)
/add                   → Add blood stock (legacy)
/order                 → View orders (legacy)
```

## 🔐 Authentication Setup

### How It Works
1. User registers/logs in
2. User data stored in `localStorage` as 'hospitalAuth'
3. Dashboard checks authentication before rendering
4. Unauthorized users redirected to /login

### Current Implementation
```javascript
// Check authentication
const auth = localStorage.getItem('hospitalAuth')
const isAuthenticated = !!auth

// Protected routes use ProtectedRoute wrapper
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

### To Connect Real API
Update `Login.jsx` and `Register.jsx`:
```javascript
// Replace mock auth with real API
const response = await axios.post(`${BACKEND_URL}/api/auth/login`, formData)
if (response.data.success) {
  localStorage.setItem('hospitalAuth', JSON.stringify(response.data.token))
  navigate('/dashboard')
}
```

## 🎨 Styling System

### Global Utilities (responsive.css)
```css
/* Grid Layouts */
.grid-2   /* Auto-fit, min 300px */
.grid-3   /* Auto-fit, min 250px */
.grid-4   /* Auto-fit, min 220px */

/* Flexbox */
.flex, .flex-between, .flex-center
.flex-column, .flex-wrap

/* Spacing */
.mt-10, .mt-20, .mt-30
.mb-10, .mb-20, .mb-30
.p-10, .p-20, .p-30

/* Text */
.text-center, .text-muted, .text-bold
.text-success, .text-danger, .text-warning

/* Badges */
.badge-success, .badge-danger, .badge-warning, .badge-info
```

### Component Styles
Components use inline styles for better encapsulation:
```javascript
const styles = {
  container: { /* CSS properties */ },
  header: { /* CSS properties */ },
  // ... more style objects
}

// Apply styles
<div style={styles.container}>...</div>
```

### Adding Custom Styles
1. Global - Add to `responsive.css`
2. Component - Add to `styles` object
3. Module - Create `.css` file in component folder

## 📱 Responsive Breakpoints

```javascript
// Mobile First Approach
// Default styles apply to mobile (320px+)

// Tablet and up (768px+)
@media (max-width: 768px) {
  /* tablet styles */
}

// Desktop and up (1024px+)
@media (max-width: 1024px) {
  /* desktop styles */
}

// Large desktop (1440px+)
/* No specific media query, cascade from above */
```

## 🔧 Customizing Services

### Add a New Service

1. **Update Dashboard.jsx** - Add service to services array
2. **Update ServiceManagement.jsx** - Add config object
3. **Add Route in App.jsx** - Add new route
4. **Add Icon** - Add to assets folder and assets.js

Example:
```javascript
// In ServiceManagement.jsx
const configs = {
  newservice: {
    icon: assets.new_icon,
    color: '#color',
    bgColor: '#bgcolor',
    headers: [/* form fields */]
  }
}
```

## 🔄 Data Flow

### Service Management Flow
```
User Opens Service
    ↓
Component renders form + list
    ↓
User clicks "Add" → Form modal opens
User fills form → Submits
    ↓
handleSubmit() → Adds to items array
    ↓
Component re-renders with new item
    ↓
User can Edit/Delete from list
```

### State Management
```javascript
// Local component state
const [items, setItems] = useState([])
const [showAddForm, setShowAddForm] = useState(false)
const [formData, setFormData] = useState({})

// Global context (adminContext.jsx)
const { hospitalInfo, fetchData } = useContext(AdminContext)
```

## 🧪 Testing Tips

### Mobile Testing
1. Use Chrome DevTools (F12 → Mobile view)
2. Test at breakpoints: 375px, 480px, 768px, 1024px
3. Check touch targets (44px minimum)
4. Test rotation (portrait/landscape)

### Performance
1. Check Network tab (file sizes)
2. Check Performance tab (render times)
3. Test on slow 3G network
4. Check Lighthouse score

### Responsiveness
```bash
# Common test viewports
320px  - iPhone SE
375px  - iPhone 12
480px  - Samsung Galaxy S21
768px  - iPad
1024px - iPad Pro / Laptop
1440px - Desktop
```

## 🐛 Common Issues & Solutions

### Issue: Sidebar overlaps content on mobile
**Solution**: Add media query to hide sidebar or make it absolute positioned

### Issue: Form inputs too small on mobile
**Solution**: Ensure font size ≥ 16px to prevent iOS zoom

### Issue: Grid not responsive
**Solution**: Check `gridTemplateColumns` has `repeat(auto-fit, minmax(...))`

### Issue: Touch targets too small
**Solution**: Ensure buttons/inputs have padding to reach 44x44px minimum

### Issue: Images overflow on mobile
**Solution**: Add `width: 100%` and `height: auto` to images

## 📊 File Size Tips

### Optimize For Production
```bash
# Check bundle size
npm run build

# Analyze bundle
npm install -D vite-plugin-visualizer
```

### Optimize Images
- Use PNG for icons (already done)
- Consider WebP for photos
- Compress images before adding

## 🚀 Deployment

### Build for Production
```bash
npm run build
# Creates dist/ folder with optimized build
```

### Deploy Steps
1. Build the project
2. Upload dist/ folder to server/CDN
3. Set up environment variables
4. Configure API endpoints in constant.js

### Environment Setup
Create `.env.local` for development:
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Hospital Admin
```

Update `constant.js`:
```javascript
export const BACKEND_URL = import.meta.env.VITE_API_URL
```

## 📚 Resources

### Documentation
- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [React Router](https://reactrouter.com)
- [MDN Web Docs](https://developer.mozilla.org)

### Tools
- Chrome DevTools
- VS Code Extensions: ES7+, Prettier, ESLint
- Lighthouse
- Responsively App

## 🎓 Learning Path

1. **Understand Structure** - Read this guide + README files
2. **Explore Pages** - Check Login.jsx, Dashboard.jsx, ServiceManagement.jsx
3. **Test Responsive** - Open DevTools, toggle device view
4. **Modify Styles** - Edit responsive.css or inline styles
5. **Add Features** - Create new components/services
6. **Test Everything** - Check all breakpoints

## 💡 Best Practices

### Code Quality
- Keep components small and focused
- Use meaningful variable names
- Add comments for complex logic
- Test responsive at each breakpoint

### Performance
- Lazy load routes (already done via React Router)
- Optimize images
- Minimize CSS in production
- Use React DevTools Profiler

### Accessibility
- Use semantic HTML (header, nav, main, footer)
- Add alt text to images
- Ensure color contrast ratios
- Test keyboard navigation

### Responsive Design
- Mobile-first approach
- Test on real devices
- Use CSS Grid/Flexbox
- Avoid fixed widths (use percentages/clamp)

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/new-service`
2. Make changes maintaining responsive design
3. Test all breakpoints
4. Commit with clear messages
5. Push and create PR

## 📞 Getting Help

1. Check `RESPONSIVE_DESIGN_GUIDE.md` for design system
2. Review `README_ADMIN_PANEL.md` for feature overview
3. Search existing code for similar patterns
4. Check browser console for errors
5. Use DevTools to debug

---

**Happy Coding! 🎉**

For questions or issues, refer to the main README or check the code comments.
