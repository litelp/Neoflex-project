import { NEWS_API_BASE_URL, NEWS_API_KEY, NUMBER_OF_NEWS } from '@/constants';
import type {
  NewsApiResponse,
  NewsData,
  ValidNewsData,
} from '@/types/newsApiTypes';
import axios from 'axios';
import { clearHtml } from '@/utils/clearHtml';

export async function getValidNews(): Promise<ValidNewsData[]> {
  const allNews = await getAllNews();

  return allNews
    .map((item) => {
      const cleanDescription = item.description
        ? clearHtml(item.description)
        : '';

      return {
        urlToImage: item.urlToImage ?? '',
        title: item.title,
        url: item.url,
        description: cleanDescription,
      };
    })
    .filter((item) => item.urlToImage !== '' && item.description !== '')
    .slice(0, NUMBER_OF_NEWS);
}

async function getAllNews(): Promise<NewsData[]> {
  const response = await axios.get<NewsApiResponse>(
    `${NEWS_API_BASE_URL}/top-headlines?country=us&category=business&apiKey=${NEWS_API_KEY}`
  );

  return response.data.articles;
}
