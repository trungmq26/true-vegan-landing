import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import heroImage from '../../assets/images/section1/Home page (1).png';


const HeroContainer = styled.section`
  width: 100%;
  background-color: #ffffff;
  position: relative;
`;

const ButtonsContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  z-index: 1000;
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    padding: 0 10px;
  }
`;

const ContactButton = styled.button`
  padding: 12px 28px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 10px 24px;
    font-size: 14px;
  }
`;

const EmailButton = styled(ContactButton)`
  background: #2196F3;
  color: white;
  
  &:hover {
    background: #1976D2;
  }
`;

const PhoneButton = styled(ContactButton)`
  background: #4CAF50;
  color: white;
  
  &:hover {
    background: #45a049;
  }
`;

const OrderNowButton = styled(ContactButton)`
  background: #f44336;
  color: white;
  
  &:hover {
    background: #d32f2f;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
  vertical-align: middle;
`;

const HeroSection = () => {
  const navigate = useNavigate();

  const handleEmailClick = () => {
    window.open('mailto:tmdv.hopecorp@gmail.com');
  };

  const handlePhoneClick = () => {
    window.open('tel:0336759982');
  };

  const handleOrderClick = () => {
    navigate('/order');
  };

  return (
    <HeroContainer>
      <ButtonsContainer>
        <EmailButton onClick={handleEmailClick}>
          📧 tmdv.hopecorp@gmail.com
        </EmailButton>
        <PhoneButton onClick={handlePhoneClick}>
          📞 0336759982
        </PhoneButton>
        <OrderNowButton onClick={handleOrderClick}>
          🛒 ĐẶT HÀNG NGAY
        </OrderNowButton>
      </ButtonsContainer>
      <Image src={heroImage} alt="True Vegan Protein Hero" loading="lazy" />
    </HeroContainer>
  );
};

export default HeroSection;
