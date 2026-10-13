# DemoProject - Application Design & Architecture

**Project Type:** Angular 18 Standalone Application  
**Version:** 0.0.0  
**Build Tool:** Angular CLI 18.0.5  
**Styling:** SCSS with Bootstrap 5 & Angular Material  
**SSR:** Enabled (Angular SSR)

---

## 1. Project Overview

DemoProject is an Angular 18 web application featuring a modular architecture with lazy-loaded routes, component-based design, and server-side rendering support. The application is structured around user authentication, content management, e-commerce features, and administrative dashboards.

---

## 2. Technology Stack

### Core Dependencies
- **@angular/core** (v18.0.0) - Core Angular framework
- **@angular/router** (v18.0.0) - Routing and navigation
- **@angular/forms** (v18.0.0) - Reactive & template-driven forms
- **@angular/common** (v18.0.0) - Common directives and pipes
- **@angular/platform-browser** (v18.0.0) - Browser-specific utilities
- **@angular/platform-server** (v18.0.0) - Server-side rendering
- **@angular/ssr** (v18.0.5) - Server-Side Rendering support

### UI/Styling
- **@angular/material** (v18.2.14) - Material Design components
- **@angular/cdk** (v18.2.14) - Component Development Kit
- **bootstrap** (v5.3.3) - Bootstrap CSS framework
- **rxjs** (v7.8.0) - Reactive programming library

### Backend
- **express** (v4.18.2) - Node.js server framework

### Testing
- **karma** - Test runner
- **jasmine** - Testing framework

---

## 3. Project Structure

```
DemoProject/
├── src/
│   ├── app/                          # Main application folder
│   │   ├── app.component.ts          # Root component
│   │   ├── app.component.html        # Root template
│   │   ├── app.component.scss        # Root styles
│   │   ├── app.routes.ts             # Main routing configuration
│   │   │
│   │   ├── auth/                     # Authentication module
│   │   │   ├── auth.router.ts        # Auth routes
│   │   │   ├── auth.service.ts       # Auth service
│   │   │   ├── main-auth-section/    # Auth layout component
│   │   │   └── components/
│   │   │       ├── login/            # Login component
│   │   │       ├── registration/     # Registration component
│   │   │       ├── forget-password/  # Forget password component
│   │   │       └── reset-password/   # Reset password component
│   │   │
│   │   ├── core/                     # Core services & guards
│   │   │   ├── core.module.ts        # Core module definition
│   │   │   ├── auth-guard.guard.ts   # Authentication guard
│   │   │   ├── guards/
│   │   │   │   ├── login-guard-guard.guard.ts  # Login route guard
│   │   │   │   └── login-guard-guard.guard.spec.ts
│   │   │   ├── authentication/       # Auth-related services
│   │   │   ├── interceptors/         # HTTP interceptors
│   │   │   └── services/             # Core business services
│   │   │
│   │   ├── models/                   # Data models & interfaces
│   │   │   ├── IApiResponseModel.ts  # API response wrapper
│   │   │   ├── IAsCard.model.ts      # Card/Item model
│   │   │   ├── IFileResponse.model.ts # File upload response
│   │   │   ├── ILogin.Model.ts       # Login request/response
│   │   │   └── user.Model.ts         # User data model
│   │   │
│   │   ├── constant/                 # Application constants
│   │   │   ├── categories.const.ts   # Category constants
│   │   │   └── localStorageObjName.const.ts # Local storage keys
│   │   │
│   │   ├── shared/                   # Shared components & services
│   │   │   ├── shared.module.ts      # Shared module
│   │   │   ├── components/           # Reusable components
│   │   │   │   └── page-not-found/   # 404 component
│   │   │   ├── directives/           # Custom directives
│   │   │   ├── services/             # Shared services
│   │   │   ├── layout/               # Layout components
│   │   │   │   └── layout.route.ts   # Layout routing
│   │   │   └── singleProductView/    # Product detail view
│   │   │
│   │   ├── features/                 # Feature components
│   │   │   ├── homepage/
│   │   │   │   ├── Components/       # Homepage subcomponents
│   │   │   │   └── layout-one/       # Homepage layout
│   │   │   └── Productpage/          # Product listing page
│   │   │
│   │   ├── modules/                  # Feature modules (lazy-loaded)
│   │   │   ├── home/                 # Home module
│   │   │   │   ├── components/
│   │   │   │   └── main-home-section/
│   │   │   ├── product/              # Product module
│   │   │   ├── dashboard/            # Admin dashboard
│   │   │   │   ├── dashboardRoute.routes.ts
│   │   │   │   ├── components/
│   │   │   │   └── main-dashboard-section/
│   │   │   ├── blog/                 # Blog module
│   │   │   │   └── blog-main-section/
│   │   │   ├── contact-us/           # Contact us module
│   │   │   │   ├── contact-us.module.ts
│   │   │   │   └── main-contact-us-section/
│   │   │   ├── imageManager/         # Image management module
│   │   │   │   ├── imageManager.route.ts
│   │   │   │   ├── components/
│   │   │   │   └── image-manager-main-section/
│   │   │   ├── newsFeed/             # News feed module
│   │   │   ├── payment/              # Payment module
│   │   │   ├── profile/              # User profile module
│   │   │   ├── pdfConverter/         # PDF converter module
│   │   │   ├── user/                 # User management module
│   │   │   ├── main-service-section/ # Service listing
│   │   │   └── services/             # Services routing module
│   │   │
│   │   ├── Pages/                    # Routable pages
│   │   │   ├── home/
│   │   │   └── product/
│   │   │
│   │   ├── services/                 # Global services
│   │   └── app.config.ts             # Application configuration
│   │
│   ├── environments/
│   │   ├── environment.ts            # Production environment
│   │   └── environment.development.ts # Development environment
│   │
│   ├── main.ts                       # Application bootstrap
│   ├── main.server.ts                # Server-side bootstrap
│   ├── index.html                    # HTML template
│   └── styles.scss                   # Global styles
│
├── public/                            # Static assets
│   ├── css/
│   ├── defaultCss/
│   ├── fontAwsome/
│   ├── fonts/
│   ├── Images/
│   ├── bg-img/
│   └── cscImage/
│
├── angular.json                       # Angular CLI configuration
├── tsconfig.json                      # TypeScript configuration
├── tsconfig.app.json                  # App-specific TypeScript config
├── tsconfig.spec.json                 # Testing TypeScript config
├── server.ts                          # Express server configuration
├── package.json                       # Dependencies & scripts
└── README.md                          # Project documentation
```

