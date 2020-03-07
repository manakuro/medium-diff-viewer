import removeAttrs from 'src/utils/removeAttrs'

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

  return Array.from(nodes).reduce((acc, node) => {
    return `${acc}\n${node.outerHTML}`
  }, '')
}

export default getContent
