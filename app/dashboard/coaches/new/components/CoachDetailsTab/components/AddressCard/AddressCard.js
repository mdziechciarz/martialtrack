import Card, {CardEntries} from '@/components/Card/Card';
import {Input} from '@nextui-org/react';
import {useState} from 'react';

const AddressCard = () => {
  const [isEditMode, setIsEditMode] = useState(true);

  return (
    <Card title="Adres zamieszkania" isEditMode={isEditMode} setIsEditMode={setIsEditMode}>
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
        Ulica: <Input placeholder="Np. Kwiatowa" />,
        'Numer domu/mieszkania': <Input placeholder="Np. 12" />,
        Miasto: <Input placeholder="Np. Warszawa" />,
        'Kod pocztowy': <Input placeholder="Np. 12-345" />,
      }}
    />
  );
};

export default AddressCard;
