import Image from 'next/image';
import styles from './CoachCard.module.css';

const CoachCard = ({imgSrc, name}) => (
  <div className={styles.container}>
    Trener:
    <Image src={imgSrc} alt={name} width={24} height={24} className={styles.avatar} />
    <span className={styles.name}>{name}</span>
  </div>
);

export default CoachCard;
