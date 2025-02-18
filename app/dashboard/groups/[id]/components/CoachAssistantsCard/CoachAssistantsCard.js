'use client';

import Image from 'next/image';
import {useState} from 'react';
import {useForm} from 'react-hook-form';

import {Avatar, Select, SelectItem} from '@nextui-org/react';

import Card, {CardGrid} from '@/components/Card/Card';

import styles from './CoachAssistantsCard.module.css';

const CoachAssistantsCard = ({className}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const handleSaveChanges = handleSubmit(data => {
    console.log(data);
    console.log('Changes saved');
    setIsEditMode(false);
  });

  const handleCancelChanges = () => {
    console.log('Changes canceled');
    setIsEditMode(false);
  };

  const handleEdit = () => {
    console.log('Editing');
    setIsEditMode(true);
  };

  return (
    <Card
      title="Trener i asystenci"
      className={className}
      isEditable
      isEditMode={isEditMode}
      onSaveClick={handleSaveChanges}
      onCancelClick={handleCancelChanges}
      onEditClick={handleEdit}
      setIsEditMode={setIsEditMode}
    >
      {isEditMode ? (
        <EditModeCOntent
          register={register}
          errors={errors}
          currentMainCoach={exampleCoaches[1]}
          currentAssistants={exampleCoaches.slice(2, 4)}
        />
      ) : (
        <ReadOnlyModeContent
          mainCoach={exampleCoaches[1]}
          assistants={exampleCoaches.slice(2, 4)}
        />
      )}
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

const ReadOnlyModeContent = ({mainCoach, assistants}) => {
  console.log(assistants);

  return (
    <CardGrid oneColumn>
      <div className={styles.entry}>
        <p className={styles.key}>Trener główny</p>
        <AvaratName imgSrc={mainCoach.avatar} name={mainCoach.name} />
      </div>
      <div className={styles.entry}>
        <p className={styles.key}>Asystenci</p>
        <div className={styles.assistantsContainer}>
          {/* <AvaratName imgSrc="https://i.pravatar.cc/150" name="Adam Nowak" />
          <AvaratName imgSrc="https://i.pravatar.cc/150" name="Krzysztof Zielony" /> */}
          {assistants.map(coach => (
            <AvaratName key={coach.id} imgSrc={coach.avatar} name={coach.name} />
          ))}
        </div>
      </div>
    </CardGrid>
  );
};

const EditModeCOntent = ({register, errors, currentMainCoach, currentAssistants}) => {
  return (
    <CardGrid oneColumn>
      <Select
        label="Trener główny"
        labelPlacement="outside"
        placeholder="Wybierz trenera"
        items={exampleCoaches}
        // disallowEmptySelection
        isRequired
        isInvalid={!!errors.mainCoach}
        defaultSelectedKeys={[currentMainCoach.id]}
        {...register('mainCoach', {required: 'Trener główny jest wymagany'})}
        validationBehavior="aria"
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
      <Select
        label="Asystenci"
        labelPlacement="outside"
        placeholder="Wybierz asystentów"
        items={exampleCoaches}
        selectionMode="multiple"
        isInvalid={!!errors.assistants}
        {...register('assistants')}
        validationBehavior="aria"
        defaultSelectedKeys={currentAssistants.map(coach => coach.id)}
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
    </CardGrid>
  );
};

const exampleCoaches = [
  {id: '1', name: 'Jan Kowalski', avatar: 'https://i.pravatar.cc/150'},
  {id: '2', name: 'Adam Nowak', avatar: 'https://i.pravatar.cc/148'},
  {id: '3', name: 'Krzysztof Zielony', avatar: 'https://i.pravatar.cc/149'},
  {id: '4', name: 'Kamil Zielony', avatar: 'https://i.pravatar.cc/147'},
  {id: '5', name: 'Piotr Zielony', avatar: 'https://i.pravatar.cc/146'},
];
