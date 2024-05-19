import styles from './ContentContainer.module.css';

const ContentContainer = ({children, className = ''}) => {
  return <div className={`${styles.container} ${''}`}>{children}</div>;
};

export default ContentContainer;
