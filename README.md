
<div align="center">
  <img src="shippal-frontend/public/hackathon.png" height="150" alt="ShipPal Logo" />

  # ShipPal
  ![Next.js](https://img.shields.io/badge/Next.js-black?style=flat&logo=next.js&logoColor=white)
  [![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
  [![Bun](https://img.shields.io/badge/Bun-000000?style=flat&logo=bun&logoColor=white)](https://bun.sh)
  [![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)](https://supabase.com)
  [![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)
  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)


  ### Make Local Go Global.

  Used by forward-thinking SMEs and international buyers to streamline global trade.

</div>

ShipPal is a "Smart Matchmaking" platform connecting local exporters with international buyers. Think of it as **Tinder for B2B Trade** coupled with an AI-powered logistics & legal assistant.

Unlike traditional B2B marketplaces that are static and complex, ShipPal simplifies the export process into a familiar flow: **Post → Swipe → Negotiate → Ship & Pay**.

## Key Features

### 1. The Matchmaking Engine
Traditional directories are cluttered. ShipPal uses a swiping interface (Right for Interest, Left for Pass) to match Buyers and Sellers based on:
- **Product Specifications** (Grade, Origin, Certification)
- **Logistics Compatibility** (MOQ vs. Production Capacity)
- **Destination** (Port-to-Port matching)

### 2. Deal Room & @pal
Once matched, parties enter the **Deal Room**. This isn't just a chat; it's an intelligent workspace:
- **Real-time Translation**: Communicate seamlessly across languages (e.g., Seller speaks Indonesian, Buyer sees English).
- **@pal Assistant**: Mention `@pal` to get instant estimates on shipping costs, HS Code recommendations, or regulatory checks.

### 3. AI Compliance Agentry
The biggest barrier to export is paperwork. ShipPal's AI removes this friction:
- **Auto-Generates Documents**: Automatically creates Commercial Invoices, Packing Lists, and COOs compliant with destination country regulations.
- **Regulatory Guardian**: Alerts users to specific import restrictions or required certifications before the deal is sealed.

## Technology Stack

- **Backend**: Python, FastAPI, Docker, Strands Agents (AI Logic)
- **Frontend**: Next.js (React), Tailwind CSS, Bun
- **Database**: Supabase (PostgreSQL)

## Quickstart

### Frontend 

```bash
cd shippal-frontend
bun install
bun dev
```

### Backend 

```bash
cd shippal-backend
poetry install
poetry run poe dev
```

### Docker

```bash
cd shippal-backend
docker build -t shippal-backend .
docker run -p 8000:8000 shippal-backend
```

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

<br />

<div align="center">
  <i>ShipPal: Make Local Go Global.</i>
</div>
