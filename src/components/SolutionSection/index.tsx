import styled from 'styled-components';
import { motion } from 'framer-motion';

const SolutionContainer = styled.section`
  padding: 4rem 2rem;
  background-color: white;
  text-align: center;
`;

const SolutionBox = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 10px;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-transform: uppercase;
`;

const Subtitle = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  color: #ff4444;
  text-transform: uppercase;
  background-color: white;
  padding: 1rem 2rem;
  border-radius: 5px;
  display: inline-block;
  margin-top: 1rem;
`;

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const SolutionSection = () => {
  return (
    <SolutionContainer>
      <SolutionBox
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Title>GIẢI PHÁP TOÀN DIỆN</Title>
        <Subtitle>ĐẨY LÙI BỆNH MÃN TÍNH</Subtitle>
      </SolutionBox>
    </SolutionContainer>
  );
};

export default SolutionSection;
