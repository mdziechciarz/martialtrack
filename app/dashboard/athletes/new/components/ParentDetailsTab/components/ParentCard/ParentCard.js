import Card, {CardEntries} from '@/components/Card/Card';
import {Input, Select, SelectItem} from '@nextui-org/react';
import {useState} from 'react';

const ParentCard = () => {
  const [isEditMode, setIsEditMode] = useState(true);

  return (
    <Card title="Rodzic" isEditMode={isEditMode} setIsEditMode={setIsEditMode}>
      {isEditMode ? <EditModeContent /> : <ReadOnlyContent />}
    </Card>
  );
};

const ReadOnlyContent = () => {
  return (
    <CardEntries
      entries={{
        Imię: 'Anna',
        Nazwisko: 'Kowalska',
        'Nr telefonu': '+48 721499204',
        'E-mail': 'a.kowalska@email.com',
        Ulica: 'Zielona',
        'Nr domu/mieszkania': '13',
        Miejscowość: 'Zawiercie',
        'Kod pocztowy': '42-400',
      }}
    />
  );
};

const EditModeContent = () => {
  return (
    <CardEntries
      entries={{
        Imię: <Input placeholder="Imię" />,
        Nazwisko: <Input placeholder="Nazwisko" />,
        'Nr telefonu': <Input placeholder="Nr telefonu" />,
        'E-mail': <Input placeholder="E-mail" />,
        Ulica: <Input placeholder="Ulica" />,
        'Nr domu/mieszkania': <Input placeholder="Nr domu/mieszkania" />,
        Miejscowość: <Input placeholder="Miejscowość" />,
        'Kod pocztowy': <Input placeholder="Kod pocztowy" />,
      }}
    />
  );
};

const GenderSelect = () => {
  return (
    <Select placeholder="Płeć" size="sm" defaultSelectedKeys="1">
      <SelectItem key="1">Kobieta</SelectItem>
      <SelectItem key="2">Mężczyzna</SelectItem>
    </Select>
  );
};

export default ParentCard;
