# SketchTattoo

## Overview

SketchTattoo is a minimalist web application designed for tattoo artists to visualize tattoo designs on client photos. The application allows artists to upload both a client's body part photo and a tattoo design, then provides a realistic preview of how the tattoo would look when applied. The primary goal is to streamline the consultation process, enhance customer retention through professional visualizations, and accelerate workflow for tattoo artists.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development patterns
- **Styling**: Tailwind CSS with a sophisticated dark theme design system using CSS custom properties
- **UI Components**: Comprehensive component library built on Radix UI primitives with shadcn/ui styling patterns
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management with optimistic updates
- **Build Tool**: Vite for fast development and optimized production builds
- **Animation**: Framer Motion for smooth user interface animations

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for full-stack type safety
- **API Design**: RESTful API architecture with structured error handling
- **Request Handling**: Express middleware for JSON parsing, URL encoding, and request logging
- **Development**: Hot module replacement and error overlay integration for enhanced developer experience

### Data Storage
- **Database**: PostgreSQL for reliable data persistence
- **ORM**: Drizzle ORM for type-safe database operations and migrations
- **Connection**: Neon Database serverless PostgreSQL for scalable cloud hosting
- **Schema Management**: Centralized schema definitions with automatic TypeScript type generation
- **Validation**: Zod for runtime data validation and type inference

### Authentication & Session Management
- **Session Store**: PostgreSQL-backed session storage using connect-pg-simple
- **Validation**: Email format validation with comprehensive error handling
- **Security**: Proper error handling to prevent information leakage

### Development Tools
- **Monorepo Structure**: Shared TypeScript definitions between client and server
- **Path Aliases**: Configured import aliases for clean code organization
- **Development Server**: Integrated Vite development server with Express API
- **Error Handling**: Runtime error modal integration for development debugging

## External Dependencies

### Core Framework Dependencies
- **@tanstack/react-query**: Advanced server state management with caching and synchronization
- **wouter**: Lightweight routing library for single-page application navigation
- **framer-motion**: Professional animation library for enhanced user experience

### UI Component System
- **@radix-ui/***: Comprehensive collection of accessible, unstyled UI primitives
- **tailwindcss**: Utility-first CSS framework with custom design system
- **class-variance-authority**: Type-safe variant management for component styling
- **lucide-react**: Modern icon library with consistent design language

### Database & Validation
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe ORM with excellent TypeScript integration
- **drizzle-zod**: Schema validation bridge between Drizzle and Zod
- **zod**: Runtime type validation and schema definition

### Development Environment
- **vite**: Next-generation frontend build tool with fast hot module replacement
- **tsx**: TypeScript execution engine for Node.js development
- **esbuild**: Fast JavaScript bundler for production builds
- **@replit/vite-plugin-***: Replit-specific development enhancements and debugging tools

### Session Management
- **express-session**: Session middleware for Express applications
- **connect-pg-simple**: PostgreSQL session store for persistent user sessions

### Utility Libraries
- **date-fns**: Modern date utility library for timestamp handling
- **clsx**: Utility for constructing className strings conditionally
- **nanoid**: Secure URL-friendly unique string ID generator