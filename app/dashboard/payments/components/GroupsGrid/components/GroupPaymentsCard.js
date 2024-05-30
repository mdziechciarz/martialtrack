import Card from '@/components/Card/Card';
import {Chip, User} from '@nextui-org/react';
import styles from './GroupPaymentsCard.module.css';

const GroupPaymentsCard = ({
  groupName,
  color,
  paidCount,
  toBePaidCount,
  amountPaid,
  amountToBePaid,
  payers,
}) => {
  const unPaidPayers = payers.filter(payer => !payer.isPaid);
  const paidPayers = payers.filter(payer => payer.isPaid);

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
                key={payer.name}
                name={payer.name}
                amount={payer.amount}
                isPaid={payer.isPaid}
              />
            ))}
          </ul>
          <ul className={styles.paidList}>
            {paidPayers.map(payer => (
              <Payer
                key={payer.name}
                name={payer.name}
                amount={payer.amount}
                isPaid={payer.isPaid}
              />
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default GroupPaymentsCard;

const Payer = ({name, amount, isPaid}) => {
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
      {isPaid ? (
        <Chip color="success" variant="flat" className={styles.chip}>
          {amount} PLN
        </Chip>
      ) : (
        <Chip color="danger" variant="flat" className={styles.chip}>
          -{amount} PLN
        </Chip>
      )}
    </li>
  );
};
