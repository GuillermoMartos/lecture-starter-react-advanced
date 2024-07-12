import sharedStyles from '../styles/shared-signin-signup.module.css'
import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";

type Props = {
  setIsUserLogged: (value: boolean) => void;
}

const SignIn = ({ setIsUserLogged }: Props): JSX.Element => {
  const [signInForm, setSignInForm] = useState<{ email: string; password: string }>({ email: '', password: '' })
  const [errors, setErrors] = useState<{ email: string | null; password: string | null }>({ email: null, password: null });
  const navigate=useNavigate()

  function validateEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function handleValidations(name: string, value:string) {
    if (name === 'email') {
      if (!validateEmail(value)) {
        setErrors({
          ...errors,
          email: 'Please enter a valid email address.'
        });
      } else {
        setErrors({
          ...errors,
          email: null
        });
      }
    }

    if (name === 'password') {
      if (value.length < 3 || value.length > 20) {
        setErrors({
          ...errors,
          password: 'Password must be between 3 and 20 characters long.'
        });
      } else {
        setErrors({
          ...errors,
          password: null
        });
      }
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setSignInForm({
      ...signInForm,
      [name]: value
    });
    handleValidations(name, value)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (errors.email || errors.password) {
        return
    }
    
    setIsUserLogged(true)
    navigate('/')
  }

  return (
    <>
      <main className={sharedStyles['sign-in-page']}>
        <h1 className="visually-hidden">Travel App</h1>
        <form className={sharedStyles['sign-in-form']} autoComplete="off" onSubmit={handleSubmit}>  
          <label className="input">
            <span className="input__heading">Email</span>
            <input data-test-id="auth-email" name="email" type="email" value={signInForm.email} onChange={handleChange} required />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>
          <label className="input">
            <span className="input__heading">Password</span>
            <input
              data-test-id="auth-password"
              name="password"
              type="password"
              value={signInForm.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </label>
          <button data-test-id="auth-submit" className="button" type="submit">
            Sign In
          </button>
        </form>
        <span>
          Don't have an account?
          <a
            data-test-id="auth-sign-up-link"
            onClick={()=>{navigate('/sign-up')}}
            className={`${sharedStyles['sign-in-form__link']} clickeable-pointer`}
          >
            Sign Up
          </a>
        </span>
      </main>
    </>
  )
}

export default SignIn