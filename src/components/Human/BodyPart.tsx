import { Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

type BodyPartProps = {
  transform?: string;
  height?: string;
  left?: string;
  top?: string;
  zIndex?: number;
  image?: string;
};

const BodyPart = ({ transform, height, left, top, zIndex, image }: BodyPartProps) => {
  const elementsColor = useColorModeValue('gray.800', 'white');

  return (
    <Box
      pos="absolute"
      backgroundColor={elementsColor}
      w={image ? '24px' : '4'}
      h={height ? height : '24px'}
      top={top}
      left={left}
      transform={transform}
      zIndex={zIndex}
      backgroundImage={image ? `url(${image})` : undefined}
    />
  );
};

export default BodyPart;
