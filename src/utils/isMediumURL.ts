export const isMediumURL = (url: string) => /https?:\/\/medium\.com/.test(url)
export const isMediumEditURL = (url: string) =>
  /^https?:\/\/medium\.com\/p\/.*\/edit$/.test(url)
