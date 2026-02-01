import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import QRPopup from '../QRPopup';
import { sendOrderNotificationToAdmin, sendOrderConfirmationToCustomer, OrderData } from '../../services/emailService';
import { createOrder } from '../../services/orderService';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const Logo = styled.h1`
  color: #294f02;
  margin: 0;
  font-size: 1.5rem;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 5rem auto 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const OrderSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const SectionTitle = styled.h2`
  color: #294f02;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
`;

const RequiredMark = styled.span`
  color: #ff6b6b;
  margin-left: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const OrderDetails = styled.div`
  margin-bottom: 2rem;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ItemQuantity = styled.span`
  color: #666;
`;

const ItemPrice = styled.span`
  color: #333;
  font-weight: 500;
`;

const OrderSummary = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const SummaryRow = styled.div<{ isTotal?: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: ${props => props.isTotal ? '#294f02' : '#666'};
  font-weight: ${props => props.isTotal ? 'bold' : 'normal'};
  font-size: ${props => props.isTotal ? '1.2rem' : '1rem'};
`;

const PaymentMethods = styled.div`
  margin-top: 2rem;
`;

const PaymentMethod = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #4CAF50;
  }
`;

const PaymentIcon = styled.span`
  font-size: 1.5rem;
`;

const PaymentLabel = styled.span`
  flex: 1;
`;

const Radio = styled.input`
  accent-color: #4CAF50;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button<{ primary?: boolean }>`
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  background: ${props => props.primary ? '#4CAF50' : 'white'};
  color: ${props => props.primary ? 'white' : '#666'};
  border: ${props => props.primary ? 'none' : '1px solid #ddd'};
  
  &:hover {
    background: ${props => props.primary ? '#45a049' : '#f5f5f5'};
  }
