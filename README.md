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

## Installation

### Installation Repo

1. Clone the repository

   ```bash
   git clone [repository-url]
   cd tymex-interview
   ```

2. Install dependencies

   ```bash
   pnpm install
   # or
   yarn install
   ```

3. Setup environment:

   Create a `.env` file in the root directory of the project, then copy all key-value pairs from `env.example` into it.

4. Run the development server

   ```bash
   pnpm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Installation Mock Server

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
pnpm test
# or
yarn test
```

For test coverage:

```bash
pnpm test:coverage
# or
yarn test:coverage
```

For coverage report:

```bash
pnpm coverage:open
# or
yarn coverage:open
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
