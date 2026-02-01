import { useState } from 'react';
import styled from 'styled-components';
import customer1 from '../../assets/images/cam_nhan/Ellipse 15.png';
import customer2 from '../../assets/images/cam_nhan/Ellipse 16.png';
import customer3 from '../../assets/images/cam_nhan/Ellipse 17.png';

const TestimonialsContainer = styled.section`
  padding: 4rem 2rem;
  background-color: #f9fff9;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #294f02;

  span {
    color: #4CAF50;
    display: block;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const TestimonialsList = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const TestimonialCard = styled.div`
  background-color: #4CAF50;
  border-radius: 20px;
  padding: 2rem;
  width: 350px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CustomerImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 1rem;
  border: 4px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CustomerName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const CustomerInfo = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  opacity: 0.9;
`;

const TestimonialText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  font-style: italic;
`;

const Rating = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
  color: #FFD700;
  font-size: 1.5rem;
`;

const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const Dot = styled.button<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#4CAF50' : '#E0E0E0'};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.active ? '#4CAF50' : '#BDBDBD'};
  }
`;

const testimonials = [
  {
    image: customer1,
    name: 'Chị Lan',
    info: '(30 tuổi - ăn chay 3 năm)',
    text: 'Tôi đã dùng qua 3-4 loại protein thực vật khác nhau, nhưng hầu hết đều gây khó tiêu và cảm giác nặng bụng. Với True Vegan Protein, tôi thực sự bất ngờ. Công thức tiên tiến của sản phẩm giúp tôi hấp thu cực kỳ tốt, không hề khó chịu. Sau một tháng sử dụng, tôi không chỉ cảm thấy năng lượng dồi dào hơn mà còn thấy hệ tiêu hóa cải thiện rõ rệt. Đây không chỉ là một loại bột protein, mà là một giải pháp dinh dưỡng toàn diện đúng nghĩa.'
  },
  {
    image: customer3,
    name: 'Anh Minh',
    info: '(50 tuổi - cao huyết áp, xương khớp)',
    text: 'Trước đây tôi hay dùng các loại sữa dành cho người già, nhưng hiệu quả không đáng kể. Tình cờ được 1 người bạn giới thiệu, tôi quyết định thử  True Vegan Protein vì thấy có thành phần Nattokinase và các khoáng chất tốt cho xương. Sau 2 tháng, cơn đau nhức khớp gối giảm hẳn, đi lại nhẹ nhàng hơn. Huyết áp của tôi cũng ổn định hơn trước. Điều tôi tin tưởng nhất là sản phẩm có công thức độc quyền, được tư vấn bởi chuyên gia nên tôi hoàn toàn an tâm sử dụng.'
  },
  {
    image: customer2,
    name: 'Chị Hạnh',
    info: '( 40 tuổi - giáo viên Yoga)',
    text: 'Là một người rất kỹ tính về chuyện ăn uống, tôi luôn tìm kiếm sản phẩm tối ưu và có chất lượng tốt nhất. Tôi đã bỏ tiền triệu mua các loại protein nhãn mác nổi tiếng, nhưng hiệu quả không như mong đợi. True Vegan Protein đã thuyết phục tôi hoàn toàn chỉ sau 1 thời gian sử dụng. Sản phẩm này dễ hấp thu, hiệu quả nhanh chóng, giúp tôi phục hồi cơ bắp tốt hơn sau mỗi buổi tập. Điều tuyệt vời là nó còn giúp tăng cường miễn dịch và cải thiện sức khỏe tổng thể, chứ không chỉ đơn thuần là tăng cơ như các sản phẩm khác.'
  }
];

const TestimonialsSection = () => {
  const [activeDot, setActiveDot] = useState(0);

  return (
    <TestimonialsContainer>
      <Content>
        <Title>
          CẢM NHẬN CỦA
          <span>KHÁCH HÀNG</span>
        </Title>
        <TestimonialsList>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index}>
              <CustomerImage src={testimonial.image} alt={testimonial.name} />
              <CustomerName>{testimonial.name}</CustomerName>
              <CustomerInfo>{testimonial.info}</CustomerInfo>
              <TestimonialText>"{testimonial.text}"</TestimonialText>
              <Rating>
                {'★'.repeat(5)}
              </Rating>
            </TestimonialCard>
          ))}
        </TestimonialsList>
        <DotContainer>
          {testimonials.map((_, index) => (
            <Dot
              key={index}
              active={index === activeDot}
              onClick={() => setActiveDot(index)}
            />
          ))}
        </DotContainer>
      </Content>
    </TestimonialsContainer>
  );
};

export default TestimonialsSection;
