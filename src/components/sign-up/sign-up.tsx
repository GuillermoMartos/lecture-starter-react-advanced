import { FormEvent } from 'react';
import FORM_VALIDATORS from '../../common/validations';
import useForm from '../hooks/hooks';
import sharedStyles from '../styles/shared-signin-signup.module.css';
import { useNavigate } from 'react-router-dom';

type Props = {
  setIsUserLogged: (value: boolean) => void;
}

const SignUp = ({ setIsUserLogged }:Props): JSX.Element => {
  const navigate = useNavigate();
  const initialFields = {
    email: '',
    password: '',
    fullName: ''
  };

  const validations = {
    email: FORM_VALIDATORS.email,
    password: FORM_VALIDATORS.password,
    fullName: FORM_VALIDATORS.fullName
  };

  const { formData, errors, handleChange } =
    useForm(initialFields, validations);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (errors.email || errors.password || errors.fullName) {
      return;
    }
    
    setIsUserLogged(true);
    navigate('/');
  }

  return (
    <>
      <main className={sharedStyles['sign-up-page']}>
        <h1 className="visually-hidden">Travel App</h1>
        <form className={sharedStyles['sign-up-form']} autoComplete="off" onSubmit={handleSubmit}>
          <h2 className={sharedStyles['sign-up-form__title']}>Sign Up</h2>
          <label className="input">
            <span className="input__heading">Full name</span>
            <input
              data-test-id="auth-full-name"
              name="fullName"
              type="text"
              onChange={handleChange}
              value={formData.fullName}
              required
            />
            {errors.fullName && <span className="error">{errors.fullName}</span>}
          </label>
          <label className="input">
            <span className="input__heading">Email</span>
            <input data-test-id="auth-email" autoComplete='off' name="email" type="email" value={formData.email} onChange={handleChange} required />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>
          <label className="input">
            <span className="input__heading">Password</span>
            <input
              data-test-id="auth-password"
              name="password"
              type="password"
              autoComplete='off'
              onChange={handleChange}
              value={formData.password}
              required
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </label>
          <button data-test-id="auth-submit" className="button" type="submit">
            Sign Up
          </button>
        </form>
        <span>
          Already have an account?
          <a
            data-test-id="auth-sign-in-link"
            onClick={() => { navigate('/sign-in'); }}
            className={`${sharedStyles['sign-up-form__link']} clickeable-pointer`}
          >Sign In
          </a>
        </span>
      </main>
    </>
  );
};

export default SignUp;