import {Add16Filled} from '@fluentui/react-icons';
import {Button} from '@nextui-org/react';

import ParentCard from './components/ParentCard/ParentCard';

import styles from './ParentDetailsTab.module.css';

const ParentDetailsView = () => {
  return (
    <div className={styles.mainContainer}>
      <ParentCard />
      {/* <ParentCard /> */}
      <AddParentButton />
    </div>
  );
};

const AddParentButton = () => {
  return (
    <Button
      className={styles.addParentButton}
      styles={{height: 390}}
      // icon={<Add16Filled />}
      // isIconOnly
      fullWidth
      variant="ghost"
    >
      {/* Dodaj rodzica */}
      <Add16Filled />
    </Button>
  );
};

export default ParentDetailsView;
