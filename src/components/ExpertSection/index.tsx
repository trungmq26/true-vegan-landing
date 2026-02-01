import styled from 'styled-components';

const ExpertContainer = styled.section`
  padding: 4rem 2rem;
  background-color: #ffffff;
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

const VideoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const SideVideos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const MainVideo = styled(VideoWrapper)`
  margin: 0;
  height: 100%;
`;

const ExpertSection = () => {
  const mainVideoId = 'axSwnEnb5lI';
  const sideVideos = [
    { id: 'video1', url: 'https://www.youtube.com/embed/G5Pq0IBJF4w' },
    { id: 'video2', url: 'https://www.youtube.com/embed/ad7RSKXXlvQ' },
    { id: 'video3', url: 'https://www.youtube.com/embed/OujRU1bahps' },

  ];

  return (
    <ExpertContainer>
      <Content>
        <Title>
          CHIA SẺ CỦA CHUYÊN GIA VỀ <span>SẢN PHẨM</span>
        </Title>
        <VideoContainer>
          <SideVideos>
            {sideVideos.map((video) => (
              <VideoWrapper key={video.id}>
                <iframe
                  src={video.url}
                  title="Chia sẻ của chuyên gia"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </VideoWrapper>
            ))}
          </SideVideos>
          <MainVideo>
            <iframe
              src={`https://www.youtube.com/embed/MF0GubUNVs4`}
              title="Chia sẻ của chuyên gia"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </MainVideo>
        </VideoContainer>
      </Content>
    </ExpertContainer>
  );
};

export default ExpertSection;
