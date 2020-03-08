export default (str: string) =>
  str.replace(/&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/gm, '')
