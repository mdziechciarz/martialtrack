import Card, {CardEntries} from '@/components/Card/Card';
import {DatePicker, Input, Select, SelectItem} from '@nextui-org/react';
import {useState} from 'react';

const PersonalDetailsCard = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Card title="Dane podstawowe" isEditable isEditMode={isEditMode} setIsEditMode={setIsEditMode}>
      {isEditMode ? <EditModeContent /> : <ReadOnlyContent />}
    </Card>
  );
};

const ReadOnlyContent = () => {
  return (
    <CardEntries
      entries={{
        Płeć: 'Kobieta',
        'Data urodzenia': '2000-06-23',
        PESEL: '12345678901',
        'Miejsce urodzenia': 'Warszawa',
      }}
    />
  );
};

const EditModeContent = () => {
  return (
    <CardEntries
      entries={{
        Płeć: <GenderSelect />,
        'Data urodzenia': <DatePicker disableAnimation />,
        PESEL: <Input placeholder="PESEL" />,
        'Miejsce urodzenia': <Input placeholder="Miejsce urodzenia" />,
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

export default PersonalDetailsCard;
