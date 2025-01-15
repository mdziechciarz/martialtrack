import Card from '@/components/Card/Card';
import {Textarea} from '@nextui-org/react';
import styles from './ClassSummarySection.module.css';

const ClassSummarySection = ({isEditMode = false}) => {
  return (
    <Card title={'Konspekt zajęć'} className={styles.card}>
      <Textarea
        placeholder={isEditMode ? 'Wprowadź konspekt zajęć...' : 'Brak konspektu zajęć'}
        minRows={isEditMode ? 5 : 1}
        className={styles.textarea}
        isDisabled={!isEditMode}
      />
    </Card>
  );
};

export default ClassSummarySection;
