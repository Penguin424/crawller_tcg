# Crawller TCG

API REST construida con **NestJS** y **Playwright** que hace scraping de cartas del juego de cartas coleccionables **Flesh and Blood TCG** desde [TCGPlayer.com](https://www.tcgplayer.com).

## Que hace

Expone endpoints HTTP que lanzan un navegador Chromium headless, navegan a TCGPlayer, extraen la informacion de cada carta (nombre, imagen, precio de mercado, rareza, expansion, ID de carta y URL de compra) y devuelven un JSON estructurado.

## Endpoints

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| `GET` | `/scraper/flesh-and-blood` | Lista cartas de Flesh and Blood con paginacion |
| `GET` | `/scraper/flesh-and-blood/search` | Busca cartas por nombre |

### Parametros de query

**`/scraper/flesh-and-blood`**
- `page` (opcional, default `1`) — numero de pagina

**`/scraper/flesh-and-blood/search`**
- `name` (requerido) — nombre de la carta a buscar
- `page` (opcional, default `1`) — numero de pagina

### Ejemplo de respuesta

```json
{
  "total": 24,
  "page": 1,
  "cards": [
    {
      "name": "Aether Wildfire (Red)",
      "image": "https://product-images.tcgplayer.com/...",
      "price": "$0.25",
      "rarity": "Common",
      "cardId": "ROS231",
      "expansion": "Rosetta",
      "source": "tcgplayer",
      "url": "https://www.tcgplayer.com/product/..."
    }
  ]
}
```

## Stack tecnologico

- **NestJS** — framework de Node.js para la API
- **Playwright** — automatizacion de Chromium para el scraping
- **TypeScript** — tipado estatico
- **pnpm** — gestor de paquetes

## Instalacion y uso

### Requisitos

- Node.js 20+
- pnpm

### Instalar dependencias

```bash
pnpm install
```

El postinstall descarga automaticamente Chromium via Playwright.

### Modo desarrollo

```bash
pnpm start:dev
```

### Modo produccion

```bash
pnpm build
pnpm start
```

La API queda disponible en `http://localhost:3000` (o el puerto definido en la variable de entorno `PORT`).

## Variables de entorno

| Variable | Default | Descripcion |
|----------|---------|-------------|
| `PORT` | `3000` | Puerto en el que escucha la API |

## Estructura del proyecto

```
src/
├── main.ts                        # Bootstrap de la aplicacion
├── app.module.ts                  # Modulo raiz
└── scraper/
    ├── scraper.module.ts          # Modulo del scraper
    ├── scraper.controller.ts      # Endpoints HTTP
    ├── scraper.service.ts         # Logica de scraping con Playwright
    └── interfaces/
        └── card.interface.ts      # Tipos Card y ScrapeResult
```
