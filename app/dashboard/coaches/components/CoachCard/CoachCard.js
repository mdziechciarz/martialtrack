import {Call16Filled, Mail24Filled} from '@fluentui/react-icons';
import {Chip} from '@nextui-org/react';
import Image from 'next/image';
import styles from './CoachCard.module.css';

const CoachCard = ({name, groups = [], imgSrc, phoneNumber, email}) => {
  return (
    <li className={styles.container}>
      <div className={styles.avatarWrapper}>
        <Image className={styles.avatar} src={imgSrc} alt="Avatar" width={300} height={300} />
      </div>
      <h3 className={styles.name}>{name}</h3>
      <ul className={styles.groupsList}>
        {groups.map(group => (
          <li key={group.name} className={styles.group}>
            <Chip
              variant="dot"
              classNames={{base: styles.chipBase, dot: styles.chipDot}}
              style={{'--dot-color': group.color}}
            >
              {group.name}
            </Chip>
          </li>
        ))}
      </ul>
      <div className={styles.contactInfoContainer}>
        <p className={styles.phoneNumber}>
          <Call16Filled />
          {phoneNumber}
        </p>
        <p className={styles.email}>
          <Mail24Filled />
          {email}
        </p>
      </div>
    </li>
  );
};

export default CoachCard;