`;

interface LocationState {
  package: {
    title: string;
    price: string;
    originalPrice: string;
    features: string[];
  };
  quantity: number;
}

const formatPrice = (price: string) => {
  return parseInt(price.replace(/\D/g, ''));
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState<'QR' | 'COD'>('QR');
  const [showQRPopup, setShowQRPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    phone: false,
    email: false,
    address: false
  });
  const state = location.state as LocationState;

  const basePrice = formatPrice(state.package.price);
  const shippingFee = 20000;
  
  // Chỉ áp dụng giảm giá 70k cho sản phẩm hộp (combo), không áp dụng cho hộp giấy
  const isBoxProduct = state.package.title.includes("Hộp Giấy");
  const discount = isBoxProduct ? 0 : 70000;
  
  const totalPrice = (basePrice * state.quantity) + shippingFee - discount;

  useEffect(() => {
    if (!state?.package) {
      navigate('/order');
    }
  }, [state, navigate]);
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = {
      name: !formData.name.trim(),
      phone: !formData.phone.trim(),
      email: !formData.email.trim() || !emailRegex.test(formData.email),
      address: !formData.address.trim()
    };
    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  const handleInputChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: false
      }));
    }
  };

  const sendOrderEmails = async (orderId: string) => {
    const orderData: OrderData = {
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      customerAddress: formData.address,
      packageTitle: state.package.title,
      packagePrice: state.package.price,
      quantity: state.quantity,
      totalAmount: totalPrice.toLocaleString() + 'đ',
      orderDate: new Date().toLocaleString('vi-VN')
    };

    try {
      // Gửi email thông báo cho admin
      await sendOrderNotificationToAdmin(orderData);
      
      // Gửi email xác nhận cho khách hàng
      await sendOrderConfirmationToCustomer(orderData);
      
      console.log('Đã gửi email thành công');
    } catch (error) {
      console.error('Lỗi khi gửi email:', error);
    }
  };

  const saveOrderToDatabase = async (paymentMethodText: string) => {
    const orderResult = await createOrder({
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      customer_address: formData.address,
      package_title: state.package.title,
      package_price: state.package.price,
      quantity: state.quantity,
      total_amount: totalPrice.toLocaleString() + 'đ',
      payment_method: paymentMethodText,
      status: 'pending'
    });

    return orderResult;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      if (paymentMethod === 'QR') {
        setShowQRPopup(true);
      } else {
        // Lưu đơn hàng vào database
        const orderResult = await saveOrderToDatabase('Thanh toán khi nhận hàng (COD)');

        if (orderResult.success && orderResult.data) {
          // Gửi email
          await sendOrderEmails(orderResult.data.order_code);

          // Xử lý đặt hàng COD
          navigate('/order-success', {
            state: {
              orderInfo: {
                id: orderResult.data.order_code,
                date: new Date().toLocaleDateString('vi-VN'),
                paymentMethod: 'Thanh toán khi nhận hàng',
                product: state?.package,
                quantity: state?.quantity,
                totalPrice: totalPrice,
                customerName: formData.name,
                customerPhone: formData.phone,
                customerEmail: formData.email,
                customerAddress: formData.address
              }
            }
          });
        } else {
          alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!');
        }
      }
    }
  };

  const handleQRClose = () => {
    setShowQRPopup(false);
  };

  const handleQRComplete = async () => {
    // Lưu đơn hàng vào database
    const orderResult = await saveOrderToDatabase('Thanh toán trực tiếp (QR)');

    if (orderResult.success && orderResult.data) {
      // Gửi email
      await sendOrderEmails(orderResult.data.order_code);

      navigate('/order-success', {
        state: {
          orderInfo: {
            id: orderResult.data.order_code,
            date: new Date().toLocaleDateString('vi-VN'),
            paymentMethod: 'Thanh toán trực tiếp (QR)',
            product: state?.package,
            quantity: state?.quantity,
            totalPrice: totalPrice,
            customerName: formData.name,
            customerPhone: formData.phone,
            customerEmail: formData.email,
            customerAddress: formData.address
          }
        }
      });
    } else {
      alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!');
      setShowQRPopup(false);
    }
  };

  return (
    <PageContainer>
      <Header>
        <Logo>TRUE VEGANE PROTEIN</Logo>
      </Header>
      <Content>
        <FormSection>
          <SectionTitle>Thông tin giao hàng</SectionTitle>
          <FormGroup>
            <Label>Tên người nhận<RequiredMark>*</RequiredMark></Label>
            <Input 
              type="text" 
              placeholder="Nhập tên của bạn"
              value={formData.name}
              onChange={handleInputChange('name')}
              style={{ borderColor: formErrors.name ? '#ff6b6b' : undefined }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Số điện thoại<RequiredMark>*</RequiredMark></Label>
            <Input 
              type="tel" 
              placeholder="Nhập số điện thoại"
              value={formData.phone}
              onChange={handleInputChange('phone')}
              style={{ borderColor: formErrors.phone ? '#ff6b6b' : undefined }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Email<RequiredMark>*</RequiredMark></Label>
            <Input 
              type="email" 
              placeholder="Nhập email của bạn"
              value={formData.email}
              onChange={handleInputChange('email')}
              style={{ borderColor: formErrors.email ? '#ff6b6b' : undefined }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Địa chỉ giao hàng<RequiredMark>*</RequiredMark></Label>
            <TextArea 
              placeholder="Nhập địa chỉ của bạn"
              value={formData.address}
              onChange={handleInputChange('address')}
              style={{ borderColor: formErrors.address ? '#ff6b6b' : undefined }}
            />
          </FormGroup>
        </FormSection>
        
        <OrderSection>
          <SectionTitle>Đơn hàng</SectionTitle>
          <OrderDetails>
            <OrderItem>
              <ItemInfo>
                <span>{state?.package.title}</span>
                <ItemQuantity>x{state?.quantity}</ItemQuantity>
              </ItemInfo>
              <ItemPrice>{state?.package.price}</ItemPrice>
            </OrderItem>
          </OrderDetails>
          
          <OrderSummary>
            <SummaryRow>
              <span>Giá</span>
              <span>{basePrice.toLocaleString()}đ</span>
            </SummaryRow>
            <SummaryRow>
              <span>Phí ship</span>
              <span style={{ color: '#ff6b6b' }}>+{shippingFee.toLocaleString()}đ</span>
            </SummaryRow>
            <SummaryRow>
              <span>Giảm giá</span>
              <span style={{ color: '#4CAF50' }}>-{discount.toLocaleString()}đ</span>
            </SummaryRow>
            <SummaryRow isTotal>
              <span>Tổng cộng</span>
              <span>{totalPrice.toLocaleString()}đ</span>
            </SummaryRow>
          </OrderSummary>
          
          <PaymentMethods>
            <SectionTitle>Phương thức thanh toán</SectionTitle>
            <PaymentMethod onClick={() => setPaymentMethod('QR')}>
              <PaymentIcon>💳</PaymentIcon>
              <PaymentLabel>Thanh toán trực tiếp (QR)</PaymentLabel>
              <Radio 
                type="radio" 
                name="payment" 
                checked={paymentMethod === 'QR'} 
                onChange={() => setPaymentMethod('QR')}
              />
            </PaymentMethod>
            <PaymentMethod onClick={() => setPaymentMethod('COD')}>
              <PaymentIcon>💵</PaymentIcon>
              <PaymentLabel>Thanh toán khi nhận hàng (COD)</PaymentLabel>
              <Radio 
                type="radio" 
                name="payment" 
                checked={paymentMethod === 'COD'} 
                onChange={() => setPaymentMethod('COD')}
              />
            </PaymentMethod>
          </PaymentMethods>
          
          <ButtonGroup>
            <Button onClick={handleBack}>Trở về</Button>
            <Button primary onClick={handleSubmit}>Đặt hàng</Button>
          </ButtonGroup>
        </OrderSection>
      </Content>
      {showQRPopup && (
        <QRPopup
          amount={totalPrice}
          onClose={handleQRClose}
          onComplete={handleQRComplete}
        />
      )}
    </PageContainer>
  );
};

export default CheckoutPage;
