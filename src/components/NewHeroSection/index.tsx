import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import expertImage from '../../assets/images/section1/anhchuyengia.png';
import logoImage from '../../assets/images/section1/logo.png';

const HeroContainer = styled.section`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #2E8B57 0%, #228B22 50%, #006400 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 2rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M20,20 Q30,10 40,20 T60,20 T80,20 Q90,30 80,40 T60,40 T40,40 Q30,50 40,60 T60,60 T80,60 Q90,70 80,80 T60,80 T40,80 Q30,90 20,80 Q10,70 20,60 T20,40 T20,20" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></svg>') repeat;
    opacity: 0.1;
    z-index: 1;
  }
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 3rem;
  }
`;

const LeftSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ExpertImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));

  @media (max-width: 768px) {
    max-width: 350px;
  }
`;

const RightSection = styled.div`
  color: white;
  position: relative;
`;

const Logo = styled.img`
  width: 80px;
  height: auto;
  margin-bottom: 2rem;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));

  @media (max-width: 768px) {
    width: 60px;
    margin-bottom: 1.5rem;
  }
`;

const MainTitle = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
  letter-spacing: 2px;
  line-height: 1.1;

  @media (max-width: 1024px) {
    font-size: 3.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    letter-spacing: 1px;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.8rem;
  font-weight: normal;
  margin-bottom: 3rem;
  font-style: italic;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  opacity: 0.95;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const FeatureBox = styled.div`
  background: linear-gradient(45deg, #FF4444, #CC0000);
  border: 3px solid white;
  border-radius: 15px;
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
    transform: rotate(45deg);
    animation: shine 3s infinite;
  }

  @keyframes shine {
    0% {
      transform: translateX(-100%) translateY(-100%) rotate(45deg);
    }
    50% {
      transform: translateX(100%) translateY(100%) rotate(45deg);
    }
    100% {
      transform: translateX(-100%) translateY(-100%) rotate(45deg);
    }
  }

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const FeatureTitle = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const FeatureSubtitle = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  text-align: justify;
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 1.2rem;
    text-align: left;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 1rem;
  }
`;

const OrderButton = styled.button`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  padding: 1.2rem 4rem;
  background: linear-gradient(45deg, #FF6B35, #F7931E);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
  letter-spacing: 1px;
  z-index: 10;

  &:hover {
    background: linear-gradient(45deg, #FF5722, #E68900);
    transform: translateX(-50%) translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: translateX(-50%) translateY(-1px);
  }

  @media (max-width: 1024px) {
    position: static;
    transform: none;
    margin-top: 2rem;
    width: 100%;
    max-width: 400px;
    
    &:hover {
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    padding: 1rem 3rem;
    font-size: 1.2rem;
    margin-top: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 0.8rem 2rem;
    font-size: 1rem;
  }
`;

const NewHeroSection = () => {
  const navigate = useNavigate();

  const handleOrder = () => {
    navigate('/order');
  };

  return (
    <HeroContainer>
      <Content>
        <LeftSection>
          <ExpertImage src={expertImage} alt="Chuyên gia dinh dưỡng" />
        </LeftSection>
        
        <RightSection>
          <Logo src={logoImage} alt="K1 Logo" />
          
          <MainTitle>TRUE VEGAN PROTEIN</MainTitle>
          
          <Subtitle>Bột Đạm Dinh Dưỡng Thực Vật</Subtitle>
          
          <FeatureBox>
            <FeatureTitle>GIẢI PHÁP TOÀN DIỆN</FeatureTitle>
            <FeatureSubtitle>ĐẨY LÙI BỆNH MẠN TÍNH</FeatureSubtitle>
          </FeatureBox>
          
          <Description>
            Thực phẩm tốt phải giúp cơ thể khỏe, trẻ, đẹp, thông minh, yêu đời, trường thọ. 
            Sản phẩm này là kết tinh của kiến thức, tâm huyết và khát vọng nâng cao sức khỏe 
            người tiêu dùng, nên đáp ứng được tất cả những tiêu chuẩn trên.
          </Description>
          
          <OrderButton onClick={handleOrder}>
            ĐẶT HÀNG NGAY
          </OrderButton>
        </RightSection>
      </Content>
    </HeroContainer>
  );
};

export default NewHeroSection;