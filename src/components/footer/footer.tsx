import styles from './footer.module.css'
import heartSrc from '../../assets/images/heart.svg'

const Footer = (): JSX.Element => {
    return (
        <>
<footer className={styles.footer}>
      <span className={styles.footer__text}>
        © 2024, from
        <a className={styles.footer__link} href="https://binary-studio.com" target='blank'>
          binary studio
        </a>
        with
        <img className="footer__icon" src={heartSrc} alt="heart" />
      </span>
    </footer>
        </>
    )
}

export default Footer