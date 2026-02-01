import styled from 'styled-components';
import sectionImage from '../../assets/images/section-3.png';

const ImageContainer = styled.section`
  width: 100%;
  position: relative;
  background-color: #ffffff;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
  max-width: 1550px;
  margin: 0 auto;
`;

const ImageSection = () => {
  return (
    <ImageContainer>
      <Image src={sectionImage} alt="True Vegan Protein Benefits" />
    </ImageContainer>
  );
};

export default ImageSection;
