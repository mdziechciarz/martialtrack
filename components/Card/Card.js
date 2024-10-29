import {Checkmark16Filled, Dismiss16Filled, Edit16Filled} from '@fluentui/react-icons';
import {Button} from '@nextui-org/react';
import styles from './Card.module.css';

const Card = ({
  children,
  className = '',
  classNames = {
    contentContainer: '',
  },
  style = {},
  title,
  isEditable,
  isEditMode,
  setIsEditMode = () => {},
}) => {
  return (
    <div className={`${styles.container} ${className}`} style={style}>
      {(title || isEditable) && (
        <div className={styles.header}>
          {title && (
            <div className={styles.titleContainer}>
              <h3>{title}</h3>
            </div>
          )}
          {isEditable && (
            <div className={styles.editButtonsContainer}>
              {isEditMode ? (
                <>
                  <SaveChangesButton onClick={() => setIsEditMode(false)} />
                  <CancelChangesButton onClick={() => setIsEditMode(false)} />
                </>
              ) : (
                <EditButton onClick={() => setIsEditMode(true)} />
              )}
            </div>
          )}
        </div>
      )}
      <div className={`${styles.contentContainer} ${classNames && classNames.contentContainer}`}>
        {children}
      </div>
    </div>
  );
};

export const CardEntries = ({className = '', style = {}, entries = {}, nonTextValues = false}) => {
  return (
    <div className={`${styles.grid} ${className}`} style={style}>
      {Object.entries(entries).map(([key, value]) => (
        <div key={key} className={styles.entry}>
          <p className={styles.key}>{key}</p>
          {nonTextValues ? (
            <div className={styles.value}>{value}</div>
          ) : (
            <p className={styles.value}>{value}</p>
          )}
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

const SaveChangesButton = ({onClick}) => {
  return (
    <Button className={styles.saveChangesButton} isIconOnly onClick={onClick} variant="light">
      <Checkmark16Filled />
    </Button>
  );
};

const CancelChangesButton = ({onClick}) => {
  return (
    <Button className={styles.cancelChangesButton} isIconOnly onClick={onClick} variant="light">
      <Dismiss16Filled />
    </Button>
  );
};
