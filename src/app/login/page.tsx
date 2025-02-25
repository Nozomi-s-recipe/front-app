import { login, signup } from './actions';
import { PrebuildLogin } from './Prebuild';
// import OneTapComponent from './GoogleOneTap';
// import GoogleSignIn from './GoogleSignIn';

export default function LoginPage() {
  return (
    <form>
      {/* <OneTapComponent /> */}
      {/* <GoogleSignIn /> */}
      <PrebuildLogin />
      <label htmlFor='email'>Email:</label>
      <input id='email' name='email' type='email' required />
      <label htmlFor='password'>Password:</label>
      <input id='password' name='password' type='password' required />
      <button className='bg-blue-200' formAction={login}>
        Log in
      </button>
      <button className='bg-red-200' formAction={signup}>
        Sign up
      </button>
    </form>
  );
}
