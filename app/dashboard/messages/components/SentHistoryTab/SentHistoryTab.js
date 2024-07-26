import SentMessagesTable from './components/Table/Table';
import styles from './SentHistoryTab.module.css';

const SentHistoryTab = () => {
  return (
    <div className={styles.container}>
      <SentMessagesTable />
    </div>
  );
};

export default SentHistoryTab;
