'use client';

import {Add16Filled} from '@fluentui/react-icons';
import {Button} from '@nextui-org/react';

const AddOrderButton = ({onClick = () => {}}) => {
  const isMobile = window.matchMedia('(max-width: 599px)').matches;

  if (isMobile) {
    return (
      <Button isIconOnly onClick={onClick} color="primary">
        <Add16Filled />
      </Button>
    );
  } else {
    return (
      <Button color="primary" endContent={<Add16Filled />}>
        Nowe zamówienie
      </Button>
    );
  }
};

export default AddOrderButton;
