import styles from './header.module.css'
import briefcaseSrc from '../../assets/images/briefcase.svg'
import userSrc from '../../assets/images/user.svg'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
  isUserLogged: boolean,
  setIsUserLogged: (value: boolean) => void;
}

const Header = ({ isUserLogged, setIsUserLogged }: Props): JSX.Element => {
  const navigate=useNavigate()
  useEffect(() => {
}, [isUserLogged])

    return (
        <>
<header className={styles.header}>
      <div className={styles.header__inner}>
        <a data-test-id="header-logo" className={`${styles.header__logo} clickeable-pointer`} onClick={()=>{navigate('/')}}>
          Travel App
            </a>
            {isUserLogged && <>
              <nav data-test-id="header-nav" className={styles.header__nav}>
          <ul className={styles['nav-header__list']}>
            <li className={styles['nav-header__item']} title="Bookings">
              <a
                data-test-id="header-bookings-link"
                onClick={()=>{navigate('/bookings')}}
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
                    John Doe
                  </li>
                  <li>
                    <button
                      data-test-id="header-profile-nav-sign-out"
                            className={`${styles['profile-nav__sign-out']} button clickeable-pointer`}
                            onClick={()=>setIsUserLogged(false)}
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
            </>}
      </div>
    </header>
        </>
    )
}

export default Header