import styled from 'styled-components';
import { motion } from 'framer-motion';

const ProductInfoContainer = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  position: relative;
`;

const QuoteContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(5px);
`;

const Quote = styled.p`
  font-size: 1.8rem;
  line-height: 1.8;
  color: white;
  font-style: italic;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  position: relative;
  padding: 2rem;

  &::before,
  &::after {
    content: '"';
    font-size: 4rem;
    color: rgba(255, 255, 255, 0.5);
    position: absolute;
  }

  &::before {
    top: -1rem;
    left: 0;
  }

  &::after {
    bottom: -2rem;
    right: 0;
  }
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

const ProductInfo = () => {
  return (
    <ProductInfoContainer>
      <QuoteContainer
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Quote>
          Thực phẩm tốt phải giúp cơ thể khoẻ, trẻ, đẹp, thông minh, yêu đời, 
          trường thọ. Sản phẩm này là kết tinh của kiến thức, tâm huyết và 
          khát vọng nâng cao sức khoẻ người tiêu dùng, nên đáp ứng được tất 
          cả những tiêu chuẩn trên.
        </Quote>
      </QuoteContainer>
    </ProductInfoContainer>
  );
};

export default ProductInfo;
