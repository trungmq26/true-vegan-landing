import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TargetAudienceSection from '../TargetAudienceSection';

const PriceContainer = styled.section`
  width: 100%;
  padding: 4rem 2rem;
  background-color: #ffffff;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const OrderButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem 3rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #45a049;
    transform: translateX(-50%) translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

const PriceSection = () => {
  const navigate = useNavigate();

  const handleOrder = () => {
    navigate('/order');
  };

  return (
    <>
      <TargetAudienceSection />
    </>
  );
};

export default PriceSection;
