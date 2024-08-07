import {WalletCreditCard16Filled} from '@fluentui/react-icons';
import {Button} from '@nextui-org/react';
import {useEffect, useState} from 'react';

const RecordPaymentButton = ({onClick = () => {}}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 599px)').matches;
    setIsMobile(isMobile);
  }, []);

  if (isMobile) {
    return (
      <Button isIconOnly onClick={onClick} color="primary">
        <WalletCreditCard16Filled />
      </Button>
    );
  } else {
    return (
      <Button color="primary" onClick={onClick} endContent={<WalletCreditCard16Filled />}>
        Zaksięguj wpłatę
      </Button>
    );
  }
};

export default RecordPaymentButton;
