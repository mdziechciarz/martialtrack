'use server';

import {createClient} from '@/utils/supabase/server';

export async function createNewOrder({recipientId, price, order}) {
  try {
    if (!recipientId || !price || !order) {
      throw new Error('Recipient ID, price, and order are required.');
    }

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

    if (userError) {
      console.error('Error fetching user data:', userError);
      throw new Error(userError);
    }

    // Create new order
    const {data: newOrder, error: newOrderError} = await supabase
      .from('orders')
      .insert({
        recipient_id: recipientId,
        price,
        order,
        club_id: userData.club_id,
        status: 'unpaid',
      })
      .select();

    if (newOrderError) {
      console.error('Error creating new order:', newOrderError);
      throw new Error(newOrderError);
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error creating new order:', error);
    return {
      success: false,
      message: 'Creating new order failed.',
    };
  }
}

export async function removeOrder({orderId}) {
  try {
    if (!orderId) {
      throw new Error('Order ID is required.');
    }

    const supabase = createClient();

    // Remove order
    const {error: removedOrderError} = await supabase.from('orders').delete().eq('id', orderId);

    if (removedOrderError) {
      console.error('Error removing order:', removedOrderError);
      throw new Error(removedOrderError);
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error removing order:', error);
    return {
      success: false,
      message: 'Removing order failed.',
    };
  }
}

export async function updateOrderStatus({orderId, status}) {
  try {
    if (!orderId || !status) {
      throw new Error('Order ID and status are required.');
    }

    const supabase = createClient();

    // Update order status
    const {error: updatedOrderError} = await supabase
      .from('orders')
      .update({status})
      .eq('id', orderId);

    if (updatedOrderError) {
      console.error('Error updating order status:', updatedOrderError);
      throw new Error(updatedOrderError);
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error updating order status:', error);
    return {
      success: false,
      message: 'Updating order status failed.',
    };
  }
}

export async function updateOrder({orderId, price, order}) {
  try {
    if (!orderId || !price || !order) {
      throw new Error('Order ID, price, and order are required.');
    }

    const supabase = createClient();

    // Update order
    const {error: updatedOrderError} = await supabase
      .from('orders')
      .update({price, order})
      .eq('id', orderId);

    if (updatedOrderError) {
      console.error('Error updating order:', updatedOrderError);
      throw new Error(updatedOrderError);
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error updating order:', error);
    return {
      success: false,
      message: 'Updating order failed.',
    };
  }
}
