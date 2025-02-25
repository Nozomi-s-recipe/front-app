import { resetPassword } from './action';

export default function PasswordResetPage() {
  return (
    <>
      <h1>パスワードリセット</h1>
      <form>
        <label htmlFor='email'>Email:</label>
        <input id='email' name='email' type='email' required />
        <button className='bg-blue-200' formAction={resetPassword}>
          メールを送信する
        </button>
      </form>
    </>
  );
}
