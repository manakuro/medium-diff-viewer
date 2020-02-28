import {
  backgroundColour,
  black,
  grey,
  lightBlue,
  lightGrey,
  primaryColour,
  textColour,
  textSubColour,
  white,
} from 'src/styles/variables'
import { GridProps } from '@material-ui/core/Grid'

const theme = {
  main: {
    width: '1120px',
    font: 'Roboto',
    headingFont: 'Oswald',
    background: backgroundColour,
    colour: textColour,
    subColour: textSubColour,
    grid: {
      spacing: 3,
    } as GridProps,
  },
  space: [],

  colors: {
    primary: primaryColour,
    secondary: '',
    text: {
      primary: textColour,
      secondary: textSubColour,
      disabled: '',
      hint: '',
    },

    lightGrey,
    grey,
    white,
    black,
    lightBlue,
  },

  // Breakpoints based on Material Design
  // @see https://material-ui.com/customization/breakpoints/
  breakpoints: {
    xs: '0px', // 0 - 320px
    sm: '321px', // 321px - 600px
    md: '600px', // 600px - 960px
    lg: '960px', // 960px - 1280px
    xl: '1280px', // 1280px - 1920px
    xxl: '1920px', // 1920px -
  },

  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '20px',
    xl: '24px',

    h5: '12px',
    h4: '18px',
    h3: '20px',
    h2: '24px',
    h1: '30px',
  },

  fontWeights: {
    body: 300,
    heading: 500,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.5,
  },
} as const

export type Theme = {
  theme: typeof theme
}

export default theme
