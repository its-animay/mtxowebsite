# AI Learning Platform

## Overview

This is a modern marketing website for an AI-powered learning and enterprise assistant platform. The application is built as a full-stack React application with Express.js backend, featuring immersive 3D visualizations and interactive components to showcase various AI-powered educational solutions.

## System Architecture

The application follows a monorepo structure with clear separation between client and server code:

- **Frontend**: React with TypeScript, built with Vite
- **Backend**: Express.js with TypeScript (currently minimal API structure)
- **Database**: PostgreSQL with Drizzle ORM (configured but not actively used)
- **3D Graphics**: Three.js with React Three Fiber for immersive visualizations
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Query for server state, local React state for UI

## Key Components

### Frontend Architecture
- **Pages Structure**: Marketing-focused pages including Homepage, Use Cases (Courses, Language Learning, AI Tutors, Test Engine, Enterprise), How It Works, About, and Contact
- **3D Components**: Interactive 3D visualizations for each use case (AnimatedBrain, FloatingCubes, VoiceWave, etc.)
- **UI Components**: Comprehensive shadcn/ui component library with custom Glass Card effects
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Audio Support**: Web Audio API integration for voice features

### Backend Architecture
- **Express Server**: Basic REST API structure with route registration
- **Storage Layer**: Abstracted storage interface with in-memory implementation
- **Development Setup**: Vite integration for hot reloading in development
- **Production Build**: Optimized bundling with esbuild

### Database Layer
- **Drizzle ORM**: PostgreSQL integration with schema definitions
- **Neon Database**: Serverless PostgreSQL provider configuration
- **User Schema**: Basic user model with authentication capabilities

## Data Flow

1. **Client-Side Rendering**: React components render marketing pages with 3D animations
2. **Static Content**: Most content is static with interactive 3D elements
3. **Form Handling**: Contact forms and demo bookings (prepared for backend integration)
4. **Asset Management**: Support for 3D models, audio files, and other media assets

## External Dependencies

### Core Technologies
- **React Three Fiber**: 3D scene management and WebGL rendering
- **Framer Motion**: Animation library for smooth transitions
- **React Query**: Data fetching and caching
- **Radix UI**: Accessible component primitives

### Database & Backend
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle Kit**: Database migrations and schema management
- **Express.js**: Web application framework

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across the application
- **ESLint & Prettier**: Code quality and formatting

## Deployment Strategy

The application is designed for deployment on platforms like Replit, Vercel, or similar:

1. **Build Process**: 
   - Frontend: Vite builds optimized React application
   - Backend: esbuild creates production server bundle
   
2. **Environment Variables**:
   - `DATABASE_URL`: PostgreSQL connection string
   - `NODE_ENV`: Production environment flag

3. **Static Assets**: 
   - Public directory serves static files
   - 3D models and audio files included in build

4. **Database Setup**:
   - Drizzle migrations for schema deployment
   - Neon database for serverless PostgreSQL

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 05, 2025. Initial setup
- July 05, 2025. Complete redesign of Language Learning page with voice-first experience
- July 05, 2025. Added immersive 3D VoiceBridgeAnimation with multilingual word morphing
- July 05, 2025. Integrated floating chat bubbles, voice wave rings, and particle effects