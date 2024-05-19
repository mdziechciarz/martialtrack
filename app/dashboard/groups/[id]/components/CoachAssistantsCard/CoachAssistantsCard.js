import Card from '@/app/dashboard/athletes/[id]/AthleteDetailsView/components/Card/Card';
import Image from 'next/image';
import {useState} from 'react';
import styles from './CoachAssistantsCard.module.css';

const CoachAssistantsCard = ({className}) => {
  const [isEditable, setIsEditable] = useState(false);

  return (
    <Card title="Trener i asystenci" className={className}>
      <div className={styles.contentContainer}>
        <div className={styles.entry}>
          <p className={styles.key}>Trener główny</p>
          <AvaratName imgSrc="https://i.pravatar.cc/150" name="Jan Kowalski" />
        </div>
        <div className={styles.entry}>
          <p className={styles.key}>Asystenci</p>
          <div className={styles.assistantsContainer}>
            <AvaratName imgSrc="https://i.pravatar.cc/150" name="Adam Nowak" />
            <AvaratName imgSrc="https://i.pravatar.cc/150" name="Krzysztof Zielony" />
          </div>
        </div>
      </div>
    </Card>
  );
};

const AvaratName = ({imgSrc, name}) => (
  <div className={styles.avatarNameContainer}>
    <Image src={imgSrc} alt={name} width={24} height={24} className={styles.avatar} />
    <span className={styles.name}>{name}</span>
  </div>
);

export default CoachAssistantsCard;
