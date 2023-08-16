import { brand300 } from '@/styles/style'
import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
  borderRadius: '4px', 
  bg: brand300,
  color: '#FFFFFF'
})

export const badgeTheme = defineStyleConfig({
  baseStyle
})