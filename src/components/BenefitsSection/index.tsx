import styled from 'styled-components';
import bgImage from '../../assets/images/benefits-section.png';

const BenefitsContainer = styled.section`
  padding: 4rem 2rem;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, rgba(255,255,255,0.95), rgba(255,255,255,0.9));
    z-index: 1;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const Title = styled.h2`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #294f02;

  span {
    color: #4CAF50;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled.h3`
  font-size: 1.5rem;
  text-align: center;
  color: #666;
  margin-bottom: 3rem;
  font-weight: normal;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const BenefitsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(5px);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(10px);
  }
`;

const IconContainer = styled.div`
  width: 50px;
  height: 50px;
  min-width: 50px;
  background-color: #4CAF50;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const BenefitContent = styled.div`
  flex: 1;
`;

const BenefitTitle = styled.h4`
  font-size: 1.5rem;
  color: #4CAF50;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const BenefitDescription = styled.p`
  font-size: 1.1rem;
  color: #333;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const BenefitsSection = () => {
  const benefits = [
    {
      title: "KHỎE MẠNH THUẦN CHAY, TINH HOA Y HỌC",
      description: "Bí quyết dinh dưỡng độc quyền từ Lương y Ngô Đức Vượng, cho sức khỏe vàng từ gốc rễ."
    },
    {
      title: "PROTEIN THỰC VẬT VƯỢT TRỘI, CHẤT LƯỢNG ĐỈNH CAO",
      description: "Nguồn năng lượng tinh khiết từ thiên nhiên, bảo vệ tim mạch, tăng cường miễn dịch, cho cuộc sống tràn đầy năng lượng."
    },
    {
      title: "BẢO VỆ TẾ BÀO, NGĂN NGỪA BỆNH TẬT, SỐNG THỌ HƠN MỖI NGÀY",
      description: "Sự kết hợp độc đáo từ Fucoidan và Nattokinase Nhật Bản với với 15 tỷ lợi khuẩn giúp tăng cường sức đề kháng tự nhiên 1 cách mạnh mẽ."
    },
    {
      title: "GIẢI PHÁP DINH DƯỠNG TOÀN DIỆN, TIỆN LỢI CHO NGƯỜI BẬN RỘN",
      description: "Chỉ 1 ly mỗi ngày, cân bằng dinh dưỡng, tăng cường sức khỏe, không lo thiếu chất, sống khỏe mạnh dễ dàng hơn bao giờ hết."
    },
    {
      title: "CHẾ ĐỘ ĂN UỐNG LÀNH MẠNH, DINH DƯỠNG CHO CẢ GIA ĐÌNH",
      description: "Bổ sung nguồn dinh dưỡng thuần chay an toàn,  phù hợp cho mọi lứa tuổi, đặc biệt người trưởng thành và người cao tuổi, giúp cả gia đình duy trì sức khỏe đều đặn và tràn đầy năng lượng mỗi ngày."
    }
  ];

  return (
    <BenefitsContainer>
      <Content>
        <Title>TẠI SAO LẠI CHỌN <span>TRUE VEGAN PROTEIN</span>?</Title>
        <Subtitle>True Vegan Protein – Mang Đến 5 Lợi Ích Vượt Trội Cho Sức Khỏe</Subtitle>
        <BenefitsList>
          {benefits.map((benefit, index) => (
            <BenefitItem key={index}>
              <IconContainer>👍</IconContainer>
              <BenefitContent>
                <BenefitTitle>{benefit.title}</BenefitTitle>
                <BenefitDescription>{benefit.description}</BenefitDescription>
              </BenefitContent>
            </BenefitItem>
          ))}
        </BenefitsList>
      </Content>
    </BenefitsContainer>
  );
};

export default BenefitsSection;
