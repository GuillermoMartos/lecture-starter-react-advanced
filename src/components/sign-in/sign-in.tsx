import sharedStyles from '../styles/shared-signin-signup.module.css';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import FORM_VALIDATORS from '../../common/validations';
import useForm from '../hooks/hooks';
import { allUserActions } from '../../store/users/users';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { DataStatus } from '../../common/enums';
import Loader from '../loader/loader';


const SignIn = (): JSX.Element => {
  const userStatus= useAppSelector(state=> state.users.status);
  const dispatch=useAppDispatch();
  const initialFields = {
    email: '',
    password: '',
  };

  const validations = {
    email: FORM_VALIDATORS.email,
    password: FORM_VALIDATORS.password,
  };

  const { formData, errors, handleChange } =
    useForm(initialFields, validations);
  const navigate=useNavigate();


  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (errors.email || errors.password) {
      return;
    }
    dispatch(allUserActions.userSignIn({
      password: formData.password,
      email: formData.email
    }));
    navigate('/');
  }

  return (
    <>
      <main className={sharedStyles['sign-in-page']}>
        <h1 className="visually-hidden">Travel App</h1>
        <form className={sharedStyles['sign-in-form']} autoComplete="off" onSubmit={handleSubmit}>  
          <label className="input">
            <span className="input__heading">Email</span>
            <input data-test-id="auth-email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>
          <label className="input">
            <span className="input__heading">Password</span>
            <input
              data-test-id="auth-password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </label>
          {userStatus && userStatus !== DataStatus.PENDING ?
            <button data-test-id="auth-submit" className="button" type="submit">
            Sign In
            </button>
            :
            <Loader/> 
          }
         
        </form>
        <span>
          Don't have an account?
          <a
            data-test-id="auth-sign-up-link"
            onClick={()=>{navigate('/sign-up');}}
            className={`${sharedStyles['sign-in-form__link']} clickeable-pointer`}
          >
            Sign Up
          </a>
        </span>
      </main>
    </>
  );
};

export default SignIn;