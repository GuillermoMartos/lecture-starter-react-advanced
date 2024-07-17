import styles from './header.module.css';
import briefcaseSrc from '../../assets/images/briefcase.svg';
import userSrc from '../../assets/images/user.svg';
import { useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_TOKEN } from '../../common/constants';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { allUserActions } from '../../store/users/users';
import { DataStatus } from '../../common/enums';


const Header = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const username = useAppSelector(state => state.users.username);
  const token=useAppSelector(state=>state.users.token);

  function logoutUser() {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    dispatch(allUserActions.setStatus(DataStatus.IDLE));
    dispatch(allUserActions.setTokenToNull(null));
    navigate('/sign-in');
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__inner}>
          <a data-test-id="header-logo"
            className={`${styles.header__logo} clickeable-pointer`}
            onClick={() => { navigate('/'); }}>
          Travel App
          </a>
          
          <nav data-test-id="header-nav" className={styles.header__nav}>
            <ul className={`${styles['nav-header__list']} ${token? null : 'visually-hidden'}`}>
              <li className={styles['nav-header__item']} title="Bookings">
                <a
                  data-test-id="header-bookings-link"
                  onClick={()=>{navigate('/bookings');}}
                  className={`${styles['nav-header__inner']} clickeable-pointer`}
                >
                  <span className="visually-hidden">Bookings</span>
                  <img src={briefcaseSrc} alt="bookings" />
                </a>
              </li>
              <li className={styles['nav-header__item']} title="Profile">
                <div
                  data-test-id="header-profile-nav"
                  className={`${styles['profile-nav']} ${styles['nav-header__inner']}`}
                  tabIndex={0}
                >
                  <span className="visually-hidden">Profile</span>
                  <img src={userSrc} alt="profile" />
                  <ul
                    data-test-id="header-profile-nav-list"
                    className={styles['profile-nav__list']}
                  >
                    <li
                      data-test-id="header-profile-nav-username"
                    >
                      {username ?? username}
                    </li>
                    <li>
                      <button
                        data-test-id="header-profile-nav-sign-out"
                        className={`${styles['profile-nav__sign-out']} button clickeable-pointer`}
                        onClick={logoutUser}
                      >
                      Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
          
        </div>
      </header>
    </>
  );
};

export default Header;