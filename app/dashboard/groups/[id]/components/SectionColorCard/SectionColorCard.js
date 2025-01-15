import {useState} from 'react';
import {useForm} from 'react-hook-form';

import {Select, SelectItem} from '@nextui-org/react';

import Card from '@/components/Card/Card';

import styles from './SectionColorCard.module.css';

const SectionColorCard = ({clubBranches = [], color, clubBranch}) => {
  const [pickedColor, setPickeColor] = useState(color);

  const [isEditMode, setIsEditMode] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const handleSaveChanges = handleSubmit(data => {
    console.log(data);
    console.log('Changes saved');
    setIsEditMode(false);
  });

  const handleCancelChanges = () => {
    console.log('Changes canceled');
    setIsEditMode(false);
  };

  const handleEdit = () => {
    console.log('Editing');
    setIsEditMode(true);
  };

  return (
    <Card
      title="Sekcja i kolor"
      isEditable
      isEditMode={isEditMode}
      onSaveClick={handleSaveChanges}
      onCancelClick={handleCancelChanges}
      onEditClick={handleEdit}
    >
      {isEditMode ? (
        <EditableContent
          currentColor={color}
          clubBranches={clubBranches}
          currentClubBranch={clubBranch}
          register={register}
          control={control}
          errors={errors}
        />
      ) : (
        <ReadOnlyContent color={color} clubBranch={clubBranch} />
      )}
    </Card>
  );
};

const ReadOnlyContent = ({clubBranch, color}) => {
  return (
    <div className={styles.contentContainer}>
      <div className={styles.entry}>
        <p className={styles.key}>Sekcja</p>
        <p className={styles.value}>{clubBranch.name}</p>
      </div>
      <div className={styles.entry}>
        <p className={styles.key}>Kolor</p>
        <input className={styles.colorInput} type="color" disabled defaultValue={color} />
      </div>
    </div>
  );
};

const EditableContent = ({
  currentColor,
  clubBranches,
  currentClubBranch,
  register,
  control,
  errors,
}) => {
  return (
    <div className={`${styles.contentContainer} ${styles.editable}`}>
      <div className={styles.entry}>
        <p className={styles.key}>Sekcja</p>
        <Select
          placeholder="Wybierz sekcję"
          defaultSelectedKeys={[currentClubBranch.id]}
          disallowEmptySelection
          isRequired
          isInvalid={!!errors.clubBranch}
          {...register('clubBranch', {required: true})}
        >
          {clubBranches.map(branch => (
            <SelectItem key={branch.id}>{branch.name}</SelectItem>
          ))}
        </Select>
      </div>
      <div className={styles.entry}>
        <p className={styles.key}>Kolor</p>
        <input
          className={styles.colorInput}
          style={{cursor: 'pointer'}}
          type="color"
          defaultValue={currentColor}
          {...register('color', {required: true})}
        />
      </div>
    </div>
  );
};

export default SectionColorCard;
