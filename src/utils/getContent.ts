import removeAttrs from 'src/utils/removeAttrs'
import normalizeHtmlWhiteSpace from 'src/utils/normalizeHtmlWhiteSpace'

const getContent = () => {
  const title = document.querySelector('h3')
  if (!title || !title.parentNode) {
    return ''
  }

  const nodes = title.parentNode.cloneNode(true).childNodes as NodeListOf<
    HTMLElementTagNameMap['div']
  >

  nodes.forEach(node => {
    removeAttrs(node)
  })

  const content = Array.from(nodes).reduce((acc, node) => {
    return `${acc}\n${node.outerHTML}`
  }, '')

  return normalizeHtmlWhiteSpace(content)
}

export default getContent
