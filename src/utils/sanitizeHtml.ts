import sanitize from 'sanitize-html'

const sanitizeHtml = (str: string) => sanitize(str)

export default sanitizeHtml
