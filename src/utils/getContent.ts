import removeAttrs from 'src/utils/removeAttrs'
import normalizeHtmlWhiteSpace from 'src/utils/normalizeHtmlWhiteSpace'

const getContent = () => {
  const title = document.querySelector('h3')
  if (!title || !title.parentNode) {
    return ''
  }

  const classList = (title.parentNode as any).classList.value
  const nodes = Array.from(document.getElementsByClassName(classList)).reduce(
    (acc: any[], e: any) => [
      ...acc,
      ...Array.from(e.cloneNode(true).childNodes),
    ],
    [],
  )

  nodes.forEach(node => {
    removeAttrs(node)
  })

  const content = Array.from(nodes).reduce((acc, node) => {
    return `${acc}\n${node.outerHTML}`
  }, '')

  return normalizeHtmlWhiteSpace(content)
}

export default getContent
