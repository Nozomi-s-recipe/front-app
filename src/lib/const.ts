import { Menu } from '@/types/types';

export const RECIPE_BLUR =
  'data:image/jpeg;base64,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';

export const SIDE_MENUS: SideMenu[] = [
  {
    mainCategory: {
      id: 'mediterranean',
      name: '地中海食',
    },
    subCategories: [
      {
        id: 'mediterranean-pasta-and-spaghetti',
        name: 'パスタ・スパゲティ',
      },
      {
        id: 'mediterranean-gratin-and-doria',
        name: 'グラタン・ドリア',
      },
      {
        id: 'mediterranean-meat-dishes',
        name: '肉料理',
      },
      {
        id: 'mediterranean-seafood-dishes',
        name: '魚介料理',
      },
      {
        id: 'mediterranean-omelette-and-egg-dishes',
        name: 'オムレツ・エッグ料理',
      },
      {
        id: 'mediterranean-sandwiches-and-bread',
        name: 'サンドイッチ・パン料理',
      },
      {
        id: 'mediterranean-appetizers-and-salads',
        name: '前菜・サラダ',
      },
      {
        id: 'mediterranean-sauces-and-dressings',
        name: 'ソース・ドレッシング',
      },
    ],
  },
  {
    mainCategory: {
      id: 'japanese',
      name: '和食',
    },
    subCategories: [
      {
        id: 'japanese-rice-dishes',
        name: 'ご飯もの',
      },
      {
        id: 'japanese-noodles',
        name: '麺類',
      },
      {
        id: 'japanese-soups',
        name: '汁物',
      },
      {
        id: 'japanese-hot-pots',
        name: '鍋物',
      },
      {
        id: 'japanese-fried-dishes',
        name: '揚げ物',
      },
      {
        id: 'japanese-simmered-dishes',
        name: '煮物',
      },
      {
        id: 'japanese-steamed-dishes',
        name: '蒸し物',
      },
      {
        id: 'japanese-grilled-dishes',
        name: '焼き物',
      },
      {
        id: 'japanese-side-dishes-and-salads',
        name: '和物・サラダ',
      },
      {
        id: 'japanese-pickles-and-fermented-foods',
        name: '漬物・発酵食品',
      },
    ],
  },
  {
    mainCategory: {
      id: 'chinese',
      name: '中華',
    },
    subCategories: [
      {
        id: 'chinese-stir-fry',
        name: '炒め物',
      },
      {
        id: 'chinese-fried-dishes',
        name: '揚げ物',
      },
      {
        id: 'chinese-braised-dishes',
        name: '煮込み料理',
      },
      {
        id: 'chinese-noodles',
        name: '麺類',
      },
      {
        id: 'chinese-rice-dishes',
        name: 'ご飯もの',
      },
      {
        id: 'chinese-dim-sum-and-dumplings',
        name: '点心・餃子',
      },
      {
        id: 'chinese-soups',
        name: 'スープ・湯',
      },
      {
        id: 'chinese-steamed-dishes',
        name: '蒸し物',
      },
      {
        id: 'chinese-appetizers-and-salads',
        name: '前菜・サラダ',
      },
      {
        id: 'chinese-seasonings-and-sauces',
        name: '調味料・タレ',
      },
    ],
  },
  {
    mainCategory: {
      id: 'sweets',
      name: 'スイーツ',
    },
    subCategories: [
      {
        id: 'sweets-cakes',
        name: 'ケーキ',
      },
      {
        id: 'sweets-cookies-and-biscuits',
        name: 'クッキー・ビスケット',
      },
      {
        id: 'sweets-bread-and-muffins',
        name: 'パン・マフィン',
      },
      {
        id: 'sweets-puddings-and-jellies',
        name: 'プリン・ゼリー',
      },
      {
        id: 'sweets-ice-cream-and-sherbet',
        name: 'アイスクリーム・シャーベット',
      },
      {
        id: 'sweets-japanese-confections',
        name: '和菓子',
      },
    ],
  },
];
type SideMenu = {
  mainCategory: Menu;
  subCategories: Menu[];
};

export const getMainCategoryByMainId = (
  mainCategoryId: string
): Menu | undefined => {
  return SIDE_MENUS.find((menu) => menu.mainCategory.id === mainCategoryId)
    ?.mainCategory;
};

export const getSubCategoryById = (subCategoryId: string): Menu | undefined => {
  return SIDE_MENUS.flatMap((menu) => menu.subCategories).find(
    (subCategory) => subCategory.id === subCategoryId
  );
};
