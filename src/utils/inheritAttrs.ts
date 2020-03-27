const SUBTITLE_CLASS_NAME = 'graf--subtitle'
const TITLE_CLASS_NAME = 'graf--title'
const EXTERNAL_LINK_CLASS_NAME = 'graf--mixtapeEmbed'
const INHERITED_CLASS_LIST = [
  SUBTITLE_CLASS_NAME,
  TITLE_CLASS_NAME,
  EXTERNAL_LINK_CLASS_NAME,
]

export const inheritClass = (attr: { value: string }, node: HTMLElement) => {
  INHERITED_CLASS_LIST.forEach(c => {
    if (attr.value.includes(c)) node.classList.add(c)
  })
}

export const inheritImgSrc = (src: string, node: HTMLElement) => {
  node.setAttribute(
    'src',
    src.replace(
      /https:\/\/cdn-images-1\.medium.com\/max\/.*\//g,
      'https://cdn-images-1.medium.com/max/1600/',
    ),
  )
}

export const inheritBackgroundImageUrl = (
  backgroundImage: string,
  node: HTMLElement,
) => {
  node.style.backgroundImage = backgroundImage.replace(
    /https:\/\/cdn-images-1\.medium.com\/fit\/c\/.*\/.*\//g,
    'https://cdn-images-1.medium.com/fit/c/320/320/',
  )
}
