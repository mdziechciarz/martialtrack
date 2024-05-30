import styles from './PageDescription.module.css';

const PageDescription = ({text}) => {
  return <p className={styles.pageDescription}>{text}</p>;
};

export default PageDescription;
