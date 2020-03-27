import {
  inheritBackgroundImageUrl,
  inheritClass,
  inheritImgSrc,
} from 'src/utils/inheritAttrs'

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
      if (node.style.backgroundImage && attr.name === 'style') {
        inheritBackgroundImageUrl(node.style.backgroundImage, node)
        return
      }
      if (attr.name === 'src') {
        inheritImgSrc(attr.value, node)
        return
      }
      node.removeAttribute(attr.name)

      inheritClass(attr, node)
    })
  }
}

export default removeAttrs
