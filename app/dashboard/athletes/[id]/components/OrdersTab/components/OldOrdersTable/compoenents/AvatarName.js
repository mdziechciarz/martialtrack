import Image from 'next/image';
import {useRouter} from 'next/navigation';

import styles from './AvatarName.module.css';

const AvaratName = ({id, imgSrc, name}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/dashboard/athletes/${id}`);
  };

  return (
    <div onClick={handleClick} className={styles.avatarNameContainer}>
      <Image src={imgSrc} alt={name} width={24} height={24} className={styles.avatar} />
      <span className={styles.name}>{name}</span>
    </div>
  );
};

export default AvaratName;
