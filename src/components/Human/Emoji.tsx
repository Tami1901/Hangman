import React from 'react';
import { Image, useBreakpointValue } from '@chakra-ui/react';
import { useAppSelector } from '../../store/hooks';
import { selectLetters } from '../../store/slices/letters';
import { emojis } from '../../constants/emojiList';

const Emoji: React.FC = () => {
  const { incorrectLetters } = useAppSelector(selectLetters);
  const isTablet = useBreakpointValue({ base: true, lg: true, xl: false });

  if (incorrectLetters === 0) {
    return null;
  }

  const { link, alt } = emojis[incorrectLetters - 1];

  return (
    <Image
      pos={isTablet ? 'relative' : 'absolute'}
      top={isTablet ? '' : '28'}
      left={isTablet ? '' : '50%'}
      transform={isTablet ? '' : 'translateX(-50%)'}
      zIndex="2"
      alt={alt}
      src={link}
      w={isTablet ? '10' : '24'}
      h={isTablet ? '10' : '24'}
    />
  );
};

export default Emoji;
