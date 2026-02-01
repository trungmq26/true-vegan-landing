import styled from 'styled-components';
import cert1 from '../../assets/images/chung_nhan/ISO-GMP-HADU79-2023_001.png';
import cert2 from '../../assets/images/chung_nhan/ISOPM_001.png';
import cert3 from '../../assets/images/chung_nhan/ISOPM_003.png';
import cert4 from '../../assets/images/chung_nhan/1.jpg';
import cert5 from '../../assets/images/chung_nhan/2.jpg';
import cert6 from '../../assets/images/chung_nhan/9207_0001.jpg';

const CertificatesContainer = styled.section`
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
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const CertificatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CertificateCard = styled.div`
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CertificateImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
`;

const CertificatesSection = () => {
  const certificates = [
    {
      id: 'cert1',
      image: cert1,
      alt: 'Chứng nhận ISO-GMP HADU79 2023'
    },
    {
      id: 'cert2',
      image: cert2,
      alt: 'Chứng nhận ISO PM 001'
    },
    {
      id: 'cert3',
      image: cert3,
      alt: 'Chứng nhận ISO PM 003'
    },
    {
      id: 'cert4',
      image: cert4,
      alt: 'Chứng nhận 1'
    },
    {
      id: 'cert5',
      image: cert5,
      alt: 'Chứng nhận 2'
    },
    {
      id: 'cert6',
      image: cert6,
      alt: 'Chứng nhận 9207_0001'
    }
  ];

  const handleCertificateClick = (image: string) => {
    window.open(image, '_blank');
  };

  return (
    <CertificatesContainer>
      <Content>
        <Title>
          CHỨNG NHẬN <span>SẢN PHẨM</span>
        </Title>
        <CertificatesGrid>
          {certificates.map((cert) => (
            <CertificateCard 
              key={cert.id}
              onClick={() => handleCertificateClick(cert.image)}
            >
              <CertificateImage src={cert.image} alt={cert.alt} />
            </CertificateCard>
          ))}
        </CertificatesGrid>
      </Content>
    </CertificatesContainer>
  );
};

export default CertificatesSection;
