import styles from './OrdersTab.module.css';
import OrdersTable from './components/OrdersTable/OrdersTable';

const OrdersTab = () => {
  return (
    <div className={styles.container}>
      <OrdersTable />
    </div>
  );
};

export default OrdersTab;