---

## 4. Application Architecture

### 4.1 Standalone Components Architecture
- **Standalone Components:** True (Angular 18 standalone API)
- **No NgModules:** Modules are optional; components use imports directly
- **Lazy Loading:** Routes configured for on-demand module loading

### 4.2 Routing Architecture

#### Main Routes (`app.routes.ts`)
```
/                           → Main layout (lazy-loaded)
/auth/*                     → Authentication module
  ├── /auth/login          → Login page (guarded)
  ├── /auth/registration   → Registration page
  ├── /auth/forgetPassword → Forget password
  └── /auth/resetPassword  → Reset password
/**                         → 404 Page Not Found
```

#### Feature Routes (Lazy-Loaded)
- **Home Module** - Homepage and related content
- **Product Module** - Product listing and details
- **Dashboard Module** - Administrative interface
- **Blog Module** - Blog posts and articles
- **Contact Us Module** - Contact form and information
- **Image Manager Module** - Image upload and management
- **News Feed Module** - News and updates
- **Payment Module** - Payment processing
- **Profile Module** - User profile management
- **PDF Converter Module** - PDF conversion utilities
- **User Module** - User management

### 4.3 Authentication Flow

**Service:** `AuthService` (providedIn: 'root')
- **Method:** `Userlogin(UserInfo: ILoginModel): Observable<ILoginApiResponseModel>`
- **API Endpoint:** `https://localhost:44374/api/Auth/login`
- **Guards:**
  - `loginGuardGuardGuard` - Protects login routes
  - `auth-guard.guard.ts` - General authentication guard

### 4.4 API Integration

**Base URL:** `https://localhost:44374/api`
**Client:** HttpClient (dependency injected)
**Response Type:** Wrapped in `IApiResponseModel`
**HTTP Methods:** GET, POST (extensible)

### 4.5 State Management

**Strategy:** RxJS Observables with Angular services
- Services use HttpClient for HTTP calls
- Observable streams for reactive data flow
- No centralized state management (NgRx/Akita) in current setup

---

## 5. Core Modules & Services

### 5.1 Core Module (`core/`)

**Purpose:** Provides singleton services, guards, and interceptors

**Components:**
| Item | Purpose |
|------|---------|
| `auth-guard.guard.ts` | Validates user authentication status |
| `login-guard-guard.guard.ts` | Prevents authenticated users from accessing login |
| `core.module.ts` | Module definition (if used) |
| `authentication/` | Authentication-related services |
| `interceptors/` | HTTP request/response interceptors |
| `services/` | Core business logic services |

