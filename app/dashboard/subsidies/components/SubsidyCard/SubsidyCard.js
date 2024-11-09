import {Button, Chip, useDisclosure} from '@nextui-org/react';

import {
  Calendar24Regular,
  CircleSmall20Regular,
  DataPie20Regular,
  Edit16Regular,
  Money16Regular,
  People16Regular,
} from '@fluentui/react-icons';

import ApplicationModal from '../ApplicationModal/ApplicationModal';
import MoreInfoModal from '../MoreInfoModal/MoreInfoModal';

import styles from './SubsidyCard.module.css';

export default function SubsidyCard({
  id,
  title,
  description,
  deadline,
  operator,
  participantsAge,
  ownContribution,
  amount,
}) {
  const {
    isOpen: isMoreInfoModalOpen,
    onOpen: onMoreInfoModalOpen,
    onOpenChange: onMoreInfoModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: isApplicationModalOpen,
    onOpen: onApplicationModalOpen,
    onOpenChange: onApplicationModalOpenChange,
  } = useDisclosure();

  return (
    <>
      <MoreInfoModal
        isOpen={isMoreInfoModalOpen}
        onOpenChange={onMoreInfoModalOpenChange}
        handleOpenApplicationModal={onApplicationModalOpen}
      />
      <ApplicationModal
        isOpen={isApplicationModalOpen}
        onOpenChange={onApplicationModalOpenChange}
        subsidyInfo={{
          id,
          title,
          description,
          deadline,
          operator,
          participantsAge,
          ownContribution,
          amount,
        }}
      />
      <div className={styles.subsidyCardContainer}>
        <div className={styles.subsidyContentContainer}>
          <div className={styles.nameAndDescriptionContainer}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
          </div>
          <div className={styles.detailsContainer}>
            <SubsidyDetail label="Termin naboru" text={deadline} icon={<Calendar24Regular />} />
            <SubsidyDetail label="Operator" text={operator} icon={<Edit16Regular />} />
            <SubsidyDetail
              label="Wiek uczestników"
              text={participantsAge}
              icon={<People16Regular />}
            />
            <SubsidyDetail
              label="Wkład własny"
              text={ownContribution}
              icon={<DataPie20Regular />}
            />
            <SubsidyDetail label="Kwota dotacji" text={amount} icon={<Money16Regular />} />
          </div>
        </div>
        <div className={styles.subsidyButtonsContainer}>
          <Button variant="bordered" onClick={onMoreInfoModalOpen}>
            Szczegóły
          </Button>
          <Button color="primary" onClick={onApplicationModalOpen}>
            Złóż wniosek
          </Button>
        </div>
      </div>
    </>
  );
}

export const SubisdyCardWithStatus = ({
  status,
  id,
  title,
  description,
  deadline,
  operator,
  participantsAge,
  ownContribution,
  amount,
}) => {
  const statusColorMap = {
    'Oczekuje na przyjęcie': 'default',
    'W toku': 'warning',
    Zakończone: 'success',
    Odrzucone: 'danger',
  };

  return (
    <div className={styles.subsidyCardContainer}>
      <div className={styles.subsidyContentContainer}>
        <div className={styles.nameAndDescriptionContainer}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.detailsContainer}>
          <SubsidyDetail label="Termin naboru" text={deadline} icon={<Calendar24Regular />} />
          <SubsidyDetail label="Operator" text={operator} icon={<Edit16Regular />} />
          <SubsidyDetail
            label="Wiek uczestników"
            text={participantsAge}
            icon={<People16Regular />}
          />
          <SubsidyDetail label="Wkład własny" text={ownContribution} icon={<DataPie20Regular />} />
          <SubsidyDetail label="Kwota dotacji" text={amount} icon={<Money16Regular />} />
        </div>
      </div>
      <div className={styles.statusContainer}>
        <Chip color={statusColorMap[status] || 'default'} variant="flat">
          {status}
        </Chip>
      </div>
    </div>
  );
};

const SubsidyDetail = ({icon, label, text}) => {
  return (
    <div className={styles.detailContainer}>
      <div className={styles.detailIcon}>{icon || <CircleSmall20Regular />}</div>
      <div className={styles.detailContent}>
        <p className={styles.detailText}>
          {label && `${label}: `}
          {text}
        </p>
      </div>
    </div>
  );
};
