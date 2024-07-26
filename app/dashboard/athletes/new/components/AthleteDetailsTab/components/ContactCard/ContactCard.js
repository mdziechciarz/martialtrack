import Card, {CardEntries} from '@/components/Card/Card';
import {useState} from 'react';

import {Input} from '@nextui-org/react';
import styles from './ContactCard.module.css';

const ContactCard = () => {
  const [isEditMode, setIsEditMode] = useState(true);

  return (
    <Card
      className={styles.contactCard}
      title="Dane kontaktowe"
      isEditMode={isEditMode}
      setIsEditMode={setIsEditMode}
    >
      {isEditMode ? <EditModeContent /> : <ReadOnlyContent />}
    </Card>
  );
};

const ReadOnlyContent = () => {
  return (
    <CardEntries
      entries={{
        Telefon: '123456789',
        'E-mail': 'karolina.kowalska@gmail.com',
      }}
    />
  );
};

const EditModeContent = () => {
  return (
    <CardEntries
      entries={{
        Telefon: <Input placeholder="Telefon" />,
        'E-mail': <Input type="email" placeholder="Adres e-mail" />,
      }}
    />
  );
};

export default ContactCard;
