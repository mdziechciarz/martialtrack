import Image from 'next/image';
import styles from './Header.module.css';

const Header = ({bannerSrc, clubLogosrc}) => {
  return (
    <header className={styles.header}>
      <Image className={styles.banner} src={bannerSrc} alt="Logo" width={1640} height={214} />
      <Image
        className={styles.clubLogo}
        src={clubLogosrc}
        alt="Club Logo"
        width={150}
        height={150}
      />
    </header>
  );
};

export default Header;
