import { useState, useEffect } from 'react';
import styled from 'styled-components';
import bgImage from '../../assets/images/promotion-section.png';
import hop1Image from '../../assets/images/hop1.png';
import hop2Image from '../../assets/images/hop2.png';
import { useNavigate } from 'react-router-dom';
import ImageWithLoading from '../common/ImageWithLoading';

const PromotionContainer = styled.section`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 2rem 1rem;
  text-align: center;
  position: relative;
  min-height: 80vh;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, rgba(255,255,255,0.95), rgba(255,255,255,0.8));
    z-index: 1;
  }
`;

const ProductImageWrapper = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  z-index: 2;
  ${props => props.position === 'left' ? `
    left: 0;
    bottom: 0;
    transform: translateX(-20%);
  ` : `
    right: 0;
    top: 50%;
    transform: translateY(-50%) translateX(20%);
  `}
  width: 250px;
  opacity: 0.9;

  @media (max-width: 1200px) {
    width: 180px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(80vh - 4rem);
`;

const PromotionText = styled.div`
  font-size: 3.5rem;
  line-height: 1.2;
  margin-bottom: 2rem;
  text-align: center;

  .highlight {
    color: #ff4444;
    font-weight: bold;
  }

  .green {
    color: #294f02;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const TimerTitle = styled.h3`
  color: #4CAF50;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const TimerContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const TimeBox = styled.div`
  background-color: #4CAF50;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-size: 2.5rem;
  font-weight: bold;
  min-width: 80px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 2rem;
    min-width: 60px;
    padding: 0.8rem 1rem;
  }
`;

const TimeSeparator = styled.span`
  color: #4CAF50;
  font-size: 2.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SubText = styled.p`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 800px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const OrderButton = styled.button`
  background-color: #ff4444;
  color: white;
  padding: 1rem 3rem;
  font-size: 1.8rem;
  border-radius: 50px;
  cursor: pointer;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    background-color: #ff3333;
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
    padding: 0.8rem 2rem;
  }
`;

const PromotionSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 0,
    seconds: 58
  });

  const navigate = useNavigate();

  const handleOrder = () => {
    navigate('/order');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newSeconds = prev.seconds - 1;
        if (newSeconds >= 0) {
          return { ...prev, seconds: newSeconds };
        }
        const newMinutes = prev.minutes - 1;
        if (newMinutes >= 0) {
          return { ...prev, minutes: newMinutes, seconds: 59 };
        }
        const newHours = prev.hours - 1;
        if (newHours >= 0) {
          return { hours: newHours, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 58 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <PromotionContainer>
      <ProductImageWrapper position="left">
        <ImageWithLoading 
          src={hop1Image} 
          alt="True Vegan Protein Product 1"
          aspectRatio="100%"
        />
      </ProductImageWrapper>
      <ProductImageWrapper position="right">
        <ImageWithLoading 
          src={hop2Image} 
          alt="True Vegan Protein Product 2"
          aspectRatio="100%"
        />
      </ProductImageWrapper>
      <Content>
        {/* <PromotionText>
          <div>GIẢM <span className="highlight">20%</span> CHO</div>
          <div><span className="highlight">100</span> <span className="green">KHÁCH HÀNG ĐẦU TIÊN</span></div>
        </PromotionText> */}
        <TimerTitle>ƯU ĐÃI KẾT THÚC SAU</TimerTitle>
        <TimerContainer>
          <TimeBox>{String(timeLeft.hours).padStart(2, '0')}</TimeBox>
          <TimeSeparator>:</TimeSeparator>
          <TimeBox>{String(timeLeft.minutes).padStart(2, '0')}</TimeBox>
          <TimeSeparator>:</TimeSeparator>
          <TimeBox>{String(timeLeft.seconds).padStart(2, '0')}</TimeBox>
        </TimerContainer>
        <SubText>
          Nhanh tay đặt hàng để nhận về những Combo ưu đãi đặt biệt chỉ có trong hôm nay
        </SubText>
        <OrderButton onClick={handleOrder}>🛒 ĐẶT HÀNG NGAY</OrderButton>
      </Content>
    </PromotionContainer>
  );
};

export default PromotionSection;
