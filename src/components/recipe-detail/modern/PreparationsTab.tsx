import Image from 'next/image';

type CookingStep = {
  name: string;
  description: string;
  image: {
    url: string;
    width?: number;
    height?: number;
  };
  tips?: string;
};

type PreparationsTabProps = {
  cookingSteps: CookingStep[];
};

export const PreparationsTab = ({ cookingSteps }: PreparationsTabProps) => {
  return (
    <div className='flex flex-col gap-7'>
      {cookingSteps.map((step, index) => (
        <article key={index} className='flex gap-4'>
          <div className='w-7 h-7 bg-[#4a628a] text-white rounded-full flex items-center justify-center text-[13px] font-semibold flex-shrink-0'>
            {index + 1}
          </div>
          <div className='flex-1 pt-0.5'>
            {step.image && (
              <div className='w-full aspect-[16/10] rounded-[20px] overflow-hidden mb-3 bg-[#f5f7f6]'>
                <Image
                  src={`${step.image.url}?w=600&h=375&q=80&fit=crop&fm=webp`}
                  alt={step.name}
                  width={600}
                  height={375}
                  className='w-full h-full object-cover'
                />
              </div>
            )}
            <p className='text-[15px] text-[#5a6e68] leading-relaxed'>
              {step.description}
            </p>
            {step.tips && (
              <div className="mt-3 py-3.5 px-4 bg-[#f0f7f4] rounded-xl text-[13px] text-[#5b7e6f] leading-relaxed before:content-['💡_']">
                {step.tips}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
};
