import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 2rem;
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  text-align: center;
`;

const BackLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  text-decoration: none;
  margin-bottom: 2rem;
  
  &:hover {
    color: #4CAF50;
  }
`;

const SuccessIcon = styled.div`
  width: 100px;
  height: 100px;
  background: #4CAF50;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  color: white;
  font-size: 3rem;
`;

const Title = styled.h1`
  color: #294f02;
  margin-bottom: 1rem;
  font-size: 2rem;
`;

const Message = styled.p`
  color: #666;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const OrderInfo = styled.div`
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: left;
`;

const OrderTitle = styled.h2`
  color: #294f02;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  color: #666;
`;

const InfoValue = styled.span`
  color: #333;
  font-weight: 500;
`;

const OrderDetails = styled.div`
  margin: 2rem 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 2rem 0;
`;

const ProductRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ProductInfo = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ProductQuantity = styled.span`
  color: #666;
`;

const ProductPrice = styled.span`
  color: #333;
  font-weight: 500;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  font-weight: bold;
  font-size: 1.2rem;
  color: #294f02;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button<{ primary?: boolean }>`
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  max-width: 300px;
  margin: 0 auto;
  
  background: ${props => props.primary ? '#4CAF50' : 'white'};
  color: ${props => props.primary ? 'white' : '#666'};
  border: ${props => props.primary ? 'none' : '1px solid #ddd'};
  
  &:hover {
    background: ${props => props.primary ? '#45a049' : '#f5f5f5'};
  }
`;

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderInfo } = location.state || {};

  const handleBackHome = () => {
    navigate('/');
  };

  const handleContinueShopping = () => {
    navigate('/order');
  };

  return (
    <PageContainer>
      <Content>
        <BackLink href="/">← Về trang chủ</BackLink>
        <SuccessIcon>✓</SuccessIcon>
        <Title>Đặt hàng thành công</Title>
        <Message>
          Đơn hàng của bạn đang được xử lý và sẽ giao trong vòng 2-5 ngày làm việc. Bạn sẽ
          nhận được thông tin đơn hàng qua tin nhắn cùng với thông tin theo dõi đơn hàng.
        </Message>

        <OrderInfo>
          <OrderTitle>Thông tin đơn hàng</OrderTitle>
          <InfoRow>
            <InfoLabel>Mã đơn hàng:</InfoLabel>
            <InfoValue>{orderInfo?.id}</InfoValue>d
          </InfoRow>
          <InfoRow>
            <InfoLabel>Ngày đặt hàng:</InfoLabel>
            <InfoValue>{orderInfo?.date}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Phương thức thanh toán:</InfoLabel>
            <InfoValue>{orderInfo?.paymentMethod}</InfoValue>
          </InfoRow>
        </OrderInfo>

        <OrderDetails>
          <OrderTitle>Sản phẩm đã mua</OrderTitle>
          <ProductRow>
            <ProductInfo>
              <span>{orderInfo?.product?.title}</span>
              <ProductQuantity>x{orderInfo?.quantity}</ProductQuantity>
            </ProductInfo>
            <ProductPrice>{orderInfo?.product?.price}</ProductPrice>
          </ProductRow>
          <TotalRow>
            <span>Tổng cộng</span>
            <span>{orderInfo?.totalPrice?.toLocaleString()}đ</span>
          </TotalRow>
        </OrderDetails>

        <ButtonGroup>
          <Button onClick={handleBackHome}>Trở về trang chủ</Button>
          <Button primary onClick={handleContinueShopping}>Tiếp tục đặt hàng</Button>
        </ButtonGroup>
      </Content>
    </PageContainer>
  );
};

export default OrderSuccessPage;
