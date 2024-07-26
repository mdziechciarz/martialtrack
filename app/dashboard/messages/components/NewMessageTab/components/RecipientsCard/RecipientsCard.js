import Card from '@/components/Card/Card';
import {Add16Filled, Dismiss16Filled} from '@fluentui/react-icons';
import {Accordion, AccordionItem, Input} from '@nextui-org/react';
import Image from 'next/image';

import styles from './RecipientsCard.module.css';

const RecipientsCard = (className = '') => {
  return (
    <Card title="Odbiorcy" className={`${styles.card} ${className}`}>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <Input label="Dodaj odbiorcę" />
        </div>
        <div className={styles.suggestedContainer}>
          <Accordion isCompact className={styles.accordion}>
            <AccordionItem
              key="1"
              title="Sugerowani"
              classNames={{title: styles.accordionTitle, content: styles.accordionContent}}
            >
              <SuggestedRecipientsSection />
            </AccordionItem>
          </Accordion>
        </div>
        <div className={styles.selectedContainer}>
          <p>Wybrani</p>
          <ul>
            <UserChip name="Karol Nowak" imgSrc="https://i.pravatar.cc/180" isRemovable />
            <UserChip name="Joanna Jędrzejczyk" imgSrc="https://i.pravatar.cc/144" isRemovable />
            <UserChip name="Krzysztof Zieliński" imgSrc="https://i.pravatar.cc/138" isRemovable />
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default RecipientsCard;

const SuggestedRecipientsSection = () => {
  return (
    <div className={styles.suggestedGrid}>
      <div className={styles.coachesContainer}>
        <p>Trenerzy</p>
        <ul>
          <UserChip name="Karol Nowak" imgSrc="https://i.pravatar.cc/160" />
          <UserChip name="Joanna Jędrzejczyk" imgSrc="https://i.pravatar.cc/142" />
          <UserChip name="Krzysztof Zieliński" imgSrc="https://i.pravatar.cc/143" />
          <UserChip name="Adam Biały" imgSrc="https://i.pravatar.cc/150" />
          <UserChip name="Jan Błachowicz" imgSrc="https://i.pravatar.cc/140" />
          <UserChip
            name="Tadesz Brzęczyszczykiewicz"
            imgSrc="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          />
        </ul>
      </div>
      <div className={styles.groupsContainer}>
        <p>Grupy</p>
        <ul>
          <GroupChip name="Boks" color="#f00" />
          <GroupChip name="Kickboxing Zawodnicy" color="#000" />
          <GroupChip name="Kickboxing Dinusie" color="yellow" />
          <GroupChip name="Yoga" color="orange" />
        </ul>
      </div>
      <div className={styles.competitionsContainer}>
        <p>Uczestnicy zawodów</p>
        <ul>
          <CompetitionChip
            name="Mistrzostwa Polski Kick Light Juniorów, Seniorów i Weteranów"
            dates="02-03.03.2024"
            location="Warszawa"
            color="royalblue"
          />
          <CompetitionChip
            name="Puchar Świata WAKO w Kickboxingu"
            dates="11-17.06.2024"
            location="Budapeszt"
            color="purple"
          />
        </ul>
      </div>
    </div>
  );
};

const UserChip = ({name, imgSrc, isRemovable = false}) => {
  return (
    <div className={`${styles.chipContainer} ${isRemovable && styles.removable}`}>
      <Image src={imgSrc} alt={name} width={24} height={24} className={styles.avatar} />
      <span className={styles.name}>{name}</span>
      <span className={styles.userChipIcon}>
        {isRemovable ? <Dismiss16Filled /> : <Add16Filled />}
      </span>
    </div>
  );
};

const GroupChip = ({name, color, isRemovable = false}) => {
  return (
    <div className={styles.chipContainer}>
      <i className={styles.groupDot} style={{backgroundColor: color}} />
      <span className={styles.name}>{name}</span>
      <span className={styles.userChipIcon}>
        <Add16Filled />
      </span>
    </div>
  );
};

const CompetitionChip = ({name, color, dates, location, isRemovable = false}) => {
  return (
    <div className={`${styles.chipContainer} ${styles.competitionChipContainer}`}>
      <div className={styles.groupDot} style={{backgroundColor: color}}></div>
      <span className={styles.competitionName}>
        {name}
        <br />
        {dates}, {location}
      </span>
      <span className={styles.userChipIcon}>
        <Add16Filled />
      </span>
    </div>
  );
};
