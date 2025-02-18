import Image from 'next/image';

import {Avatar, Select, SelectItem} from '@nextui-org/react';

import Card, {CardGrid} from '@/components/Card/Card';

import styles from './CoachAssistantsCard.module.css';

const CoachAssistantsCard = ({className, availableCoaches = [], register, errors, control}) => {
  console.log(availableCoaches);

  return (
    <Card title="Trener i asystenci" className={className}>
      <CardGrid oneColumn>
        <Select
          label="Trener główny"
          labelPlacement="outside"
          placeholder="Wybierz trenera"
          items={availableCoaches}
          isRequired
          isInvalid={!!errors.mainCoach}
          disallowEmptySelection
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
                  <span>{item.data.full_name}</span>
                </div>
              </div>
            ));
          }}
        >
          {coach => (
            <SelectItem key={coach.id} textValue={coach.full_name}>
              <div className="flex gap-2 items-center">
                <Avatar alt={coach.name} className="flex-shrink-0" size="sm" src={coach.avatar} />
                <div className="flex flex-col">
                  <span className="text-small">{coach.full_name}</span>
                </div>
              </div>
            </SelectItem>
          )}
        </Select>
        <Select
          label="Asystenci"
          labelPlacement="outside"
          placeholder="Wybierz asystentów"
          items={availableCoaches}
          selectionMode="multiple"
          isInvalid={!!errors.assistants}
          {...register('assistants')}
          validationBehavior="aria"
        >
          {coach => (
            <SelectItem key={coach.id} textValue={coach.full_name}>
              <div className="flex gap-2 items-center">
                <Avatar alt={coach.name} className="flex-shrink-0" size="sm" src={coach.avatar} />
                <div className="flex flex-col">
                  <span className="text-small">{coach.full_name}</span>
                </div>
              </div>
            </SelectItem>
          )}
        </Select>
      </CardGrid>
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
