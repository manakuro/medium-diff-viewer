const ATTRIBUTES_BLACK_LIST = ['src']
const SUBTITLE_CLASS_NAME = 'graf--subtitle'
const TITLE_CLASS_NAME = 'graf--title'
const EXTERNAL_LINK_CLASS_NAME = 'graf--mixtapeEmbed'
const INHERITED_CLASS_LIST = [
  SUBTITLE_CLASS_NAME,
  TITLE_CLASS_NAME,
  EXTERNAL_LINK_CLASS_NAME,
]

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

      INHERITED_CLASS_LIST.forEach(c => {
        if (attr.value.includes(c)) node.classList.add(c)
      })
    })
  }
}

export default removeAttrs
