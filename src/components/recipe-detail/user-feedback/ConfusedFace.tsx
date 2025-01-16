'use client';
import { useState } from 'react';

type ConfusedFaceProps = {
  width: number;
  height: number;
};

export const ConfusedFace = ({
  width = 512,
  height = 512,
}: ConfusedFaceProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className='cursor-pointer' onClick={handleClick}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 32 32'
        width={width}
        height={height}
      >
        <style>
          {`
            @keyframes bounce-down {
              0% { transform: translateY(0); }
              25% { transform: translateY(1px); }
              75% { transform: translateY(3px); }
              100% { transform: translateY(0); }
            }

            path {
              transition: fill 0.5s ease;
            }

            .active-bounce-down {
              animation: bounce-down 0.5s ease-in-out;
            }
          `}
        </style>
        <desc>
          Confused Face High Contrast Streamline Emoji: https://streamlinehq.com
        </desc>
        <g className={isActive ? 'active-bounce-down' : ''}>
          <path
            fill={isActive ? '#1597A6' : 'currentColor'}
            d='M11 15c1.6569 0 3 -1.3431 3 -3s-1.3431 -3 -3 -3c-1.65685 0 -3 1.3431 -3 3s1.34315 3 3 3Z'
          />
          <path
            fill={isActive ? '#1597A6' : 'currentColor'}
            d='M21 15c1.6569 0 3 -1.3431 3 -3s-1.3431 -3 -3 -3 -3 1.3431 -3 3 1.3431 3 3 3Z'
          />
          <path
            fill={isActive ? '#1597A6' : 'currentColor'}
            d='M12.4643 22.4961c1.5848 -2.495 4.8872 -3.2351 7.3798 -1.652 0.4662 0.2961 1.0841 0.1582 1.3802 -0.308 0.2961 -0.4662 0.1583 -1.0841 -0.3079 -1.3802 -3.4275 -2.1769 -7.965 -1.157 -10.1403 2.268 -0.2961 0.4662 -0.1582 1.0841 0.308 1.3802 0.4662 0.2961 1.0841 0.1582 1.3802 -0.308Z'
          />
          <path
            fill={isActive ? '#1597A6' : 'currentColor'}
            d='M4.76342 5.42276C7.313 2.65419 11.0952 1 15.9989 1c4.9037 0 8.6859 1.65419 11.2354 4.42276 2.5372 2.75509 3.7635 6.51504 3.7635 10.57614 0 4.0611 -1.2263 7.821 -3.7635 10.5761 -2.5495 2.7686 -6.3317 4.4228 -11.2354 4.4228 -4.9037 0 -8.6859 -1.6542 -11.23548 -4.4228C2.22626 23.8199 1 20.06 1 15.9989c0 -4.0611 1.22626 -7.82105 3.76342 -10.57614Zm1.4712 1.35483C4.10595 9.08911 3 12.3286 3 15.9989c0 3.6702 1.10595 6.9098 3.23462 9.2213 2.11626 2.298 5.33348 3.7776 9.76428 3.7776 4.4307 0 7.648 -1.4796 9.7642 -3.7776 2.1287 -2.3115 3.2347 -5.5511 3.2347 -9.2213 0 -3.6703 -1.106 -6.90979 -3.2347 -9.22131C23.6469 4.47956 20.4296 3 15.9989 3c-4.4308 0 -7.64802 1.47956 -9.76428 3.77759Z'
          />
        </g>
      </svg>
    </div>
  );
};
