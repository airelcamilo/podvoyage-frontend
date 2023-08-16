import { extendTheme } from '@chakra-ui/react';
import { cardTheme } from '@/components/custom/Card';
import { brand100, brand200, brand300, brand400 } from './style';
import { badgeTheme } from '@/components/custom/Badge';
import { buttonTheme } from '@/components/custom/Button';
import { modalTheme } from '@/components/custom/Modal';
import { menuTheme } from '@/components/custom/Menu';

const theme = extendTheme({
  components: {
    Card: cardTheme,
    Badge: badgeTheme,
    Drawer: {
      parts: ['dialog', 'header', 'body'],
      baseStyle: () => ({
        dialog: {
          background: 'brand.100'
        },
      }),
    },
    Button: buttonTheme,
    Modal: modalTheme,
    Menu: menuTheme,
    Text: {
      baseStyle: () => ({
        color: "#ffffff",
      }),
    },
    Heading: {
      baseStyle: () => ({
        color: "#ffffff",
      }),
    },
  },

  colors: {
    brand: {
      100: brand100,
      200: brand200,
      300: brand300,
      400: brand400
    }
  }
});

export default theme;