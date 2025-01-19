import { getRecipeById } from '@/lib/micro-cms/micro-cms';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Recipe Image';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: { recipeId: string };
}) {
  try {
    const recipe = await getRecipeById(params.recipeId);

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
              backgroundImage: `url(${recipe.image.url})?w=${size.width}&h=${size.height}&fm=webp&q=60&fit=crop`,
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
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          >
            {recipe.name}
          </div>
        </div>
      ),
      {
        ...size,
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      }
    );
  } catch (error) {
    console.error('Error generating OGP image:', error);

    // エラー時のフォールバック画像を返す
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'white',
          }}
        >
          <div
            style={{
              color: '#666',
              fontSize: 32,
              textAlign: 'center',
            }}
          >
            Recipe Image Unavailable
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  }
}
