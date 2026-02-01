import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { sendConsultationNotificationToAdmin, ConsultationData } from '../../services/emailService';

const Section14Container = styled.section`
  width: 100%;
  background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z" fill="rgba(255,255,255,0.1)"/></svg>') center/cover no-repeat;
    z-index: 1;
  }
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const MainTitle = styled.h2`
  font-family: 'SNV-SAF', sans-serif;
  font-size: 3rem;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SubTitle = styled.h3`
  font-family: 'SVN-Sari', sans-serif;
  font-size: 2rem;
  color: #E8F5E8;
  font-weight: 600;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const HighlightBox = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50px;
  padding: 1.5rem 3rem;
  margin: 2rem auto;
  display: inline-block;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  border: 3px solid #4CAF50;
`;

const HighlightText = styled.p`
  font-family: 'SVN-Poppins', sans-serif;
  font-size: 1.4rem;
  color: #2E7D32;
  font-weight: 600;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const OrderButton = styled.button`
  background: #f44336;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1.2rem 4rem;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(244, 67, 54, 0.4);
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  
  &:hover {
    background: #d32f2f;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(244, 67, 54, 0.5);
  }

  @media (max-width: 768px) {
    padding: 1rem 3rem;
    font-size: 1.2rem;
  }
`;

const ConsultButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  border-radius: 50px;
  padding: 1.2rem 4rem;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  
  &:hover {
    background: white;
    color: #2E7D32;
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    padding: 1rem 3rem;
    font-size: 1.2rem;
  }
`;

const ConsultForm = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  margin-top: 2rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

const FormTitle = styled.h4`
  color: #2E7D32;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.3rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 10px;
  margin-bottom: 1rem;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
  
  &.error {
    border-color: #f44336;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #45a049;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Message = styled.div<{ type: 'success' | 'error' }>`
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  text-align: center;
  background: ${props => props.type === 'success' ? '#d4edda' : '#f8d7da'};
  color: ${props => props.type === 'success' ? '#155724' : '#721c24'};
  border: 1px solid ${props => props.type === 'success' ? '#c3e6cb' : '#f5c6cb'};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  float: right;
  font-size: 1.5rem;
  
  &:hover {
    color: #333;
  }
`;

const Section14 = () => {
  const navigate = useNavigate();
  const [showConsultForm, setShowConsultForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    phone: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleOrderClick = () => {
    navigate('/order');
  };

  const handleConsultClick = () => {
    setShowConsultForm(true);
  };

  const validateForm = () => {
    const errors = {
      name: !formData.name.trim(),
      phone: !formData.phone.trim()
    };
    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  const handleInputChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setMessage(null);
    
    try {
      const consultationData: ConsultationData = {
        customerName: formData.name,
        customerEmail: '',
        customerPhone: formData.phone,
        message: 'Khách hàng muốn được tư vấn về sản phẩm True Vegan Protein',
        consultationType: 'Tư vấn sản phẩm',
        contactTime: '',
        submissionDate: new Date().toLocaleString('vi-VN')
      };
      
      await sendConsultationNotificationToAdmin(consultationData);
      
      setMessage({
        type: 'success',
        text: '✅ Đã gửi yêu cầu tư vấn thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.'
      });
      
      // Reset form
      setFormData({ name: '', phone: '' });
      
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu tư vấn:', error);
      setMessage({
        type: 'error',
        text: '❌ Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseForm = () => {
    setShowConsultForm(false);
    setMessage(null);
    setFormData({ name: '', phone: '' });
    setFormErrors({ name: false, phone: false });
  };

  return (
    <Section14Container>
      <Content>
        <MainTitle>BẠN MUỐN NÂNG TẦM SỨC KHỎE?</MainTitle>
        <SubTitle>Đặt Ngay True Vegan Protein</SubTitle>
        <HighlightBox>
          <HighlightText>Chất Lượng Thuần Chay - Hiệu Quả Đột Phá</HighlightText>
        </HighlightBox>
        
        {!showConsultForm ? (
          <ButtonGroup>
            <OrderButton onClick={handleOrderClick}>
              🛒 ĐẶT HÀNG NGAY
            </OrderButton>
            {/* <ConsultButton onClick={handleConsultClick}>
              💬 TƯ VẤN MIỄN PHÍ
            </ConsultButton> */}
          </ButtonGroup>
        ) : (
          <ConsultForm>
            <CloseButton onClick={handleCloseForm}>×</CloseButton>
            <FormTitle>📞 Đăng Ký Tư Vấn Miễn Phí</FormTitle>
            
            {message && (
              <Message type={message.type}>
                {message.text}
              </Message>
            )}
            
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Nhập họ và tên *"
                value={formData.name}
                onChange={handleInputChange('name')}
                className={formErrors.name ? 'error' : ''}
              />
              
              <Input
                type="tel"
                placeholder="Nhập số điện thoại *"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                className={formErrors.phone ? 'error' : ''}
              />
              
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu tư vấn'}
              </SubmitButton>
            </form>
          </ConsultForm>
        )}
      </Content>
    </Section14Container>
  );
};

export default Section14;