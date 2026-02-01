import styled from 'styled-components';
import sectionImage from '../../assets/images/section13/Section.png';

const Section13Container = styled.section`
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

const Section13 = () => {
  return (
    <Section13Container>
      <Image src={sectionImage} alt="True Vegan Protein Section 13" loading="lazy" />
    </Section13Container>
  );
};

export default Section13;