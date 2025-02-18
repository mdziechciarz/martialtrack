import {Input, Select, SelectItem} from '@nextui-org/react';

import Card, {CardGrid} from '@/components/Card/Card';

import styles from './MainInfoCard.module.css';

const MainInfoCard = ({clubBranches = [], color, clubBranch, register, control, errors}) => {
  return (
    <Card title="Sekcja i kolor">
      <EditableContent
        currentColor={color}
        clubBranches={clubBranches}
        register={register}
        control={control}
        errors={errors}
      />
    </Card>
  );
};

const EditableContent = ({clubBranches, register, control, errors}) => {
  return (
    <CardGrid oneColumn>
      <Input
        label="Nazwa grupy"
        labelPlacement="outside"
        placeholder="Wpisz nazwę grupy"
        isRequired
        {...register('name', {required: true})}
        validationBehavior="aria"
        isInvalid={!!errors.name}
      />
      <div style={{display: 'grid', gridTemplateColumns: '7fr 3fr', gap: '8px'}}>
        <Select
          placeholder="Wybierz sekcję"
          disallowEmptySelection
          label="Sekcja"
          labelPlacement="outside"
          isRequired
          isInvalid={!!errors.clubBranch}
          {...register('clubBranch', {required: true})}
          validationBehavior="aria"
        >
          {clubBranches.map(branch => (
            <SelectItem key={branch.id}>{branch.name}</SelectItem>
          ))}
        </Select>
        <Input
          className={`${styles.colorInput} ${styles.editable}`}
          classNames={{inputWrapper: styles.colorInputWrapper}}
          style={{cursor: 'pointer'}}
          type="color"
          defaultValue="#7070FF"
          label="Kolor"
          labelPlacement="outside"
          isRequired
          {...register('color')}
          validationBehavior="aria"
        />
      </div>
    </CardGrid>
  );
};

export default MainInfoCard;
