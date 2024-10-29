import Card, {CardEntries} from '@/components/Card/Card';
import {DatePicker, Input, Select, SelectItem} from '@nextui-org/react';
import {useState} from 'react';

const PersonalDetailsCard = () => {
  const [isEditMode, setIsEditMode] = useState(true);

  return (
    <Card title="Dane podstawowe" isEditMode={isEditMode} setIsEditMode={setIsEditMode}>
      <EditModeContent />
    </Card>
  );
};

const EditModeContent = () => {
  return (
    <CardEntries
      entries={{
        Płeć: <GenderSelect />,
        'Data urodzenia': <DatePicker disableAnimation showMonthAndYearPickers />,
        PESEL: <Input placeholder="PESEL" type="number" />,
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
