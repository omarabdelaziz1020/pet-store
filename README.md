# 🐾 Pet Store - Modern React Application

A beautiful, responsive pet store management application built with React 19, TypeScript, and modern design principles. Features authentication, pet management, and a clean modern UI with glass morphism effects.

![React](https://img.shields.io/badge/React-19.1.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue) ![Vite](https://img.shields.io/badge/Vite-6.3.5-yellow) ![Ant Design](https://img.shields.io/badge/Ant%20Design-5.26.5-red)

## ✨ Features

### 🔐 Authentication

- **Secure Login System**: Protected routes with token-based authentication
- **Context-based Auth**: React Context for global authentication state

### 🐕 Pet Management

- **Pet Listings**: Paginated table view with filtering and search capabilities
- **Pet Details**: Comprehensive pet information with photo galleries
- **Pet Editing**: Form-based pet information management
- **Status Filtering**: Filter pets by availability status
- **Real-time Search**: Search across pet names and details

### 🎨 Modern UI/UX

- **Glass Morphism Design**: Beautiful gradient backgrounds with backdrop blur effects
- **Responsive Layout**: Mobile-first design that works on all screen sizes
- **Modern Color Palette**: Custom CSS variables with blue/purple gradient theme
- **Smooth Animations**: Elegant transitions and hover effects

### 📱 Responsive Design

- **Mobile Optimized**: Touch-friendly interface with optimized table layouts
- **Tablet Support**: Horizontal scrolling tables with sticky columns
- **Desktop Experience**: Full-featured interface with advanced filtering

## 🛠 Tech Stack

### Core Technologies

- **React 19.1.0** - Latest React with new features and improvements
- **TypeScript 5.8.3** - Type-safe development
- **Vite 6.3.5** - Lightning-fast build tool and development server
- **React Router DOM 6.30.1** - Client-side routing

### UI Framework & Styling

- **Ant Design 5.26.5** - Professional React UI component library
- **SASS 1.89.2** - Advanced CSS preprocessing
- **CSS Custom Properties** - Modern design system with semantic tokens
- **CSS Grid & Flexbox** - Modern layout techniques

### Development Tools

- **ESLint** - Code quality and consistency enforcement
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite Plugin React** - Fast Refresh and optimal development experience

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd pet-store
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:5173`

## Available Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header/         # Navigation header with auth controls
│   ├── Loader/         # Loading spinner component
│   └── LogoutButton/   # Authentication logout button
├── pages/              # Application pages/routes
│   ├── Login/          # Authentication page
│   ├── PetList/        # Main pet listings with filters
│   ├── PetDetails/     # Individual pet information
│   └── PetEdit/        # Pet editing interface
├── providers/          # React Context providers
│   ├── AuthContext.ts  # Authentication context definition
│   ├── AuthProvider.tsx # Auth provider component
│   ├── ProtectedRoute.tsx # Route protection wrapper
│   └── useAuth.ts      # Authentication hook
├── styles/             # Global styles and design system
│   └── global.scss     # CSS custom properties and base styles
├── types/              # TypeScript type definitions
│   └── Pet.ts          # Pet entity type definitions
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## 🎨 Design System

### Color Palette

- **Primary**: Blue gradient (#3b82f6 to #8b5cf6)
- **Surface**: Clean whites with subtle shadows
- **Text**: Semantic color hierarchy
- **Status**: Color-coded pet availability states

### Key Design Features

- Glass morphism effects with backdrop blur
- Responsive tables with horizontal scrolling on mobile
- CSS custom properties for consistent theming
- Mobile-first responsive design
- Gradient text effects and smooth animations

## 🔧 Key Features Explained

### Authentication System

The app uses a context-based authentication system with protected routes. Users must log in to access pet management features.

### Responsive Tables

- **Desktop**: Full-featured table with all columns
- **Tablet**: Horizontal scroll with sticky first column
- **Mobile**: Simplified view showing only essential information

### Modern CSS Architecture

- **CSS Custom Properties**: Centralized design tokens
- **Component-scoped SCSS**: Modular styling approach
- **Mobile-first**: Progressive enhancement for larger screens
