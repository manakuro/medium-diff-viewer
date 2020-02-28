const replaceLineBreaksWith = (str: string, replacedWith: string) =>
  str.replace(/\r?\n/g, replacedWith)

export default replaceLineBreaksWith
