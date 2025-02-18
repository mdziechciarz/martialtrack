'use client';

import {
  Add16Filled,
  ArrowDownload20Filled,
  Checkmark20Filled,
  ChevronDown16Filled,
  Delete16Regular,
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

import Card from '@/components/Card/Card';
import styles from './AttendanceCheckPage.module.css';

const AttendanceCheckPage = () => {
  const [isFilled, setIsFilled] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);

  const handleSaveList = () => {
    setIsEditMode(false);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleStartFilling = () => {
    setIsEditMode(true);
    setIsFilled(true);
  };

  const handleDeleteList = () => {
    setIsFilled(false);
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
        {isFilled ? (
          <FilledContent
            isEditMode={isEditMode}
            handleSaveList={handleSaveList}
            handleEdit={handleEdit}
            handleDeleteList={handleDeleteList}
          />
        ) : (
          <EmptyContent handleStartFilling={handleStartFilling} />
        )}
      </ContentContainer>
    </MainLayout>
  );
};

const EmptyContent = ({handleStartFilling}) => {
  return (
    <>
      <div className={styles.buttonsContainer}>
        <Button onPress={handleStartFilling} color="primary" startContent={<Add16Filled />}>
          Wypełnij listę
        </Button>
      </div>
      <Card>
        <div style={{height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <p style={{color: '#888'}}>Brak listy obecności</p>
        </div>
      </Card>
    </>
  );
};

const FilledContent = ({isEditMode, handleSaveList, handleEdit, handleDeleteList}) => {
  return (
    <>
      {isEditMode ? (
        <EditModeButtons handleSaveList={handleSaveList} />
      ) : (
        <ViewModeButtons handleEdit={handleEdit} handleDeleteList={handleDeleteList} />
      )}
      <ClassSummarySection isEditMode={isEditMode} />
      <AttendanceCheckSection isEditMode={isEditMode} />
    </>
  );
};

// const

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

const ViewModeButtons = ({handleEdit, handleDeleteList}) => {
  return (
    <div className={styles.buttonsContainer}>
      <Button onClick={handleEdit} className={styles.editButton} startContent={<Edit16Regular />}>
        Edytuj
      </Button>
      <Buttons handleDeleteList={handleDeleteList} />
    </div>
  );
};

const Buttons = ({handleDeleteList}) => {
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
          <DropdownItem key="1">Pobierz raport PDF</DropdownItem>
          <DropdownItem key="2">Opcja 2</DropdownItem>
          <DropdownItem
            onPress={handleDeleteList}
            key="3"
            startContent={<Delete16Regular />}
            color="danger"
          >
            Usuń
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
};
