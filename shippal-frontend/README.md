# ShipPal Frontend

The frontend application for ShipPal, built with **Next.js** and **Tailwind CSS**. It provides the interactive interface for users to manage their profiles, swipe on potential matches, negotiate in the Deal Room, and manage export documentation.

## Prerequisites

-   Node.js (v18 or higher recommended)
-   npm or bun

## Installation

1.  Navigate to the frontend directory:
    ```bash
    cd shippal-frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    bun install
    ```

3.  Set up environment variables:
    Create a `.env.local` file in the root of `shippal-frontend` and add the necessary Supabase keys.
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

-   `/app`: Main application routes and pages (App Router).
-   `/components`: Reusable UI components.
-   `/lib`: Utility functions and Supabase client configuration.
-   `/public`: Static assets.

## Scripts

-   `npm run dev`: Runs the development server.
-   `npm run build`: Builds the application for production.
-   `npm run start`: Starts the production server.
-   `npm run lint`: Runs the linter.
