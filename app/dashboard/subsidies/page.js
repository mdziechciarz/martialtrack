'use client';

import {Tab, Tabs} from '@nextui-org/react';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';

import SubsidyCard, {SubisdyCardWithStatus} from './components/SubsidyCard/SubsidyCard';

import styles from './SubsidiesPage.module.css';

const SubsidiesPage = () => {
  return (
    <MainLayout>
      <ContentContainer>
        <PageTitle title="Dotacje" />
        <Tabs
          variant="underlined"
          color="primary"
          activeIndex={0}
          onChange={index => console.log(index)}
          classNames={{
            base: styles.tabsBase,
            tabList: styles.tabList,
            cursor: styles.tabCursor,
            tab: styles.tab,
            panel: styles.tabPanel,
          }}
        >
          <Tab key="active" title="Dostępne (4)">
            <ul className={styles.subsidiesList}>
              <SubsidyCard
                id="1"
                title="Nabór ofert w trybie art. 19a - Wspieranie i upowszechnianie kultury fizycznej 2024"
                description="Nabór wniosków dla klubów sportowych na realizację zadań publicznych w związku z uzyskaniem awansu zawodnika lub zespołu do udziału w mistrzostwach Europy/świata."
                deadline="2024-03-02"
                participantsAge="Dzieci od 6 do 12 lat"
                operator="Wydział Kultury i Sportu (sport)"
                ownContribution="12%"
                amount="do 15 tys. zł"
              />
              <SubsidyCard
                id="1"
                title="Nabór ofert w trybie art. 19a - Wspieranie i upowszechnianie kultury fizycznej 2024"
                description="Nabór wniosków dla klubów sportowych na realizację zadań publicznych w związku z uzyskaniem awansu zawodnika lub zespołu do udziału w mistrzostwach Europy/świata."
                deadline="2024-03-02"
                participantsAge="Dzieci od 6 do 12 lat"
                operator="Wydział Kultury i Sportu (sport)"
                ownContribution="12%"
                amount="do 15 tys. zł"
              />
              <SubsidyCard
                id="1"
                title="Nabór ofert w trybie art. 19a - Wspieranie i upowszechnianie kultury fizycznej 2024"
                description="Nabór wniosków dla klubów sportowych na realizację zadań publicznych w związku z uzyskaniem awansu zawodnika lub zespołu do udziału w mistrzostwach Europy/świata."
                deadline="2024-03-02"
                participantsAge="Dzieci od 6 do 12 lat"
                operator="Wydział Kultury i Sportu (sport)"
                ownContribution="12%"
                amount="do 15 tys. zł"
              />
              <SubsidyCard
                id="1"
                title="Nabór ofert w trybie art. 19a - Wspieranie i upowszechnianie kultury fizycznej 2024"
                description="Nabór wniosków dla klubów sportowych na realizację zadań publicznych w związku z uzyskaniem awansu zawodnika lub zespołu do udziału w mistrzostwach Europy/świata."
                deadline="2024-03-02"
                participantsAge="Dzieci od 6 do 12 lat"
                operator="Wydział Kultury i Sportu (sport)"
                ownContribution="12%"
                amount="do 15 tys. zł"
              />
            </ul>
          </Tab>
          <Tab key="in_progress" title="W toku (2)">
            <ul className={styles.subsidiesList}>
              <SubisdyCardWithStatus
                id="1"
                status="Oczekuje na przyjęcie"
                title="Nabór ofert w trybie art. 19a - Wspieranie i upowszechnianie kultury fizycznej 2024"
                description="Nabór wniosków dla klubów sportowych na realizację zadań publicznych w związku z uzyskaniem awansu zawodnika lub zespołu do udziału w mistrzostwach Europy/świata."
                deadline="2024-03-02"
                participantsAge="Dzieci od 6 do 12 lat"
                operator="Wydział Kultury i Sportu (sport)"
                ownContribution="12%"
                amount="do 15 tys. zł"
              />
              <SubisdyCardWithStatus
                id="1"
                status="W toku"
                title="Nabór ofert w trybie art. 19a - Wspieranie i upowszechnianie kultury fizycznej 2024"
                description="Nabór wniosków dla klubów sportowych na realizację zadań publicznych w związku z uzyskaniem awansu zawodnika lub zespołu do udziału w mistrzostwach Europy/świata."
                deadline="2024-03-02"
                participantsAge="Dzieci od 6 do 12 lat"
                operator="Wydział Kultury i Sportu (sport)"
                ownContribution="12%"
                amount="do 15 tys. zł"
              />
            </ul>
          </Tab>
          <Tab key="history" title="Archiwum (3)">
            <ul className={styles.subsidiesList}>
              <SubisdyCardWithStatus
                id="1"
                status="Zakończone"
                title="Nabór ofert w trybie art. 19a - Wspieranie i upowszechnianie kultury fizycznej 2024"
                description="Nabór wniosków dla klubów sportowych na realizację zadań publicznych w związku z uzyskaniem awansu zawodnika lub zespołu do udziału w mistrzostwach Europy/świata."
                deadline="2024-03-02"
                participantsAge="Dzieci od 6 do 12 lat"
                operator="Wydział Kultury i Sportu (sport)"
                ownContribution="12%"
                amount="do 15 tys. zł"
              />
              <SubisdyCardWithStatus
                id="1"
                status="Odrzucone"
                title="Nabór ofert w trybie art. 19a - Wspieranie i upowszechnianie kultury fizycznej 2024"
                description="Nabór wniosków dla klubów sportowych na realizację zadań publicznych w związku z uzyskaniem awansu zawodnika lub zespołu do udziału w mistrzostwach Europy/świata."
                deadline="2024-03-02"
                participantsAge="Dzieci od 6 do 12 lat"
                operator="Wydział Kultury i Sportu (sport)"
                ownContribution="12%"
                amount="do 15 tys. zł"
              />
              <SubisdyCardWithStatus
                id="1"
                status="Odrzucone"
                title="Nabór ofert w trybie art. 19a - Wspieranie i upowszechnianie kultury fizycznej 2024"
                description="Nabór wniosków dla klubów sportowych na realizację zadań publicznych w związku z uzyskaniem awansu zawodnika lub zespołu do udziału w mistrzostwach Europy/świata."
                deadline="2024-03-02"
                participantsAge="Dzieci od 6 do 12 lat"
                operator="Wydział Kultury i Sportu (sport)"
                ownContribution="12%"
                amount="do 15 tys. zł"
              />
            </ul>
          </Tab>
        </Tabs>
      </ContentContainer>
    </MainLayout>
  );
};

export default SubsidiesPage;
