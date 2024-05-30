import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import AttendanceSection from './components/AttendanceSection/AttendanceSection';
import CompetitionsSection from './components/CompetitionsSection/CompetitionsSection';
import FeaturedAthletesSection from './components/FeaturedAthletesSection/FeaturedAthletesSection';
import Header from './components/Header/Header';
import banner from './components/Header/banner.jpg';
import clubLogo from './components/Header/logo.png';
import StatsSection from './components/StatsSection/StatsSection';

import FAB from '@/components/FAB/FAB';
import styles from './StartPage.module.css';

const StartPage = () => {
  return (
    <MainLayout>
      <Header bannerSrc={banner} clubLogosrc={clubLogo} />
      <ContentContainer>
        <div className={styles.contentContainer}>
          <StatsSection />
          <CompetitionsSection />
          <FeaturedAthletesSection />
          <AttendanceSection />
          <FAB />
        </div>
      </ContentContainer>
    </MainLayout>
  );
};

export default StartPage;
