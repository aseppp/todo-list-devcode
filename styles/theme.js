import { mode } from '@chakra-ui/theme-tools';
import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const styles = {
  global: (props) => ({
    body: {
      bg: mode('#F4F4F4', '#1d1d1d')(props),
    },
  }),
};

const theme = extendTheme({
  config,
  styles,
});

export default theme;
