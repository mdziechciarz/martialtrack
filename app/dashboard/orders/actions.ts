'use server'

import { createClient } from "@/utils/supabase/server";



export async function fetchOrders() {
  
    const supabase = createClient();
  
    // Get user data
    const {
      data: {user},
    } = await supabase.auth.getUser();
  
    // Get user profile data
    const {data: userData, error: userError} = await supabase
      .from('users')
      .select()
      .eq('id', user.id)
      .single();

    // Fetch orders
    const {data: orders, error: ordersError} = await supabase
      .from('orders')
      .select('*, athletes(*)')
      .eq('club_id', userData.club_id)

    return orders;
}

export async function createNewOrder({
  recipientId, price, order
}) {
  const supabase = createClient();

  // Get user data
  const {
    data: {user},
  } = await supabase.auth.getUser();

  // Get user profile data
  const {data: userData, error: userError} = await supabase
    .from('users')
    .select()
    .eq('id', user.id)
    .single();

  // Create new order
  const {data: newOrder, error: newOrderError} = await supabase
    .from('orders')
    .insert({
      recipient_id: recipientId,
      price,
      order,
      club_id: userData.club_id,
      status: 'UNPAID'
    })
    .select()
}

export async function removeOrder({orderId}) {
  console.log('removing order')
  
  const supabase = createClient();

  // Remove order
  const {data: removedOrder, error: removedOrderError} = await supabase
    .from('orders')
    .delete()
    .eq('id', orderId)
    .single()

  
  console.log('removedOrder', removedOrder)
  console.log('removedOrderError', removedOrderError)
}


