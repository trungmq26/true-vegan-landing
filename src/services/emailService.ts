import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_6c572a7'; // Service ID từ EmailJS
const EMAILJS_TEMPLATE_ID_ORDER = 'template_l4sm3yw'; // Template cho đơn hàng
const EMAILJS_TEMPLATE_ID_CONSULTATION = 'template_l4sm3yw'; // Dùng chung template với đơn hàng
const EMAILJS_PUBLIC_KEY = 'nCEEsIF9gK7qvH6kP'; // Public Key từ EmailJS

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export interface OrderData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  packageTitle: string;
  packagePrice: string;
  quantity: number;
  totalAmount: string;
  customerAddress?: string;
  orderDate: string;
}

export interface ConsultationData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  message: string;
  consultationType: string;
  contactTime?: string;
  submissionDate: string;
}

/**
 * Gửi email thông báo đơn hàng mới cho admin
 */
export const sendOrderNotificationToAdmin = async (orderData: OrderData): Promise<boolean> => {
  try {
    const templateParams = {
      to_email: 'tmdv.hopecorp@gmail.com', // Email admin
      customer_name: orderData.customerName,
      customer_email: orderData.customerEmail,
      customer_phone: orderData.customerPhone,
      customer_address: orderData.customerAddress || 'Chưa cung cấp',
      package_title: orderData.packageTitle,
      package_price: orderData.packagePrice,
      quantity: orderData.quantity,
      total_amount: orderData.totalAmount,
      order_date: orderData.orderDate,
      subject: `🛒 Đơn hàng mới từ ${orderData.customerName}`,
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID_ORDER,
      templateParams
    );

    console.log('Order notification sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Failed to send order notification:', error);
    return false;
  }
};

/**
 * Gửi email thông báo yêu cầu tư vấn mới cho admin
 */
export const sendConsultationNotificationToAdmin = async (consultationData: ConsultationData): Promise<boolean> => {
  try {
    const templateParams = {
      to_email: 'tmdv.hopecorp@gmail.com', // Email admin
      customer_name: consultationData.customerName,
      customer_email: consultationData.customerEmail || 'Chưa cung cấp',
      customer_phone: consultationData.customerPhone,
      customer_address: `Yêu cầu tư vấn: ${consultationData.message || 'Khách hàng muốn được tư vấn'}`,
      package_title: `Loại tư vấn: ${consultationData.consultationType || 'Tư vấn chung'}`,
      package_price: 'Miễn phí',
      quantity: '1',
      total_amount: '0đ',
      order_date: consultationData.submissionDate,
      subject: `💬 Yêu cầu tư vấn mới từ ${consultationData.customerName}`,
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID_CONSULTATION,
      templateParams
    );

    console.log('Consultation notification sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Failed to send consultation notification:', error);
    return false;
  }
};

/**
 * Gửi email xác nhận cho khách hàng sau khi đặt hàng
 */
export const sendOrderConfirmationToCustomer = async (orderData: OrderData): Promise<boolean> => {
  try {
    const templateParams = {
      to_email: orderData.customerEmail,
      customer_name: orderData.customerName,
      package_title: orderData.packageTitle,
      package_price: orderData.packagePrice,
      quantity: orderData.quantity,
      total_amount: orderData.totalAmount,
      order_date: orderData.orderDate,
      subject: `✅ Xác nhận đơn hàng - TRUE VEGAN PROTEIN`,
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      'customer_order_confirmation_template', // Template xác nhận cho khách hàng
      templateParams
    );

    console.log('Customer confirmation sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Failed to send customer confirmation:', error);
    return false;
  }
};

/**
 * Gửi email xác nhận tư vấn cho khách hàng
 */
export const sendConsultationConfirmationToCustomer = async (consultationData: ConsultationData): Promise<boolean> => {
  try {
    const templateParams = {
      to_email: consultationData.customerEmail,
      customer_name: consultationData.customerName,
      consultation_type: consultationData.consultationType,
      message: consultationData.message,
      submission_date: consultationData.submissionDate,
      subject: `✅ Đã nhận yêu cầu tư vấn - TRUE VEGAN PROTEIN`,
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      'customer_consultation_confirmation_template', // Template xác nhận tư vấn cho khách hàng
      templateParams
    );

    console.log('Customer consultation confirmation sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Failed to send customer consultation confirmation:', error);
    return false;
  }
};