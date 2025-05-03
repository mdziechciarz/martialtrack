import {createClient} from '@supabase/supabase-js';
import {addDays, format, parseISO, subDays} from 'date-fns';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

async function sendPaymentReminders() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  console.log('Starting payment reminder process...');

  try {
    const today = new Date();

    // Find payments due in 3 days that haven't received a reminder yet
    const threeDaysFromNow = addDays(today, 3);
    const dueDateForUpcoming = format(threeDaysFromNow, 'yyyy-MM-dd');

    const {data: upcomingPayments, error: upcomingError} = await supabase
      .from('membership_payments')
      .select(
        `
        id, 
        athlete_id, 
        amount_due,
        payment_due_date, 
        payment_link_url,
        month, 
        year,
        users:athlete_id (email, name),
        membership_plans (name, club_id),
        clubs:membership_plans(club_id) (name)
      `
      )
      .eq('status', 'pending')
      .eq('payment_upcoming_reminder_sent', false)
      .lte('payment_due_date', dueDateForUpcoming);

    if (upcomingError) {
      console.error('Error fetching upcoming payments:', upcomingError);
      return;
    }

    console.log(`Found ${upcomingPayments.length} upcoming payments needing reminders`);

    // Send reminder emails for upcoming payments
    for (const payment of upcomingPayments) {
      // If no payment link generated yet, create one
      if (!payment.payment_link_url) {
        console.log(`No payment link for ${payment.id}, generating...`);

        try {
          // Call the API to generate payment link
          const paymentLinkRes = await fetch(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/create-link`,
            {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({paymentId: payment.id}),
            }
          );

          if (!paymentLinkRes.ok) {
            console.error(`Failed to generate payment link for ${payment.id}`);
            continue;
          }

          const linkData = await paymentLinkRes.json();
          payment.payment_link_url = linkData.paymentLinkUrl;
        } catch (err) {
          console.error(`Error generating payment link: ${err.message}`);
          continue;
        }
      }

      // Send email reminder
      const emailContent = {
        from: `"${payment.clubs.name}" <${process.env.EMAIL_FROM}>`,
        to: payment.users.email,
        subject: `Przypomnienie o nadchodzącej płatności - ${payment.month}/${payment.year}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Przypomnienie o nadchodzącej opłacie członkowskiej</h2>
            <p>Witaj ${payment.users.name},</p>
            <p>Przypominamy o nadchodzącej opłacie członkowskiej:</p>
            <ul>
              <li><strong>Klub:</strong> ${payment.clubs.name}</li>
              <li><strong>Plan:</strong> ${payment.membership_plans.name}</li>
              <li><strong>Miesiąc:</strong> ${payment.month}/${payment.year}</li>
              <li><strong>Kwota:</strong> ${payment.amount_due} PLN</li>
              <li><strong>Termin płatności:</strong> ${format(
                parseISO(payment.payment_due_date),
                'dd.MM.yyyy'
              )}</li>
            </ul>
            <p>Aby dokonać płatności online, kliknij poniższy przycisk:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${
                payment.payment_link_url
              }" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Zapłać teraz</a>
            </div>
            <p>Link do płatności: <a href="${payment.payment_link_url}">${
          payment.payment_link_url
        }</a></p>
            <p>Dziękujemy za Twoją punktualność!</p>
            <p>Pozdrawiamy,<br>${payment.clubs.name}</p>
          </div>
        `,
      };

      try {
        await transporter.sendMail(emailContent);
        console.log(`Upcoming payment reminder sent to ${payment.users.email}`);

        // Mark reminder as sent
        await supabase
          .from('membership_payments')
          .update({
            payment_upcoming_reminder_sent: true,
            updated_at: new Date().toISOString(),
          })
          .eq('id', payment.id);
      } catch (err) {
        console.error(`Error sending email to ${payment.users.email}:`, err);
      }
    }

    // Find overdue payments that haven't received a reminder yet
    const yesterday = subDays(today, 1);
    const overdueDate = format(yesterday, 'yyyy-MM-dd');

    const {data: overduePayments, error: overdueError} = await supabase
      .from('membership_payments')
      .select(
        `
        id, 
        athlete_id, 
        amount_due,
        payment_due_date, 
        payment_link_url,
        month, 
        year,
        users:athlete_id (email, name),
        membership_plans (name, club_id),
        clubs:membership_plans(club_id) (name)
      `
      )
      .eq('status', 'pending')
      .eq('payment_overdue_reminder_sent', false)
      .lt('payment_due_date', overdueDate);

    if (overdueError) {
      console.error('Error fetching overdue payments:', overdueError);
      return;
    }

    console.log(`Found ${overduePayments.length} overdue payments needing reminders`);

    // Send overdue reminders
    for (const payment of overduePayments) {
      // If no payment link, try to generate
      if (!payment.payment_link_url) {
        try {
          const paymentLinkRes = await fetch(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/create-link`,
            {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({paymentId: payment.id}),
            }
          );

          if (paymentLinkRes.ok) {
            const linkData = await paymentLinkRes.json();
            payment.payment_link_url = linkData.paymentLinkUrl;
          }
        } catch (err) {
          console.error(`Error generating payment link for overdue payment: ${err.message}`);
        }
      }

      // Send overdue reminder email
      const emailContent = {
        from: `"${payment.clubs.name}" <${process.env.EMAIL_FROM}>`,
        to: payment.users.email,
        subject: `ZALEGŁA PŁATNOŚĆ - ${payment.month}/${payment.year}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #cc0000;">Przypomnienie o zaległej opłacie członkowskiej</h2>
            <p>Witaj ${payment.users.name},</p>
            <p>Informujemy, że upłynął termin opłaty członkowskiej:</p>
            <ul>
              <li><strong>Klub:</strong> ${payment.clubs.name}</li>
              <li><strong>Plan:</strong> ${payment.membership_plans.name}</li>
              <li><strong>Miesiąc:</strong> ${payment.month}/${payment.year}</li>
              <li><strong>Kwota:</strong> ${payment.amount_due} PLN</li>
              <li><strong>Termin płatności:</strong> ${format(
                parseISO(payment.payment_due_date),
                'dd.MM.yyyy'
              )} (miniony)</li>
            </ul>
            ${
              payment.payment_link_url
                ? `
              <p>Aby uregulować zaległą płatność online, kliknij poniższy przycisk:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${payment.payment_link_url}" style="background-color: #cc0000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Zapłać teraz</a>
              </div>
              <p>Link do płatności: <a href="${payment.payment_link_url}">${payment.payment_link_url}</a></p>
            `
                : `
              <p>Prosimy o pilne uregulowanie zaległej płatności w klubie lub kontakt z administracją.</p>
            `
            }
            <p>W przypadku jakichkolwiek pytań lub problemów prosimy o kontakt.</p>
            <p>Pozdrawiamy,<br>${payment.clubs.name}</p>
          </div>
        `,
      };

      try {
        await transporter.sendMail(emailContent);
        console.log(`Overdue payment reminder sent to ${payment.users.email}`);

        // Mark overdue reminder as sent
        await supabase
          .from('membership_payments')
          .update({
            payment_overdue_reminder_sent: true,
            updated_at: new Date().toISOString(),
          })
          .eq('id', payment.id);
      } catch (err) {
        console.error(`Error sending overdue email to ${payment.users.email}:`, err);
      }
    }

    console.log('Payment reminder process completed.');
  } catch (error) {
    console.error('Error processing payment reminders:', error);
  }
}

// Run the script
sendPaymentReminders()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
