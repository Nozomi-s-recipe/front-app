import { CookingSwitch } from './CookingSwitch';

export const CookingStart = () => {
  return (
    <section className='flex flex-col space-y-1'>
      <div className='flex items-center justify-between'>
        <h2 className='font-serif font-medium text-xl'>料理開始</h2>
        <CookingSwitch />
      </div>
      <p
        id='cooking-description'
        className='font-serif'
        aria-describedby='cooking-switch'
      >
        手が汚れても画面をタッチする必要ないよう、画面の消灯を停止します。
      </p>
    </section>
  );
};
