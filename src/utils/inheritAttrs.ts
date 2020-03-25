const SUBTITLE_CLASS_NAME = 'graf--subtitle'
const TITLE_CLASS_NAME = 'graf--title'
const EXTERNAL_LINK_CLASS_NAME = 'graf--mixtapeEmbed'
const INHERITED_CLASS_LIST = [
  SUBTITLE_CLASS_NAME,
  TITLE_CLASS_NAME,
  EXTERNAL_LINK_CLASS_NAME,
]

const inheritAttrs = (attr: { value: string }, node: HTMLElement) => {
  INHERITED_CLASS_LIST.forEach(c => {
    if (attr.value.includes(c)) node.classList.add(c)
  })
}

export default inheritAttrs
