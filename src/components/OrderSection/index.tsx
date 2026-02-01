import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import productImage from '../../assets/images/section11/a.png';
import giftBoxImage from '../../assets/images/Screenshot 2025-08-19 at 10.16.55.png';
import threeBoxImage from '../../assets/images/Screenshot 2025-08-19 at 10.23.18.png';
import twoSmallBoxImage from '../../assets/images/section11/2.png';
import fiveBoxImage from '../../assets/images/section11/image.png';
import paperBoxImage from '../../assets/images/section11/ChatGPT Image Oct 22, 2025, 10_36_05 AM.png';
import paperBoxImage3 from '../../assets/images/section11/3hopgiay.png';
import paperBoxImage2 from '../../assets/images/section11/2hopgiay.png';


import ImageModal from '../common/ImageModal';

const OrderContainer = styled.section`
  width: 100%;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const TimerContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
`;

const TimeBox = styled.div`
  background: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 3rem;
  font-weight: bold;
  color: #294f02;
  min-width: 100px;

  @media (max-width: 768px) {
    font-size: 2rem;
    min-width: 70px;
    padding: 0.8rem 1rem;
  }
`;

const TimeSeparator = styled.span`
  font-size: 3rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  color: white;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.5rem;
  margin: 2rem 0;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const PackagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PackageCard = styled.div<{ isPopular?: boolean }>`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  color: #333;
  position: relative;
  overflow: hidden;

  ${props => props.isPopular && `
    border: 3px solid #ff6b6b;
    transform: scale(1.05);

    @media (max-width: 1024px) {
      transform: scale(1);
    }
  `}
`;

const PopularBadge = styled.div`
  position: absolute;
  top: 20px;
  right: -35px;
  background: #ff6b6b;
  color: white;
  padding: 0.5rem 3rem;
  transform: rotate(45deg);
  font-size: 0.9rem;
  font-weight: bold;
`;

const PackageTitle = styled.h4`
  font-size: 1.5rem;
  color: #4CAF50;
  margin-bottom: 1rem;
`;

const PackageImage = styled.img`
  width: 100%;
  height: auto;
  margin: 1rem 0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;


const Price = styled.div`
  margin: 1rem 0;
`;

const OriginalPrice = styled.div`
  color: #999;
  text-decoration: line-through;
  font-size: 1.1rem;
`;

const DiscountBadge = styled.span`
  background: #ff6b6b;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  margin-left: 0.5rem;
  font-size: 0.9rem;
`;

const FinalPrice = styled.div`
  font-size: 2rem;
  color: #4CAF50;
  font-weight: bold;
`;

const BuyButton = styled.button<{ isPopular?: boolean }>`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.isPopular ? `
    background: #ff6b6b;
    color: white;
    
    &:hover {
      background: #ff5252;
    }
  ` : `
    background: #4CAF50;
    color: white;
    
    &:hover {
      background: #45a049;
    }
  `}
`;

const Bonus = styled.div`
  background: #fff3cd;
  color: #856404;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  font-size: 0.9rem;
`;

const ClickableText = styled.span`
  color: #4CAF50;
  cursor: pointer;
  font-weight: bold;
  text-decoration: underline;
  transition: color 0.3s ease;

  &:hover {
    color: #45a049;
  }
`;

