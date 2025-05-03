import Card, {CardEntries} from '@/components/Card/Card';
import AvatarNameRoleCard from './components/AvatarNameRoleCard/AvatarNameRoleCard';

import styles from './UserProfileTab.module.css';

export default function UserProfileTab() {
  return (
    <div className={styles.grid}>
      <AvatarNameRoleCard
        name="Adam Zieliński"
        avatarSrc={'https://i.pravatar.cc/150'}
        role="Administrator"
      />
      <Card title="Dane logowania" isEditable>
        <CardEntries
          entries={{
            'E-mail': 'john.doe18@gmail.com',
            Hasło: '••••••••••••••',
          }}
        />
      </Card>
    </div>
  );
}
