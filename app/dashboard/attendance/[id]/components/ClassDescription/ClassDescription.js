import styles from './ClassDescription.module.css';

const ClassDescription = ({name, color, times, date}) => {
  return (
    <div className={styles.container} style={{borderLeftColor: color}}>
      <p className={styles.name}>{name}</p>
      <p className={styles.date}>
        {date}, {times}
      </p>
    </div>
  );
};

export default ClassDescription;
