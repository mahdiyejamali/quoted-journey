import { affirmations } from "../constants/affirmations"
import { lifeQuotes } from "../constants/lifeQuotes"
import { motivationalQuotes } from '../constants/motivationalQuotes';
import { inspirationalQuotes } from '../constants/inspirationalQuotes';
import { peaceQuotes } from '../constants/peaceQuotes';

export interface QuoteResponse {
  content: string;
  author?: string;
}

const QUOTE_GARDEN_GENRES = [
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

export type QuoteGenre = "life" | "motivational" | "inspirational" | "peace" | "affirmation";

interface QuoteGardenParams {
  author?: string;
  genre?: string;
  query?: string;
  page?: number;
  limit?: number;
}
interface QuoteGardenResponse {
  data: QuoteGardenData[]
}
interface QuoteGardenData {
  quoteText: string;
  quoteAuthor?: string;
  quoteGenre?: string,
}

export const getRandomAffirmation = () => {
  return affirmations[Math.floor(Math.random() * affirmations.length)];
}

export const createQuoteText = (quoteObj: QuoteResponse) => {
  const author = quoteObj?.author ? `\n\n--${quoteObj?.author}` : '';
  return `${quoteObj.content}${author}`;
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const QUOTES_BY_GENRE: {[key: string]: QuoteGardenData[]} = {
  "life": lifeQuotes,
  "motivational": motivationalQuotes,
  "inspirational": inspirationalQuotes,
  "peace": peaceQuotes,
  "affirmation": affirmations,
}

export const getQuotesList = async function (genre: QuoteGenre, limit: number = 50): Promise<string[]> {
  const quotesByGenre = QUOTES_BY_GENRE[genre];
  const randomStartIndex = getRandomInt(0, quotesByGenre.length - limit);

  const quotes = quotesByGenre.slice(randomStartIndex, randomStartIndex + limit)
    .map(item => createQuoteText({content: item?.quoteText, author: item?.quoteAuthor}));

  return quotes;
}
