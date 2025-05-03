import AvatarCard from './components/AvatarCard/AvatarCard';
// import Card from './components/Card/Card';
import AddressCard from './components/AddressCard/AddressCard';
import ContactCard from './components/ContactCard/ContactCard';
import GroupsCard from './components/GroupsCard/GroupsCard';
import OtherDetailsCard from './components/OtherDetailsCard/OtherDetailsCard';
import PersonalDetailsCard from './components/PersonalDetailsCard/PersonalDetailsCard';

import GradingsCard from './components/GradingsCard/GradingsCard';
import LicensesCard from './components/LicensesCard/LicensesCard';

import styles from './AthleteDetailsTab.module.css';

const dayOfWeekOptions = [
  {name: 'Poniedziałek', value: '1'},
  {name: 'Wtorek', value: '2'},
  {name: 'Środa', value: '3'},
  {name: 'Czwartek', value: '4'},
  {name: 'Piątek', value: '5'},
  {name: 'Sobota', value: '6'},
  {name: 'Niedziela', value: '7'},
];

const AthleteDetailsTab = ({athleteData, refetchAthleteData}) => {
  return (
    <div className={styles.mainContainer}>
      <AvatarCard
        className={styles.avatarCard}
        athleteId={athleteData.id}
        name={athleteData.fullName}
        imgSrc={athleteData.avatar_url}
        refetchAthleteData={refetchAthleteData}
      />
      <PersonalDetailsCard
        athleteId={athleteData.id}
        sex={athleteData.sex}
        dateOfBirth={athleteData.dateOfBirth}
        placeOfBirth={athleteData.placeOfBirth}
        pesel={athleteData.pesel}
        refetchAthleteData={refetchAthleteData}
      />
      <AddressCard
        athleteId={athleteData.id}
        streetName={athleteData.streetName}
        houseAndApartmentNumber={athleteData.houseAndApartmentNumber}
        cityName={athleteData.cityName}
        postalCode={athleteData.postalCode}
        refetchAthleteData={refetchAthleteData}
      />
      <ContactCard
        athleteId={athleteData.id}
        phoneNumber={athleteData.phoneNumber}
        email={athleteData.email}
        refetchAthleteData={refetchAthleteData}
      />
      <GroupsCard
        className={styles.groupsCard}
        athleteId={athleteData.id}
        refetchAthleteData={refetchAthleteData}
        groups={athleteData.groups.map(group => ({
          id: group.id,
          color: group.color,
          groupName: group.name,
          coachName: group.coach.full_name,
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
          // hours: group.group_schedules.map(schedule => schedule.start_time).join(', '),
          // hours: group.hours,
        }))}
      />
      <GradingsCard
        athleteId={athleteData.id}
        levels={athleteData.levels}
        refetchAthleteData={refetchAthleteData}
      />
      <LicensesCard
        athleteId={athleteData.id}
        licenses={athleteData.medicalCheckupsAndLicenses}
        refetchAthleteData={refetchAthleteData}
      />
      <OtherDetailsCard
        athleteId={athleteData.id}
        otherDetails={athleteData.other}
        refetchAthleteData={refetchAthleteData}
      />
    </div>
  );
};

export default AthleteDetailsTab;
