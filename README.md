# TymeX Marketplace

A modern NFT marketplace built with Next.js, TypeScript, Tailwind CSS, and Shadcn UI components.

## Features

- Browse NFT items with infinite loading
- Search and filter items by various criteria
- Favorite items functionality
- Responsive design that works on all devices
- Loading states, empty states, and error handling

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
   cd tymex-marketplace
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

- `/src/app`: Next.js app router pages and layouts
- `/src/components`: Reusable React components
  - `/src/components/ui`: Shadcn UI components
- `/src/lib`: Utility functions and API services
- `/src/types`: TypeScript type definitions

## API

The project uses a mock API service for demonstration purposes. In a real-world scenario, this would be replaced with actual API calls to a backend service.

- `fetchMarketplaceItems`: Fetches items with filtering and pagination
- `toggleFavorite`: Toggles the favorite status of an item

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
