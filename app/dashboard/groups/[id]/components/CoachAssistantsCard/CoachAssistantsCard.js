import Card from '@/components/Card/Card';
import {Avatar, Select, SelectItem} from '@nextui-org/react';
import Image from 'next/image';
import {useState} from 'react';
import styles from './CoachAssistantsCard.module.css';

const CoachAssistantsCard = ({className}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Card
      title="Trener i asystenci"
      className={className}
      isEditable
      isEditMode={isEditMode}
      setIsEditMode={setIsEditMode}
    >
      {isEditMode ? <EditModeCOntent /> : <ReadOnlyModeContent />}
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

const ReadOnlyModeContent = () => {
  return (
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
  );
};

const EditModeCOntent = () => {
  return (
    <div className={styles.contentContainer}>
      <div className={styles.entry}>
        <p className={styles.key}>Trener główny</p>
        <Select
          placeholder="Wybierz trenera"
          items={exampleCoaches}
          renderValue={items => {
            return items.map(item => (
              <div key={item.key} className="flex items-center gap-2">
                <Avatar
                  alt={item.data.name}
                  className="flex-shrink-0"
                  size="sm"
                  src={item.data.avatar}
                />
                <div className="flex flex-col">
                  <span>{item.data.name}</span>
                </div>
              </div>
            ));
          }}
        >
          {coach => (
            <SelectItem key={coach.id} textValue={coach.name}>
              <div className="flex gap-2 items-center">
                <Avatar alt={coach.name} className="flex-shrink-0" size="sm" src={coach.avatar} />
                <div className="flex flex-col">
                  <span className="text-small">{coach.name}</span>
                </div>
              </div>
            </SelectItem>
          )}
        </Select>
      </div>
      <div className={styles.entry}>
        <p className={styles.key}>Asystenci</p>
        <Select placeholder="Wybierz asystentów" items={exampleCoaches} selectionMode="multiple">
          {coach => (
            <SelectItem key={coach.id} textValue={coach.name}>
              <div className="flex gap-2 items-center">
                <Avatar alt={coach.name} className="flex-shrink-0" size="sm" src={coach.avatar} />
                <div className="flex flex-col">
                  <span className="text-small">{coach.name}</span>
                </div>
              </div>
            </SelectItem>
          )}
        </Select>
      </div>
    </div>
  );
};

const exampleCoaches = [
  {id: 1, name: 'Jan Kowalski', avatar: 'https://i.pravatar.cc/150'},
  {id: 2, name: 'Adam Nowak', avatar: 'https://i.pravatar.cc/148'},
  {id: 3, name: 'Krzysztof Zielony', avatar: 'https://i.pravatar.cc/149'},
  {id: 4, name: 'Kamil Zielony', avatar: 'https://i.pravatar.cc/147'},
  {id: 5, name: 'Piotr Zielony', avatar: 'https://i.pravatar.cc/146'},
];
