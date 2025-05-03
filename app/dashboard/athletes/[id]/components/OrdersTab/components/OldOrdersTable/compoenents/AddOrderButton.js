import {Add16Filled} from '@fluentui/react-icons';
import {Button} from '@nextui-org/react';
import {useEffect, useState} from 'react';

const AddOrderButton = ({onClick = () => {}}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 599px)').matches;
    setIsMobile(isMobile);
  }, []);

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
