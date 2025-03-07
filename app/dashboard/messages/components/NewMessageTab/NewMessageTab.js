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
  useDisclosure,
} from '@nextui-org/react';
import {useState} from 'react';
import {useForm} from 'react-hook-form';

import Card from '@/components/Card/Card';
import RecipientsCard from './components/RecipientsCard/RecipientsCard';
import ScheduleSendingModal from './components/ScheduleSendingModal/ScheduleSendingModal';

import {toast, Toaster} from 'sonner';
import {sendSMSMessage} from '../../actions';
import styles from './NewMessageTab.module.css';

const NewMessageTab = ({handleFetchMessages}) => {
  const {
    isOpen: isScheduleSendingModalOpen,
    onOpen: onScheduleSendingModalOpen,
    onOpenChange: onScheduleSendingModalOpenChange,
  } = useDisclosure();

  const [selectedRecipients, setSelectedRecipients] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    clearErrors,
    formState: {errors},
  } = useForm({
    defaultValues: {
      messageType: 'sms',
      title: '',
      messageContent: '',
    },
  });

  const onSubmit = data => {
    if (selectedRecipients.length === 0) {
      toast.error('Nie wybrano odbiorców');
      return;
    }

    data.recipients = selectedRecipients;

    handleSendMessage(data);
  };

  const handleSendMessage = async data => {
    const response = await sendSMSMessage({
      recipients: data.recipients,
      message: data.messageContent,
    });

    if (response.success) {
      toast.success('Wiadomość została wysłana');
      handleFetchMessages();
    } else {
      toast.error('Wystąpił błąd podczas wysyłania wiadomości');
    }
  };

  const handleScheduleSending = handleSubmit(data => {
    // Check if recipients are selected
    if (selectedRecipients.length === 0) {
      toast.error('Nie wybrano odbiorców');
      return;
    }
    onScheduleSendingModalOpen();
  });

  return (
    <>
      <Toaster richColors position="bottom-center" />
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.buttonsContainer}>
          <Button className={styles.cancelButton}>Anuluj</Button>
          <Buttons onScheduleSendingClick={handleScheduleSending} />
          <ScheduleSendingModal
            isOpen={isScheduleSendingModalOpen}
            onOpenChange={onScheduleSendingModalOpenChange}
          />
        </div>
        <div className={styles.grid}>
          <MessageTypeSelectorCard register={register} errors={errors} />
          <RecipientsCard
            className={styles.recipientsCard}
            register={register}
            errors={errors}
            control={control}
            selectedRecipients={selectedRecipients}
            setSelectedRecipients={setSelectedRecipients}
          />
          <MessageContentCard register={register} errors={errors} clearErrors={clearErrors} />
        </div>
      </form>
    </>
  );
};

export default NewMessageTab;

const MessageTypeSelectorCard = ({register, errors}) => {
  return (
    <Card title="Typ wiadomości" className={styles.messageTypeSelectorCard}>
      <div>
        <Select
          label="Typ wiadomości"
          // defaultSelectedKeys={['sms']}
          isRequired
          // disallowEmptySelection
          isInvalid={!!errors.messageType}
          {...register('messageType', {required: true})}
          validationBehavior="aria"
          disabledKeys={['email']}
        >
          <SelectItem key="sms">SMS</SelectItem>
          <SelectItem key="email">E-mail</SelectItem>
        </Select>
      </div>
    </Card>
  );
};

const MessageContentCard = ({register, errors, clearErrors}) => {
  return (
    <Card title="Treść" className={styles.messageContentCard}>
      <div className={styles.messageContentContainer}>
        <Input
          label="Tytuł"
          className={styles.messageTitle}
          isRequired
          isInvalid={!!errors.title}
          {...register('title', {required: true, onchange: () => clearErrors('title')})}
          validationBehavior="aria"
        />
        <Textarea
          label="Treść wiadomości"
          minRows={8}
          className={styles.textarea}
          isRequired
          isInvalid={!!errors.messageContent}
          {...register('messageContent', {
            required: true,
            onchange: () => clearErrors('messageContent'),
          })}
          validationBehavior="aria"
        />
      </div>
    </Card>
  );
};

const Buttons = ({onScheduleSendingClick = () => {}}) => {
  return (
    <ButtonGroup className={styles.buttonsGroup} color="primary">
      <Button type="submit" className={styles.mainButton} startContent={<Send16Filled />}>
        Wyślij wiadomość
      </Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly>
            <ChevronDown16Filled />
          </Button>
        </DropdownTrigger>
        <DropdownMenu className="max-w-[300px]">
          <DropdownItem
            type="submit"
            key="1"
            startContent={<Calendar16Regular />}
            onClick={onScheduleSendingClick}
          >
            Zaplanuj wysłanie
          </DropdownItem>
          {/* <DropdownItem key="2">Opcja 2</DropdownItem> */}
          {/* <DropdownItem key="3">Opcja 3</DropdownItem> */}
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
};
