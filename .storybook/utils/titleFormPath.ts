export function titleFromPath(path: string) {
  // stories/components/recipe-detail/cooking-step-section/CookingStep.stories.tsx
  // から "recipe-detail/cooking-step-section/CookingStep" のような形式に変換

  // 正規表現を修正: storiesディレクトリも確実に除去
  const modifiedPath = path
    .replace(/^.*?(?:stories\/|components\/|pages\/)/, '') // スラッシュも含めて削除
    .replace(/\.stories\.[^/.]+$/, '') // 拡張子を削除
    .replace(/\/index$/, ''); // index.tsの場合は削除

  return modifiedPath;
}
