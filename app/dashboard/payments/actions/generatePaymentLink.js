import {getAuthUser} from '@/lib/auth';
import {createClient} from '@supabase/supabase-js';
import {NextResponse} from 'next/server';
import Stripe from 'stripe';

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const supabase = createClient();

  try {
    const {paymentId} = await req.json();

    // Verify user is authorized
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    // Get payment details
    const {data: payment, error: paymentError} = await supabase
      .from('membership_payments')
      .select(
        `
        id, 
        amount_due, 
        athlete_id, 
        month, 
        year, 
        membership_plan_id,
        athletes:athlete_id (name, email),
        membership_plan:membership_plan_id (name, club_id, currency)
      `
      ) // also currency
      .eq('id', paymentId)
      .single();

    if (paymentError || !payment) {
      return NextResponse.json({error: 'Payment not found'}, {status: 404});
    }

    // Get club's Stripe account ID
    const {data: club, error: clubError} = await supabase
      .from('clubs')
      .select('stripe_connect_account_id')
      .eq('id', payment.membership_plan.club_id)
      .single();

    if (clubError || !club?.stripe_connect_account_id) {
      return NextResponse.json({error: 'Club Stripe account not found'}, {status: 404});
    }

    // Create a payment link using Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'blik', 'p24'],
      line_items: [
        {
          price_data: {
            currency: payment.membership_plan.currency, // payment.currency
            product_data: {
              name: `Składka członkowska ${payment.membership_plan.name} - ${payment.month}/${payment.year}`,
              description: `Opłata za ${payment.month}/${payment.year}`,
            },
            unit_amount: Math.round(payment.amount_due * 100), // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
      customer_email: payment.athletes.email,
      payment_intent_data: {
        transfer_data: {
          destination: club.stripe_connect_account_id,
        },
        metadata: {
          payment_id: payment.id,
          athlete_id: payment.athlete_id,
          month: payment.month,
          year: payment.year,
          type: 'membership_fee',
        },
      },
      metadata: {
        payment_id: payment.id,
        type: 'membership_fee',
      },
      expires_at: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days from now
    });

    // Update payment record with Stripe info
    const {error: updateError} = await supabase
      .from('membership_payments')
      .update({
        stripe_payment_link_id: session.id,
        payment_link_url: session.url,
        updated_at: new Date().toISOString(),
      })
      .eq('id', payment.id);

    if (updateError) {
      console.error('Failed to update payment record:', updateError);
    }

    return NextResponse.json({
      paymentLinkUrl: session.url,
      expiresAt: new Date(session.expires_at * 1000).toISOString(),
    });
  } catch (error) {
    console.error('Create payment link error:', error);
    return NextResponse.json({error: error.message}, {status: 500});
  }
}
