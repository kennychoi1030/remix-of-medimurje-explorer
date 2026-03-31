# Welcome to your Lovable project

TODO: Document your project here

# Remix of Medimurje Explorer

A React application built with Vite, TypeScript, and Shadcn/UI for exploring trails, events, and products in the Medimurje region.

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or bun package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kennychoi1030/remix-of-medimurje-explorer.git
   cd remix-of-medimurje-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

### Development

Start the development server:
```bash
npm run dev
# or
bun run dev
```

The application will be available at `http://localhost:5173`.

### Building the Project

To build the application for production:

1. Install dependencies (if not already done):
   ```bash
   npm install
   # or
   bun install
   ```

2. Run the build command:
   ```bash
   npm run build
   # or
   bun run build
   ```

   This will create a `dist/` directory with the optimized production build.

3. Preview the built application:
   ```bash
   npm run preview
   # or
   bun run preview
   ```

### Testing

Run tests:
```bash
npm test
# or
bun run test
```

Run tests in watch mode:
```bash
npm run test:watch
# or
bun run test:watch
```

### Linting

Check code quality:
```bash
npm run lint
# or
bun run lint
```

## Project Structure

- `src/` - Source code
  - `components/` - Reusable UI components
  - `pages/` - Page components
  - `hooks/` - Custom React hooks
  - `lib/` - Utility functions
  - `types/` - TypeScript type definitions
  - `data/` - Mock data and API services
- `public/` - Static assets
- `dist/` - Built application (generated)
