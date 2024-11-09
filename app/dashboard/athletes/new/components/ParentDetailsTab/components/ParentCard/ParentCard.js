import {useState} from 'react';
import {useFormContext} from 'react-hook-form';

import {Input, Select, SelectItem} from '@nextui-org/react';

import Card, {CardEntries, CardGrid} from '@/components/Card/Card';

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
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useFormContext();

  return (
    <CardGrid>
      <Input
        label="Imię"
        labelPlacement="outside"
        placeholder="Imię"
        {...register('parentOne.name', {required: true})}
        isInvalid={!!errors.parentOne?.name}
      />
      <Input label="Nazwisko" labelPlacement="outside" placeholder="Nazwisko" />
      <Input label="Nr telefonu" labelPlacement="outside" placeholder="Nr telefonu" />
      <Input label="E-mail" labelPlacement="outside" placeholder="E-mail" />
      <Input label="Ulica" labelPlacement="outside" placeholder="Ulica" />
      <Input label="Nr domu/mieszkania" labelPlacement="outside" placeholder="Nr domu/mieszkania" />
      <Input label="Miejscowość" labelPlacement="outside" placeholder="Miejscowość" />
      <Input label="Kod pocztowy" labelPlacement="outside" placeholder="Kod pocztowy" />
    </CardGrid>
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
