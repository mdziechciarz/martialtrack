'use server';

import {createClient} from '@/utils/supabase/server';

export async function getAllPaymentsHistory() {
  try {
    const supabase = createClient();

    const {data: paymentsData, error: paymentsError} = await supabase.from('membership_payments')
      .select(`
        *,
        athlete: athletes (
          *,
          group_members (
            groups (*)
          )
        )
      `);

    if (paymentsError || !paymentsData) {
      console.error('Error fetching payments history:', paymentsError);
      throw new Error(paymentsError);
    }

    // Transform data to get the desired structure
    const transformedData = paymentsData.map(payment => {
      if (payment.athlete && payment.athlete.group_members) {
        // Extract groups from group_members and attach directly to athlete
        payment.athlete.groups = payment.athlete.group_members
          .map(member => member.groups)
          .filter(Boolean);

        // Remove the group_members property
        delete payment.athlete.group_members;
      }
      return payment;
    });

    return {
      success: true,
      data: transformedData,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: 'Fetching payments history failed.',
    };
  }
}

export async function getPaymentsHistoryByGroup() {
  try {
    const supabase = createClient();

    const {data: groupsData, error: groupsError} = await supabase.from('groups').select(`
        *,
        group_members (
          athletes (
            *,
            membership_payments (*)
          )
        )
      `);

    if (groupsError || !groupsData) {
      console.error('Error fetching payments history by group:', groupsError);
      throw new Error(groupsError);
    }

    // Transform data to get the desired structure
    const transformedData = groupsData.map(group => {
      // Extract all membership payments from all athletes in this group
      const membershipPayments = [];

      group.group_members?.forEach(member => {
        if (member.athletes && member.athletes.membership_payments) {
          member.athletes.membership_payments.forEach(payment => {
            membershipPayments.push({
              ...payment,
              athlete: {
                ...member.athletes,
                membership_payments: undefined, // Remove to avoid circular references
              },
            });
          });
        }
      });

      // Create the final group object with payments
      return {
        ...group,
        group_members: undefined, // Remove as we've extracted what we need
        membership_payments: membershipPayments,
      };
    });

    return {
      success: true,
      data: transformedData,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: 'Fetching payments history by group failed.',
    };
  }
}
