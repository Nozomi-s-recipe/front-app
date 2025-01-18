// app/head.tsx
export default function Head() {
  return (
    <>
      <link
        rel='preload'
        href='/hero-banner.webp'
        as='image'
        type='image/webp'
        fetchPriority='high'
      />
    </>
  );
}
