import { processFetchRequest } from '../utils';
import { affirmations } from "../constants/affirmations"
import { lifeQuotes } from "../constants/lifeQuotes"

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

export const getRandomAffirmation = () => {
  return affirmations[Math.floor(Math.random() * affirmations.length)];
}

export const getRandomQuote = async function (genre: QuoteGardenGenre = "life"): Promise<QuoteResponse> {
  const url = `https://quote-garden.onrender.com/api/v3/quotes/random?genre=${genre}`;
  const response: QuoteGardenResponse = await processFetchRequest(url);
  if (!response) {
    const randomAffirmation = getRandomAffirmation();
    return {content: randomAffirmation}
  }

  const { data } = response;
  return {content: data?.[0]?.quoteText, author: data?.[0]?.quoteAuthor};
}

export const createQuoteText = (quoteObj: QuoteResponse) => {
  const author = quoteObj?.author ? `\n\n--${quoteObj?.author}` : '';
  return `${quoteObj.content}${author}`;
}

export const getAffirmations = (): string[] => {
  return affirmations.map(item => createQuoteText({content: item}));
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export const getQuotesList = async function (genre: QuoteGardenGenre = "life", limit: number = 10): Promise<string[]> {
  // const url = `https://quote-garden.onrender.com/api/v3/quotes?genre=${genre}&limit=${limit}`;
  // const response: QuoteGardenResponse = await processFetchRequest(url);
  // if (!response) {
  //   return getAffirmations()
  // }

  const randomStartIndex = getRandomInt(0, lifeQuotes.length - limit);
  const quotes = lifeQuotes.slice(randomStartIndex, randomStartIndex + limit).map(item => createQuoteText({content: item?.quoteText, author: item?.quoteAuthor}));
  return quotes;
}
