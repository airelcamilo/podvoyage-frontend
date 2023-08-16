import { brand100, brand300, brand400 } from '@/styles/style';
import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    backgroundColor: brand100,
    borderColor: brand400,
    borderWidth: "2px",
    boxShadow: '8px 8px 1px 1px '+brand300,
  },
});

export const cardTheme = defineMultiStyleConfig({
  baseStyle
});