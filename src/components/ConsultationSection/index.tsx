import styled from 'styled-components';
import sectionImage from '../../assets/images/section12/Home page (2).png';

const ConsultationContainer = styled.section`
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

const ConsultationSection = () => {
  return (
    <ConsultationContainer>
      <Image src={sectionImage} alt="Tư vấn và mua hàng True Vegan Protein" loading="lazy" />
    </ConsultationContainer>
  );
};

export default ConsultationSection;