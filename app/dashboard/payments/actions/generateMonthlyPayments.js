'use server';

import {createClient} from '@/utils/supabase/server';
import {lastDayOfMonth} from 'date-fns';

export async function generateMonthlyPayments({toRemoveMonth}) {
  const supabase = createClient();

  console.log('Starting monthly payment generation...');

  try {
    // Get current month and year
    const now = new Date();
    // const targetMonth = now.getMonth() + 1; // 1-12
    const targetMonth = toRemoveMonth;
    const targetYear = now.getFullYear();

    console.log(`Generating payments for ${targetMonth}/${targetYear}`);

    // Get all active athlete memberships
    const {data: activeAthletes, error: athletesError} = await supabase
      .from('athlete_membership_settings')
      .select(
        `
        id, 
        athlete_id, 
        membership_plan_id, 
        custom_amount, 
        is_exempt, 
        membership_plan: membership_plans(amount, club_id, club: clubs(payment_due_day)),
        athlete:athletes(*)
      `
      ) // instead of is_exempt could be is_permament_exempt
      // .eq('athlete.active', true)
      .eq('active', true)
      .is('end_date', null);

    if (athletesError) {
      console.error('Error fetching active athletes:', athletesError);
      return;
    }

    console.log(`Found ${activeAthletes.length} active athlete memberships`);

    // Get club payment due days
    const {data: clubs} = await supabase.from('clubs').select('id, payment_due_day');

    const clubDueDays = {};
    clubs.forEach(club => {
      clubDueDays[club.id] = club.payment_due_day || 10; // Default to 10th of the month
    });

    // Check exemptions for this period
    const periodStart = new Date(targetYear, targetMonth - 1, 1);
    const periodEnd = lastDayOfMonth(periodStart);

    const {data: exemptions} = await supabase
      .from('membership_exemptions')
      .select('athlete_id')
      .lte('exemption_start', periodEnd.toISOString())
      .gte('exemption_end', periodStart.toISOString());

    const exemptedAthletes = new Set();
    if (exemptions) {
      exemptions.forEach(ex => exemptedAthletes.add(ex.athlete_id));
    }

    // Create payment records
    for (const athlete of activeAthletes) {
      // Skip if already exempt in settings or has an exemption for this period
      const isExempt = athlete.is_exempt || exemptedAthletes.has(athlete.athlete_id);

      const dueDay = athlete.membership_plan.club.payment_due_day || 10;
      const dueDate = new Date(targetYear, targetMonth - 1, dueDay);

      // If current day is past the due day, set due date to next month
      if (now.getDate() > dueDay) {
        dueDate.setMonth(dueDate.getMonth() + 1);
      }

      const amount = athlete.custom_amount || athlete.membership_plan.amount;

      // Check if payment record already exists
      const {data: existingPayment} = await supabase
        .from('membership_payments')
        .select('id')
        .eq('athlete_id', athlete.athlete_id)
        .eq('month', targetMonth)
        .eq('year', targetYear)
        .single();

      if (existingPayment) {
        console.log(
          `Payment for ${athlete.athlete_id} already exists for ${targetMonth}/${targetYear}`
        );
        continue;
      }

      // Create payment record
      const {error: insertError} = await supabase.from('membership_payments').insert({
        athlete_id: athlete.athlete_id,
        membership_plan_id: athlete.membership_plan_id,
        month: targetMonth,
        year: targetYear,
        amount_due: amount,
        status: isExempt ? 'exempted' : 'pending',
        payment_due_date: dueDate.toISOString(),
        // notes: isExempt ? 'Automatically exempted based on settings or exemption record' : null,
      });

      if (insertError) {
        console.error(`Error creating payment for ${athlete.athlete_id}:`, insertError);
      } else {
        console.log(
          `Created ${isExempt ? 'exempted' : 'pending'} payment for ${athlete.athlete_id}`
        );
      }
    }

    console.log('Monthly payment generation completed.');
    return {
      success: true,
      message: 'Monthly payments generated successfully',
    };
  } catch (error) {
    console.error('Error generating monthly payments:', error);
    return {
      success: false,
      message: 'Error generating monthly payments',
    };
  }
}

// // Run the script
// generateMonthlyPayments()
//   .then(() => process.exit(0))
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });
