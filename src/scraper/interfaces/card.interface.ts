export interface Card {
  name: string;
  image: string;
  price: string;
  rarity: string;
  cardId: string;
  expansion: string;
  source: string;
  url: string;
}

export interface ScrapeResult {
  total: number;
  page: number;
  cards: Card[];
}
