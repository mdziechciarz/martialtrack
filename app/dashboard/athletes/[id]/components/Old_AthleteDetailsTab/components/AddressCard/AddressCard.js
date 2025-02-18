import Card, {CardEntries} from '@/components/Card/Card';
import {Input} from '@nextui-org/react';
import {useState} from 'react';

const AddressCard = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Card
      title="Adres zamieszkania"
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
        Ulica: 'Kwiatowa',
        'Numer domu/mieszkania': '12',
        Miasto: 'Warszawa',
        'Kod pocztowy': '12-345',
      }}
    />
  );
};

const EditModeContent = () => {
  return (
    <CardEntries
      entries={{
        Ulica: <Input defaultValue="Kwiatowa" />,
        'Numer domu/mieszkania': <Input defaultValue="12" />,
        Miasto: <Input defaultValue="Warszawa" />,
        'Kod pocztowy': <Input defaultValue="12-345" />,
      }}
    />
  );
};

export default AddressCard;
