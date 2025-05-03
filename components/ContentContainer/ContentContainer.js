import styles from './ContentContainer.module.css';

const ContentContainer = ({children, className = '', style}) => {
  return (
    <div className={`${styles.container} ${className}`} style={style}>
      {children}
    </div>
  );
};

export default ContentContainer;
