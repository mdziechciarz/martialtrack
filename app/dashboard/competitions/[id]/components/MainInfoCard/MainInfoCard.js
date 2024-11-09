import Card, {CardEntries} from '@/components/Card/Card';
import {DateRangePicker, Input} from '@nextui-org/react';
import {useState} from 'react';
import styles from './MainInfoCard.module.css';

// const SectionColorCard = ({clubBranches = [], color}) => {
//   const [isEditable, setIsEditable] = useState(true);
//   const [pickedColor, setPickeColor] = useState(color);

//   return (
//     <Card title="Sekcja i kolor">
//       {isEditable ? (
//         <EditableContent color={color} clubBranches={clubBranches} />
//       ) : (
//         <ReadOnlyContent color={color} />
//       )}
//     </Card>
//   );
// };

const MainInfoCard = ({className, dates, location, color}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Card
      title="Informacje podstawowe"
      isEditable
      isEditMode={isEditMode}
      setIsEditMode={setIsEditMode}
      className={`${className || ''}`}
    >
      {isEditMode ? (
        <EditableContent color={color} />
      ) : (
        <ReadOnlyContent color={color} dates={dates} location={location} />
      )}
    </Card>
  );
};

const ReadOnlyContent = ({dates, location, color}) => {
  return (
    <CardEntries
      // className={styles.cardEntries}
      entries={{
        Data: dates,
        Lokalizacja: location,
        Kolor: <input className={styles.colorInput} type="color" defaultValue={color} disabled />,
      }}
    />
  );
};

const EditableContent = ({color}) => {
  return (
    <CardEntries
      className={styles.cardEntries}
      entries={{
        Data: (
          <DateRangePicker
            calendarProps={{showMonthAndYearPickers: true, disableAnimation: true}}
          />
        ),
        Lokalizacja: <Input placeholder="Wpisz lokalizację" />,
        Kolor: (
          <input
            className={styles.colorInput}
            style={{cursor: 'pointer'}}
            type="color"
            defaultValue={color}
          />
        ),
      }}
    />
  );
};

// export default SectionColorCard;
export default MainInfoCard;
