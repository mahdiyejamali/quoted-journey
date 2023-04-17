import { processFetchRequest } from '../utils';
import { affirmations } from "../constants/affirmations"

export interface QuoteResponse {
  content: string;
  author?: string;
}

export const QUOTE_GARDEN_GENRES = [
  // "art",
  // "attitude",
  "beauty",
  "change", 
  "courage",
  "dreams",
  // "experience",
  // "failure",
  // "faith",
  // "fear",
  // "forgiveness",
  // "freedom",
  "friendship",
  "happiness",
  "hope",
  "imagination",
  "inspirational",
  "life",
  "motivational",
  "nature",
  "peace",
  "positive",
  // "smile",
  // "travel"
] as const;

export type QuoteGardenGenre = typeof QUOTE_GARDEN_GENRES[number];

interface QuoteGardenParams {
  author?: string;
  genre?: string;
  query?: string;
  page?: number;
  limit?: number;
}
interface QuoteGardenResponse {
  data: {
    quoteText: string;
    quoteAuthor?: string;
    quoteGenre?: string,
  }[]
}

export const getRandomQuote = async function (genre: QuoteGardenGenre = "life"): Promise<QuoteResponse> {
  const url = `https://quote-garden.onrender.com/api/v3/quotes/random?genre=${genre}`;
  const response: QuoteGardenResponse = await processFetchRequest(url);
  if (!response) {
    const randomStaticQuote = affirmations[Math.floor(Math.random()*affirmations.length)];
    return {content: randomStaticQuote}
  }

  const { data } = response;
  return {content: data?.[0]?.quoteText, author: data?.[0]?.quoteAuthor};
}
