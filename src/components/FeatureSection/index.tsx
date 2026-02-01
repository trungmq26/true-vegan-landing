import styled from 'styled-components';
import featureImage from '../../assets/images/section7/Section 07v2.png';

const FeatureContainer = styled.section`
  width: 100%;
  position: relative;
  background-color: #ffffff;
`;

const Content = styled.div`
  max-width: 1550px;
  margin: 0 auto;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FeatureSection = () => {
  return (
    <FeatureContainer>
      <Content>
        <Image src={featureImage} alt="True Vegan Protein Features" />
      </Content>
    </FeatureContainer>
  );
};

export default FeatureSection;
