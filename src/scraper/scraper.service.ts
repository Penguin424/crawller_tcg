import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { chromium, Browser, BrowserContext } from 'playwright';
import { Card, ScrapeResult } from './interfaces/card.interface';

interface RawCard {
  fullText: string;
  image: string;
  rawPrice: string;
  rarity: string;
  url: string;
}

@Injectable()
export class ScraperService {
  private readonly logger = new Logger(ScraperService.name);
  private browser: Browser | null = null;

  private async getBrowser(): Promise<Browser> {
    if (!this.browser || !this.browser.isConnected()) {
      this.logger.log('Launching Chromium...');
      this.browser = await chromium.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--no-first-run',
          '--no-zygote',
        ],
      });
    }
    return this.browser;
  }

  private cleanCards(rawCards: RawCard[], source: string): Card[] {
    return rawCards.map((raw) => {
      let name = raw.fullText;
      let expansion = '';

      if (raw.rarity && raw.rarity !== 'N/A') {
        const idx = name.indexOf(raw.rarity);
        if (idx !== -1) {
          expansion = name.substring(0, idx).trim();
          name = name.substring(idx + raw.rarity.length).trim();
        }
      }

      name = name
        .replace(/\s*\d+\s+listing[s]?\s+from\s+\$[\d.]+.*/i, '')
        .replace(/\s*Out of Stock.*/i, '')
        .replace(/\s*Market Price.*/i, '')
        .trim();

      const price = raw.rawPrice.replace(/Market Price:/i, '').trim() || 'N/A';

      // "Common, #ROS231" → cardId = "ROS231", rarity = "Common"
      const cardId = raw.rarity.includes('#')
        ? (raw.rarity.split('#')[1]?.trim() ?? '')
        : '';
      const rarity = raw.rarity.split(',')[0].trim();

      return { name, image: raw.image, price, rarity, cardId, expansion, source, url: raw.url };
    });
  }

  private async scrapeUrl(url: string, page: number): Promise<ScrapeResult> {
    const browser = await this.getBrowser();
    const context: BrowserContext = await browser.newContext({
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      viewport: { width: 1280, height: 900 },
      locale: 'en-US',
    });

    const tab = await context.newPage();

    try {
      this.logger.log(`Navigating to: ${url}`);
      await tab.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

      await tab
        .waitForSelector('.search-result', { timeout: 30000 })
        .catch(() => this.logger.warn('search-result selector timed out'));

      await tab.evaluate(async () => {
        await new Promise<void>((resolve) => {
          let totalScrolled = 0;
          const step = 300;
          const timer = setInterval(() => {
            window.scrollBy(0, step);
            totalScrolled += step;
            if (totalScrolled >= document.body.scrollHeight) {
              clearInterval(timer);
              resolve();
            }
          }, 100);
        });
      });

      await tab.waitForTimeout(1500);

      const rawCards = await tab.evaluate((): RawCard[] => {
        const results: RawCard[] = [];
        const cardEls = document.querySelectorAll('.search-result');

        cardEls.forEach((el) => {
          const linkEl =
            el.querySelector('.search-result__content a') ??
            el.querySelector('.search-result__title a');

          const imageEl = el.querySelector('img');
          const imgSrc =
            imageEl?.getAttribute('data-src') ??
            imageEl?.getAttribute('src') ??
            '';

          const priceEl =
            el.querySelector('.search-result__market-price--value') ??
            el.querySelector('[class*="market-price"]');

          const rarityEl = el.querySelector('[class*="rarity"]');

          const fullText = linkEl?.textContent?.trim() ?? '';
          const image = imgSrc.startsWith('data:') ? '' : imgSrc;
          const rawPrice = priceEl?.textContent?.trim() ?? 'N/A';
          const rarity = rarityEl?.textContent?.trim() ?? 'N/A';
          const url = linkEl?.getAttribute('href')
            ? 'https://www.tcgplayer.com' + linkEl.getAttribute('href')
            : '';

          if (fullText) results.push({ fullText, image, rawPrice, rarity, url });
        });

        return results;
      });

      const source = new URL(url).hostname.replace(/^www\./, '').split('.')[0];
      const cards = this.cleanCards(rawCards, source);
      this.logger.log(`Extracted ${cards.length} cards`);

      return { total: cards.length, page, cards };
    } finally {
      await tab.close();
      await context.close();
    }
  }

  async scrapeFleshAndBlood(page = 1): Promise<ScrapeResult> {
    const url = `https://www.tcgplayer.com/search/flesh-and-blood-tcg/product?productLineName=flesh-and-blood-tcg&page=${page}&view=grid`;
    return this.scrapeUrl(url, page);
  }

  async searchCardByName(cardName: string, page = 1): Promise<ScrapeResult> {
    const encoded = encodeURIComponent(cardName);
    const url = `https://www.tcgplayer.com/search/flesh-and-blood-tcg/product?productLineName=flesh-and-blood-tcg&q=${encoded}&page=${page}&view=grid`;
    const result = await this.scrapeUrl(url, page);

    if (result.total === 0) {
      throw new NotFoundException(`No cards found for: "${cardName}"`);
    }

    return result;
  }

  async onModuleDestroy() {
    if (this.browser) await this.browser.close();
  }
}
