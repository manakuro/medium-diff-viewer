import removeAttrs from 'src/utils/removeAttrs'
import normalizeHtmlWhiteSpace from 'src/utils/normalizeHtmlWhiteSpace'

export type Content = {
  title: string
  body: string
}

const getContent = () => {
  const result = {
    title: '',
    body: '',
  }
  const heading = document.querySelector('h3')
  if (!heading || !heading.parentNode) return result

  const innerSectionClassList = (heading.parentNode as any).classList.value
  const nodes = Array.from(
    document.getElementsByClassName(innerSectionClassList),
  ).reduce(
    (acc: any[], e: any, i) => [
      ...acc,
      ...(i === 0 ? [] : [document.createElement('hr')]),
      ...Array.from(e.cloneNode(true).childNodes),
    ],
    [],
  )

  nodes.forEach(node => {
    removeAttrs(node)
  })

  result.body = normalizeHtmlWhiteSpace(
    Array.from(nodes).reduce((acc, node) => {
      return `${acc}\n${node.outerHTML}`
    }, ''),
  )
  result.title = normalizeHtmlWhiteSpace(heading.innerText)

  return result
}

export default getContent
