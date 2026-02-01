import styled from 'styled-components';
import usageImage from '../../assets/images/section8/Frame 1272638802 (1).png';

const UsageContainer = styled.section`
  width: 100%;
  position: relative;
  background-color: #f9fff9;
`;

const Content = styled.div`
  max-width: 1500px;
  margin: 0 auto;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const UsageSection = () => {
  return (
    <UsageContainer>
      <Content>
        <Image src={usageImage} alt="True Vegan Protein Usage Guide" />
      </Content>
    </UsageContainer>
  );
};

export default UsageSection;
