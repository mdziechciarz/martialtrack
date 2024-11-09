import AvatarCard from './components/AvatarCard/AvatarCard';
// import Card from './components/Card/Card';
import AddressCard from './components/AddressCard/AddressCard';
import ContactCard from './components/ContactCard/ContactCard';
import GroupsCard from './components/GroupsCard/GroupsCard';
import OtherDetailsCard from './components/OtherDetailsCard/OtherDetailsCard';
import PersonalDetailsCard from './components/PersonalDetailsCard/PersonalDetailsCard';

import styles from './AthleteDetailsTab.module.css';
import GradingsCard from './components/GradingsCard/GradingsCard';
import LicensesCard from './components/LicensesCard/LicensesCard';

const AthleteDetailsView = () => {
  return (
    <div className={styles.mainContainer}>
      <AvatarCard className={styles.avatarCard} />
      <PersonalDetailsCard />
      <AddressCard />
      <ContactCard />
      <GroupsCard className={styles.groupsCard} />
      <GradingsCard />
      <LicensesCard />
      <OtherDetailsCard />
    </div>
  );
};

export default AthleteDetailsView;
