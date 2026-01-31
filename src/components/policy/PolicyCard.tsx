import { Check, X } from 'lucide-react';

type PolicyItem = {
  text: string;
  note?: string;
};

type PolicyCardProps = {
  type: 'good' | 'bad';
  policyNumber: string;
  title: string;
  icon: string;
  items: PolicyItem[];
};

export function PolicyCard({
  type,
  policyNumber,
  title,
  icon,
  items,
}: PolicyCardProps) {
  const isGood = type === 'good';

  const colorClasses = {
    bg: isGood ? 'bg-[#dff2eb]' : 'bg-red-50',
    border: isGood ? 'border-[#b9e5e8]' : 'border-red-200/60',
    iconBg: isGood ? 'bg-[#7ab2d3]' : 'bg-[#dc2626]',
    labelText: isGood ? 'text-[#4a628a]' : 'text-[#dc2626]',
    numberBg: isGood ? 'bg-[#7ab2d3]' : 'bg-[#dc2626]',
  };

  const IconComponent = isGood ? Check : X;

  return (
    <article
      className={`${colorClasses.bg} ${colorClasses.border} border rounded-[20px] p-6 mb-5`}
    >
      {/* Header */}
      <div className='flex items-center gap-3 mb-5'>
        <div
          className={`${colorClasses.iconBg} w-11 h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0`}
        >
          <IconComponent className='w-5 h-5' strokeWidth={3} />
        </div>
        <div className='flex-1'>
          <div
            className={`${colorClasses.labelText} text-[11px] font-semibold uppercase tracking-wider mb-0.5`}
          >
            {policyNumber}
          </div>
          <h2 className='text-[15px] font-semibold text-gray-900 leading-snug'>
            {title}
          </h2>
        </div>
      </div>

      {/* Items List */}
      <ul className='space-y-0'>
        {items.map((item, index) => (
          <li
            key={index}
            className={`flex items-start gap-3 py-3 ${
              index < items.length - 1 ? 'border-b border-black/6' : ''
            }`}
          >
            <span
              className={`${colorClasses.numberBg} w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0`}
            >
              {index + 1}
            </span>
            <div className='flex-1 pt-0.5'>
              <div className='text-sm text-gray-900 leading-relaxed'>
                {item.text}
              </div>
              {item.note && (
                <div className='text-xs text-gray-500 mt-1'>{item.note}</div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
