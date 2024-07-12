import sharedStyles from '../styles/shared-signin-signup.module.css'
import { useNavigate } from "react-router-dom";


const SignUp = (): JSX.Element => {
  const navigate = useNavigate() 

    return (
      <>
    <main className={sharedStyles['sign-up-page']}>
      <h1 className="visually-hidden">Travel App</h1>
      <form className={sharedStyles['sign-up-form']} autoComplete="off">
        <h2 className={sharedStyles['sign-up-form__title']}>Sign Up</h2>
        <label className="input">
          <span className="input__heading">Full name</span>
          <input
            data-test-id="auth-full-name"
            name="full-name"
            type="text"
            required
          />
        </label>
        <label className="input">
          <span className="input__heading">Email</span>
          <input data-test-id="auth-email" name="email" type="email" required />
        </label>
        <label className="input">
          <span className="input__heading">Password</span>
          <input
            data-test-id="auth-password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
          />
        </label>
        <button data-test-id="auth-submit" className="button" type="submit">
          Sign Up
        </button>
      </form>
      <span>
        Already have an account?
        <a
          data-test-id="auth-sign-in-link"
          onClick={()=>{navigate('/sign-in')}}
          className={`${sharedStyles['sign-up-form__link']} clickeable-pointer`}
                    >Sign In
                    </a>
      </span>
    </main>
        </>
    )
}

export default SignUp