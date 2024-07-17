import styles from './loader.module.css';

const Loader = (): JSX.Element => {
  return (
    <section className={styles['loader-wrapper']}><div className={styles.loader}/>
      <span>Loading...</span>
    </section>);
};

export default Loader;