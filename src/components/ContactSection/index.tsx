import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import contactImage from '../../assets/images/section10/Section10.png';

const ContactContainer = styled.section`
  width: 100%;
  background-color: #ffffff;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
  vertical-align: middle;
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

  @media (max-width: 768px) {
    padding: 0.8rem 2rem;
    font-size: 1rem;
  }
`;

const ContactSection = () => {
  const navigate = useNavigate();

  const handleOrder = () => {
    navigate('/order');
  };

  return (
    <ContactContainer>
      <Image src={contactImage} alt="True Vegan Protein Contact Information" />
    </ContactContainer>
  );
};

export default ContactSection;
