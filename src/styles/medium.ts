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

  // title
  .graf--title {
    color: rgba(0, 0, 0, 0.84) !important;
    --x-height-multiplier: 0.342;
    --baseline-multiplier: 0.22;
    font-family: medium-content-title-font, Georgia, Cambria, 'Times New Roman',
      Times, serif;
    font-weight: 400;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: 0;
  }
  // subtile
  .graf--subtitle {
    margin-top: 5px;
    margin-bottom: 22px;
    font-weight: 400;
    --x-height-multiplier: 0.342;
    --baseline-multiplier: 0.22;
    font-family: medium-content-sans-serif-font, 'Lucida Grande',
      'Lucida Sans Unicode', 'Lucida Sans', Geneva, Arial, sans-serif;
    font-style: normal;
    font-size: 28px;
    line-height: 1.22;
    letter-spacing: -0.012em;
    color: rgba(0, 0, 0, 0.54) !important;
  }

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

    em {
      font-style: normal;
    }
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

    em {
      font-style: normal;
    }
  }

  // paragraph
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

  // list
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

  ul {
    li {
      &:before {
        font-size: 14.8px;
        padding-top: 4px;
        padding-right: 15px;
        content: '\\2022';
      }
    }
  }

  ol {
    list-style-type: decimal;
  }

  // quote
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
    padding-bottom: 2px;
  }

  // image
  figure {
    margin-top: 43px;
    position: relative;
    clear: both;
    outline: 0;
    box-sizing: border-box;
    user-select: auto;
    z-index: 100;
  }

  figcaption {
    --x-height-multiplier: 0.342;
    --baseline-multiplier: 0.22;
    font-family: medium-content-sans-serif-font, 'Lucida Grande',
      'Lucida Sans Unicode', 'Lucida Sans', Geneva, Arial, sans-serif;
    font-style: normal;
    font-feature-settings: 'liga' on, 'lnum' on;
    -moz-font-feature-settings: 'liga' on, 'lnum' on;
    -webkit-font-feature-settings: 'liga' on, 'lnum' on;
    font-size: 16px;
    line-height: 1.4;
    color: rgba(0, 0, 0, 0.68);
    letter-spacing: 0;

    font-weight: 400;
    text-align: center;

    > span {
      color: #b3b3b1;
      font-weight: 400;
    }
  }

  // anchor link
  p {
    a {
      text-decoration: none;
      background-repeat: repeat-x;
      background-image: linear-gradient(
        to right,
        currentColor 100%,
        currentColor 0
      );
      background-size: 1px 1px;
      background-position: 0 calc(1em + 1px);
    }
  }

  // code
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

  // hr
  td {
    pre {
      hr {
        margin-top: 52px;
        margin-bottom: 42px;
        display: block;
        border: 0;
        text-align: center;
        overflow: visible;
        box-sizing: content-box;
        height: 0;

        &:before {
          --x-height-multiplier: 0.342;
          --baseline-multiplier: 0.22;
          font-family: medium-content-slab-serif-font, Georgia, Cambria,
            'Times New Roman', Times, serif;
          font-weight: 400;
          font-style: italic;
          font-size: 30px;
          letter-spacing: 0.6em;
          content: '...';
          display: inline-block;
          margin-left: 0.6em;
          color: rgba(0, 0, 0, 0.68);
          position: relative;
          top: -30px;
        }
      }
    }
  }

  // external link
  div {
    > a {
      margin-top: 43px;
    }
    > a:first-of-type {
      background: rgba(255, 255, 255, 0);
      text-decoration: none;
      -webkit-tap-highlight-color: transparent;
      vertical-align: middle;
      padding: 20px;
      cursor: text;

      font-family: medium-content-sans-serif-font, -apple-system,
        BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
        'Open Sans', 'Helvetica Neue', sans-serif;
      letter-spacing: 0;
      font-weight: 400;
      font-style: normal;
      font-size: 15px;
      position: relative;
      overflow: hidden;
      max-height: 280px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: rgba(0, 0, 0, 0.54);
      -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04),
        inset 0 0 0 1px rgba(0, 0, 0, 0.09);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04),
        inset 0 0 0 1px rgba(0, 0, 0, 0.09);
      display: block;
      float: left;
      width: calc(100% - 160px);
      height: 160px;

      > strong {
        font-family: medium-content-sans-serif-font, -apple-system,
          BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
          'Open Sans', 'Helvetica Neue', sans-serif;
        letter-spacing: 0;
        font-weight: 400;
        font-style: normal;
        font-size: 18px;
        line-height: 1.3;
        color: rgba(0, 0, 0, 0.9);
        display: block;
        margin-bottom: -8px;
      }

      > em {
        font-size: 16px;
        font-style: normal;
        color: rgba(0, 0, 0, 0.68);
        display: block;
        margin-top: -1px;
        margin-bottom: 10px;
        max-height: 120px;
        overflow: hidden;
      }
    }

    > a + a {
      display: block;
      float: right;
      vertical-align: middle;
      width: 160px;
      height: 160px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.09);
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.09);
    }
  }
`
