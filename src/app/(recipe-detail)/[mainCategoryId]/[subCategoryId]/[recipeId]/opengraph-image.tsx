import { getRecipeById } from '@/lib/micro-cms/micro-cms';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Recipe Image';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// paramsからrecipeIdを受け取るように修正
export default async function Image({
  params,
}: {
  params: { recipeId: string };
}) {
  const recipe = await getRecipeById(params.recipeId);

  // 外部画像を取得
  const imageData = await fetch(recipe.image.url).then((res) =>
    res.arrayBuffer()
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
        }}
      >
        {/* 画像を背景として使用 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(data:image/jpeg;base64,${Buffer.from(
              imageData
            ).toString('base64')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* オーバーレイ（画像を暗くする） */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }}
        />

        {/* レシピタイトル */}
        <div
          style={{
            position: 'relative',
            color: 'white',
            fontSize: 60,
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '0 40px',
          }}
        >
          {recipe.name}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
