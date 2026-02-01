import styled from 'styled-components';
import sectionImage from '../../assets/images/section9/Section9.png';

const TargetContainer = styled.section`
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

const TargetAudienceSection = () => {
  return (
    <TargetContainer>
      <Image src={sectionImage} alt="True Vegan Protein Target Audience" loading="lazy" />
    </TargetContainer>
  );
};

export default TargetAudienceSection;