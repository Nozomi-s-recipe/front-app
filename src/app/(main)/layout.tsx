// app/(main)/layout.tsx（通常ページ用）
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='max-w-sm mx-auto py-8 px-4 flex flex-col flex-1'>
      {children}
    </main>
  );
}
