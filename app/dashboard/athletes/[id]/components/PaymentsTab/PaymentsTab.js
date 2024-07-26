import Card, {CardEntries} from '@/components/Card/Card';
import {Select, SelectItem, Switch} from '@nextui-org/react';
import {useState} from 'react';
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
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Card
      title="Ustawienia składek"
      isEditable
      isEditMode={isEditMode}
      setIsEditMode={setIsEditMode}
    >
      {isEditMode ? <EditModeContent /> : <ReadOnlyModeContent />}
    </Card>
  );
};

const ReadOnlyModeContent = () => {
  return (
    <CardEntries
      entries={{
        'Zwolniony z płatności': <Switch isDisabled size="sm" />,
        'Rodzaj karnetu': '120 PLN (Podstawowy)',
      }}
    />
  );
};

const EditModeContent = () => {
  return (
    <CardEntries
      entries={{
        'Zwolniony z płatności': <Switch size="sm" />,
        'Rodzaj karnetu': <MembershipTypeSelect />,
      }}
    />
  );
};

const MembershipTypeSelect = () => {
  return (
    <Select size="sm" defaultSelectedKeys="1">
      <SelectItem key="1">120 PLN (Podstawowy)</SelectItem>
      <SelectItem key="2">150 PLN (Rozszerzony)</SelectItem>
      <SelectItem key="3">180 PLN (Premium)</SelectItem>
    </Select>
  );
};
