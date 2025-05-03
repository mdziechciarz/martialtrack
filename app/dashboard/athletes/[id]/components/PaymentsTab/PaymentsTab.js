import Card, {CardEntries, CardGrid} from '@/components/Card/Card';
import {createClient} from '@/utils/supabase/client';
import {Input, Select, SelectItem, Spinner, Switch} from '@nextui-org/react';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {updateAthleteMembershipSettings} from '../../actions/updateAthletePayments';
import styles from './PaymentsTab.module.css';
import PaymentsTable from './components/PaymentsTable/PaymentsTable';

const PaymentsView = ({
  athleteId,
  paymentsData,
  refetchAthleteData,
  membershipSettings = null,
  isLoading,
}) => {
  return (
    <div className={styles.container}>
      <PaymentOptionsCard
        isLoading={isLoading}
        membershipSettings={membershipSettings}
        athleteId={athleteId}
        refetchAthleteData={refetchAthleteData}
      />
      <PaymentsTable payments={paymentsData} refetchPayments={refetchAthleteData} />
    </div>
  );
};

export default PaymentsView;

const PaymentOptionsCard = ({athleteId, isLoading, membershipSettings, refetchAthleteData}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [membershipPlans, setMembershipPlans] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    const fetchMembershipPlans = async () => {
      const {data, error} = await supabase.from('membership_plans').select('*');
      if (error) {
        setMembershipPlans([]);
        console.error('Error fetching groups:', error);
        return;
      }
      setMembershipPlans(data);
    };
    fetchMembershipPlans();
  }, []);

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  const handleSaveChanges = handleSubmit(async data => {
    try {
      setIsSaving(true);
      const {success} = await updateAthleteMembershipSettings({
        athleteId: athleteId,
        membershipPlanId: data.membershipPlanId === 'none' ? null : data.membershipPlanId,
        customAmount:
          data.customAmount && !isNaN(data.customAmount) && data.customAmount > 0
            ? data.customAmount
            : null,
        isExempt: data.isExempt,
      });
      if (success) {
        refetchAthleteData();
      } else {
        console.error('Failed to save changes');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
    } finally {
      setIsSaving(false);
      reset();
      setIsEditMode(false);
    }
  });

  const handleCancelChanges = () => {
    reset();
    setIsEditMode(false);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  return (
    <Card
      title="Ustawienia składek"
      isEditable
      isEditMode={isEditMode}
      onSaveClick={handleSaveChanges}
      onCancelClick={handleCancelChanges}
      onEditClick={handleEdit}
      isSaving={isSaving}
    >
      {isLoading ? (
        <Spinner />
      ) : isEditMode ? (
        <EditModeContent
          availableMmbershipPlans={membershipPlans}
          currentCustomAmount={membershipSettings?.custom_amount}
          currentMembershipPlanId={membershipSettings?.membership_plan?.id}
          currentIsExempt={membershipSettings?.is_exempt}
          register={register}
          control={control}
          errors={errors}
        />
      ) : (
        <ReadOnlyModeContent
          isExempt={membershipSettings?.is_exempt}
          customAmount={membershipSettings?.custom_amount}
          membershipPlanName={membershipSettings?.membership_plan?.name}
        />
      )}
    </Card>
  );
};

const ReadOnlyModeContent = ({isExempt, customAmount, membershipPlanName}) => {
  return (
    <CardEntries
      className={styles.paymentsSettingsReadOnlyContent}
      entries={{
        'Rodzaj karnetu': membershipPlanName || '-',
        'Niestandardowa cena': customAmount ? `${customAmount} PLN` : '-',
        'Zwolniony z płatności': <Switch isDisabled size="sm" isSelected={isExempt} />,
      }}
    />
  );
};

const EditModeContent = ({
  availableMmbershipPlans = [],
  currentCustomAmount,
  currentMembershipPlanId = 'none',
  currentIsExempt,
  register,
  control,
  errors,
}) => {
  return (
    // <CardEntries
    //   entries={{
    //     'Zwolniony z płatności': <Switch size="sm" />,
    //     'Rodzaj karnetu': <MembershipTypeSelect />,
    //   }}
    // />
    <CardGrid className={styles.paymentsSettingsEditModeContent}>
      <Select
        {...register('membershipPlanId', {required: true})}
        isRequired
        defaultSelectedKeys={new Set([currentMembershipPlanId])}
        label="Rodzaj karnetu"
        size="sm"
        disallowEmptySelection
        isInvalid={!!errors.membership_plan_id}
        validationBehavior="aria"
      >
        <SelectItem key={'none'}>Brak</SelectItem>
        {availableMmbershipPlans.map(plan => (
          <SelectItem key={plan.id}>{plan.name}</SelectItem>
        ))}
      </Select>
      <Input
        {...register('customAmount', {valueAsNumber: true})}
        isInvalid={!!errors.customAmount}
        validationBehavior="aria"
        size="sm"
        label="Niestandardowa cena"
        type="number"
        min={0}
        defaultValue={currentCustomAmount}
        endContent={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <p style={{fontSize: 13, color: '#52525B'}}>PLN</p>
          </div>
        }
      />
      <div>
        <p style={{fontSize: 13}}>Zwolniony z płatności</p>
        <Switch
          size="sm"
          label="Zwolniony z płatności"
          defaultSelected={currentIsExempt}
          {...register('isExempt', {value: currentIsExempt})}
          validationBehavior="aria"
        />
      </div>
    </CardGrid>
  );
};
