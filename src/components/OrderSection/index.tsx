import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Import ảnh combo mới
import comboKhoiDong from '../../assets/images/order_section/combo_khoi_dong.png';
import comboTaiTao from '../../assets/images/order_section/combo_tai_tao.png';
import comboPhucHoi from '../../assets/images/order_section/compo_phuc_hoi.png';
import comboToanDien from '../../assets/images/order_section/combo_toan_dien.png';
import comboGiaDinh from '../../assets/images/order_section/combo_gia_dinh.png';
import comboSucKhoeDaiHan from '../../assets/images/order_section/combo_suc_khoe_dai_han.png';


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

const PackageCard = styled.div`
  background: white;
  border-radius: 15px;
  color: #333;
  position: relative;
  overflow: hidden;
  border: 2px solid #90EE90;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CardHeader = styled.div<{ bgColor?: string }>`
  background: ${props => props.bgColor || '#84CC16'};
  color: white;
  padding: 1rem;
  text-align: center;
  margin: -2px -2px 0 -2px;
  border-radius: 13px 13px 0 0;
`;

const CardHeaderTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: bold;
  margin: 0;
  text-transform: uppercase;
`;

const CardBody = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PackageQuantity = styled.h4`
  font-size: 1.3rem;
  color: #4CAF50;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
`;

const PackageImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;


const Price = styled.div`
  margin: 1rem 0;
`;

const OriginalPrice = styled.div`
  color: #999;
  text-decoration: line-through;
  font-size: 1.1rem;
`;

const FinalPrice = styled.div`
  font-size: 2rem;
  color: #FF0000;
  font-weight: bold;
`;

const BuyButton = styled.button`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #FF3700;
  color: white;

  &:hover {
    background: #E63200;
    transform: translateY(-2px);
  }
`;

const Bonus = styled.div`
  color: #007900;
  padding: 0.5rem 0;
  margin: 0.5rem 0;
  font-size: 0.95rem;
  font-weight: 600;
  min-height: 50px;
  text-align: center;
`;

const CardFooter = styled.div`
  margin-top: auto;
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
  color: #2E7D32;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  border: 1px solid #4CAF50;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.6rem 1rem;
  }
`;

const OrderSection = () => {
  const navigate = useNavigate();
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

  const packages = [
    {
      title: "COMBO KHỞI ĐỘNG",
      image: comboKhoiDong,
      quantity: "2 HỘP",
      originalPrice: "1,336,000đ",
      finalPrice: "1,100,000đ",
      bonus: "",
      headerColor: "#84CC16"
    },
    {
      title: "COMBO TÁI TẠO",
      image: comboTaiTao,
      quantity: "4 HỘP",
      originalPrice: "2,672,000đ",
      finalPrice: "2,200,000đ",
      bonus: "FREESHIP TOÀN QUỐC",
      headerColor: "#FF7903"
    },
    {
      title: "COMBO PHỤC HỒI",
      image: comboPhucHoi,
      quantity: "6 HỘP",
      originalPrice: "4,008,000đ",
      finalPrice: "3,300,000đ",
      bonus: "TẶNG 01 MUỐI TRE\nFREESHIP TOÀN QUỐC",
      headerColor: "#84CC16"
    },
    {
      title: "COMBO TOÀN DIỆN",
      image: comboToanDien,
      quantity: "8 HỘP",
      originalPrice: "5,344,000đ",
      finalPrice: "4,400,000đ",
      bonus: "TẶNG 01 TRÀ TUỆ MINH",
      headerColor: "#84CC16"
    },
    {
      title: "COMBO GIA ĐÌNH",
      image: comboGiaDinh,
      quantity: "10 HỘP",
      originalPrice: "6,668,000đ",
      finalPrice: "5,500,000đ",
      bonus: "TẶNG 02 TRÀ TUỆ MINH",
      headerColor: "#FF7903"
    },
    {
      title: "COMBO SỨC KHỎE DÀI HẠN",
      image: comboSucKhoeDaiHan,
      quantity: "14 HỘP",
      originalPrice: "9,352,000đ",
      finalPrice: "7,700,000đ",
      bonus: "TẶNG 02 TRÀ TUỆ MINH\n+ FREE SHIP",
      headerColor: "#84CC16"
    }
  ];

  return (
    <OrderContainer>
      <Content>
        <Title>SẴN SÀNG TRẢI NGHIỆM TRUE VEGAN PROTEIN PRO?</Title>
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
            <PackageCard key={index}>
              <CardHeader bgColor={pkg.headerColor}>
                <CardHeaderTitle>{pkg.title}</CardHeaderTitle>
              </CardHeader>
              <CardBody>
                <ImageWrapper>
                  <PackageImage src={pkg.image} alt={pkg.title} />
                </ImageWrapper>
                <PackageQuantity>{pkg.quantity}</PackageQuantity>
                <Price>
                  <FinalPrice>{pkg.finalPrice}</FinalPrice>
                  {pkg.originalPrice && (
                    <OriginalPrice>
                      Giá gốc: {pkg.originalPrice}
                    </OriginalPrice>
                  )}
                </Price>
                <Bonus>
                  {pkg.bonus ? pkg.bonus.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  )) : <div>&nbsp;</div>}
                </Bonus>
                <CardFooter>
                  <BuyButton onClick={() => handleOrder(index)}>
                    MUA NGAY
                  </BuyButton>
                </CardFooter>
              </CardBody>
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
    </OrderContainer>
  );
};

export default OrderSection;
