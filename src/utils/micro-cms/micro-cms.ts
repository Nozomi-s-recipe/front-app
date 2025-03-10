import type { MicroCMSQueries } from 'microcms-js-sdk';
import { createClient } from 'microcms-js-sdk';
import 'server-only';
import type { Recipe, Tag } from './types';

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

// API取得用のクライアントを作成
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export const getTags = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Tag>({
    customRequestInit: {
      cache: 'force-cache',
    },
    endpoint: 'tags',
    queries,
  });
  return listData;
};

export const getRecipes = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Recipe>({
    customRequestInit: {
      cache: 'force-cache',
    },
    endpoint: 'recipes',
    queries,
  });
  return listData;
};

export const preloadGetRecipeById = (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  void getRecipeById(contentId, queries);
};

export const getRecipeById = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<Recipe>({
    endpoint: 'recipes',
    contentId,
    queries,
  });
  return detailData;
};
