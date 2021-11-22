import React from 'react';
import { Image, useBreakpointValue } from '@chakra-ui/react';
import { useAppSelector } from '../../store/hooks';
import { selectGame } from '../../store/slices/game';
import { emojis } from '../../constants/emojiList';

const Emoji: React.FC = () => {
  const { incorrectLetters } = useAppSelector(selectGame);
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
      w={isTablet ? '8' : '24'}
      h={isTablet ? '8' : '24'}
    />
  );
};

export default Emoji;
