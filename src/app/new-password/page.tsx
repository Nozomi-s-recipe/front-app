import { updatePassword } from './action';

export default function NewPasswordPage() {
  return (
    <>
      <h1>新しいパスワード</h1>
      <form>
        <label htmlFor='password'>Password:</label>
        <input id='password' name='password' type='password' required />
        <button className='bg-blue-200' formAction={updatePassword}>
          パスワードを更新する
        </button>
      </form>
    </>
  );
}
