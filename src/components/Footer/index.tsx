import styled from 'styled-components';
import { useState } from 'react';
import { sendConsultationNotificationToAdmin, ConsultationData } from '../../services/emailService';

const FooterContainer = styled.footer`
  background-color: #f5f5f5;
  padding: 3rem 2rem 1rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CompanyLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const LogoIcon = styled.div`
  width: 60px;
  height: 60px;
  background: #4CAF50;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
`;

const CompanyName = styled.h3`
  color: #2d5016;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  line-height: 1.2;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #666;
  font-size: 1rem;
`;

const ContactIcon = styled.span`
  font-size: 1.2rem;
  color: #4CAF50;
`;

const ConsultationForm = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h3`
  color: #2d5016;
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const FormLabel = styled.label`
  display: block;
  color: #666;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background: #f9f9f9;
  
  &::placeholder {
    color: #ccc;
  }
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    background: white;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: #45a049;
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const Message = styled.div<{ type: 'success' | 'error' }>`
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 0.9rem;
  background: ${props => props.type === 'success' ? '#d4edda' : '#f8d7da'};
  color: ${props => props.type === 'success' ? '#155724' : '#721c24'};
  border: 1px solid ${props => props.type === 'success' ? '#c3e6cb' : '#f5c6cb'};
`;

const Copyright = styled.div`
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #ddd;
`;

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear message when user starts typing
    if (message) {
      setMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim()) {
      setMessage({
        type: 'error',
        text: 'Vui lòng nhập đầy đủ tên và số điện thoại'
      });
      return;
    }
    
    setIsSubmitting(true);
    setMessage(null);
    
    try {
      const consultationData: ConsultationData = {
        customerName: formData.name,
        customerEmail: '',
        customerPhone: formData.phone,
        message: 'Khách hàng đăng ký tư vấn từ Footer',
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

  return (
    <FooterContainer>
      <FooterContent>
        <CompanyInfo>
          <CompanyLogo>
            <LogoIcon>H</LogoIcon>
            <CompanyName>
              HỌC VIỆN NGÔ ĐỨC VƯỢNG<br />
              ĐKKD CÔNG TY CỔ PHẦN TMDV HOPE
            </CompanyName>
          </CompanyLogo>
          <ContactInfo>
            <ContactItem>
              <ContactIcon>📍</ContactIcon>
              <span>Số 63/253 đường Ngô Quyền, phường Lê Thanh Nghị, TP Hải Phòng, tỉnh Hải Dương</span>
            </ContactItem>
            <ContactItem>
              <ContactIcon>📞</ContactIcon>
              <span>098 793 1551 - 0398 767 885</span>
            </ContactItem>
            <ContactItem>
              <ContactIcon>✉️</ContactIcon>
              <span>ikihealingdetox@gmail.com</span>
            </ContactItem>
          </ContactInfo>
        </CompanyInfo>
        
        <ConsultationForm>
          <FormTitle>Đăng ký tư vấn miễn phí</FormTitle>
          
          {message && (
            <Message type={message.type}>
              {message.text}
            </Message>
          )}
          
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Họ và tên *</FormLabel>
              <FormInput
                type="text"
                name="name"
                placeholder="Nhập tên của bạn"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Số điện thoại *</FormLabel>
              <FormInput
                type="tel"
                name="phone"
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Đang gửi...' : '🎧 ĐĂNG KÝ TƯ VẤN'}
            </SubmitButton>
          </form>
        </ConsultationForm>
      </FooterContent>
      
      <Copyright>
        trueveganprotein 2025 All right reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
