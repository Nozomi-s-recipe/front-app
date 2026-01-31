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

// ビタミンの型定義
export type Vitamin = {
  fieldId: 'vitamins';
  vitaminA?: number;
  vitaminB1?: number;
  vitaminB2?: number;
  vitaminB3?: number;
  vitaminB5?: number;
  vitaminB6?: number;
  vitaminB9?: number;
  vitaminB12?: number;
  vitaminC?: number;
  vitaminD?: number;
  vitaminE?: number;
  vitaminK?: number;
};

// 栄養成分の型定義
export type Nutrient = {
  fieldId: 'nutrient';
  calories?: number;
  proteins?: number;
  fats?: number;
  carbohydrates?: number;
  dietaryFiber?: number;
  salt?: number;
  vitamins?: Vitamin[];
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
  isPopular: boolean;
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
