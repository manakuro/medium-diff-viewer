const ATTRIBUTES_BLACK_LIST = ['src']
const SUBTITLE_CLASS_NAME = 'graf--subtitle'
const TITLE_CLASS_NAME = 'graf--title'

const removeAttrs = (node: HTMLElement) => {
  if (!node.tagName) return

  if (node.childNodes.length) {
    ;(node.childNodes as NodeListOf<HTMLElementTagNameMap['div']>).forEach(
      c => {
        removeAttrs(c)
      },
    )
  }

  if (node.attributes.length) {
    ;[...(node.attributes as any)].forEach(attr => {
      if (node.style.backgroundImage && attr.name === 'style') return
      if (ATTRIBUTES_BLACK_LIST.includes(attr.name)) return
      node.removeAttribute(attr.name)

      if (attr.value.includes(SUBTITLE_CLASS_NAME))
        node.classList.add(SUBTITLE_CLASS_NAME)
      if (attr.value.includes(TITLE_CLASS_NAME))
        node.classList.add(TITLE_CLASS_NAME)
    })
  }
}

export default removeAttrs
