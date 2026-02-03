import styled from 'styled-components';
import bgImage from '../../assets/images/section6/back_ground06.png';
import fucoidan from '../../assets/images/section6/image 34541523.png';
import nattokinase from '../../assets/images/section6/11zon_cropped.png';
import probiotics from '../../assets/images/section6/3.png';
import protein from '../../assets/images/section6/beautiful-woman 1.png';

const IngredientsContainer = styled.section`
  padding: 4rem 2rem;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const MainTitle = styled.h2`
  font-size: 3rem;
  color: #294f02;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const SubTitle = styled.h3`
  font-size: 1.5rem;
  color: #68B026;
  font-weight: normal;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ProductImage = styled.div`
  position: relative;
  width: 400px;
  margin: 0 auto;
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }

  @media (max-width: 768px) {
    width: 300px;
  }
`;

const IngredientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const IngredientCard = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const IngredientIcon = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 1rem;
`;

const IngredientTitle = styled.h4`
  font-size: 1.5rem;
  color: ${props => props.color || '#4CAF50'};
  margin-bottom: 1rem;
`;

const IngredientList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const IngredientItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #666;

  &::before {
    content: "✓";
    color: #4CAF50;
    font-weight: bold;
  }
`;

const IngredientsSection = () => {
  const ingredients = [
    {
      icon: fucoidan,
      title: "Fucoidan từ tảo nâu",
      color: "#4CAF50",
      benefits: [
        "Tăng cường hệ miễn dịch, bảo vệ tế bào khỏi tác hại của gốc tự do.",
        "Hỗ trợ bảo vệ tế bào, tăng cường miễn dịch.",
        "Ức chế sự phát triển của các tế bào xấu, giúp tăng cường sức đề kháng và phòng ngừa ung thư."
      ]
    },
    {
      icon: nattokinase,
      title: "Nattokinase",
      color: "#FF6B6B",
      benefits: [
        "Cải thiện tuần hoàn máu, giảm nguy cơ tắc nghẽn mạch máu.",
        "Hỗ trợ phá tan cục máu đông, giảm nguy cơ tim mạch, đột quỵ.",
        "Đặc biệt hữu ích cho người ít vận động hoặc có tiền sử bệnh tim mạch."
      ]
    },
    {
      icon: probiotics,
      title: "Probiotics",
      color: "#FFB347",
      benefits: [
        "Cân bằng hệ vi sinh đường ruột, tăng cường tiêu hóa và hấp thu dinh dưỡng.",
        "Giúp cải thiện sức khỏe hệ tiêu hóa và tăng cường miễn dịch.",
        "Góp phần duy trì hệ tiêu hóa khỏe mạnh, giúp ăn ngon miệng hơn."
      ]
    },
    {
      icon: protein,
      title: "Đường Isomalt",
      color: "#4CAF50",
      benefits: [
        "Dễ tiêu hóa và hấp thu",
        "An toàn cho người tiểu đường, không gây tăng đường huyết đột ngột.",
        "Giúp người bệnh kiểm soát đường huyết và duy trì sức khỏe ổn định."
      ]
    }
  ];

  return (
    <IngredientsContainer>
      <Content>
        <Title>
          <MainTitle>THÀNH PHẦN ĐỘT PHÁ</MainTitle>
          <SubTitle> 
          BÍ QUYẾT TRONG CÔNG THỨC TRUE VEGAN PROTEIN PRO
          </SubTitle>
          {/* <SubTitle>
            Khám phá các thành phần đặc biệt, kết hợp hoàn hảo theo công thức độc quyền từ Lương y Ngô Đức Vượng
          </SubTitle> */}
        </Title>
        <IngredientsGrid>
          {ingredients.map((ingredient, index) => (
            <IngredientCard key={index}>
              <IngredientIcon src={ingredient.icon} alt={ingredient.title} />
              <IngredientTitle color={ingredient.color}>
                {ingredient.title}
              </IngredientTitle>
              <IngredientList>
                {ingredient.benefits.map((benefit, idx) => (
                  <IngredientItem key={idx}>{benefit}</IngredientItem>
                ))}
              </IngredientList>
            </IngredientCard>
          ))}
        </IngredientsGrid>
      </Content>
    </IngredientsContainer>
  );
};

export default IngredientsSection;
