import { css } from 'styled-components'

const resetCss = css`
  blockquote,
  dd,
  dl,
  figure,
  form,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  menu,
  ol,
  p,
  pre,
  ul {
    margin: 0;
  }

  menu,
  ol,
  ul {
    padding: 0;
    list-style: none;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  section,
  summary {
    display: block;
  }

  canvas {
    display: none;
  }
`

export const mediumStyle = css`
  position: relative;
  outline: 0;
  word-break: break-word;
  word-wrap: break-word;

  ${resetCss}

  &:focus {
    outline: 0;
    word-break: break-word;
    word-wrap: break-word;
  }

  font-family: medium-content-sans-serif-font, -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
    sans-serif;
  letter-spacing: 0;
  font-weight: 400;
  font-style: normal;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  color: rgba(0, 0, 0, 0.84);
  font-size: 20px;
  line-height: 1.4;

  td {
    img {
      width: 100%;
      margin: 0 !important;
      padding: 0 !important;
    }
  }

  h1,
  h3 {
    margin-top: 56px;
    font-weight: 600;
    --x-height-multiplier: 0.342;
    --baseline-multiplier: 0.22;
    font-family: medium-content-sans-serif-font, 'Lucida Grande',
      'Lucida Sans Unicode', 'Lucida Sans', Geneva, Arial, sans-serif;
    font-style: normal;
    font-size: 34px;
    line-height: 1.15;
    letter-spacing: -0.015em;
  }

  h4 {
    margin-top: 30px;
    font-weight: 600;
    --x-height-multiplier: 0.342;
    --baseline-multiplier: 0.22;
    font-family: medium-content-sans-serif-font, 'Lucida Grande',
      'Lucida Sans Unicode', 'Lucida Sans', Geneva, Arial, sans-serif;
    font-style: normal;
    font-size: 26px;
    line-height: 1.22;
    letter-spacing: -0.012em;
  }

  p {
    margin-top: 29px;
    margin-bottom: 0;
    --x-height-multiplier: 0.375;
    --baseline-multiplier: 0.17;
    font-family: medium-content-serif-font, Georgia, Cambria, 'Times New Roman',
      Times, serif;
    font-weight: 400;
    font-style: normal;
    font-size: 21px;
    line-height: 1.58;
    letter-spacing: -0.003em;
  }

  menu,
  ol,
  ul {
    margin-top: 29px;
  }

  li {
    margin-left: 30px;
    margin-bottom: 14px;
    --x-height-multiplier: 0.375;
    --baseline-multiplier: 0.17;
    font-family: medium-content-serif-font, Georgia, Cambria, 'Times New Roman',
      Times, serif;
    font-weight: 400;
    font-style: normal;
    font-size: 21px;
    line-height: 1.58;
    letter-spacing: -0.003em;
  }

  b,
  strong {
    font-weight: 700;
  }

  blockquote {
    margin-top: 29px;
    --x-height-multiplier: 0.375;
    --baseline-multiplier: 0.17;
    font-family: medium-content-serif-font, Georgia, Cambria, 'Times New Roman',
      Times, serif;
    font-weight: 400;
    font-style: italic;
    font-size: 21px;
    line-height: 1.58;
    letter-spacing: -0.003em;
    border-left: 3px solid rgba(0, 0, 0, 0.84);
    padding-left: 20px;
    margin-left: -23px;
    padding-bottom: 2px;
  }

  figure {
    margin-top: 43px;
    position: relative;
    clear: both;
    outline: 0;
    box-sizing: border-box;
    user-select: auto;
    z-index: 100;
  }

  td {
    pre {
      pre {
        margin-top: 43px;
        background: rgba(0, 0, 0, 0.05);
        padding: 20px;
        white-space: pre-wrap;
      }
    }
  }
`
