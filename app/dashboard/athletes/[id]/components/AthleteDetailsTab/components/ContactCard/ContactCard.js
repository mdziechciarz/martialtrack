import Card, {CardEntries} from '@/components/Card/Card';
import {useState} from 'react';

import {Input} from '@nextui-org/react';
import styles from './ContactCard.module.css';

const ContactCard = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Card
      className={styles.contactCard}
      title="Dane kontaktowe"
      isEditable
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
        Telefon: <Input placeholder="Telefon" defaultValue="123456789" />,
        'E-mail': (
          <Input type="email" placeholder="E-mail" defaultValue="karolina.kowalska@gmail.com" />
        ),
      }}
    />
  );
};

export default ContactCard;
