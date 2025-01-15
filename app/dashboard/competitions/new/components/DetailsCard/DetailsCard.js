import {Input, Textarea} from '@nextui-org/react';

import Card, {CardGrid} from '@/components/Card/Card';

import styles from './DetailsCard.module.css';

const DetailsCard = ({className, register, control, errors}) => {
  return (
    <Card className={`${styles.detailsCard} ${className || ''}`} title="Informacje dodatkowe">
      <CardGrid oneColumn>
        <Textarea
          label="Opis"
          labelPlacement="outside"
          placeholder="Opis zawodów"
          minRows={4}
          {...register('description')}
        />
        <Input
          label="Strona internetowa"
          labelPlacement="outside"
          placeholder="Adres do strony zawodów"
          {...register('website')}
        />
      </CardGrid>
    </Card>
  );
};

export default DetailsCard;
