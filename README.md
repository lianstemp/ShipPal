<div align="center">

# ShipPal

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Strands Agents](https://img.shields.io/badge/AI-Strands_Agents-FF4B4B?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Hackathon-orange?style=for-the-badge)

> **Tinder for Export** — UMKM dengan Kebutuhan Buyer Global.

</div>

## 📋 Executive Summary (Rangkuman Eksekutif)

**ShipPal** adalah platform "Smart Matchmaking" berbasis AI yang menghubungkan UMKM (Eksportir Lokal) dengan Pembeli Internasional (Buyer).

Berbeda dengan marketplace B2B tradisional yang kaku, ShipPal menggunakan pendekatan swiping (seperti Tinder) untuk mencocokkan Spesifikasi Produk, Kapasitas Produksi (Supply), dan Minimum Order Quantity (Demand). Platform ini juga berfungsi sebagai "Asisten AI Penengah" yang memandu proses legalitas, dokumen ekspor, dan logistik, menjadikan pengalaman ekspor semudah berjualan di Shopee.

## 🛑 Problem Statement (Latar Belakang Masalah)

*   **The Capacity Gap (Kesenjangan Kapasitas)**: Buyer seringkali membutuhkan kuantitas kecil-menengah (Micro-lot) yang ditolak oleh pabrik besar. UMKM memiliki produk berkualitas, tapi kapasitas produksinya terbatas. Akibatnya: Banyak peluang transaksi gagal karena "Gak Match" di kuantitas.
*   **Complexity of Compliance (Rumitnya Dokumen)**: UMKM takut ekspor karena tidak paham dokumen (Invoice, Packing List, COO, Sertifikasi). Salah satu dokumen saja bisa menyebabkan barang tertahan di bea cukai.
*   **Trust Issue (Masalah Kepercayaan)**: Buyer ragu transfer ke UMKM yang tidak punya reputasi internasional. UMKM ragu kirim barang takut tidak dibayar.

## 💡 The Solution: ShipPal

Kami membangun ekosistem ekspor end-to-end:

### A. Core Concept: "Tinder for Export"
Algoritma pencocokan cerdas yang memastikan Buyer hanya bertemu Seller yang sanggup memenuhi kriteriaya, dan sebaliknya.
*   Buyer memposting Request (Misal: Butuh 500kg Kopi Gayo).
*   Seller memposting Supply (Misal: Punya stok 600kg Kopi Gayo).
*   **AI Match**: Jika spesifikasi dan kuantitas overlap, terjadi "Match".

### B. Core Concept: "Shopee for Export" (The Middleman)
Setelah Match, ShipPal bertindak sebagai platform penengah yang menyediakan:
*   Rekening Bersama (Escrow).
*   Manajemen Logistik.
*   Pemeriksaan Dokumen Otomatis.

## 🚀 Key Features (Fitur Utama)

### 1. Smart Matching System (Swipe to Export)
*   **UI/UX**: Antarmuka kartu sederhana. Geser Kanan (Interested/Sanggup), Geser Kiri (Skip).
*   **Filter Cerdas**: AI menyaring berdasarkan Jenis Komoditas, Grade/Kualitas, MOQ vs Kapasitas Produksi, dan Negara Tujuan.

### 2. The Deal Room (AI-Guided Chat)
*   Ruang obrolan khusus yang terbuka hanya setelah terjadi "Match".
*   **Real-time Translation**: Chat otomatis diterjemahkan (Indo ↔ Inggris/Mandarin/dll).
*   **AI Negotiation Coach**: Bot yang memberi saran jika harga terlalu rendah atau tinggi.

### 3. AI Compliance Officer (Fitur Andalan) 🤖
Ini adalah "Otak" dari sistem dokumen.
*   **Auto-Checklist**: Begitu deal terjadi, AI membuatkan daftar "PR" dokumen yang harus diupload berdasarkan negara tujuan.
*   **Document Generator**: UMKM cukup input data dasar, AI membuatkan Commercial Invoice dan Packing List standar internasional (PDF).
*   **OCR Validator**: Saat user upload dokumen, AI men-scan dan memvalidasi (Misal: "Warning! Berat di Packing List beda dengan di Invoice").

### 4. Group Buying / Consolidation (Visi Masa Depan)
Jika ada Buyer butuh 1 Ton, tapi Seller A cuma punya 500kg, AI akan mencarikan Seller B (500kg) untuk digabungkan dalam satu pengiriman (LCL consolidation).

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

<div align="center">
  <i>ShipPal: Make Local Go Global.</i>
</div>
