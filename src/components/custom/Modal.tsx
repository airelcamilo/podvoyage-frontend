import { brand100 } from '@/styles/style'
import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  overlay: {
    backdropFilter: 'blur(10px)'
  },

  dialog: {
    borderRadius: '4px',
    bg: brand100,
  },

  closeButton: {
    color: 'white'
  }
})

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
})