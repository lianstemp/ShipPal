# ShipPal Frontend

The client-side application for ShipPal, focusing on a high-performance, mobile-responsive experience for global trade.

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Runtime**: Bun (Preferred) / Node.js
- **State Management**: React Hooks + Supabase Realtime

## Key Modules

- **Swipe Interface**: Optimized card-stack interactions for discovering potential trade partners.
- **The Deal Room**: A unified negotiation interface combining chat, document sharing, and live prompts from the AI assistant.
- **Smart Forms**: Dynamic input forms for complex trade data (HS Codes, Incoterms) that adapt based on user input.

## Getting Started

### Prerequisites

- Bun 1.0+ (Recommended) or Node.js 18+

### Installation & Run

1.  **Install Dependencies**
    ```bash
    bun install
    ```

2.  **Environment Setup**
    Create `.env.local`:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

3.  **Start Development Server**
    ```bash
    bun dev
    ```
    Application will be live at `http://localhost:3000`.

## Scripts

| Command | Description |
| :--- | :--- |
| `bun dev` | Start local dev server |
| `bun run build` | Compile for production |
| `bun run lint` | Check for code issues |
