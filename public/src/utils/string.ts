export const removeSpecialCharacter = (str: string) => {
  str = `${str}`
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
  str = str.replace(/Đ/g, 'D')

  return str
}

export const removeAlphabets = (str: string) => {
  return str.replace(/[^.\d]/g, '')
}

export const isAllUpperCase = (str: string) => {
  const input = str ? str.toString() : null
  return input ? !/[a-z]/.test(input) && /[A-Z]/.test(input) : false
}

export const isAllLowerCase = (str: string) => {
  const input = str ? str.toString() : null
  return input ? /[a-z]/.test(input) && !/[A-Z]/.test(input) : false
}

export const hidePhoneNumber = (phoneNumber: string, length: number) => {
  return phoneNumber.slice(0, -length) + '***'
}

export const truncateString = (str: string, maxLength: number, ellipsis?: string) => {
  if (str && str.length > maxLength) {
    return str.slice(0, maxLength) + (ellipsis || '')
  }
  return str
}

export const capitalizeFirstLetter = (str: string) => {
  if (!str || !str.length) {
    return null
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const isStringEmpty = (str: string) => {
  return !str || str.length === 0
}

export const isValidYoutubeUrl = (url: any) => {
  if (!url) return false
  // const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/
  const regExp =
    /^((?:https:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/([\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
  const match = url.match(regExp)
  return match && match[6].length == 11
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function replaceAll(str: string, match: string, replacement: any) {
  if (str) return str.replace(new RegExp(escapeRegExp(match), 'g'), () => replacement)
  return str
}

export const urlify = (text: string) => {
  let str = text.split('').join('');

  let arr = []
  var urlRegex = /((http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?)/g;
  str.replace(urlRegex, function (url) {
    arr.push(url)
    return url;
  })
  return arr?.length > 0 ? arr : null
}


export const convertUrlToTagHref = (text) => {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function (url) {
    return '<a target="_blank" href="' + url + '">' + url + '</a>';
  })
}