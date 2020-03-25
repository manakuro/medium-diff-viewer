import {
  black,
  grey,
  lightBlue,
  lightGrey,
  primaryColour,
  textColour,
  textSubColour,
  white,
} from 'src/styles/variables'

const theme = {
  space: [],

  colors: {
    primary: `${primaryColour} !important`,
    secondary: '',
    lightGrey: `${lightGrey} !important`,
    grey: `${grey} !important`,
    white: `${white} !important`,
    black: `${black} !important`,
    lightBlue: `${lightBlue} !important`,

    // text colour
    text: {
      primary: textColour,
      secondary: textSubColour,
      disabled: '',
      hint: '',
    },
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
    xs: '12px !important',
    sm: '14px !important',
    md: '16px !important',
    lg: '20px !important',
    xl: '24px !important',

    h5: '12px !important',
    h4: '18px !important',
    h3: '20px !important',
    h2: '24px !important',
    h1: '30px !important',
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
