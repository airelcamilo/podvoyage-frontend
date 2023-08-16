import { brand100, brand200, brand400 } from '@/styles/style'
import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys)

const baseStyle = definePartsStyle({
  list: {
    borderRadius: '4px',
    borderColor: brand400,
    borderWidth: "2px",
    bg: brand100,
  },

  item: {
    color: 'white',
    _hover: {
      bg: brand200,
    },
    _focus: {
      bg: brand200,
    },
  },

  groupTitle: {
    color: 'white',
  },

})

export const menuTheme = defineMultiStyleConfig({ baseStyle })