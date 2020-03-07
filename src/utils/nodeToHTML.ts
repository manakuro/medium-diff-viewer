const nodeToHTML = (nodeList: NodeListOf<HTMLElementTagNameMap['div']>) =>
  Array.from(nodeList).map(n => n.outerHTML)

export default nodeToHTML
