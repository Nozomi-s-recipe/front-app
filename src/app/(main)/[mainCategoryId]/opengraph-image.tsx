import { getMainCategoryByMainId } from '@/lib/const';
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
  params: { mainCategoryId: string };
}) {
  try {
    const menu = getMainCategoryByMainId(params.mainCategoryId)!;

    const imageUrl =
      'https://images.microcms-assets.io/assets/888d632d12c2409a941139ea8e9d5adc/7cb8d9e456b44391b07aa662dca5f499/opengraph-image.jpg';
    const optimizedImageUrl = `${imageUrl}?w=${size.width}&h=${size.height}&fm=jpeg&q=80&fit=crop`;

    // Google Fontsから直接フォントを取得
    const shipporiMincho = await fetch(
      'https://cdn.jsdelivr.net/npm/@fontsource/shippori-mincho/files/shippori-mincho-japanese-700-normal.woff'
    ).then((res) => res.arrayBuffer());

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
          {/* 画像をimg要素として表示 */}
          <img
            src={optimizedImageUrl}
            alt={menu.name}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {/* オーバーレイ */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              zIndex: 1,
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
              zIndex: 2,
              maxWidth: '90%',
              wordBreak: 'break-word',
            }}
          >
            {`${menu.name}のレシピリスト`}
          </div>
        </div>
      ),
      {
        ...size,
        fonts: [
          {
            name: 'Shippori Mincho',
            data: await shipporiMincho,
            style: 'normal',
            weight: 700,
          },
        ],
      }
    );
  } catch (error) {
    console.error('Error generating OGP image:', error);

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
