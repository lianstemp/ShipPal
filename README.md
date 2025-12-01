# ShipPal 🚢

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Strands Agents](https://img.shields.io/badge/AI-Strands_Agents-FF4B4B?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Hackathon-orange?style=for-the-badge)

> **Tinder for Export** — Connecting Indonesian MSMEs with Global Buyers.

## 📋 Executive Summary

**ShipPal** is a "Smart Matchmaking" platform powered by AI that connects local MSMEs (Exporters) with International Buyers. Unlike traditional B2B marketplaces, ShipPal utilizes a **swiping mechanism** to match Product Specifications, Production Capacity (Supply), and Minimum Order Quantities (Demand). It acts as an **AI Intermediary**, guiding users through legality, export documentation, and logistics, making the export process as simple as local e-commerce.

## 🛑 Problem Statement

*   **The Capacity Gap**: Buyers often need micro-lots that big factories reject, while MSMEs have limited capacity.
*   **Complexity of Compliance**: MSMEs fear export due to complex documentation (Invoice, Packing List, COO).
*   **Trust Issues**: International buyers hesitate to transfer funds to unknown MSMEs; MSMEs fear non-payment.

## 💡 The Solution

We are building an end-to-end export ecosystem:

### A. Tinder for Export (Core Matchmaking)
*   Smart algorithm matches **Buyer Requests** (e.g., "Need 500kg Gayo Coffee") with **Seller Supply**.
*   **AI Match**: A "Match" only occurs if specifications and quantities overlap.

### B. Shopee for Export (The Middleman)
*   **Escrow Service** (Rekening Bersama).
*   **Logistics Management**.
*   **Automated Document Verification**.

## 🚀 Key Features

### 1. Smart Matching System (Swipe to Export)
*   **Swipe Interface**: Right for Interested, Left to Skip.
*   **AI Filters**: Matches based on Commodity, Grade, MOQ vs Capacity, and Destination Country regulations.

### 2. The Deal Room (AI-Guided Chat)
*   **Exclusive Access**: Chat opens only after a Match.
*   **Real-time Translation**: Seamless communication (Indonesian ↔ English/Mandarin/etc.).
*   **AI Negotiation Coach**: Bot providing guidance on pricing and terms.

### 3. AI Compliance Officer 🤖
*   **Auto-Checklist**: Generates required document list based on destination country.
*   **Document Generator**: Auto-creates Commercial Invoices and Packing Lists from basic data.
*   **OCR Validator**: Scans and validates uploaded documents (e.g., warning if weights in Invoice vs Packing List mismatch).

### 4. Group Buying / Consolidation (Future Vision)
*   Aggregating multiple sellers to fulfill large buyer requests (LCL consolidation).

## 🛠️ Tech Stack

*   **Frontend**: Next.js (React), Tailwind CSS
*   **Backend**: Python, Strands Agents (AI Logic)
*   **Database & Auth**: Supabase (PostgreSQL)

## 📂 Project Structure

```bash
shippal/
├── shippal-backend/     # Python Backend & AI Logic
│   ├── supabase/        # Database Migrations & Config
│   ├── poetry.lock
│   └── pyproject.toml
└── shippal-frontend/    # Next.js Frontend Application
    ├── app/
    ├── lib/
    ├── public/
    ├── jsconfig.json
    └── next.config.mjs
```

## ⚡ Getting Started

### Prerequisites
*   Node.js & npm/bun
*   Python 3.10+ & Poetry
*   Supabase CLI

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/lianstemp/shippal.git
    cd shippal
    ```

2.  **Frontend Setup**
    ```bash
    cd shippal-frontend
    npm install
    npm run dev
    ```

3.  **Backend Setup**
    ```bash
    cd ../shippal-backend
    poetry install
    # Run the agent/backend service
    ```

---

*ShipPal: Make Local Go Global.*
