import { supabase } from './supabase';

export interface Order {
  id?: string;
  order_code: string;
  customer_name: string;
  customer_email?: string;
  customer_phone: string;
  customer_address?: string;
  package_title: string;
  package_price: string;
  quantity: number;
  total_amount: string;
  payment_method?: string;
  status?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

// Generate unique order code
export const generateOrderCode = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TVP-${timestamp}-${random}`;
};

// Create new order
export const createOrder = async (orderData: Omit<Order, 'id' | 'order_code' | 'created_at' | 'updated_at'>): Promise<{ success: boolean; data?: Order; error?: string }> => {
  try {
    const order_code = generateOrderCode();

    const { data, error } = await supabase
      .from('orders')
      .insert([{
        ...orderData,
        order_code,
        status: 'pending'
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating order:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error: 'Có lỗi xảy ra khi tạo đơn hàng' };
  }
};

// Get all orders (for admin)
export const getOrders = async (): Promise<{ success: boolean; data?: Order[]; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { success: false, error: 'Có lỗi xảy ra khi lấy danh sách đơn hàng' };
  }
};

// Get single order by ID
export const getOrderById = async (id: string): Promise<{ success: boolean; data?: Order; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching order:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching order:', error);
    return { success: false, error: 'Có lỗi xảy ra khi lấy thông tin đơn hàng' };
  }
};

// Get order by order code
export const getOrderByCode = async (orderCode: string): Promise<{ success: boolean; data?: Order; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_code', orderCode)
      .single();

    if (error) {
      console.error('Error fetching order:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching order:', error);
    return { success: false, error: 'Có lỗi xảy ra khi lấy thông tin đơn hàng' };
  }
};

// Update order status
export const updateOrderStatus = async (id: string, status: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Error updating order:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating order:', error);
    return { success: false, error: 'Có lỗi xảy ra khi cập nhật đơn hàng' };
  }
};

// Delete order
export const deleteOrder = async (id: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting order:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting order:', error);
    return { success: false, error: 'Có lỗi xảy ra khi xóa đơn hàng' };
  }
};

// Get order statistics
export const getOrderStats = async (): Promise<{
  success: boolean;
  data?: {
    total: number;
    pending: number;
    confirmed: number;
    shipped: number;
    completed: number;
    cancelled: number;
  };
  error?: string
}> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('status');

    if (error) {
      console.error('Error fetching order stats:', error);
      return { success: false, error: error.message };
    }

    const stats = {
      total: data?.length || 0,
      pending: data?.filter(o => o.status === 'pending').length || 0,
      confirmed: data?.filter(o => o.status === 'confirmed').length || 0,
      shipped: data?.filter(o => o.status === 'shipped').length || 0,
      completed: data?.filter(o => o.status === 'completed').length || 0,
      cancelled: data?.filter(o => o.status === 'cancelled').length || 0,
    };

    return { success: true, data: stats };
  } catch (error) {
    console.error('Error fetching order stats:', error);
    return { success: false, error: 'Có lỗi xảy ra khi lấy thống kê đơn hàng' };
  }
};
