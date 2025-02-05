import type { Config } from 'tailwindcss';

export default {
  // 未使用の機能を無効化
  // 最新のfuture設定
  future: {
    hoverOnlyWhenSupported: true, // hover機能のサポート有無に応じた最適化
  },

  // 必要に応じてcore pluginsの設定
  corePlugins: {
    // レイアウト関連
    float: false, // floatはモダンなレイアウトではあまり使用しない
    clear: false, // clearもfloatと同様
    isolation: false, // mix-blend-modeの分離用でほとんど使わない

    // テーブル関連（テーブルを使用しない場合）
    tableLayout: false,
    borderCollapse: false,

    // 特殊なケース用
    backdropBlur: false, // backdrop-filterはあまり使用されない
    backdropBrightness: false,
    backdropContrast: false,
    backdropGrayscale: false,
    backdropHueRotate: false,
    backdropInvert: false,
    backdropOpacity: false,
    backdropSaturate: false,
    backdropSepia: false,

    // 画像処理関連（画像加工をあまりしない場合）
    blur: false,
    brightness: false,
    contrast: false,
    grayscale: false,
    hueRotate: false,
    invert: false,
    saturate: false,
    sepia: false,

    // その他特殊なケース
    boxDecorationBreak: false, // 改行時の装飾
    mixBlendMode: false, // ブレンドモード
    backgroundBlendMode: false,
    objectFit: false, // 画像のフィットを制御しない場合
    objectPosition: false,
    overscrollBehavior: false, // スクロールの挙動制御
    placeSelf: false, // グリッドレイアウトの特殊な配置
    placeItems: false,
    placeContent: false,

    // フォント関連（特殊なフォント制御をしない場合）
    fontVariantNumeric: false,

    // SVG関連（SVGを使用しない場合）
    fill: false,
    stroke: false,
    strokeWidth: false,

    // その他
    resize: false, // テキストエリアのリサイズ
    userSelect: false, // テキスト選択の制御
    appearance: false, // フォーム要素のネイティブスタイル
  },

  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/stories/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'base-white': '#F6F6F5',
        primary: '#1ABACC',
        'secondary-A': '#1ACCCC',
        'secondary-B': '#FFC616',
        accent: '#FF9615',
      },
      fontFamily: {
        // mincho: ['var(--font-shippori-mincho)'],
        // antique: ['var(--font-shippori-antique)'],
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.3s ease-out',
        fadeIn: 'fadeIn 0.3s ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config;
