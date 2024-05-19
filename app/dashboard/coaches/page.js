'use client';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import {Search12Regular, ShieldPersonAdd20Filled} from '@fluentui/react-icons';
import {Button, Input} from '@nextui-org/react';
import styles from './CoachesPage.module.css';
import CoachCard from './components/CoachCard/CoachCard';

const CoachesPage = () => {
  return (
    <MainLayout>
      <ContentContainer>
        <PageTitle title="Trenerzy" />
        <div className={styles.toolbar}>
          <div className={styles.buttonsContainer}>
            <Button color="primary" endContent={<ShieldPersonAdd20Filled />}>
              Dodaj trenera
            </Button>
          </div>
          <div className={styles.inputContainer}>
            <Input
              classNames={{base: styles.inputBase, inputWrapper: styles.inputWrapper}}
              isClearable
              startContent={<Search12Regular />}
              placeholder="Wyszukaj trenera"
            />
          </div>
        </div>
        <ul className={styles.coachesList}>
          <CoachCard
            name="Jan Kowalski"
            groups={[
              {name: 'Boks', color: 'red'},
              {name: 'Kickboxing Dinusie', color: 'blue'},
              {name: 'Yoga', color: 'yellow'},
              {name: 'Cardio Kickboxing', color: 'green'},
            ]}
            imgSrc="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            phoneNumber="533209761"
            email="jan.kowalski@gmail.com"
          />
          <CoachCard
            name="Agata Nowak"
            groups={[
              {name: 'Kickboxing Dorośli', color: 'black'},
              {name: 'Kickboxing Kadeci', color: 'purple'},
            ]}
            imgSrc="https://i.pravatar.cc/150"
            phoneNumber="533209761"
            email="jan.kowalski@gmail.com"
          />
          <CoachCard
            name="Jan Kowalski"
            groups={[
              {name: 'Boks', color: 'red'},
              {name: 'Kickboxing Dinusie', color: 'blue'},
              {name: 'Yoga', color: 'yellow'},
              {name: 'Cardio Kickboxing', color: 'green'},
            ]}
            imgSrc="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            phoneNumber="533209761"
            email="jan.kowalski@gmail.com"
          />
          <CoachCard
            name="Agata Nowak"
            groups={[
              {name: 'Kickboxing Dorośli', color: 'black'},
              {name: 'Kickboxing Kadeci', color: 'purple'},
            ]}
            imgSrc="https://i.pravatar.cc/150"
            phoneNumber="533209761"
            email="jan.kowalski@gmail.com"
          />
          <CoachCard
            name="Jan Kowalski"
            groups={[
              {name: 'Boks', color: 'red'},
              {name: 'Kickboxing Dinusie', color: 'blue'},
              {name: 'Yoga', color: 'yellow'},
              {name: 'Cardio Kickboxing', color: 'green'},
            ]}
            imgSrc="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            phoneNumber="533209761"
            email="jan.kowalski@gmail.com"
          />
        </ul>
      </ContentContainer>
    </MainLayout>
  );
};

export default CoachesPage;
