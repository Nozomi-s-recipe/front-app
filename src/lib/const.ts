import { Menu } from '@/types/types';

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