### 5.2 Shared Module (`shared/`)

**Purpose:** Reusable components, directives, and services

**Components:**
| Item | Purpose |
|------|---------|
| `components/page-not-found/` | 404 error page |
| `directives/` | Custom Angular directives |
| `services/` | Utility and helper services |
| `layout/` | Layout wrapper components |
| `singleProductView/` | Product detail view component |
| `shared.module.ts` | Shared module definition |

### 5.3 Auth Module (`auth/`)

**Purpose:** Authentication and user registration

**Routes:**
```
/auth
  ├── /login (guarded)
  ├── /registration
  ├── /forgetPassword
  └── /resetPassword
```

**Components:**
- `LoginComponent` - User login form
- `RegistrationComponent` - User registration form
- `ForgetPasswordComponent` - Password recovery initiation
- `ResetPasswordComponent` - Password reset form

**Service:** `AuthService`
- Handles login API calls
- Response model: `ILoginApiResponseModel`

---

## 6. Data Models & Interfaces

### Located in: `src/app/models/`

| Model | Purpose |
|-------|---------|
| `IApiResponseModel.ts` | Generic API response wrapper |
| `ILogin.Model.ts` | Login request and response interfaces |
| `user.Model.ts` | User data structure |
| `IAsCard.model.ts` | Card/Item display model |
| `IFileResponse.model.ts` | File upload response model |

### Model Structure Example (ILogin.Model.ts)
```typescript
export interface ILoginModel {
  // Login request payload
}

export interface ILoginApiResponseModel {
  // API response after login
}
```

---

## 7. Constants

### Located in: `src/app/constant/`

| File | Purpose |
|------|---------|
| `categories.const.ts` | Product/content category definitions |
| `localStorageObjName.const.ts` | Local storage key constants |

---

## 8. Features & Pages

### 8.1 Features Folder (`features/`)
- **Homepage:** Landing page layout and components
- **Productpage:** Product browsing interface

### 8.2 Modules Folder (`modules/`)

**12 Feature Modules** (Lazy-Loaded)

1. **Home** - Main home page module
2. **Product** - Product catalog and details
3. **Dashboard** - Admin dashboard interface
4. **Blog** - Blog content management
5. **Contact Us** - Contact form and management
6. **Image Manager** - Image upload/management system
7. **News Feed** - News and updates section
8. **Payment** - Payment processing
9. **Profile** - User profile management
10. **PDF Converter** - PDF conversion utilities
11. **User** - User management
12. **Services** - Service/offering management

---

## 9. Styling Architecture

### Global Styles
- **Main:** `src/styles.scss`
- **Bootstrap CSS:** `node_modules/bootstrap/dist/css/bootstrap.min.css`
- **Font Awesome:** `public/defaultCss/font-awesome.css`
- **Material Theme:** `@angular/material/prebuilt-themes/rose-red.css`

### Component Styles
- **Format:** SCSS (configured in `angular.json`)
- **Example:** `layout-one.component.scss`

### CSS Variables & Theme
```scss
$nav-color: var(--background-main);
$section-color: var(--background-section);
$global-primary-color: #384959;
$global-secondary-color: #C70255;
$global-border-radius: 50px;
$global-item-radius: 8px;
```

---

## 10. Build & Deployment

### Build Configurations

**Development Build**
```bash
npm start           # ng serve -o (with browser auto-open)
npm run watch       # Watch mode for development
```

**Production Build**
```bash
npm run build       # ng build (production optimization)
```

### Server-Side Rendering (SSR)
```bash
npm run serve:ssr:DemoProject  # Start SSR server
```

### Testing
```bash
npm test            # Run Karma/Jasmine tests
```

### Build Output
- **Location:** `dist/demo-project/`
- **SSR:** Configured with Express server

---

## 11. Build Configuration (angular.json)

### Project Settings
- **Project Type:** Application
- **Source Root:** `src/`
- **Component Style:** SCSS (default)
- **Prefix:** `app`

### Build Options
- **Output Path:** `dist/demo-project`
- **Index:** `src/index.html`
- **Browser Entry:** `src/main.ts`
- **SSR Entry:** `server.ts`
- **Prerendering:** Enabled

### Polyfills
- `zone.js` - Zone.js for Angular change detection

### Included Assets
- All files from `public/` folder

---

## 12. Bootstrap Process

