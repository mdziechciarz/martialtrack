import {createClient} from '@/utils/supabase/server';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import AttendanceSection from './components/AttendanceSection/AttendanceSection';
import CompetitionsSection from './components/CompetitionsSection/CompetitionsSection';
import FeaturedAthletesSection from './components/FeaturedAthletesSection/FeaturedAthletesSection';
import Header from './components/Header/Header';
import StatsSection from './components/StatsSection/StatsSection';

import FAB from '@/components/FAB/FAB';
import styles from './StartPage.module.css';

const StartPage = async () => {
  const supabase = createClient();

  const {
    data: {user},
  } = await supabase.auth.getUser();

  const {data: userData, error: userError} = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (userData.avatar_src) {
    const {data: userAvatarData, error: userAvatarError} = await supabase.storage
      .from('user_avatars')
      .createSignedUrl(user.id, 60 * 60 * 24 * 30);

    userData.avatar_src = userAvatarData.signedUrl;
  }

  return (
    <MainLayout user={userData}>
      <Header />
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
