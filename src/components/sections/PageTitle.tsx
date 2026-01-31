interface PageTitleProps {
  children: React.ReactNode;
}

export const PageTitle = ({ children }: PageTitleProps) => {
  return (
    <h1 className='w-full max-w-7xl mx-auto px-4 md:px-6 mb-8 font-crimson text-[2rem] font-semibold text-text-primary tracking-[-0.02em]'>
      {children}
    </h1>
  );
};
