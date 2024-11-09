import {useState} from 'react';

import {Input, Textarea} from '@nextui-org/react';

import Card, {CardEntries, CardGrid} from '@/components/Card/Card';

import styles from './DetailsCard.module.css';

const DetailsCard = ({className}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Card
      className={`${styles.detailsCard} ${className || ''}`}
      title="Informacje dodatkowe"
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
      nonTextValues
      style={{gridTemplateColumns: '1fr'}}
      entries={{
        'Opis zawodów':
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        Regulamin: 'regulamin_pzkb.pdf',
      }}
    />
  );
};

const EditModeContent = () => {
  return (
    <CardGrid oneColumn>
      <Textarea label="Opis" labelPlacement="outside" placeholder="Opis zawodów" />
      <Input
        label="Adres internetowy"
        labelPlacement="outside"
        placeholder="Adres do strony zawodów"
      />
    </CardGrid>
  );
};

export default DetailsCard;
