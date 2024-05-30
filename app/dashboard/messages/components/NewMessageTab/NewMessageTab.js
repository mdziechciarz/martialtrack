import Card from '@/components/Card/Card';
import {Calendar16Regular, ChevronDown16Filled, Send16Filled} from '@fluentui/react-icons';
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react';
import RecipientsCard from './components/RecipientsCard/RecipientsCard';

import styles from './NewMessageTab.module.css';

const NewMessageTab = () => {
  return (
    <div className={styles.container}>
      <div className={styles.buttonsContainer}>
        <Button className={styles.cancelButton}>Anuluj</Button>
        <Buttons />
      </div>
      <div className={styles.grid}>
        <MessageTypeSelectorCard />
        <RecipientsCard className={styles.recipientsCard} />
        <MessageContentCard />
      </div>
    </div>
  );
};

export default NewMessageTab;

const MessageTypeSelectorCard = () => {
  return (
    <Card title="Typ wiadomości" className={styles.messageTypeSelectorCard}>
      <div>
        <Select label="Typ wiadomości">
          <SelectItem label="sms">SMS</SelectItem>
          <SelectItem label="email">E-mail</SelectItem>
        </Select>
      </div>
    </Card>
  );
};

const MessageContentCard = () => {
  return (
    <Card title="Treść" className={styles.messageContentCard}>
      <div className={styles.messageContentContainer}>
        <Input label="Tytuł" className={styles.messageTitle0t} />
        <Textarea label="Treść wiadomości" minRows={8} className={styles.textarea} />
      </div>
    </Card>
  );
};

const Buttons = () => {
  return (
    <ButtonGroup className={styles.buttonsGroup} color="primary">
      <Button className={styles.mainButton} startContent={<Send16Filled />}>
        Wyślij wiadomość
      </Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly>
            <ChevronDown16Filled />
          </Button>
        </DropdownTrigger>
        <DropdownMenu className="max-w-[300px]">
          <DropdownItem key="1" startContent={<Calendar16Regular />}>
            Zaplanuj wysłanie
          </DropdownItem>
          <DropdownItem key="2">Opcja 2</DropdownItem>
          <DropdownItem key="3">Opcja 3</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
};
