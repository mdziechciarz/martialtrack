'use server';

import {createClient} from '@/utils/supabase/server';

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
