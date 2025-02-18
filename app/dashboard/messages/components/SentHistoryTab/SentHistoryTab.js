import SentMessagesTable from './components/Table/Table';
import styles from './SentHistoryTab.module.css';

const SentHistoryTab = ({messages, isLoading, handleRemoveMessage}) => {
  return (
    <div className={styles.container}>
      <SentMessagesTable
        messages={messages}
        isLoading={isLoading}
        handleRemoveMessage={handleRemoveMessage}
      />
    </div>
  );
};

export default SentHistoryTab;
