# Immob - Luxury Real Estate Platform

<div align="center">
  <img width="800" height="400" alt="Immob Banner" src="https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Immob+Real+Estate" />
</div>

## 📋 Description

Immob is a modern, luxury real estate platform built with React and TypeScript. This frontend application provides a comprehensive solution for property discovery, booking, and management, featuring AI-powered search capabilities and a user-friendly interface for both renters and property hosts.

## ✨ Features

- **AI-Powered Search**: Intelligent property recommendations using Google Generative AI
- **Property Discovery**: Browse and search through luxury properties
- **User Authentication**: Secure login and registration system
- **Host Dashboard**: Property management tools for hosts
- **Booking System**: Seamless booking experience for renters
- **Message Center**: In-app messaging between users and hosts
- **Payment Integration**: Secure payment processing
- **Responsive Design**: Mobile-first design with accessibility features
- **Real-time Updates**: Live notifications and status updates

## 🛠 Tech Stack

### Frontend Framework
- **React 19** - Modern React with concurrent features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server

### State Management
- **Zustand** - Lightweight state management

### Routing
- **React Router DOM** - Client-side routing

### Validation
- **Zod** - Schema validation

### AI Integration
- **Google Generative AI** - AI-powered features

### Testing
- **Jest** - Testing framework
- **React Testing Library** - Component testing utilities

### Development Tools
- **Vite** - Build tool
- **TypeScript** - Type checking
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚀 Installation

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/mrdouffine/Immob_Frontend.git
   cd Immob_Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**

   Copy the environment files and configure your API keys:

   ```bash
   cp .env.development .env.local
   ```

   Update `.env.local` with your configuration:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   # Add other environment variables as needed
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run test` - Run the test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## 📁 Project Structure

```
Immob_frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ErrorBoundary.tsx
│   │   └── ProtectedRoute.tsx
│   ├── config/              # Configuration files
│   ├── data/                # Static data and samples
│   ├── store/               # Zustand state stores
│   │   ├── authStore.ts     # Authentication state
│   │   ├── bookingStore.ts  # Booking management
│   │   ├── hostStore.ts     # Host-related state
│   │   ├── messageStore.ts  # Messaging state
│   │   └── propertyStore.ts # Property data
│   ├── styles/              # Global styles
│   └── utils/               # Utility functions
├── pages/                   # Page components
│   ├── AISearch.tsx         # AI-powered search
│   ├── Discovery.tsx        # Property discovery
│   ├── HostDashboard.tsx    # Host management
│   ├── Login.tsx            # User login
│   ├── ManageListings.tsx   # Property listings management
│   ├── MapSearch.tsx        # Map-based search
│   ├── MessageCenter.tsx    # Messaging interface
│   ├── Payment.tsx          # Payment processing
│   ├── PropertyDetails.tsx  # Property details view
│   ├── Register.tsx         # User registration
│   └── UserProfile.tsx      # User profile management
├── __tests__/               # Test files
├── data/                    # Static data
├── coverage/                # Test coverage reports
├── index.html               # Main HTML file
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── jest.config.ts           # Jest configuration
└── package.json             # Dependencies and scripts
```

## 🧪 Testing

The project includes comprehensive testing setup:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

Test coverage reports are available in the `coverage/` directory.

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Preview Production Build

```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Ensure code passes linting
- Maintain test coverage above 80%
- Use conventional commit messages

## 📄 License

This project is private and proprietary.

## 📞 Support

For support or questions, please contact the development team.

---

<div align="center">
  Made with ❤️ for luxury real estate
</div>
