import Card from '@/components/Card/Card';
import {ArrowDown16Filled, ArrowExportUp20Filled, ArrowUp16Filled} from '@fluentui/react-icons';
import {Button, Divider, Tooltip} from '@nextui-org/react';
import Image from 'next/image';
import {useState} from 'react';
import styles from './AttendanceCheckSection.module.css';

const initialAttendanceList = [
  {id: 1, name: 'Karol Nowak', imgSrc: 'https://i.pravatar.cc/180', present: true},
  {id: 2, name: 'Joanna Jędrzejczyk', imgSrc: 'https://i.pravatar.cc/144', present: true},
  {id: 3, name: 'Krzysztof Zieliński', imgSrc: 'https://i.pravatar.cc/138', present: true},
  {id: 4, name: 'Adam Warzywo', imgSrc: 'https://i.pravatar.cc/181', present: true},
  {id: 5, name: 'Jan Janowski', imgSrc: 'https://i.pravatar.cc/182', present: true},
  {id: 6, name: 'Adam Adamczyk', imgSrc: 'https://i.pravatar.cc/133', present: true},
  {id: 7, name: 'Natalia Dąb', imgSrc: 'https://i.pravatar.cc/184', present: true},
  {id: 8, name: 'Ewa Swoboda', imgSrc: 'https://i.pravatar.cc/145', present: true},
  {id: 9, name: 'Mariusz Pudzianowski', imgSrc: 'https://i.pravatar.cc/136', present: true},
  {id: 10, name: 'Karol Nowakowski', imgSrc: 'https://i.pravatar.cc/180', present: false},
  {id: 11, name: 'Joanna Jędrzejczak', imgSrc: 'https://i.pravatar.cc/144', present: false},
  {id: 12, name: 'Krzysztof Krawczyk', imgSrc: 'https://i.pravatar.cc/138', present: false},
  {id: 13, name: 'Tadeusz Norek', imgSrc: 'https://i.pravatar.cc/181', present: false},
  {id: 14, name: 'Alicja Wiśniewska', imgSrc: 'https://i.pravatar.cc/180', present: false},
  {id: 15, name: 'Janina Barańska', imgSrc: 'https://i.pravatar.cc/144', present: false},
  {id: 16, name: 'Tadeusz Norek', imgSrc: 'https://i.pravatar.cc/138', present: false},
  {id: 17, name: 'Karol Kłos', imgSrc: 'https://i.pravatar.cc/181', present: false},
  {id: 18, name: 'Bartosz Kurek', imgSrc: 'https://i.pravatar.cc/182', present: false},
  {id: 19, name: 'Michał Kubiak', imgSrc: 'https://i.pravatar.cc/133', present: false},
  {id: 20, name: 'Robert Lewandowski', imgSrc: 'https://i.pravatar.cc/184', present: false},
  {id: 21, name: 'Adam Małysz', imgSrc: 'https://i.pravatar.cc/145', present: false},
];

const AttendanceCheckSection = ({isEditMode = false}) => {
  const [attendanceList, setAttendanceList] = useState(initialAttendanceList);

  const presentList = attendanceList.filter(user => user.present);
  const absentList = attendanceList.filter(user => !user.present);

  const togglePresent = id => {
    setAttendanceList(
      attendanceList.map(user => (user.id === id ? {...user, present: !user.present} : user))
    );
  };

  const handlePresentAll = () => {
    setAttendanceList(attendanceList.map(user => ({...user, present: true})));
  };

  const handleAbsentAll = () => {
    setAttendanceList(attendanceList.map(user => ({...user, present: false})));
  };

  return (
    <Card className={styles.card}>
      <div className={styles.container}>
        <div className={styles.present}>
          <div className={styles.header}>
            <p>
              Obecni {presentList.length}/{attendanceList.length}
            </p>
            {isEditMode && (
              <Tooltip content="Oznacz wszystkich jako nieobecni" delay={700}>
                <Button onClick={handleAbsentAll} isIconOnly variant="light" size="sm">
                  <ArrowExportUp20Filled style={{transform: 'rotate(180deg)'}} />
                </Button>
              </Tooltip>
            )}
          </div>
          <ul className={styles.list}>
            {attendanceList
              .filter(user => user.present)
              .map(user => (
                <UserChip
                  handleClick={isEditMode ? () => togglePresent(user.id) : undefined}
                  isEditMode={isEditMode}
                  id={user.id}
                  key={user.id}
                  name={user.name}
                  imgSrc={user.imgSrc}
                  isRemovable
                />
              ))}
          </ul>
        </div>
        <Divider className={styles.divider} />
        <div className={styles.present}>
          <div className={styles.header}>
            <p>
              Nieobecni {absentList.length}/{attendanceList.length}
            </p>
            {isEditMode && (
              <Tooltip content="Oznacz wszystkich jako obecni" delay={700}>
                <Button onClick={handlePresentAll} isIconOnly variant="light" size="sm">
                  <ArrowExportUp20Filled />
                </Button>
              </Tooltip>
            )}
          </div>
          <ul className={styles.list}>
            {attendanceList
              .filter(user => !user.present)
              .map(user => (
                <UserChip
                  handleClick={isEditMode ? () => togglePresent(user.id) : undefined}
                  isEditMode={isEditMode}
                  id={user.id}
                  key={user.id}
                  name={user.name}
                  imgSrc={user.imgSrc}
                />
              ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

const UserChip = ({isEditMode, handleClick, id, name, imgSrc, isRemovable = false}) => {
  return (
    <li
      onClick={handleClick}
      className={`${styles.chipContainer} ${isRemovable && styles.removable}`}
    >
      <Image src={imgSrc} alt={name} width={24} height={24} className={styles.avatar} />
      <span className={styles.name}>{name}</span>
      {isEditMode && (
        <span className={styles.userChipIcon}>
          {isRemovable ? <ArrowDown16Filled /> : <ArrowUp16Filled />}
        </span>
      )}
    </li>
  );
};

export default AttendanceCheckSection;
