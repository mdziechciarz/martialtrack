import {Call16Filled, Mail24Filled, MoreVertical16Filled} from '@fluentui/react-icons';
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Ripple,
  useRipple,
} from '@nextui-org/react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';

import {useRef} from 'react';
import styles from './CoachCard.module.css';

const CoachCard = ({name, groups = [], imgSrc, phoneNumber, email}) => {
  const router = useRouter();

  const domRef = useRef(null);
  const {onClick: onRippleClickHandler, onClear: onRippleClear, ripples} = useRipple();

  const handleClick = e => {
    domRef.current && onRippleClickHandler(e);
    router.push('/dashboard/coaches/1');
  };

  return (
    <li
      className={styles.container}
      onClick={handleClick}
      style={{position: 'relative', overflow: 'hidden'}}
      ref={domRef}
    >
      <Ripple onClear={onRippleClear} ripples={ripples} />
      <OptionsButton />
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

const OptionsButton = ({onClick}) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className={styles.optionsButton} variant="light" isIconOnly>
          <MoreVertical16Filled />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem>Usuń</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
