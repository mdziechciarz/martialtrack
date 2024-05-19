import MainLayout from '@/components/MainLayout/MainLayout';
import styles from './StartPage.module.css';
import Header from './components/Header/Header';
import banner from './components/Header/banner.jpg';
import clubLogo from './components/Header/logo.png';

const StartPage = () => {
  return (
    <MainLayout>
      <div className={styles.contentContainer}>
        <Header bannerSrc={banner} clubLogosrc={clubLogo} />
      </div>
    </MainLayout>
  );
};

export default StartPage;
