import Card from '@/components/Card/Card';
import {createClient} from '@/utils/supabase/client';
import {Add16Filled, Dismiss16Filled} from '@fluentui/react-icons';
import {
  Accordion,
  AccordionItem,
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
  Avatar,
} from '@nextui-org/react';
import Image from 'next/image';
import {useEffect, useState} from 'react';

import styles from './RecipientsCard.module.css';

const RecipientsCard = ({
  className = '',
  register,
  errors,
  selectedRecipients = [],
  setSelectedRecipients = () => {},
}) => {
  const [athletes, setAthletes] = useState([]);
  const [groups, setGroups] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    // Get all athletes
    const supabase = createClient();

    const fetchAthletes = async () => {
      const {data, error} = await supabase.from('athletes').select('*');
      if (error) {
        setAthletes([]);
      }
      setAthletes(data);
    };

    const fetchGroups = async () => {
      const {data, error} = await supabase.from('groups').select('*');
      if (error) {
        setGroups([]);
      }
      setGroups(data);
    };

    const fetchCoaches = async () => {
      const {data, error} = await supabase.from('coaches').select('*');
      if (error) {
        setCoaches([]);
      }
      setCoaches(data);
    };

    const fetchCompetitions = async () => {
      const {data, error} = await supabase.from('competitions').select('*');
      if (error) {
        setCompetitions([]);
      }
      setCompetitions(data);
    };

    fetchAthletes();
    fetchGroups();
    fetchCoaches();
    fetchCompetitions();
  }, []);

  const handleAddRecipient = id => {
    if (athletes.some(athlete => athlete.id === id)) {
      const athlete = athletes.find(athlete => athlete.id === id);
      setSelectedRecipients([...selectedRecipients, {type: 'athlete', ...athlete}]);
    } else if (coaches.some(coach => coach.id === id)) {
      const coach = coaches.find(coach => coach.id === id);
      setSelectedRecipients([...selectedRecipients, {type: 'coach', ...coach}]);
    } else if (groups.some(group => group.id === id)) {
      const group = groups.find(group => group.id === id);
      setSelectedRecipients([...selectedRecipients, {type: 'group', ...group}]);
    } else if (competitions.some(competition => competition.id === id)) {
      const competition = competitions.find(competition => competition.id === id);
      setSelectedRecipients([...selectedRecipients, {type: 'competition', ...competition}]);
    }
  };

  const handleRemoveRecipient = id => {
    setSelectedRecipients(selectedRecipients.filter(recipient => recipient.id !== id));
  };

  return (
    <Card title="Odbiorcy" className={`${styles.card} ${className}`}>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          {/* <Input label="Dodaj odbiorcę" /> */}
          {/* <Controller
            name="recipient"
            control={control}
            rules={{required: 'Pole zamawiający jest wymagane'}}
            render={({field}) => ( */}
          <Autocomplete
            defaultItems={athletes}
            label="Dodaj odbiorcę"
            isRequired
            onSelectionChange={key => {
              handleAddRecipient(key);
            }}
            selectedKey={null}
            validationBehavior="aria"
          >
            <AutocompleteSection showDivider title="Zawodnicy">
              {athletes
                .filter(athlete =>
                  selectedRecipients.every(recipient => recipient.id !== athlete.id)
                )
                .map(user => (
                  <AutocompleteItem key={user.id} textValue={user.full_name} value={user.id}>
                    <div className="flex gap-2 items-center">
                      <Avatar
                        alt={user.full_name}
                        className="flex-shrink-0"
                        size="sm"
                        src={user.avatar || 'https://i.pravatar.cc/140'}
                      />
                      <div className="flex flex-col">
                        <span className="text-small">{user.full_name}</span>
                      </div>
                    </div>
                  </AutocompleteItem>
                ))}
            </AutocompleteSection>
            <AutocompleteSection title="Trenerzy">
              {coaches
                .filter(coach => selectedRecipients.every(recipient => recipient.id !== coach.id))
                .map(user => (
                  <AutocompleteItem key={user.id} textValue={user.full_name} value={user.id}>
                    <div className="flex gap-2 items-center">
                      <Avatar
                        alt={user.full_name}
                        className="flex-shrink-0"
                        size="sm"
                        src={user.avatar || 'https://i.pravatar.cc/142'}
                      />
                      <div className="flex flex-col">
                        <span className="text-small">{user.full_name}</span>
                      </div>
                    </div>
                  </AutocompleteItem>
                ))}
            </AutocompleteSection>
            <AutocompleteSection title="Członkowie grup">
              {groups
                .filter(group => selectedRecipients.every(recipient => recipient.id !== group.id))
                .map(group => (
                  <AutocompleteItem key={group.id} textValue={group.name} value={group.id}>
                    <div
                      className={`${styles.chipContainer}`}
                      style={{backgroundColor: 'transparent'}}
                    >
                      <i
                        className={styles.groupDot}
                        style={{backgroundColor: group.color, marginRight: 4}}
                      />
                      <span className={styles.name}>{group.name}</span>
                    </div>
                  </AutocompleteItem>
                ))}
            </AutocompleteSection>
            <AutocompleteSection title="Uczestnicy zawodów">
              {competitions
                .filter(competition =>
                  selectedRecipients.every(recipient => recipient.id !== competition.id)
                )
                .map(competition => (
                  <AutocompleteItem
                    key={competition.id}
                    textValue={competition.name}
                    value={competition.id}
                  >
                    <div
                      className={`${styles.chipContainer}`}
                      style={{backgroundColor: 'transparent'}}
                    >
                      <i className={styles.groupDot} style={{backgroundColor: competition.color}} />
                      <span className={styles.name}>{competition.name}</span>
                    </div>
                  </AutocompleteItem>
                ))}
            </AutocompleteSection>
          </Autocomplete>

          {/* )} */}
          {/* /> */}
        </div>
        <div className={styles.suggestedContainer}>
          <Accordion isCompact className={styles.accordion}>
            <AccordionItem
              key="1"
              title="Sugerowani"
              classNames={{title: styles.accordionTitle, content: styles.accordionContent}}
            >
              <SuggestedRecipientsSection
                selectedRecipients={selectedRecipients}
                handleAddRecipient={handleAddRecipient}
                groups={groups}
                coaches={coaches}
                competitions={competitions}
              />
            </AccordionItem>
          </Accordion>
        </div>
        <div className={styles.selectedContainer}>
          <p>Wybrani</p>
          <ul>
            {selectedRecipients
              .filter(recipient => recipient.type === 'athlete')
              .map(recipient => (
                <UserChip
                  key={recipient.id}
                  name={recipient.full_name}
                  imgSrc={'https://i.pravatar.cc/142'}
                  isRemovable
                  onClick={() => handleRemoveRecipient(recipient.id)}
                />
              ))}
          </ul>
          <ul>
            {selectedRecipients
              .filter(recipient => recipient.type === 'coach')
              .map(recipient => (
                <UserChip
                  key={recipient.id}
                  name={recipient.full_name}
                  imgSrc={'https://i.pravatar.cc/144'}
                  isRemovable
                  onClick={() => handleRemoveRecipient(recipient.id)}
                />
              ))}
          </ul>
          <ul>
            {selectedRecipients
              .filter(recipient => recipient.type === 'group')
              .map(recipient => (
                <GroupChip
                  key={recipient.id}
                  name={recipient.name}
                  color={recipient.color}
                  isRemovable
                  onClick={() => handleRemoveRecipient(recipient.id)}
                />
              ))}
          </ul>
          <ul>
            {selectedRecipients
              .filter(recipient => recipient.type === 'competition')
              .map(recipient => (
                <CompetitionChip
                  key={recipient.id}
                  name={recipient.name}
                  color={recipient.color}
                  dates={`${recipient.date_start} - ${recipient.date_end.slice(8)}`}
                  location={recipient.location}
                  isRemovable
                  onClick={() => handleRemoveRecipient(recipient.id)}
                />
              ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default RecipientsCard;

const SuggestedRecipientsSection = ({
  selectedRecipients = [],
  handleAddRecipient = () => {},
  groups = [],
  coaches = [],
  competitions = [],
}) => {
  return (
    <div className={styles.suggestedGrid}>
      <div className={styles.coachesContainer}>
        <p>Trenerzy</p>
        <ul>
          {coaches
            .filter(coach => selectedRecipients.every(recipient => recipient.id !== coach.id))
            .map(coach => (
              <UserChip
                key={coach.id}
                name={coach.full_name}
                imgSrc={'https://i.pravatar.cc/140'}
                onClick={() => handleAddRecipient(coach.id)}
              />
            ))}
        </ul>
      </div>
      <div className={styles.groupsContainer}>
        <p>Członkowie grup</p>
        <ul>
          {groups
            .filter(group => selectedRecipients.every(recipient => recipient.id !== group.id))
            .map(group => (
              <GroupChip
                key={group.id}
                name={group.name}
                color={group.color}
                onClick={() => handleAddRecipient(group.id)}
              />
            ))}
        </ul>
      </div>
      <div className={styles.competitionsContainer}>
        <p>Uczestnicy zawodów</p>
        <ul>
          {competitions
            .filter(competition =>
              selectedRecipients.every(recipient => recipient.id !== competition.id)
            )
            .map(competition => (
              <CompetitionChip
                key={competition.id}
                name={competition.name}
                color={competition.color}
                dates={
                  competition.date_start != competition.date_end
                    ? `${competition.date_start} - ${competition.date_end.slice(8)}`
                    : competition.date_start
                }
                location={competition.location}
                onClick={() => handleAddRecipient(competition.id)}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

const UserChip = ({name, imgSrc, isRemovable = false, onClick = () => {}}) => {
  return (
    <div className={`${styles.chipContainer} ${isRemovable && styles.removable}`} onClick={onClick}>
      <Image src={imgSrc} alt={name} width={24} height={24} className={styles.avatar} />
      <span className={styles.name}>{name}</span>
      <span className={styles.userChipIcon}>
        {isRemovable ? <Dismiss16Filled /> : <Add16Filled />}
      </span>
    </div>
  );
};

const GroupChip = ({name, color, isRemovable = false, onClick = () => {}}) => {
  return (
    <div className={`${styles.chipContainer} ${isRemovable && styles.removable}`} onClick={onClick}>
      <i className={styles.groupDot} style={{backgroundColor: color}} />
      <span className={styles.name}>{name}</span>
      <span className={styles.userChipIcon}>
        {isRemovable ? <Dismiss16Filled /> : <Add16Filled />}
      </span>
    </div>
  );
};

const CompetitionChip = ({
  name,
  color,
  dates,
  location,
  isRemovable = false,
  onClick = () => {},
}) => {
  return (
    <div
      className={`${styles.chipContainer} ${styles.competitionChipContainer} ${
        isRemovable && styles.removable
      }`}
      onClick={onClick}
    >
      <div className={styles.groupDot} style={{backgroundColor: color}}></div>
      <span className={styles.competitionName}>
        {name}
        <br />
        {dates}, {location}
      </span>
      <span className={styles.userChipIcon}>
        {isRemovable ? <Dismiss16Filled /> : <Add16Filled />}
      </span>
    </div>
  );
};
