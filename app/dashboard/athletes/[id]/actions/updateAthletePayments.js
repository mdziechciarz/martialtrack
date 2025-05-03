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

export const cancelPayment = async ({paymentId}) => {
  try {
    const supabase = createClient();

    const {data, error} = await supabase
      .from('membership_payments')
      .update({
        status: 'pending',
        updated_at: new Date(),
        payment_method: null,
        payment_date: null,
        amount_paid: null,
      })
      .eq('id', paymentId);

    if (error) {
      console.error('Error cancelling payment:', error);
      return {
        success: false,
        message: 'Failed to cancel payment.',
      };
    }

    return {
      success: true,
    };
  } catch (err) {
    console.error('Error in cancelManualPayment:', err);
    return {
      success: false,
      message: 'An error occurred while cancelling the payment.',
    };
  }
};

export const exemptPayment = async ({paymentId}) => {
  try {
    const supabase = createClient();

    const {data, error} = await supabase
      .from('membership_payments')
      .update({
        status: 'exempt',
        updated_at: new Date(),
        payment_method: null,
        payment_date: null,
        amount_paid: null,
      })
      .eq('id', paymentId);

    if (error) {
      console.error('Error exempting payment:', error);
      return {
        success: false,
        message: 'Failed to exempt payment.',
      };
    }

    return {
      success: true,
    };
  } catch (err) {
    console.error('Error in exemptManualPayment:', err);
    return {
      success: false,
      message: 'An error occurred while exempting the payment.',
    };
  }
};

export const cancelPaymentExemption = async ({paymentId}) => {
  try {
    if (!paymentId) {
      console.error('Payment ID is required to cancel exemption.');
      return {
        success: false,
        message: 'Payment ID is required.',
      };
    }

    const supabase = createClient();

    const {data, error} = await supabase
      .from('membership_payments')
      .update({
        status: 'pending',
        updated_at: new Date(),
        payment_method: null,
        payment_date: null,
        amount_paid: null,
      })
      .eq('id', paymentId);

    if (error) {
      console.error('Error cancelling payment exemption:', error);
      return {
        success: false,
        message: 'Failed to cancel payment exemption.',
      };
    }

    return {
      success: true,
    };
  } catch (err) {
    console.error('Error in cancelPaymentExemption:', err);
    return {
      success: false,
      message: 'An error occurred while cancelling the payment exemption.',
    };
  }
};

// Todo, simplify membership_setttings table and update logic

export const updateAthleteMembershipSettings = async ({
  athleteId,
  membershipPlanId,
  isExempt,
  customAmount,
}) => {
  try {
    const supabase = createClient();

    const {data, error} = await supabase
      .from('athlete_membership_settings')
      .update({
        membership_plan_id: membershipPlanId,
        is_exempt: isExempt,
        custom_amount: customAmount,
        updated_at: new Date(),
      })
      .eq('athlete_id', athleteId);

    if (error) {
      console.error('Error updating athlete membership settings:', error);
      throw new Error('Failed to update athlete membership settings.');
    }

    return {
      success: true,
    };
  } catch (err) {
    console.error('Error in updateAthleteMembershipSettings:', err);
    return {
      success: false,
      message: 'An error occurred while updating athlete membership settings.',
    };
  }
};
