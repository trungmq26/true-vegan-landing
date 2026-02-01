import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const Title = styled.h2`
  text-align: center;
  color: #294f02;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const QRAmount = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  color: #666;
  
  span {
    color: #4CAF50;
    font-weight: bold;
  }
`;

const QRImage = styled.div`
  width: 300px;
  height: 300px;
  margin: 0 auto 2rem;
  border: 1px solid #ddd;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const BankInfo = styled.div`
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  color: #666;
`;

const InfoValue = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
`;

const CopyButton = styled.button`
  background: none;
  border: none;
  color: #4CAF50;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Note = styled.div`
  text-align: center;
  color: #666;
  font-style: italic;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
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
  
  background: ${props => props.primary ? '#4CAF50' : 'white'};
  color: ${props => props.primary ? 'white' : '#666'};
  border: ${props => props.primary ? 'none' : '1px solid #ddd'};
  
  &:hover {
    background: ${props => props.primary ? '#45a049' : '#f5f5f5'};
  }
`;

interface QRPopupProps {
  amount: number;
  onClose: () => void;
  onComplete: () => void;
}

const QRPopup: React.FC<QRPopupProps> = ({ amount, onClose, onComplete }) => {
  const bankInfo = {
    bank: 'Vietcombank (VCB)',
    accountNumber: '5406205024311',
    accountName: 'HV NGO DUC VUONG',
    transferContent: 'CUST/75'
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Overlay>
      <PopupContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>Thanh toán qua mã QR</Title>
        <QRAmount>
          Quét mã QR để thanh toán số tiền: <span>{amount.toLocaleString()}đ</span>
        </QRAmount>
        
        <QRImage>
          <img src="/Users/trung.m/Desktop/MCP_Server/true-vegan-landing/src/assets/images/QR.png" alt="QR Code" />
        </QRImage>
        
        <BankInfo>
          <InfoRow>
            <InfoLabel>Ngân hàng</InfoLabel>
            <InfoValue>{bankInfo.bank}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Số tài khoản</InfoLabel>
            <InfoValue>
              {bankInfo.accountNumber}
              <CopyButton onClick={() => handleCopy(bankInfo.accountNumber)}>
                📋
              </CopyButton>
            </InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Tên chủ tài khoản</InfoLabel>
            <InfoValue>{bankInfo.accountName}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Nội dung chuyển khoản</InfoLabel>
            <InfoValue>
              {bankInfo.transferContent}
              <CopyButton onClick={() => handleCopy(bankInfo.transferContent)}>
                📋
              </CopyButton>
            </InfoValue>
          </InfoRow>
        </BankInfo>
        
        <Note>
          Sau khi chuyển khoản đơn hàng của bạn sẽ được xử lý trong vòng 24 giờ.
        </Note>
        
        <ButtonGroup>
          <Button onClick={onClose}>Huỷ giao dịch</Button>
          <Button primary onClick={onComplete}>Đã chuyển khoản</Button>
        </ButtonGroup>
      </PopupContainer>
    </Overlay>
  );
};

export default QRPopup;
