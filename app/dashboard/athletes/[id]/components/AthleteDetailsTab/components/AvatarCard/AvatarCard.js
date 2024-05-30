import Image from 'next/image';
import styles from './AvatarCard.module.css';

const AvatarCard = ({children, className = '', name, imgSrc}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.avatarWrapper}>
        <Image className={styles.avatar} src={imgSrc} alt="Avatar" width={300} height={300} />
      </div>
      <h2 className={styles.name}>{name}</h2>
    </div>
  );
};

export default AvatarCard;
