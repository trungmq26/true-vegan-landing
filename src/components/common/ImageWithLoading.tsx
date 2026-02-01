import React, { useState } from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ImageContainer = styled.div<{ aspectRatio?: string }>`
  position: relative;
  width: 100%;
  padding-bottom: ${props => props.aspectRatio || '56.25%'}; /* Default 16:9 */
  background: #f0f0f0;
  overflow: hidden;
`;

const StyledImage = styled(LazyLoadImage)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
`;

interface ImageWithLoadingProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
}

const ImageWithLoading: React.FC<ImageWithLoadingProps> = ({
  src,
  alt,
  aspectRatio,
  className
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ImageContainer aspectRatio={aspectRatio} className={className}>
      <StyledImage
        src={src}
        alt={alt}
        effect="blur"
        afterLoad={() => setIsLoaded(true)}
        style={{ opacity: isLoaded ? 1 : 0 }}
      />
    </ImageContainer>
  );
};

export default ImageWithLoading;
