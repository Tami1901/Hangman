import { useColorMode, Box, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      {colorMode === 'dark' ? (
        <IconButton
          aria-label="dark"
          bg="transparent"
          fontSize="20px"
          icon={<FaSun />}
          onClick={toggleColorMode}
        />
      ) : (
        <IconButton
          aria-label="light"
          bg="transparent"
          icon={<FaMoon />}
          onClick={toggleColorMode}
          fontSize="20px"
        />
      )}
    </Box>
  );
};

export default ThemeSwitcher;
