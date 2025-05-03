'use server';

import {createClient} from '@/utils/supabase/server';

export const recordManualPaymentById = async ({paymentId, paymentMethod}) => {
  try {
    if (!paymentId) {
      throw new Error('No paymentId provided.');
    }

    const supabase = createClient();

    const {data: paymentData, error: fetchError} = await supabase
      .from('membership_payments')
      .select('id, amount_due, amount_paid, status')
      .eq('id', paymentId)
      .single();

    if (fetchError) {
      console.error('Error fetching payment data:', fetchError);
      throw new Error('Could not fetch payment data');
    }

    // Update payment record
    const {error: updateError} = await supabase
      .from('membership_payments')
      .update({
        amount_paid: paymentData.amount_due,
        status: 'paid',
        payment_method: paymentMethod || 'cash',
        payment_date: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', paymentData.id);

    if (updateError) {
      console.error('Error updating payment record:', updateError);
      throw new Error('Failed to update payment');
    }

    return {
      success: true,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message || 'Something went wrong',
    };
  }
};

export const recordManualPaymentByMonth = async ({month, year, athleteId, paymentMethod}) => {
  const supabase = createClient();

  try {
    if (!month || !year || !athleteId) {
      throw new Error('Missing required parameters');
    }

    const {data: existingPaymentData, error: fetchError} = await supabase
      .from('membership_payments')
      .select('*')
      .eq('month', month)
      .eq('year', year)
      .eq('athlete_id', athleteId)
      .single();

    if (!existingPaymentData) {
      // Create a new payment record if it doesn't exist
      const {data: athleteMembershipSettingsData, error: athleteMembershipSettingsError} =
        await supabase
          .from('athlete_membership_settings')
          .select(
            'custom_amount, is_exempt, membership_plan: membership_plans(id, amount, club: clubs(id, payment_due_day))'
          )
          .eq('athlete_id', athleteId)
          .eq('active', true)
          .eq('is_exempt', false)
          .is('end_date', null)
          .single();

      if (athleteMembershipSettingsError || !athleteMembershipSettingsData) {
        console.error(
          'Error fetching athlete membership settings:',
          athleteMembershipSettingsError
        );
        throw new Error('Could not fetch athlete membership settings');
      }

      const dueDate = new Date(
        year,
        month,
        athleteMembershipSettingsData.membership_plan.club.payment_due_day || 10
      );

      const {error: insertError} = await supabase.from('membership_payments').insert({
        membership_plan_id: athleteMembershipSettingsData.membership_plan.id,
        athlete_id: athleteId,
        month,
        year,
        amount_due:
          athleteMembershipSettingsData.custom_amount ||
          athleteMembershipSettingsData.membership_plan.amount,
        status: 'pending',
        payment_due_date: dueDate.toISOString(),
      });
      if (insertError) {
        console.error('Error creating payment record:', insertError);
        throw new Error('Failed to create payment record');
      }
    }
    // Fetch the updated payment data
    const {data: paymentData, error: paymentDataError} = await supabase
      .from('membership_payments')
      .select('*')
      .eq('month', month)
      .eq('year', year)
      .eq('athlete_id', athleteId)
      .single();
    if (paymentDataError || !paymentData) {
      throw new Error('Could not fetch payment data');
    }

    // Proceed with the payment recording logic...
    // const amountPaid = parseFloat(paymentData.amount_paid || 0) + parseFloat(amount);
    // let newStatus;

    // if (amountPaid >= paymentData.amount_due) {
    //   newStatus = amountPaid > paymentData.amount_due ? 'overpaid' : 'paid';
    // } else {
    //   newStatus = 'partially_paid';
    // }

    // Update payment record
    const {error: updateError} = await supabase
      .from('membership_payments')
      .update({
        amount_paid: paymentData.amount_due,
        status: 'paid',
        payment_method: paymentMethod || 'cash',
        payment_date: new Date().toISOString(),
        // notes: notes
        //   ? `${paymentData.notes ? paymentData.notes + '\n' : ''}${notes}`
        //   : paymentData.notes,
        updated_at: new Date().toISOString(),
      })
      .eq('id', paymentData.id);

    if (updateError) {
      throw new Error('Failed to update payment');
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error recording manual payment:', error);
    return {
      success: false,
      error: error.message || 'Something went wrong',
    };
  }
};
