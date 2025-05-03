'use server';

import {createClient} from '@/utils/supabase/server';

export const cancelManualPayment = async ({paymentId}) => {
  try {
    if (!paymentId) {
      throw new Error('No paymentId provided.');
    }

    const supabase = createClient();

    // Get current payment data
    const {data: currentPayment, error: fetchError} = await supabase
      .from('membership_payments')
      .select('amount_due, amount_paid, status')
      .eq('id', paymentId)
      .single();

    if (fetchError) throw new Error('Could not fetch payment data');

    // Calculate new status
    const amountPaid = parseFloat(currentPayment.amount_paid || 0) + parseFloat(amount);
    let newStatus;

    if (amountPaid >= currentPayment.amount_due) {
      newStatus = amountPaid > currentPayment.amount_due ? 'overpaid' : 'paid';
    } else {
      newStatus = 'partially_paid';
    }

    // Update payment record
    const {error: updateError} = await supabase
      .from('membership_payments')
      .update({
        amount_paid: null,
        status: 'pending',
        payment_method: null,
        payment_date: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', paymentId);

    if (updateError) throw new Error('Failed to update payment');

    // Remove transaction
    // const {error: transactionError} = await supabase.from('payment_transactions')

    // if (onSuccess) onSuccess();
    // onOpenChange(false);
    return {
      success: true,
    };
  } catch (err) {
    // setError(err.message || 'Something went wrong');
    return {
      success: false,
      error: err,
    };
  }
  // finally {
  //   setIsLoading(false);
  // }
};
