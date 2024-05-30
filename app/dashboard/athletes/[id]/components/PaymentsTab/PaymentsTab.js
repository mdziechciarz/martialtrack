import Card, {CardEntries} from '@/components/Card/Card';
import {Switch} from '@nextui-org/react';
import styles from './PaymentsTab.module.css';
import PaymentsTable from './components/PaymentsTable/PaymentsTable';

const PaymentsView = () => {
  return (
    <div className={styles.container}>
      <PaymentOptionsCard />
      <PaymentsTable />
    </div>
  );
};

export default PaymentsView;

const PaymentOptionsCard = () => {
  return (
    <Card title="Ustawienia składek" isEditable>
      <CardEntries
        entries={{
          'Zwolniony z płatności': <Switch isDisabled size="sm" />,
          'Rodzaj karnetu': '120 PLN (Podstawowy)',
        }}
      />
    </Card>
  );
};
