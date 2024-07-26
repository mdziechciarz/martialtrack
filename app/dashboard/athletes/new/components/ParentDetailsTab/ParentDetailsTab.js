import ParentCard from './components/ParentCard/ParentCard';
import styles from './ParentDetailsTab.module.css';

const ParentDetailsView = () => {
  return (
    <div className={styles.mainContainer}>
      <ParentCard />
      <ParentCard />
    </div>
  );
};

export default ParentDetailsView;
