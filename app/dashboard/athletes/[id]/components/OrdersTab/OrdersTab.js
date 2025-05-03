import Card from '@/components/Card/Card';
import styles from './OrdersTab.module.css';
import OrdersTable from './components/OrdersTable/OrdersTable';

const OrdersTab = ({orders = [], refetchAthleteData, athleteId}) => {
  return (
    <div className={styles.container}>
      <Card title="Zamówienia">
        <OrdersTable
          orders={orders}
          refetchAthleteData={refetchAthleteData}
          athleteId={athleteId}
        />
      </Card>
    </div>
  );
};

export default OrdersTab;
