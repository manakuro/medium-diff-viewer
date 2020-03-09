const ATTRIBUTES_BLACK_LIST = ['src']

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
      if (ATTRIBUTES_BLACK_LIST.includes(attr.name)) return
      node.removeAttribute(attr.name)
    })
  }
}

export default removeAttrs
