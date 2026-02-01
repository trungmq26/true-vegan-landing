import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import productImage from '../../assets/images/section11/goi_tieu_chuan.png';

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

const OrderHistory = styled.a`
  color: #666;
  text-decoration: none;
  
  &:hover {
    color: #4CAF50;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 5rem auto 0;
`;

const TopSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProductInfo = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProductTitle = styled.h2`
  color: #294f02;
  margin-bottom: 1rem;
  font-size: 2rem;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const OriginalPrice = styled.span`
  color: #999;
  text-decoration: line-through;
  font-size: 1.2rem;
`;

const DiscountPrice = styled.span`
  color: #FF0000;
  font-size: 2rem;
  font-weight: bold;
`;

const DiscountBadge = styled.span`
  background: #ff6b6b;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const Description = styled.div`
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const Features = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Feature = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #666;

  &::before {
    content: "✓";
    color: #4CAF50;
  }
`;

const PackagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PackageCard = styled.div<{ isSelected?: boolean }>`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.isSelected ? '#4CAF50' : 'transparent'};
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

const BestSellerBadge = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  background: #ff6b6b;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PackageTitle = styled.h4`
  color: #294f02;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const PackagePrice = styled.div`
  color: #FF0000;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const PackageFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  color: #666;
  font-size: 0.9rem;
`;

const PackageFeature = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;

  &::before {
    content: "✓";
    color: #4CAF50;
  }
`;

const OrderActions = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const QuantityButton = styled.button`
  background: #f5f5f5;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4CAF50;

  &:hover {
    background: #e0e0e0;
  }
`;

const QuantityInput = styled.input`
  width: 60px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.5rem;
  font-size: 1.2rem;
`;

const OrderButton = styled.button`
  flex: 1;
  padding: 1rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  max-width: 400px;

  &:hover {
    background: #45a049;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
  margin-bottom: 2rem;

  &:hover {
    color: #4CAF50;
  }
`;

interface Package {
  id: number;
  title: string;
  price: string;
  originalPrice: string;
  features: string[];
  discount?: string;
  isBestSeller?: boolean;
}

const OrderDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);
  
  // Get selected package index from navigation state
  const selectedPackageIndex = location.state?.selectedPackageIndex ?? null;
  
  // Map OrderSection packages to OrderDetailPage packages
  const getDefaultSelectedPackage = () => {
    if (selectedPackageIndex !== null) {
      // Index từ OrderSection map trực tiếp sang id (index + 1)
      return selectedPackageIndex + 1;
    }
    return 1; // Default to "COMBO KHỞI ĐỘNG"
  };
  
  const [selectedPackage, setSelectedPackage] = useState<number>(getDefaultSelectedPackage());

  const packages: Package[] = [
    {
      id: 1,
      title: "COMBO KHỞI ĐỘNG",
      price: "1,100,000đ",
      originalPrice: "1,336,000đ",
      features: ["2 Hộp TRUE VEGAN PROTEIN PRO"]
    },
    {
      id: 2,
      title: "COMBO TÁI TẠO",
      price: "2,200,000đ",
      originalPrice: "2,672,000đ",
      features: [
        "4 Hộp TRUE VEGAN PROTEIN PRO",
        "FREESHIP TOÀN QUỐC"
      ]
    },
    {
      id: 3,
      title: "COMBO PHỤC HỒI",
      price: "3,300,000đ",
      originalPrice: "4,008,000đ",
      features: [
        "6 Hộp TRUE VEGAN PROTEIN PRO",
        "TẶNG 01 MUỐI TRE",
        "FREESHIP TOÀN QUỐC"
      ]
    },
    {
      id: 4,
      title: "COMBO TOÀN DIỆN",
      price: "4,400,000đ",
      originalPrice: "5,344,000đ",
      features: [
        "8 Hộp TRUE VEGAN PROTEIN PRO",
        "TẶNG 01 TRÀ TUỆ MINH"
      ]
    },
    {
      id: 5,
      title: "COMBO GIA ĐÌNH",
      price: "5,500,000đ",
      originalPrice: "6,668,000đ",
      features: [
        "10 Hộp TRUE VEGAN PROTEIN PRO",
        "TẶNG 02 TRÀ TUỆ MINH"
      ]
    },
    {
      id: 6,
      title: "COMBO SỨC KHỎE DÀI HẠN",
      price: "7,700,000đ",
      originalPrice: "9,352,000đ",
      features: [
        "14 Hộp TRUE VEGAN PROTEIN PRO",
        "TẶNG 02 TRÀ TUỆ MINH",
        "FREE SHIP"
      ],
      isBestSeller: true
    }
  ];

  const selectedPackageData = packages.find(pkg => pkg.id === selectedPackage);

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleOrder = () => {
    const selectedPackageData = packages.find(pkg => pkg.id === selectedPackage);
    navigate('/checkout', {
      state: {
        package: selectedPackageData,
        quantity: quantity
      }
    });
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <PageContainer>
      <Header>
        <Logo>TRUE VEGANE PROTEIN</Logo>
        <OrderHistory href="#">Lịch sử đặt hàng</OrderHistory>
      </Header>
      <Content>
        <BackButton onClick={handleBack}>
          ← Quay lại
        </BackButton>
        <TopSection>
          <ProductImage src={productImage} alt="True Vegan Protein" />
          <ProductInfo>
            <ProductTitle>TRUE VEGAN PROTEIN - NGUỒN ĐẠM THỰC VẬT THUẦN KHIẾT</ProductTitle>
            <Price>
                <DiscountPrice>{selectedPackageData?.price}</DiscountPrice>
                <OriginalPrice>Giá gốc: {selectedPackageData?.originalPrice}</OriginalPrice>
            </Price>
            <Description>
              <h3>Dinh dưỡng thuần chay - Sức mạnh từ thiên nhiên</h3>
              <p>True Vegan Protein mang đến nguồn đạm thực vật sạch, dễ hấp thu, phù hợp cho người ăn chay, người tập luyện thể thao và những ai muốn bổ sung protein một cách lành mạnh.</p>
            </Description>
            <Features>
              <Feature>Được chiết xuất từ hạnh nhân, đậu Hà Lan, gạo lứt huyết rồng nảy mầm</Feature>
              <Feature>Không lactose, không gluten, không chất bảo quản</Feature>
              <Feature>Thân thiện với hệ tiêu hóa</Feature>
              <Feature>Giàu axit amin thiết yếu</Feature>
            </Features>
          </ProductInfo>
        </TopSection>

        <PackagesGrid>
          {packages.map((pkg) => (
            <PackageCard 
              key={pkg.id}
              isSelected={selectedPackage === pkg.id}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              {pkg.isBestSeller && <BestSellerBadge>BEST SELLER</BestSellerBadge>}
              <PackageTitle>{pkg.title}</PackageTitle>
              <PackagePrice>{pkg.price}</PackagePrice>
              <PackageFeatures>
                {pkg.features.map((feature, index) => (
                  <PackageFeature key={index}>{feature}</PackageFeature>
                ))}
              </PackageFeatures>
            </PackageCard>
          ))}
        </PackagesGrid>

        <OrderActions>
          <Quantity>
            <span>Số lượng:</span>
            <QuantityButton onClick={() => handleQuantityChange(quantity - 1)}>-</QuantityButton>
            <QuantityInput 
              type="number" 
              value={quantity} 
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
            />
            <QuantityButton onClick={() => handleQuantityChange(quantity + 1)}>+</QuantityButton>
          </Quantity>
          <OrderButton onClick={handleOrder}>🛒 ĐẶT HÀNG NGAY</OrderButton>
        </OrderActions>
      </Content>
    </PageContainer>
  );
};

export default OrderDetailPage;
