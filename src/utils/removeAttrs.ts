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
      if (attr.name === 'src') {
        console.log(node)
        return
      }
      node.removeAttribute(attr.name)
    })
  }
}

export default removeAttrs
