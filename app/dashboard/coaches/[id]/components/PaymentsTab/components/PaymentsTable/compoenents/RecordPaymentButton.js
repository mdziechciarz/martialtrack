import {WalletCreditCard16Filled} from '@fluentui/react-icons';
import {Button} from '@nextui-org/react';

const RecordPaymentButton = ({onClick = () => {}}) => {
  const isMobile = window.matchMedia('(max-width: 599px)').matches;

  if (isMobile) {
    return (
      <Button isIconOnly onClick={onClick} color="primary">
        <WalletCreditCard16Filled />
      </Button>
    );
  } else {
    return (
      <Button color="primary" endContent={<WalletCreditCard16Filled />}>
        Zaksięguj wpłatę
      </Button>
    );
  }
};

export default RecordPaymentButton;
