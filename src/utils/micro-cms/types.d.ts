// types.ts
import type { MicroCMSDate, MicroCMSImage } from 'microcms-js-sdk';

// 単位の型定義
export type Unit = {
  fieldId: 'unit';
  name: string[];
  position: ('prefix' | 'suffix')[];
};

// 材料の型定義
export type Ingredient = {
  fieldId: 'ingredient';
  name: string;
  quantity: number;
  unit: Unit[];
};

// 栄養成分の型定義
export type Nutrient = {
  fieldId: 'nutrient';
  calories: number;
  protein: number;
};

// 調理手順の型定義
export type CookingStep = {
  fieldId: 'cookingStep';
  name: string;
  description: string;
  image: MicroCMSImage;
  tips: string;
};

// タグの型定義
export type Tag = {
  id: MicroCMSContentId;
  name: string;
  type: string;
} & MicroCMSDate;

// メインの料理データの型定義
export type Recipe = {
  id: string;
  name: string;
  description: string;
  image: MicroCMSImage;
  mainCategory: string[];
  subCategory: string[];
  cookingTime: number;
  nutrient: Nutrient;
  tags: Tag[];
  note?: string;
  ingredients: Ingredient[];
  seasonings: Ingredient[];
  cookingSteps: CookingStep[];
} & MicroCMSDate;
