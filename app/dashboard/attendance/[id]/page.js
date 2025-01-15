'use client';

import {
  ArrowDownload20Filled,
  Checkmark20Filled,
  ChevronDown16Filled,
  Edit16Regular,
} from '@fluentui/react-icons';
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import {useState} from 'react';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import AttendanceCheckSection from './components/AttendanceCheckSection/AttendanceCheckSection';
import ClassDescription from './components/ClassDescription/ClassDescription';
import ClassSummarySection from './components/ClassSummarySection/ClassSummarySection';

import styles from './AttendanceCheckPage.module.css';

const AttendanceCheckPage = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSaveList = () => {
    setIsEditMode(false);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  return (
    <MainLayout>
      <ContentContainer>
        <PageTitle title="Lista obecności" />
        <ClassDescription
          name="Kickboxing Zawodnicy"
          color="red"
          times="19:30 - 21:00"
          date="Pon, 04 paź 2024"
        />
        {isEditMode ? (
          <EditModeButtons handleSaveList={handleSaveList} />
        ) : (
          <ViewModeButtons handleEdit={handleEdit} />
        )}
        <ClassSummarySection isEditMode={isEditMode} />
        <AttendanceCheckSection isEditMode={isEditMode} />
      </ContentContainer>
    </MainLayout>
  );
};

export default AttendanceCheckPage;

const EditModeButtons = ({handleSaveList}) => {
  return (
    <div className={styles.buttonsContainer}>
      <Button className={styles.cancelButton}>Anuluj</Button>
      <Button
        onClick={handleSaveList}
        endContent={<Checkmark20Filled />}
        className={styles.mainButton}
        color="primary"
      >
        Zapisz listę
      </Button>
    </div>
  );
};

const ViewModeButtons = ({handleEdit}) => {
  return (
    <div className={styles.buttonsContainer}>
      <Button onClick={handleEdit} className={styles.editButton} startContent={<Edit16Regular />}>
        Edytuj
      </Button>
      <Buttons />
    </div>
  );
};

const Buttons = () => {
  return (
    <ButtonGroup className={styles.buttonsGroup} color="primary">
      <Button className={styles.mainButton} startContent={<ArrowDownload20Filled />}>
        Pobierz listę
      </Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly>
            <ChevronDown16Filled />
          </Button>
        </DropdownTrigger>
        <DropdownMenu className="max-w-[300px]">
          <DropdownItem key="1">Opcja 1</DropdownItem>
          <DropdownItem key="2">Opcja 2</DropdownItem>
          <DropdownItem key="3">Opcja 3</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
};
