import styles from './PageTitle.module.css';

const PageTitle = ({title, as: As = 'h1', style, className = ''}) => {
  return (
    <As className={`${styles.pageTitle} ${className}`} style={style}>
      {title}
    </As>
  );
};

export default PageTitle;