### Client Bootstrap (`src/main.ts`)
```
1. Bootstrap AppComponent
2. Initialize routing system
3. Set up dependency injection
4. Load lazy-loaded modules on demand
```

### Server Bootstrap (`src/main.server.ts`)
```
1. Configure server-side rendering
2. Initialize Express server
3. Handle server routes
4. Pre-render pages
```

---

## 13. Security & Guards

### Route Guards
| Guard | Purpose | Routes |
|-------|---------|--------|
| `loginGuardGuardGuard` | Prevent logged-in users from accessing auth routes | /auth/login |
| `auth-guard.guard.ts` | Ensure user is authenticated | Protected routes |

### Protected Routes
- Dashboard and admin routes require authentication
- Auth module routes have login guard to prevent redirect loops

---

## 14. HTTP Interceptors

**Location:** `src/app/core/interceptors/`

**Purpose:** 
- Global HTTP request/response handling
- Token injection
- Error handling
- Request logging

---

## 15. Dependency Injection

### Service Providers

**Root Level (providedIn: 'root'):**
- `AuthService` - Authentication service
- Core services in `core/services/`
- Shared services in `shared/services/`

**Lazy-Loaded Modules:**
- Module-specific services provided at module level

---

## 16. Development Notes

### Component Architecture
- **Standalone:** Most components use standalone API
- **No Modules Required:** Direct imports via `imports` array
- **Change Detection:** OnPush optimization available

### Reactive Programming
- **RxJS:** v7.8.0
- **Observables:** Used for async operations
- **Operators:** Standard RxJS operators available

### Forms
- **@angular/forms:** v18.0.0
- **Supports:** Reactive forms and Template-driven forms
- **Validation:** Built-in and custom validators

---

## 17. Environments

### Development Environment
- **File:** `src/environments/environment.development.ts`
- **Usage:** Development mode with debugging

### Production Environment
- **File:** `src/environments/environment.ts`
- **Usage:** Optimized production build

---

## 18. Asset Management

### Public Assets (`public/`)
```
├── css/                    # CSS files
├── defaultCss/             # Default styling
│   └── fonts/              # Custom fonts
├── fontAwsome/             # Font Awesome icons
├── fonts/                  # Font files
├── Images/                 # Image assets
├── bg-img/                 # Background images
└── cscImage/               # CSC-related images
```

---

## 19. TypeScript Configuration

**Files:**
- `tsconfig.json` - Root TypeScript config
- `tsconfig.app.json` - App-specific settings
- `tsconfig.spec.json` - Testing configuration

**Target:** ES2022 (or configured version)
**Strict Mode:** Enabled

---

## 20. Key Dependencies Summary

| Package | Version | Purpose |
|---------|---------|---------|
| @angular/core | ^18.0.0 | Core framework |
| @angular/router | ^18.0.0 | Routing |
| @angular/material | ^18.2.14 | UI components |
| rxjs | ~7.8.0 | Reactive programming |
| bootstrap | ^5.3.3 | CSS framework |
| express | ^4.18.2 | Server framework |

---

## 21. Application Features

### Implemented Features
- ✅ User Authentication (Login, Registration, Password Recovery)
- ✅ Multi-module lazy loading
- ✅ Responsive design (Bootstrap + Material)
- ✅ Server-side rendering support
- ✅ Material Design theme (Rose-red)
- ✅ Image management system
- ✅ Blog/News management
- ✅ Payment processing module
- ✅ Admin dashboard
- ✅ User profile management
- ✅ PDF conversion utilities
- ✅ Contact form system

### Extensibility Points
- Custom guards in `core/guards/`
- HTTP interceptors in `core/interceptors/`
- New feature modules can be added to `modules/`
- Shared components in `shared/components/`
- Custom directives in `shared/directives/`

---

## 22. Recommended Practices

1. **Lazy Loading:** Use lazy-loaded modules for feature isolation
2. **Service Isolation:** Keep services in appropriate folders (core/shared/feature)
3. **Component Reusability:** Create shared components for repeated UI patterns
4. **Typing:** Use TypeScript interfaces from `models/` folder
5. **Constants:** Store magic strings in `constant/` folder
6. **Guards:** Always guard protected routes with appropriate guards
7. **Error Handling:** Implement error handling in HTTP interceptors
8. **Testing:** Use Jasmine/Karma for unit testing (test files included)

---

## 23. Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run SSR
npm run serve:ssr:DemoProject

# Run tests
npm test
```

---

**Last Updated:** 2026-05-03  
**Angular Version:** 18.0.5  
**Node Requirements:** 18.18.0+  

