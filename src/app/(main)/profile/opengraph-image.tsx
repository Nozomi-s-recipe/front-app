// app/policy/opengraph-image.tsx
import { generateOgpImage } from '@/components/open-graph/OgpImageGenerator';

export const runtime = 'edge';
export const alt = 'Policy Image';
export const contentType = 'image/png';

export default async function Image() {
  return generateOgpImage({
    title: '運営者プロフィール',
  });
}
