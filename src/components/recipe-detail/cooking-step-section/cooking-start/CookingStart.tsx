import { CookingSwitch } from './CookingSwitch';

export const CookingStart = () => {
  return (
    <section className='flex flex-col space-y-1'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-medium'>料理開始</h2>
        <CookingSwitch />
      </div>
      <p
        id='cooking-description'
        className='text-sm'
        aria-describedby='cooking-switch'
      >
        手が汚れても画面をタッチする必要ないよう、画面の消灯を停止します。
      </p>
    </section>
  );
};