const Features = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 3rem;
  flex-wrap: wrap;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const OrderSection = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 0,
    seconds: 58
  });

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

  const handleOrder = (packageIndex: number) => {
    navigate('/order', {
      state: {
        selectedPackageIndex: packageIndex
      }
    });
  };

  const handleGiftBoxClick = (imageSrc: string, imageAlt: string) => {
    setModalImage(imageSrc);
    setModalAlt(imageAlt);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const packages = [
    {
      title: "Gói Tiêu Chuẩn",
      image: twoSmallBoxImage,
      quantity: "2 Hộp Protein Thực Vật",
      finalPrice: "990.000đ",
      bonus: "Tặng 1 bình lắc!",
      isPopular: false
    },
    {
      title: "Gói Tiết Kiệm",
      image: fiveBoxImage,
      quantity: "5 Hộp TRUE VEGAN PROTEIN",
      originalPrice: "2,750,000đ",
      discount: "-10%",
      finalPrice: "2.337.500đ",
      bonusImageAlt: "Hộp giấy dạng gói quà tặng",
      bonus: "Free ship toàn quốc",
      isPopular: false
    },
    {
      title: "Gói Tối Ưu",
      image: productImage,
      quantity: "3 Hộp TRUE VEGAN PROTEIN",
      finalPrice: "1,650,000đ",
      bonus: "Tặng 1 hộp giấy dạng gói như hình!",
      hasClickableBonus: true,
      bonusImage: giftBoxImage,
      isPopular: false
    },
    {
      title: "Hộp Giấy 868g",
      image: paperBoxImage,
      quantity: "31 Gói TRUE VEGAN PROTEIN",
      finalPrice: "950.000đ",
      bonus: "Tiện lợi mang theo!",
      isPopular: false
    },
    {
      title: "Hộp Giấy 868g x2",
      image: paperBoxImage2, 
      quantity: "62 Gói TRUE VEGAN PROTEIN (2 hộp)",
      originalPrice: "1.918.000đ",
      discount: "-5%",
      finalPrice: "1.822.100đ",
      bonus: "Tiết kiệm 95.900đ!",
      isPopular: false
    },
    {
      title: "Hộp Giấy 868g x3",
      image: paperBoxImage3,
      quantity: "93 Gói TRUE VEGAN PROTEIN (3 hộp)",
      originalPrice: "2.877.000đ", 
      discount: "-10%",
      finalPrice: "2.589.300đ",
      bonus: "Tiết kiệm 287.700đ + Free ship!",
      isPopular: true
    }
  ];

  return (
    <OrderContainer>
      <Content>
        <Title>SẴN SÀNG TRẢI NGHIỆM TRUE VEGAN PROTEIN?</Title>
        <Subtitle>ƯU ĐÃI KẾT THÚC SAU</Subtitle>
        <TimerContainer>
          <TimeBox>{String(timeLeft.hours).padStart(2, '0')}</TimeBox>
          <TimeSeparator>:</TimeSeparator>
          <TimeBox>{String(timeLeft.minutes).padStart(2, '0')}</TimeBox>
          <TimeSeparator>:</TimeSeparator>
          <TimeBox>{String(timeLeft.seconds).padStart(2, '0')}</TimeBox>
        </TimerContainer>
        <Description>
          Đặt hàng ngay hôm nay để nhận ưu đãi đặc biệt và bắt đầu hành trình dinh dưỡng thuần chay!
        </Description>
        <PackagesGrid>
          {packages.map((pkg, index) => (
            <PackageCard key={index} isPopular={pkg.isPopular}>
              {pkg.isPopular && <PopularBadge>BEST SELLER</PopularBadge>}
              <PackageTitle>{pkg.title}</PackageTitle>
              <PackageImage src={pkg.image} alt={pkg.title} />
              <PackageTitle>{pkg.quantity}</PackageTitle>
              <Price>
                {pkg.originalPrice && (
                  <OriginalPrice>
                    Giá gốc: {pkg.originalPrice}
                    {/* <DiscountBadge>{pkg.discount}</DiscountBadge> */}
                  </OriginalPrice>
                )}
                <FinalPrice>{pkg.finalPrice}</FinalPrice>
              </Price>
              {pkg.bonus && (
                <Bonus>
                  {pkg.hasClickableBonus && pkg.bonusImage ? (
                    <ClickableText onClick={() => handleGiftBoxClick(pkg.bonusImage, pkg.bonusImageAlt || 'Quà tặng')}>
                      {pkg.bonus}
                    </ClickableText>
                  ) : (
                    pkg.bonus
                  )}
                </Bonus>
              )}
              <BuyButton isPopular={pkg.isPopular} onClick={() => handleOrder(index)}>
                {pkg.isPopular ? 'MUA NGAY + TIẾT KIỆM 10%' : 'MUA NGAY'}
              </BuyButton>
            </PackageCard>
          ))}
        </PackagesGrid>
        <Features>
          <FeatureItem>
            🛡️ Tư vấn nhiệt tình
          </FeatureItem>
          <FeatureItem>
            🚚 Giao hàng toàn quốc
          </FeatureItem>
          <FeatureItem>
            💳 Thanh toán an toàn
          </FeatureItem>
          <FeatureItem>
            ✨ Cam kết chất lượng
          </FeatureItem>
        </Features>
      </Content>
      
      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        imageSrc={modalImage}
        imageAlt={modalAlt}
      />
    </OrderContainer>
  );
};

export default OrderSection;
