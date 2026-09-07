# 1Fi Marketplace — SDE Intern Assignment

A mobile-first implementation of the **1Fi Marketplace** feature within the existing Shop experience, built according to the assignment brief and the observed 1Fi Shop UI.

The implementation focuses on extending the Shop experience with a dedicated Marketplace section while maintaining the existing 1Fi visual language and interaction patterns.

## Project Overview

The objective of this project is to implement the **1Fi Marketplace** section inside the existing Shop experience.

The Marketplace allows users to browse products, search and filter products, view product details, select variants, explore and select EMI plans, review the order, and complete a simulated checkout flow.

The implementation is designed to feel like a natural extension of the existing 1Fi Shop experience rather than a separate e-commerce application.

## Scope

The Shop experience contains the three sections specified in the assignment:

| Section | Implementation |
|---|---|
| Top Brands | No implementation required |
| Nearby Stores | No implementation required |
| 1Fi Marketplace | Fully implemented |

The primary development effort is focused on the **1Fi Marketplace** as required by the assignment.

## Features Implemented

### Marketplace

- Product listing with product images, brand, name and pricing
- EMI starting amount displayed on product cards
- Product ratings and review counts
- Search products by name, brand or relevant product information
- Category filtering
- Responsive product grid
- Mobile-first marketplace experience

### Available Categories

- All
- Mobiles
- Laptops
- Audio
- Smartwatches

### Product Details

- Product image/gallery
- Product name
- Brand
- Rating and review count
- Current price
- Original price where applicable
- Discount information
- Color selection
- Storage/specification selection where applicable
- Key product specifications
- Available EMI plans

### EMI Experience

- Multiple EMI tenure options
- Dynamic EMI calculation based on product pricing
- Selected EMI plan state
- Monthly EMI amount
- Total payable amount
- Down payment information
- Processing fee
- No-cost EMI information where applicable
- EMI schedule information
- Primary CTA updates according to the selected EMI plan

### Checkout Flow

The Marketplace includes a simulated end-to-end purchase flow:

```text
Shop
  ↓
1Fi Marketplace
  ↓
Search / Category
  ↓
Product Listing
  ↓
Product Details
  ↓
Select Variant
  ↓
Select EMI Plan
  ↓
Order Review
  ↓
Place Order
  ↓
Success
```

The checkout experience includes:

- Selected product
- Selected variants
- Selected EMI plan
- Monthly EMI amount
- Order summary
- Simulated order placement/loading state
- Success state

No real payment or financial transaction is performed.

## Technical Approach

### Data & Service Layer

Marketplace data is intentionally kept separate from UI components.

The project uses a small asynchronous mock service layer to simulate API/data retrieval, as the assignment allows mock APIs/data when backend integration is unavailable.

```text
Catalog Data
     ↓
Mock Service Layer
     ↓
React Hooks / State
     ↓
Reusable Components
     ↓
UI
```

This approach keeps the UI independent of the underlying data source and makes the marketplace data easier to replace with a real API in the future.

## Architecture

```text
src/
│
├── data/
│   └── catalog.js
│
├── services/
│   └── marketplaceApi.js
│
├── components/
│   ├── layout/
│   ├── marketplace/
│   ├── product/
│   ├── emi/
│   └── checkout/
│
├── hooks/
│
├── main.jsx
│
└── styles.css
```

### Key Files

- `src/data/catalog.js` — Marketplace catalog and EMI-related data/calculation logic.
- `src/services/marketplaceApi.js` — Mock asynchronous service/API layer.
- `src/components/` — Reusable UI components for marketplace, product details, EMI and checkout.
- `src/hooks/` — Reusable state and data-handling logic.
- `src/main.jsx` — Application entry point and overall application flow.
- `src/styles.css` — Responsive styling and the visual system used across the Marketplace experience.

## UI / UX Approach

The Marketplace follows the visual direction observed in the existing 1Fi Shop experience.

Key design principles include:

