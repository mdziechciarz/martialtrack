import AddressCard from './components/AddressCard/AddressCard';
import AvatarCard from './components/AvatarCard/AvatarCard';
import ContactCard from './components/ContactCard/ContactCard';
import GroupsCard from './components/GroupsCard/GroupsCard';
import OtherDetailsCard from './components/OtherDetailsCard/OtherDetailsCard';
import PersonalDetailsCard from './components/PersonalDetailsCard/PersonalDetailsCard';

import GradingsCard from './components/GradingsCard/GradingsCard';
import LicensesCard from './components/LicensesCard/LicensesCard';

import styles from './CoachDetailsTab.module.css';

const dayOfWeekOptions = [
  {name: 'Poniedziałek', value: '1'},
  {name: 'Wtorek', value: '2'},
  {name: 'Środa', value: '3'},
  {name: 'Czwartek', value: '4'},
  {name: 'Piątek', value: '5'},
  {name: 'Sobota', value: '6'},
  {name: 'Niedziela', value: '7'},
];

const CoachDetailsTab = ({coachData, refetchCoachData}) => {
  return (
    <div className={styles.mainContainer}>
      <AvatarCard
        className={styles.avatarCard}
        coachId={coachData.id}
        name={coachData.fullName}
        imgSrc={coachData.avatar_url}
        refetchCoachData={refetchCoachData}
      />
      <PersonalDetailsCard
        coachId={coachData.id}
        sex={coachData.sex}
        dateOfBirth={coachData.dateOfBirth}
        placeOfBirth={coachData.placeOfBirth}
        pesel={coachData.pesel}
        refetchCoachData={refetchCoachData}
      />
      <AddressCard
        coachId={coachData.id}
        streetName={coachData.streetName}
        houseAndApartmentNumber={coachData.houseAndApartmentNumber}
        cityName={coachData.cityName}
        postalCode={coachData.postalCode}
        refetchCoachData={refetchCoachData}
      />
      <ContactCard
        coachId={coachData.id}
        phoneNumber={coachData.phoneNumber}
        email={coachData.email}
        refetchCoachData={refetchCoachData}
      />
      <GroupsCard
        className={styles.groupsCard}
        coachId={coachData.id}
        refetchCoachData={refetchCoachData}
        groupsAsCoach={coachData.groupsAsCoach.map(group => ({
          id: group.id,
          color: group.color,
          groupName: group.name,
          days: group.group_schedules
            ? [
                ...new Set(
                  group.group_schedules
                    .sort((a, b) => a.day_of_week - b.day_of_week)
                    .map(schedule => {
                      const day = dayOfWeekOptions.find(
                        option => option.value === schedule.day_of_week.toString()
                      );
                      return day ? day.name : '';
                    })
                ),
              ].join(', ')
            : '',
        }))}
        groupsAsAssistant={coachData.groupsAsAssistant.map(group => ({
          id: group.id,
          color: group.color,
          groupName: group.name,
          coachName: group.coach_name,
          days: [
            ...new Set(
              group.group_schedules
                .sort((a, b) => a.day_of_week - b.day_of_week)
                .map(schedule => {
                  const day = dayOfWeekOptions.find(
                    option => option.value === schedule.day_of_week.toString()
                  );
                  return day ? day.name : '';
                })
            ),
          ].join(', '),
        }))}
        // groups={[]}
      />
      <GradingsCard
        coachId={coachData.id}
        levels={coachData.levels}
        refetchCoachData={refetchCoachData}
      />
      <LicensesCard
        coachId={coachData.id}
        licenses={coachData.medicalCheckupsAndLicenses}
        refetchCoachData={refetchCoachData}
      />
      <OtherDetailsCard
        coachId={coachData.id}
        otherDetails={coachData.other}
        refetchCoachData={refetchCoachData}
      />
    </div>
  );
};

export default CoachDetailsTab;
