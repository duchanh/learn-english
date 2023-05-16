import parse from 'html-react-parser'
import sanitizeHtml from 'sanitize-html'

export const parseStringToHtml = (str: string) => {
  if (!str || str.toString().length === 0) {
    return null
  }
  let stringHtml = removeErrorCharacter(str.toString())
  stringHtml = removeBreakLine(stringHtml)
  return parse(stringHtml, {})
}

export const parseContentToHtml = (str: string) => {
  if (!str || str.toString().length === 0) {
    return null
  }
  let stringHtml = removeErrorCharacter(str.toString())
  return parse(stringHtml, {})
}

export const removeErrorCharacter = (str: string) => {
  return str.replaceAll('atarget', 'a target')
}
export const removeBreakLine = (str: string) => {
  return str.replaceAll(/\n/g, '<br />')
}

export const countCharactersEditor = (content: string): number => {
  if (!content || content.length === 0) return 0
  let normalizedText = content
    .replace(/(\r\n|\n|\r)/gm, ' ')
    .replace(/^\s+|\s+$/g, '')
    .replace('&nbsp;', ' ')
    .replace(/\s\s+/g, ' ')

  const contentWithoutHtml = sanitizeHtml(normalizedText, {
    allowedTags: []
  })

  return contentWithoutHtml.trim().length
}


export const stripHtml = (content: string) => {
  if (!content || content.toString().length === 0) {
    return ''
  }
  return content.replace(/<\/?[^>]+(>|$)/g, "")
}