# TODO: Add All Features from Swagger API to Next.js Project

## Information Gathered
- Current project has basic roadmap display and incomplete admin panel
- API base URL: https://api.bandu.uz/api/v1
- Authentication required for admin endpoints
- Missing user authentication, profile management, and full admin CRUD operations
- Admin panel has incorrect API paths (e.g., /users instead of /admin/users)

## Plan
### 1. Authentication System
- [ ] Create login/register components
- [ ] Implement OTP verification
- [ ] Add password reset functionality
- [ ] Create user profile management
- [ ] Add authentication context/state management

### 2. API Routes (Server-side)
- [ ] Create /api/auth/login route
- [ ] Create /api/auth/register route
- [ ] Create /api/auth/verify route
- [ ] Create /api/auth/reset-password route
- [ ] Create /api/auth/me route
- [ ] Create /api/auth/change-phone-number route
- [ ] Create /api/admin/users route
- [ ] Create /api/admin/users/[userId] route
- [ ] Create /api/admin/roadmap route (GET/POST)
- [ ] Create /api/admin/roadmap/[roadmapId] route
- [ ] Create /api/admin/roadmap/[roadmapId]/toggle route

### 3. Components
- [ ] Login/Register forms
- [ ] OTP verification component
- [ ] User profile component
- [ ] Enhanced admin panel with proper CRUD operations
- [ ] Roadmap management (create, edit, toggle visibility)

### 4. State Management
- [ ] Authentication context
- [ ] User state management
- [ ] Admin data management

### 5. Testing and Validation
- [ ] Test all API endpoints
- [ ] Validate authentication flow
- [ ] Test admin operations
- [ ] Check error handling

## Dependent Files to Edit
- app/api/api.ts (update base URL and auth handling)
- app/admin/page.tsx (fix API paths and add CRUD operations)
- app/components/ (add new auth components)
- app/page.tsx (add auth routing if needed)

## Followup Steps
- [ ] Install any missing dependencies (if needed)
- [ ] Test authentication flow
- [ ] Test admin panel functionality
- [ ] Verify all API integrations work correctly