- Light/white background
- Purple brand color
- Rounded cards and controls
- Clear content hierarchy
- Compact product presentation
- Consistent spacing
- Responsive layouts
- Mobile-first interaction
- Clear EMI visibility
- Strong primary CTA states
- Minimal visual clutter

The goal was to extend the existing Shop experience rather than redesign the overall 1Fi application.

## Responsive Design

The implementation is mobile-first and optimized for common mobile screen sizes.

The UI has been tested with layouts around:

- 375 × 812
- 390 × 844

Responsive behavior is also included for larger screen sizes.

Special attention has been given to:

- Product card sizing
- Product image containment
- Horizontal category scrolling
- EMI cards
- Product detail layout
- Checkout content
- Bottom navigation
- CTA visibility
- Preventing horizontal overflow

## State Handling

The application handles common UI states including:

- Loading state while marketplace data is retrieved
- Error state when data cannot be loaded
- Empty state when search or filtering produces no results
- Selected states for categories, product variants and EMI plans
- Success state after completing the simulated order flow

## Reusable Components

The UI is structured using reusable React components rather than placing the entire Marketplace implementation inside a single component.

Reusable components cover:

- Product cards
- Category filters
- Search
- Product details
- Variant selectors
- EMI plan cards
- EMI schedule
- Order summary
- Checkout
- Success state
- Layout and navigation

This makes individual parts of the Marketplace easier to maintain and extend.

## Tech Stack

- **React 19**
- **Vite**
- **JavaScript**
- **CSS**
- Mock API / asynchronous service layer

No backend service is required for this assignment implementation.

## Running Locally

### 1. Clone the repository

```bash
git clone PASTE_YOUR_GITHUB_REPOSITORY_URL_HERE
```

### 2. Navigate to the project

```bash
cd 1fi-marketplace
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local development URL provided by Vite.

## Production Build

```bash
npm run build
```

## Deployment

The project is deployed as a Vite application on Vercel.

**Live Demo:**  
PASTE_YOUR_VERCEL_URL_HERE

## Testing the Main Flow

1. Open the Shop page.
2. Select **1Fi Marketplace**.
3. Browse the available products.
4. Search for a product.
5. Apply a category filter.
6. Open a product.
7. Select the required variant/specification.
8. Select an EMI plan.
9. Verify the updated EMI information.
10. Proceed with the selected EMI plan.
11. Review the order.
12. Complete the simulated order flow.
13. Verify the success state.

## Project Structure

```text
1fi-marketplace/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── checkout/
│   │   ├── emi/
│   │   ├── layout/
│   │   ├── marketplace/
│   │   └── product/
│   │
│   ├── data/
│   │   └── catalog.js
│   │
│   ├── hooks/
│   │
│   ├── services/
│   │   └── marketplaceApi.js
│   │
│   ├── main.jsx
│   └── styles.css
│
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Assignment Notes

The assignment allows mock APIs/data when backend integration is unavailable.

For this implementation:

- Marketplace products are represented using local mock data.
- Product data is kept separate from presentation components.
- The mock service layer simulates asynchronous data retrieval.
- EMI calculations are performed dynamically based on product pricing and the selected plan.
- The Marketplace is the primary implemented Shop section.
- Top Brands and Nearby Stores are intentionally not fully implemented because the assignment does not require their implementation.
- The existing Shop experience has not been redesigned beyond the Marketplace scope.

## Future Extensions

If a backend or production API were available, the current structure could be extended to support:

- Real product APIs
- Real inventory availability
- Real-time pricing
- User-specific EMI eligibility
- Authentication
- Real order processing
- Payment integration
- Order tracking
- Persistent cart/order history

These are outside the scope of this assignment.

## Submission

**Live Application:**  
https://fi-marketplace.vercel.app/

**Source Code:**  
https://github.com/vaibhavsingh1533/Fi-MarketPlace

---

Built as part of the **1Fi SDE Intern Assignment**.
