import React from 'react';
import { Image } from '@chakra-ui/react';
import { useAppSelector } from '../../store/hooks';
import { selectLetters } from '../../store/slices/letters';

const chooseEmoji = (incorrectLetters: number) => {
  let emoji = '';
  switch (incorrectLetters) {
    case 0:
      emoji = '';
      break;
    case 1:
      emoji =
        'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/282/face-with-open-mouth_1f62e.png';
      break;
    case 2:
      emoji =
        'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/282/confused-face_1f615.png';
      break;
    case 3:
      emoji =
        'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/282/fearful-face_1f628.png';
      break;
    case 4:
      emoji =
        'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/282/anxious-face-with-sweat_1f630.png';
      break;
    case 5:
      emoji =
        'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/282/persevering-face_1f623.png';
      break;
    case 6:
      emoji =
        'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/282/dizzy-face_1f635.png';
      break;
    default:
      emoji = '';
  }
  return emoji;
};

const Emoji = () => {
  const { incorrectLetters } = useAppSelector(selectLetters);

  return (
    <Image
      pos="absolute"
      top="28"
      left="50%"
      transform={`translateX(-50%)`}
      zIndex="2"
      src={chooseEmoji(incorrectLetters)}
      w="24"
      h="24"
    />
  );
};

export default Emoji;
