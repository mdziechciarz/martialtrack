import styles from './PageTitle.module.css';

const PageTitle = ({title, as: As = 'h1'}) => {
  return <As className={styles.pageTitle}>{title}</As>;
};

export default PageTitle;
