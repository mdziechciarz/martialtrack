import ScheduledMessagesTable from './components/Table/Table';
import styles from './ScheduledMessagesTab.module.css';

const ScheduledMessagesTab = () => {
  return (
    <div className={styles.container}>
      <ScheduledMessagesTable />
    </div>
  );
};

export default ScheduledMessagesTab;
