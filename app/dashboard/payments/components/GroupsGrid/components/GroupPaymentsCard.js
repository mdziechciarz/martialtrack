import Card from '@/components/Card/Card';
import {
  Dismiss16Filled,
  MoreVertical24Filled,
  TextPeriodAsterisk20Filled,
  WalletCreditCard16Filled,
} from '@fluentui/react-icons';
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from '@nextui-org/react';

import {recordManualPaymentById} from '../../../actions/recordManualPayment';
import {
  cancelPayment,
  cancelPaymentExemption,
  exemptPayment,
} from '../../../actions/todo_editManualPayment';

import styles from './GroupPaymentsCard.module.css';

const GroupPaymentsCard = ({
  groupName,
  color,
  paidCount,
  toBePaidCount,
  amountPaid,
  amountToBePaid,
  payers,
  refetchPayments,
}) => {
  const unPaidPayers = payers.filter(payer => payer.status === 'pending');
  const paidPayers = payers.filter(payer => payer.status === 'paid');
  const exemptPayers = payers.filter(payer => payer.status === 'exempt');

  return (
    <Card className={styles.card} style={{borderTopColor: color}}>
      <div className={styles.contentContainer}>
        <div className={styles.titleContainer}>
          <h3 className={styles.groupName}>{groupName}</h3>
        </div>
        <div className={styles.summaryContainer}>
          <span>
            Opłacone {paidCount}/{toBePaidCount}
          </span>
          <span>
            {amountPaid}/{amountToBePaid} PLN
          </span>
        </div>
        <div className={styles.payersList}>
          <ul className={styles.unPaidList}>
            {unPaidPayers.map(payer => (
              <Payer
                paymentId={payer.paymentId}
                key={payer.paymentId}
                name={payer.name}
                amount={payer.amount}
                // isPaid={payer.isPaid}
                status={payer.status}
                refetchPayments={refetchPayments}
              />
            ))}
          </ul>
          <ul className={styles.paidList}>
            {paidPayers.map(payer => (
              <Payer
                paymentId={payer.paymentId}
                key={payer.paymentId}
                name={payer.name}
                amount={payer.amount}
                // isPaid={payer.isPaid}
                status={payer.status}
                refetchPayments={refetchPayments}
              />
            ))}
          </ul>
          <ul className={styles.exemptList}>
            {exemptPayers.map(payer => (
              <Payer
                paymentId={payer.paymentId}
                key={payer.paymentId}
                name={payer.name}
                amount={payer.amount}
                // isPaid={payer.isPaid}
                status={payer.status}
                refetchPayments={refetchPayments}
              />
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default GroupPaymentsCard;

const Payer = ({paymentId, name, amount, status, refetchPayments}) => {
  const handleCancelPayment = async id => {
    console.log(paymentId);
    console.log(id);

    try {
      const response = await cancelPayment({paymentId: id});
      if (response.success) {
        console.log('Payment cancelled successfully');
        refetchPayments();
      } else {
        console.error('Failed to cancel payment:', response.message);
      }
    } catch (error) {
      console.error('Error cancelling payment:', error);
    }
  };

  const handleExemptPayment = async id => {
    try {
      const response = await exemptPayment({paymentId: id});
      if (response.success) {
        console.log('Payment exempted successfully');
        refetchPayments();
      } else {
        console.error('Failed to exempt payment:', response.message);
      }
    } catch (error) {
      console.error('Error exempting payment:', error);
    }
  };

  const handleRecordPayment = async id => {
    try {
      const response = await recordManualPaymentById({paymentId: id});
      if (response.success) {
        console.log('Payment recorded successfully');
        refetchPayments();
      } else {
        console.error('Failed to record payment:', response.message);
      }
    } catch (error) {
      console.error('Error recording payment:', error);
    }
  };

  const handleCancelExemption = async id => {
    try {
      const response = await cancelPaymentExemption({paymentId: id});
      if (response.success) {
        console.log('Payment exemption cancelled successfully');
        refetchPayments();
      } else {
        console.error('Failed to cancel payment exemption:', response.message);
      }
    } catch (error) {
      console.error('Error cancelling payment exemption:', error);
    }
  };

  return (
    <li className={styles.payer}>
      <User
        name={name}
        avatarProps={{
          src: 'https://i.pravatar.cc/150',
          classNames: {
            base: styles.avatar,
          },
        }}
      />
      <div>
        {status === 'paid' && (
          <Chip color="success" variant="flat" className={styles.chip}>
            {amount} PLN
          </Chip>
        )}
        {status === 'pending' && (
          <Chip color="danger" variant="flat" className={styles.chip}>
            -{amount} PLN
          </Chip>
        )}
        {status === 'exempt' && (
          <Chip variant="flat" className={styles.chip} style={{textDecoration: 'line-through'}}>
            {amount} PLN
          </Chip>
        )}
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button variant="light" isIconOnly size="sm" className={styles.payerOptionsButton}>
              <MoreVertical24Filled />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            {status == 'paid' && (
              <DropdownItem
                startContent={<Dismiss16Filled />}
                onPress={() => handleCancelPayment(paymentId)}
              >
                Anuluj wpłatę
              </DropdownItem>
            )}
            {status == 'pending' && (
              <>
                <DropdownItem
                  startContent={<WalletCreditCard16Filled />}
                  onPress={() => handleRecordPayment(paymentId)}
                >
                  Zaksięguj wpłatę
                </DropdownItem>
                <DropdownItem
                  startContent={<TextPeriodAsterisk20Filled />}
                  onPress={() => handleExemptPayment(paymentId)}
                >
                  Zwolnij z płatności w tym miesiącu
                </DropdownItem>
              </>
            )}
            {status == 'exempt' && (
              <DropdownItem
                startContent={<TextPeriodAsterisk20Filled />}
                onPress={() => handleCancelExemption(paymentId)}
              >
                Anuluj zwolnienie z płatności
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </div>
    </li>
  );
};
