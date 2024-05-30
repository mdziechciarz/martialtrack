import {Edit16Filled} from '@fluentui/react-icons';
import {Button} from '@nextui-org/react';
import styles from './Card.module.css';

const Card = ({children, className = '', style = {}, title, isEditable}) => {
  return (
    <div className={`${styles.container} ${className}`} style={style}>
      {title && (
        <div className={styles.header}>
          <div className={styles.titleContainer}>
            <h3>{title}</h3>
          </div>
          {isEditable && <EditButton />}
        </div>
      )}
      <div className={styles.contentContainer}>{children}</div>
    </div>
  );
};

export const CardEntries = ({entries = {}}) => {
  return (
    <div className={styles.grid}>
      {Object.entries(entries).map(([key, value]) => (
        <div key={key} className={styles.entry}>
          <p className={styles.key}>{key}</p>
          <p className={styles.value}>{value}</p>
        </div>
      ))}
    </div>
  );
};

export default Card;

const EditButton = ({onClick}) => {
  return (
    <Button className={styles.editButton} isIconOnly onClick={onClick} variant="light">
      <Edit16Filled />
    </Button>
  );
};
