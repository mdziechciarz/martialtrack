import styles from './Card.module.css';

const Card = ({
  children,
  className = '',
  title,
  entries = {},
  mobileCols = 4,
  tabletCols = 2,
  desktopCols = 2,
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.titleContainer}>
        <h3>{title}</h3>
      </div>
      <div className={styles.contentContainer}>
        {children ? (
          children
        ) : (
          <div className={styles.grid}>
            {Object.entries(entries).map(([key, value]) => (
              <div key={key} className={styles.entry}>
                <p className={styles.key}>{key}</p>
                <p className={styles.value}>{value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
