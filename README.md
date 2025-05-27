# TymeX Marketplace

A modern NFT marketplace built with Next.js, TypeScript, Tailwind CSS, and Shadcn UI components.

## Features

- Browse Product items with infinite loading
- Search and filter items by various criteria
- Favorite items functionality
- Responsive design that works on all devices
- Loading states, empty states, and error handling
- Smart sticky components with adaptive behavior
- Customizable UI with dark/light themes
- Error-resilient image handling with fallback options

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Testing**: [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone [repository-url]
   cd tymex-interview
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Installation mock server

1. CD to mock/tymex-mock-server-nodejs

2. Install dependencies

   ```bash
   npm install
   ```

3. Run the development mock server

   ```bash
   npm run dev
   ```

## Testing

Run the tests with:

```bash
npm test
# or
yarn test
```

For test coverage:

```bash
npm run test:coverage
# or
yarn test:coverage
```

## Project Structure

- `/src/__tests__`: Test files with same structure as source
- `/src/app`: Next.js app router pages and layouts
- `/src/components`: Reusable React components
- `/src/hooks`: Custom React hooks
- `/src/lib`: Utility functions and API services
- `/src/types`: TypeScript type definitions
- `/src/constants`: Application constants and configuration

## License

This project is licensed under the MIT License - see the LICENSE file for details.
