# The Store

A responsive storefront built with React. Browse products from the Fake Store API, filter the catalog by category, choose quantities, manage a cart, and complete a simulated checkout.

## Features

- Product catalog populated from the [Fake Store API](https://fakestoreapi.com/)
- Category filters with a collapsible sidebar
- Per-product quantity controls
- Cart quantity updates, item removal, and running totals
- Checkout summary with 5% tax and purchase confirmation
- Client-side routing for the home, shop, cart, and checkout pages
- Responsive layout for desktop and mobile screens
- Component tests for the main shopping flow

> This is a demonstration project. Checkout is simulated and does not process real payments or orders.

## Built with

- React 19
- React Router
- Vite
- CSS Modules
- Vitest and React Testing Library

## Getting started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm

### Installation

```bash
git clone git@github.com:sonhoang002/ShoppingCart.git
cd ShoppingCart
npm install
npm run dev
```

Open the local URL shown by Vite in your browser.

## Available scripts

```bash
npm run dev        # Start the development server
npm run build      # Create a production build
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint
npm test           # Run the test suite once
npm run test:watch # Run tests in watch mode
```

## Project structure

```text
src/
├── Components/
│   ├── CartPage/
│   ├── CheckoutPage/
│   ├── HomePage/
│   └── ShoppingPage/
├── assets/
├── test/
├── App.jsx
└── main.jsx
```

Product data and images require an internet connection on the first request because they are loaded from the Fake Store API.
