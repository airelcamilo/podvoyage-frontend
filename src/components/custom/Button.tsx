import { brand200, brand300, brand400 } from '@/styles/style'
import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const customVariant = defineStyle(() => {
  return {
    bg: brand300,
    fontWeight: "semibold",
    color: brand400,
    borderRadius: '4px',
    border: '2px solid ' + brand300,
    transition: 'transform 0.15s ease-out, background 0.15s ease-out',

    _hover: {
      bg: brand200,
      color: 'white',
    },

    _active: {
      bg: brand200,
      color: 'white',
    },
  }
})

const customVariantRed = defineStyle(() => {
  return {
    bg: '#9B2C2C',
    fontWeight: "semibold",
    color: '#E53E3E',
    borderRadius: '4px',
    border: '2px solid #9B2C2C',
    transition: 'transform 0.15s ease-out, background 0.15s ease-out',

    _hover: {
      bg: '#822727',
      color: 'white',
    },

    _active: {
      bg: '#822727',
      color: 'white',
    },
  }
})

const customVariantTransparent = defineStyle(() => {
  return {
    color: 'white',
    transition: 'transform 0.15s ease-out, background 0.15s ease-out',

    _hover: {
      bg: brand200,
      color: 'white',
    },

    _active: {
      bg: brand200,
      color: 'white',
    },
  }
})

export const buttonTheme = defineStyleConfig({
  variants: {
    custom: customVariant,
    customRed: customVariantRed,
    customTransparent: customVariantTransparent,
  },
})