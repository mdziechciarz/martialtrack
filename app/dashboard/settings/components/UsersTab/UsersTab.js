import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from '@nextui-org/react';
import {toast} from 'sonner';

import {inviteNewUser} from '../../actions';
import InviteUserModal from './components/InviteUserModal/InviteUserModal';

import Card from '@/components/Card/Card';
import {
  Delete16Regular,
  Dismiss16Regular,
  LockClosed16Regular,
  MoreVertical20Regular,
  PersonAdd16Filled,
  PersonEdit20Regular,
} from '@fluentui/react-icons';

import styles from './UsersTab.module.css';

export default function UsersTab() {
  const handleInviteUser = async () => {
    const response = await inviteNewUser({email, role: 'admin'});

    if (response.success) {
      toast.success('Użytkownik został zaproszony');
    } else {
      toast.error('Wystąpił błąd podczas zapraszania użytkownika');
    }
  };

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onOpenChange: onModalOpenChange,
  } = useDisclosure();

  return (
    <div>
      <InviteUserModal isOpen={isModalOpen} onOpenChange={onModalOpenChange} />
      <div className={styles.headerContainer}>
        <h3
        // style={{
        //   fontSize: '20px',
        // }}
        >
          Zarządzaj użytkownikami systemu
        </h3>
        <Button onPress={onModalOpen} color="primary" endContent={<PersonAdd16Filled />}>
          Zaproś nowego użytkownika
        </Button>
      </div>
      <div className={styles.usersContainer}>
        <UserCard
          id="1"
          name="Adam Kowalski"
          email="adam.kowalski@gmail.com"
          role="Administrator"
        />
        <UserCard id="2" name="Jan Nowak" email="jan.nowak@gmail.com" role="Użytkownik" />
        <UserCard
          id="3"
          name="Katarzyna Wiśniewska"
          email="k.wisniewska@gmail.com"
          role="Użytkownik Trener"
        />
        <UserCard
          id="4"
          name="Michał Lewandowski"
          email="m.lewyand@gmail.comhfkjhjkhkjhjkhkj"
          role="Trener"
        />
        <InvitedUserCard name="Piotr Zieliński" email="piotr.zielinski@gmail.com" role="Trener" />
      </div>
    </div>
  );
}

const UserCard = ({id, name, email, role}) => {
  return (
    <Card>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '100%',
          overflow: 'hidden',
          gap: '8px',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <div className={styles.avatarContainer}>
            <Avatar name={name} />
          </div>
          <div
            className={styles.detailsContainer}
            style={{textWrap: 'wrap', lineBreak: 'anywhere'}}
          >
            <p>{name}</p>
            <p style={{fontSize: 14}}>{email}</p>
            <p
              style={{
                fontSize: 14,
                color: '#888',
              }}
            >
              {role}
            </p>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="light">
                <MoreVertical20Regular />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem endContent={<PersonEdit20Regular />}>Zmień rolę</DropdownItem>
              <DropdownItem endContent={<LockClosed16Regular />}>Zawieś dostęp</DropdownItem>
              <DropdownItem color="danger" className="text-danger" endContent={<Delete16Regular />}>
                Usuń użytkownika
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </Card>
  );
};

const InvitedUserCard = ({id, name, email, role}) => {
  return (
    <Card style={{backgroundColor: '#f0f0f0', border: '1px solid #ddd'}}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '100%',
          overflow: 'hidden',
          gap: '8px',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.5}}>
          <div className={styles.avatarContainer}>
            <Avatar name={name} />
          </div>
          <div
            className={styles.detailsContainer}
            style={{textWrap: 'wrap', lineBreak: 'anywhere'}}
          >
            <p>{name}</p>
            <p style={{fontSize: 14}}>{email}</p>
            <p
              style={{
                fontSize: 14,
                color: '#888',
              }}
            >
              {role}
            </p>
            <p style={{fontSize: 14, color: '#888'}}>(Zaproszenie wysłane)</p>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="light">
                <MoreVertical20Regular />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem endContent={<Dismiss16Regular />}>Anuluj zaproszenie</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </Card>
  );
};
